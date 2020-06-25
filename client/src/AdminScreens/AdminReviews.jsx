import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import MaterialTable from 'material-table'
import { removeReview, getReviews } from '../redux/actions/adminReview'
import { notFoundReset } from '../redux/actions/notFound'

export const AdminReviews = ({ history }) => {
  const dispatch = useDispatch()
  const { reviews, loadingRev } = useSelector((state) => state.adminReview)
  useEffect(() => {
    dispatch(notFoundReset())
    dispatch(getReviews())
  }, [])

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
        style={{ textAlign: 'right' }}
        title='التعليقات'
        columns={[
          { title: 'صاحب التعليق', field: 'name' },
          { title: 'التعليق', field: 'review' },
          { title: 'النجوم', field: 'rating' },
          { title: 'رقم المنتج', field: 'productId' },
        ]}
        isLoading={loadingRev}
        data={reviews}
        actions={[
          {
            icon: 'visibility',
            tooltip: 'تصفح',
            onClick: (event, rowData) =>
              history.push(`/products/${rowData.productId}`),
          },
          {
            icon: 'delete',
            tooltip: 'حذف',
            onClick: (event, rowData) => {
              if (window.confirm('هل أنت متأكد')) {
                dispatch(removeReview(rowData.id))
                dispatch(getReviews())
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
