import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import MaterialTable from 'material-table'
import { getProducts } from '../redux/actions/products'
import { Loading } from '../Screens/Loading'
import { removeProduct } from '../redux/actions/adminProduct'

export const AdminProducts = () => {
  const dispatch = useDispatch()
  const { products, loading } = useSelector((state) => state.products)
  const { loadingDelete } = useSelector((state) => state.adminProduct)
  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <Container maxWidth={'md'}>
      <MaterialTable
        style={{ textAlign: 'right' }}
        title='المنتجات'
        columns={[
          { title: 'ID', field: 'id' },
          { title: 'Name', field: 'name' },
          { title: 'Price', field: 'price' },
          { title: 'Available', field: 'available' },
          { title: 'Main Picture', field: 'mainpicture' },
        ]}
        isLoading={loading || loadingDelete}
        data={products}
        actions={[
          {
            icon: 'edit',
            tooltip: 'تعديل',
            onClick: (event, rowData) => console.log(rowData),
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
