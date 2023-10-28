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
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import Icon from 'src/@core/components/icon'
import { TableContainer } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

// ** Store Imports
import { closeShowUpdate, openShowUpdate, setUpdateId } from 'src/store/apps/ShowUpdate'
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteData } from 'src/store/apps/vehicle'
import {
  fetchVehicleEngine,
  fetchVehicleFuel,
  fetchTechnicalConditions,
  fetchVehicleKindes,
  fetchVehicleTypes,
  fetchStacks
} from 'src/store/apps/vehicle/vehicleDetails'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import UserUpdate from 'src/views/apps/user/list/UserUpdate'
import { setAddDataCondition, setAddDataLoading } from 'src/store/apps/vehicle/index1'

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

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const { addDataLoading } = useSelector(state => state.index1)

  const handleDelete = async () => {
    try {
      const resultAction = await dispatch(deleteData(id))
      if (deleteData.rejected.match(resultAction)) {
        dispatch(setAddDataCondition('cantDelete'))
      } else {
        handleRowOptionsClose()
        dispatch(setAddDataCondition('delete'))
        dispatch(setAddDataLoading(!addDataLoading))
      }
    } catch (error) {
      console.error('An error occurred while deleting:', error)
    }
  }

  const handleEdit = () => {
    dispatch(openShowUpdate())
    handleRowOptionsClose()
    dispatch(setUpdateId(id))
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
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
    field: 'Plate number',
    headerName: 'Plate number',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <LinkStyled href='/apps/user/view/overview/'>{row.vehicle_plate_number}</LinkStyled>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'Brand',
    headerName: 'Brand',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.vehicle_brand}
        </Typography>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 150,
    field: 'Vehicle year',
    headerName: 'Vehicle year',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.vehicle_year}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'Type',
    headerName: 'Type',
    renderCell: ({ row, vehicleType }) => (
      <Typography noWrap variant='body2'>
        {vehicleType
          .filter(type => row.id_vehicle_type === type.id)
          .map(type => (
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {type.vehicle_types_title}
            </Typography>
          ))}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'Subject',
    headerName: 'Subject',
    renderCell: ({ row, vehicleKind }) => (
      <Typography noWrap variant='body2'>
        {vehicleKind
          .filter(kind => row.id_vehicle_subject === kind.id)
          .map(kind => (
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {kind.vehicle_kindes_title}
            </Typography>
          ))}
      </Typography>
    )
  },
  {
    flex: 0.2,
    field: 'Weight',
    minWidth: 150,
    headerName: 'Weight',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
          <Icon icon={''} fontSize={20} />
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.vehicle_weight}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 150,
    headerName: 'Power',
    field: 'Power',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.vehicle_power}
        </Typography>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 150,
    field: 'Engine',
    headerName: 'Engine',
    renderCell: ({ row, engineTypes }) => (
      <Typography noWrap variant='body2'>
        {engineTypes
          .filter(type => row.id_vehicle_engine === type.id)
          .map(type => (
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {type.engine_types_title}
            </Typography>
          ))}
      </Typography>
    )
  },

  {
    flex: 0.2,
    minWidth: 150,
    field: 'Fuel',
    headerName: 'Fuel',
    renderCell: ({ row, vehicleFuel }) => (
      <Typography noWrap variant='body2'>
        {vehicleFuel
          .filter(fuel => row.id_vehicle_fuel === fuel.id)
          .map(fuel => (
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {fuel.fuel_kindes_title}
            </Typography>
          ))}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 150,
    headerName: 'comsuption km',
    field: 'comsuption km',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.vehicle_comsumption_km}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 150,
    headerName: 'Comsuption mc',
    field: 'Comsuption mc',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.vehicle_comsumption_mc}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 150,
    headerName: 'Comsuption day',
    field: 'Comsuption day',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.vehicle_comsumption_day}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 150,
    headerName: 'mileage',
    field: 'mileage',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.vehicle_milage}
        </Typography>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 150,
    field: 'Conditions',
    headerName: 'Conditions',
    renderCell: ({ row, technicalConditions }) => (
      <Typography noWrap variant='body2'>
        {technicalConditions
          .filter(condition => row.id_vehicle_condition === condition.id)
          .map(condition => (
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {condition.technical_conditions_title}
            </Typography>
          ))}
      </Typography>
    )
  },

  {
    flex: 0.2,
    minWidth: 150,
    field: 'Colon',
    headerName: 'Colon',
    renderCell: ({ row, stacks }) => (
      <Typography noWrap variant='body2'>
        {stacks
          .filter(stack => row.id_vehicle_colon === stack.id)
          .map(stack => (
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {stack.stacks_title}
            </Typography>
          ))}
      </Typography>
    )
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
  const [isLoading, setIsLoading] = useState(true)
  const [showAlert, setShowAlert] = useState(false)

  const dispatch = useDispatch()
  const { data } = useSelector(state => state.index)
  const { addDataLoading } = useSelector(state => state.index1)

  const { updateId } = useSelector(state => state.ShowUpdate)
  const { dataCondition } = useSelector(state => state.index1)
  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchData())
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })

    dispatch(fetchVehicleEngine())
    dispatch(fetchVehicleFuel())
    dispatch(fetchVehicleKindes())
    dispatch(fetchTechnicalConditions())
    dispatch(fetchStacks())
    dispatch(fetchVehicleTypes())
  }, [dispatch, addDataLoading])

  const { engineTypes, vehicleFuel, vehicleType, vehicleKind, technicalConditions, stacks } = useSelector(
    state => state.vehicleDetails
  )

  const memoizedData = useMemo(() => data, [data])

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
  const [userUpdate, setUserUpdate] = useState(false)
  const toggleUserUpdate = () => dispatch(closeShowUpdate())

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 5))
    setPage(0)
  }

  const startIndex = page * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  // const displayedRows = memoizedData.slice(startIndex, endIndex)

  const loadingIndicatorStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px'
  }

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
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
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
          </CardContent>
          <Divider />
          {dataCondition == 'add' ? <Alert severity='success'>Data has added successfully</Alert> : ' '}
          {dataCondition == 'update' ? <Alert severity='success'>Data has updated successfully</Alert> : ' '}
          {dataCondition == 'delete' ? <Alert severity='warning'>Data deleted</Alert> : ' '}
          {dataCondition == 'cantDelete' ? (
            <Alert severity='warning'>
              Data didn't delete. Because this vehicle is using at waybills <span>x</span>
            </Alert>
          ) : (
            ' '
          )}
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <TableContainer component={Paper} sx={{ maxHeight: 540 }}>
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
                            engineTypes,
                            vehicleFuel,
                            vehicleType,
                            vehicleKind,
                            technicalConditions,
                            stacks
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
            count={memoizedData.length} // Use the total number of rows in your data array
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
      {updateId ? <UserUpdate open={userUpdate} toggle={toggleUserUpdate} /> : ' '}
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
