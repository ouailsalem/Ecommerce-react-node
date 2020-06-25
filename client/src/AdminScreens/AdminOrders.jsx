import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Typography, Button } from '@material-ui/core'
import MaterialTable from 'material-table'
import { useHistory } from 'react-router-dom'
import { getOrders, deleteOrder } from '../redux/actions/adminOrder'
import { resetOrder } from '../redux/actions/adminOrder'
import { notFoundReset } from '../redux/actions/notFound'

export const AdminOrders = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const { allOrders, loadingOr } = useSelector((state) => state.adminOrder)
  useEffect(() => {
    dispatch(notFoundReset())
    dispatch(resetOrder())
    dispatch(getOrders())
  }, [dispatch])

  return (
    <Container maxWidth={'lg'}>
      <MaterialTable
        style={{ textAlign: 'right' }}
        title='الطلبات'
        options={{
          headerStyle: {
            backgroundColor: '#FFCC33',
            color: '#222222',
          },
          pageSize: 10,
          pageSizeOptions: [],
        }}
        columns={[
          { title: 'الرقم', field: 'id' },
          { title: 'الاسم', field: 'name' },
          {
            field: 'product',
            title: 'اسم المنتج',
            render: (rowData) => (
              <Button
                onClick={() => {
                  history.push({
                    pathname: `/products/${rowData.productOrderedId}`,
                  })
                }}
              >
                {rowData.product}
              </Button>
            ),
            onClick: (event, rowData) => console.log(rowData),
          },
          { title: 'الولاية', field: 'wilaya' },
          { title: 'الدائرة', field: 'dayra' },
          { title: 'العنوان', field: 'address' },
          { title: 'المُسوق', field: 'refer' },
          {
            field: 'status',
            title: 'الحالة',
            render: (rowData) =>
              !rowData.status ? (
                <Typography
                  style={{
                    borderRadius: 8,
                    color: 'white',
                    backgroundColor: 'red',
                  }}
                >
                  قيد التوصيل
                </Typography>
              ) : (
                <Typography
                  style={{
                    borderRadius: 8,
                    color: 'white',
                    backgroundColor: 'green',
                  }}
                >
                  تم التوصيل
                </Typography>
              ),
          },
        ]}
        isLoading={loadingOr}
        data={allOrders}
        actions={[
          {
            icon: 'edit',
            tooltip: 'تعديل',
            onClick: (event, rowData) =>
              history.push({
                pathname: `/admin/orders/edit/${rowData.id}`,
                state: { rowData },
              }),
            iconProps: { style: { fontSize: '16px' } },
          },
          {
            icon: 'delete',
            tooltip: 'حذف',
            onClick: (event, rowData) => {
              if (window.confirm('هل أنت متأكد')) {
                dispatch(deleteOrder(rowData.id))
                dispatch(getOrders())
              } else {
                return
              }
            },
            iconProps: { style: { fontSize: '16px' } },
          },
        ]}
      />
    </Container>
  )
}
