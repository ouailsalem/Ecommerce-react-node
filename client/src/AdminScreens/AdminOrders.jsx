import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Typography } from '@material-ui/core'
import MaterialTable from 'material-table'
import { useHistory } from 'react-router-dom'
import { getOrders, deleteOrder } from '../redux/actions/adminOrder'
import { resetOrder } from '../redux/actions/adminOrder'
export const AdminOrders = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const { allOrders, loadingOr } = useSelector((state) => state.adminOrder)
  useEffect(() => {
    dispatch(resetOrder())
    dispatch(getOrders())
  }, [dispatch])

  return (
    <Container maxWidth={'lg'}>
      <MaterialTable
        style={{ textAlign: 'right' }}
        title='المنتجات'
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
          { title: 'اسم المنتج', field: 'product' },
          { title: 'الولاية', field: 'wilaya' },
          { title: 'الدائرة', field: 'dayra' },
          { title: 'العنوان', field: 'address' },
          { title: 'الحالة', field: 'status' },
          { title: 'المُسوق', field: 'refer' },
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
