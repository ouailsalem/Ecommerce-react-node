import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Typography, Chip } from '@material-ui/core'
import MaterialTable, { MTableToolbar } from 'material-table'
import { getUsers } from '../redux/actions/adminUser'
import { removeUser } from '../redux/actions/adminUser'
import { resetUser } from '../redux/actions/adminUser'
import { useHistory } from 'react-router-dom'
export const AdminMembers = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const { users, loadingUser } = useSelector((state) => state.adminUser)
  useEffect(() => {
    dispatch(getUsers())
  }, [])
  return (
    <Container maxWidth={'lg'}>
      <MaterialTable
        style={{ textAlign: 'right' }}
        title='الأعضاء'
        options={{
          headerStyle: {
            backgroundColor: '#FFCC33',
            color: '#222222',
          },
          pageSize: 10,
          pageSizeOptions: [],
        }}
        columns={[
          { title: 'الاسم', field: 'name' },
          { title: 'البريد الاكتروني', field: 'email' },
          { title: 'الأرباح', field: 'money' },
          { title: 'الولاية', field: 'money' },
          { title: 'الدائرة', field: 'money' },
          { title: 'الدائرة', field: 'money' },
        ]}
        isLoading={loadingUser}
        data={users}
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
                dispatch(removeUser(rowData.id))
                dispatch(getUsers())
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
