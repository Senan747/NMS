import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import Select from '@mui/material/Select'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import TableCell from '@mui/material/TableCell'
import Icon from 'src/@core/components/icon'
import { TableContainer } from '@mui/material'
import TablePagination from '@mui/material/TablePagination'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { closeShowEdit, openShowEdit, setEditId } from 'src/store/apps/waybills/editWaybills'
import { setAddDataLoading, setAddWaybillCondition } from 'src/store/apps/vehicle/index1'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchWaybills, deleteWaybills } from 'src/store/apps/waybills/CRUD'
import { fetchVehicleKindes } from 'src/store/apps/vehicle/vehicleDetails'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/waybills/list/TableHeader'
import AddWaybills from 'src/views/apps/waybills/list/AddWaybill'
import EditWaybill from 'src/views/apps/waybills/list/EditWaybill'

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

// ** renders client column
const renderClient = row => {
  if (row.avatar) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
      >
        {getInitials(row.vehicle_brand ? row.vehicle_brand : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id }) => {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)
  const { addDataLoading } = useSelector(state => state.index1)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteWaybills(id))
    handleRowOptionsClose()
    dispatch(setAddWaybillCondition('delete'))
    dispatch(setAddDataLoading(!addDataLoading))
  }

  const handleEdit = () => {
    dispatch(openShowEdit())
    handleRowOptionsClose()
    dispatch(setEditId(id))
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted={true}
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns = [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills date',
    headerName: 'Waybills date',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <LinkStyled href='/apps/user/view/overview/'>{row.waybills_date}</LinkStyled>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills no',
    headerName: 'Waybills no',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.waybills_no}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Vehicle brand',
    headerName: 'Vehicle brand',
    renderCell: ({ row, data }) => (
      <Typography noWrap variant='body2'>
        {data
          .filter(type => row.id_vehicle === type.id)
          .map(type => (
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}  key={type.id}>
              {type.vehicle_brand}
            </Typography>
          ))}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Vehicle kind',
    headerName: 'Vehicle kind',
    renderCell: ({ row, data, vehicleKind }) => (
      <Typography noWrap variant='body2'>
        {data
          .filter(type => row.id_vehicle === type.id)
          .map(type => {
            const kind = vehicleKind.find(k => k.id === type.id_vehicle_subject)

            return (
              <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}  key={type.id}>
                {kind && kind.vehicle_kindes_title}
              </Typography>
            )
          })}
      </Typography>
    )
  },

  {
    flex: 0.2,
    minWidth: 200,
    field: 'Vehicle plate number',
    headerName: 'Vehicle plate number',
    renderCell: ({ row, data }) => (
      <Typography noWrap variant='body2'>
        {data
          .filter(type => row.id_vehicle === type.id)
          .map(type => (
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={type.id}>
              {type.vehicle_plate_number}
            </Typography>
          ))}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills od start',
    headerName: 'Waybills od start',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.waybills_od_start}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills od finish',
    headerName: 'Waybills od finish',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.waybills_od_finish}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills od gone',
    headerName: 'Waybills od gone',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.waybills_od_gone}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills fuel start',
    headerName: 'Waybills fuel start',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.waybills_fuel_start}
        </Typography>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills fuel given',
    headerName: 'Waybills fuel given',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.waybills_fuel_given}
        </Typography>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 230,
    field: 'Waybills fuel consumed',
    headerName: 'Waybills fuel consumed',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.waybills_fuel_consumed}
        </Typography>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills fuel finish',
    headerName: 'Waybills fuel finish',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.waybills_fuel_finish}
        </Typography>
      )
    }
  },

  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]

const UserList = ({ apiData }) => {
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.index)
  const { dataWaybills } = useSelector(state => state.CRUD)
  const { addDataLoading, waybillCondition } = useSelector(state => state.index1)
  const [isLoading, setIsLoading] = useState(true)

  const { editId } = useSelector(state => state.editWaybills)
  useEffect(() => {
    setIsLoading(true)

    const fetchKindPromise = dispatch(fetchVehicleKindes())
    const fetchDataWaybillsPromise = dispatch(fetchWaybills())
    Promise.all([fetchKindPromise, fetchDataWaybillsPromise])
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [dispatch, addDataLoading])

  const { vehicleKind } = useSelector(state => state.vehicleDetails)

  const memoizedData = useMemo(() => dataWaybills, [dataWaybills])

  useEffect(() => {
    if (waybillCondition) {
      const timeoutId = setTimeout(() => {
        dispatch(setAddWaybillCondition(''))
      }, 3000)

      return () => clearTimeout(timeoutId)
    }
  }, [waybillCondition])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  const [userEdit, setUserEdit] = useState(false)
  const toggleUserEdit = () => dispatch(closeShowEdit())

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(4)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 4))
    setPage(0)
  }

  const startIndex = page * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  // const displayedRows = memoizedData.slice(startIndex, endIndex)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {apiData && (
          <Grid container spacing={6}>
            {apiData.statsHorizontal.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatisticsHorizontal {...item} icon={<Icon icon={item.icon} />} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          {/* <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='role-select'>Select Role</InputLabel>
                  <Select
                    fullWidth
                    value={role}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    onChange={handleRoleChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='author'>Author</MenuItem>
                    <MenuItem value='editor'>Editor</MenuItem>
                    <MenuItem value='maintainer'>Maintainer</MenuItem>
                    <MenuItem value='subscriber'>Subscriber</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Select Plan</InputLabel>
                  <Select
                    fullWidth
                    value={plan}
                    id='select-plan'
                    label='Select Plan'
                    labelId='plan-select'
                    onChange={handlePlanChange}
                    inputProps={{ placeholder: 'Select Plan' }}
                  >
                    <MenuItem value=''>Select Plan</MenuItem>
                    <MenuItem value='basic'>Basic</MenuItem>
                    <MenuItem value='company'>Company</MenuItem>
                    <MenuItem value='enterprise'>Enterprise</MenuItem>
                    <MenuItem value='team'>Team</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='pending'>Pending</MenuItem>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent> */}
          <Divider />
          {waybillCondition == 'add' ? <Alert severity='success'>Data has added successfully</Alert> : ' '}
          {waybillCondition == 'update' ? <Alert severity='success'>Data has updated successfully</Alert> : ' '}
          {waybillCondition == 'delete' ? <Alert severity='warning'>Data deleted</Alert> : ' '}
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div style={{ display: 'flex', justifyContent: 'center', minWidth: '1300px', minHeight: '400px' }}>
                    <CircularProgress />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                        {column.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {memoizedData.map(row => (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                      {columns.map(column => (
                        <TableCell key={column.field} align={column.align}>
                          {column.renderCell({
                            row,
                            vehicleKind,
                            data
                          })}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[4]}
            component='div'
            count={memoizedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Grid>

      <AddWaybills open={addUserOpen} toggle={toggleAddUserDrawer} />
      {editId ? <EditWaybill open={userEdit} toggle={toggleUserEdit} /> : ' '}
    </Grid>
  )
}

// export const getStaticProps = async () => {
//   const res = await axios.get('/cards/statistics')
//   const apiData = res.data

//   return {
//     props: {
//       apiData
//     }
//   }
// }

export default UserList
