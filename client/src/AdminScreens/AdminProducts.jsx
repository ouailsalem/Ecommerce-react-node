import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Typography, Chip } from '@material-ui/core'
import MaterialTable, { MTableToolbar } from 'material-table'
import { getProducts } from '../redux/actions/products'
import { removeProduct } from '../redux/actions/adminProduct'
import { resetProduct } from '../redux/actions/adminProduct'
import { useHistory } from 'react-router-dom'
import { notFoundReset } from '../redux/actions/notFound'

export const AdminProducts = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const { products, loading } = useSelector((state) => state.products)
  const { loadingPr } = useSelector((state) => state.adminProduct)
  useEffect(() => {
    dispatch(notFoundReset())
    dispatch(resetProduct())
    dispatch(getProducts())
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
          { title: 'اسم المنتج', field: 'name' },
          { title: 'السعر', field: 'price' },
          {
            title: 'الحالة',
            field: 'available',
            render: (rowData) => (
              <Typography>
                {rowData.available ? 'متوفر' : 'غير متوفر'}
              </Typography>
            ),
          },
          {
            title: 'الصورة الأساسيـة',
            field: 'mainpicture',
            render: (rowData) => (
              <img
                src={rowData.mainPicture}
                alt='رابط غير معرف'
                style={{ width: 100 }}
              />
            ),
          },
          {
            title: 'الفيديو',
            field: 'videoLink',
            render: (rowData) => (
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={rowData.videoLink}
              >
                معاينة
              </a>
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
            iconProps: { style: { fontSize: '16px' } },
          },
          {
            icon: 'visibility',
            tooltip: 'تصفح',
            onClick: (event, rowData) =>
              history.push(`/products/${rowData.id}`),
            iconProps: { style: { fontSize: '16px' } },
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
            iconProps: { style: { fontSize: '16px' } },
          },
        ]}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ padding: '0px 10px' }}>
                <Chip
                  label='إضافة منتج جديد'
                  color='primary'
                  style={{ margin: 5 }}
                  onClick={() => history.push(`/admin/products/add`)}
                />
              </div>
            </div>
          ),
        }}
      />
    </Container>
  )
}
