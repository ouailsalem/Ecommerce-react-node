import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import MaterialTable from 'material-table'
import { removeReview, getReviews } from '../redux/actions/adminReview'

export const AdminReviews = ({ history }) => {
  const dispatch = useDispatch()
  const { reviews, loadingRev } = useSelector((state) => state.adminReview)
  useEffect(() => {
    dispatch(getReviews())
  }, [])

  return (
    <Container maxWidth={'md'}>
      <MaterialTable
        style={{ textAlign: 'right' }}
        title='التعليقات'
        columns={[
          { title: 'name', field: 'name' },
          { title: 'review', field: 'review' },
          { title: 'rating', field: 'rating' },
          { title: 'productId', field: 'productId' },
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
