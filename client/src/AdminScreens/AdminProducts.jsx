import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Typography } from '@material-ui/core'
import MaterialTable from 'material-table'
import { getProducts } from '../redux/actions/products'
import { removeProduct } from '../redux/actions/adminProduct'
import { resetProduct } from '../redux/actions/adminProduct'
import { useHistory } from "react-router-dom";
export const AdminProducts = () => {
  let history = useHistory();
  const dispatch = useDispatch()
  const { products, loading } = useSelector((state) => state.products)
  const { loadingPr } = useSelector((state) => state.adminProduct)
  useEffect(() => {
    dispatch(resetProduct())
    dispatch(getProducts())
  }, [])
  return (
    <Container maxWidth={'md'}>
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
          { title: 'اسم المنتج', field: 'name' },
          { title: 'السعر', field: 'price' },
          {
            title: 'الحالة',
            field: 'available',
            render: (rowData) => (
              <Typography>
                {' '}
                {rowData.available ? 'متوفر' : 'غير متوفر'}{' '}
              </Typography>
            ),
          },
          {
            title: 'الصورة الأساسيـة',
            field: 'mainpicture',
            render: (rowData) => (
              <img src={rowData.mainPicture} style={{ width: 100 }} />
            ),
          },
        ]}
        isLoading={loading || loadingPr}
        data={products}
        actions={[
          {
            icon: 'edit',
            tooltip: 'تعديل',
            onClick: (event, rowData) =>
              history.push({
                pathname: `/admin/products/edit/${rowData.id}`,
                state: { rowData },
              }),
          },
          {
            icon: 'visibility',
            tooltip: 'تصفح',
            onClick: (event, rowData) =>
              history.push(`/products/${rowData.id}`),
          },
          {
            icon: 'delete',
            tooltip: 'حذف',
            onClick: (event, rowData) => {
              if (window.confirm('هل أنت متأكد')) {
                dispatch(removeProduct(rowData.id))
                dispatch(getProducts())
              } else {
                return
              }
            },
          },
        ]}
      />
    </Container>
  )
}
