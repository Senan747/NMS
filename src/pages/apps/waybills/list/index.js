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
import { setSortFieldWaybill } from 'src/store/apps/waybills/sortWaybills'

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

const columns = ({ dispatch, setSortDirection, sortDirection, sortFieldWaybill }) => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills date',
    headerName: (
      <div>
        <span>Waybill date</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('date'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('date'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'date' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
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
    headerName: (
      <div>
        <span>Waybill no</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('waybill_no'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('waybill_no'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'waybill_no' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
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
    headerName: (
      <div>
        <span>Vehicle brand</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('brand'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('brand'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'brand' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
    renderCell: ({ row, data }) => (
      <Typography noWrap variant='body2'>
        {data
          .filter(type => row.id_vehicle === type.id)
          .map(type => (
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={type.id}>
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
              <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={type.id}>
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
    headerName: (
      <div>
        <span>Waybill od start</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('od_start'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('od_start'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'od_start' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
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
    headerName: (
      <div>
        <span>Waybill od finish</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('od_finish'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('od_finish'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'od_finish' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
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
    headerName: (
      <div>
        <span>Waybill od gone</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('od_gone'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('od_gone'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'od_gone' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
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
    headerName: (
      <div>
        <span>Waybill fuel start</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('fuel_start'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('fuel_start'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'fuel_start' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
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
    headerName: (
      <div>
        <span>Waybill fuel given</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('fuel_given'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('fuel_given'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'fuel_given' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
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
    headerName: (
      <div>
        <span>Waybill fuel consumed</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('fuel_consumed'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('fuel_consumed'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'fuel_consumed' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
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
    headerName: (
      <div>
        <span>Waybill fuel finish</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('fuel_finish'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('fuel_finish'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'fuel_finish' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
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

const UserList = () => {
  const [value, setValue] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.index)
  const { dataWaybills } = useSelector(state => state.CRUD)
  const { addDataLoading, waybillCondition } = useSelector(state => state.index1)
  const [isLoading, setIsLoading] = useState(true)
  const { sortFieldWaybill } = useSelector(state => state.sortWaybills)
  const [sortDirection, setSortDirection] = useState('asc')
  const columnsDefinition = columns({ dispatch, setSortDirection, sortDirection, sortFieldWaybill })
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

  const memorizedData = useMemo(() => dataWaybills, [dataWaybills])

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

  const handleVehicleChange = useCallback(e => {
    setSelectedVehicleId(e.target.value)
  }, [])
  const handleKindChange = useCallback(e => {
    setSelectedKind(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  const toggleUserEdit = () => dispatch(closeShowEdit())

  const [filteredData, setFilteredData] = useState([])
  const [selectedVehicleId, setSelectedVehicleId] = useState('')
  const [selectedKind, setSelectedKind] = useState('')

  useEffect(() => {
    if (dataWaybills !== null) {
      const filteredData = memorizedData.filter(waybill => {
        const waybillsNo = String(waybill.waybills_no) || ''
        const vehicleId = waybill.id_vehicle || ''
        const kindId = waybill.id_vehicle_subject || ''

        return (
          waybillsNo.includes(value) &&
          (selectedVehicleId === '' || vehicleId === selectedVehicleId) &&
          (selectedKind === '' || kindId === selectedKind)
        )
      })

      setFilteredData(filteredData)
    }
  }, [dataWaybills, memorizedData, data, value, selectedVehicleId, selectedKind])

  const [sortedData, setSortedData] = useState([])

  useEffect(() => {
    if (sortFieldWaybill === 'date') {
      if (sortDirection === 'asc') {
        setSortedData([...filteredData].sort((a, b) => new Date(a['waybills_date']) - new Date(b['waybills_date'])))
      } else if (sortDirection === 'desc') {
        setSortedData([...filteredData].sort((a, b) => new Date(b['waybills_date']) - new Date(a['waybills_date'])))
      }
    } else if (sortFieldWaybill === 'waybill_no') {
      if (sortDirection === 'asc') {
        setSortedData([...filteredData].sort((a, b) => a.waybills_no - b.waybills_no)) || 0
      } else if (sortDirection === 'desc') {
        setSortedData([...filteredData].sort((a, b) => b.waybills_no - a.waybills_no)) || 0
      }
    } else if (sortFieldWaybill === 'brand') {
      if (sortDirection === 'asc') {
        setSortedData(
          [...filteredData].sort(
            (a, b) => a.vehicle_brand?.localeCompare(b.vehicle_brand, undefined, { sensitivity: 'base' }) || 0
          )
        )
      } else if (sortDirection === 'desc') {
        setSortedData(
          [...filteredData].sort(
            (a, b) => b.vehicle_brand?.localeCompare(a.vehicle_brand, undefined, { sensitivity: 'base' }) || 0
          )
        )
      }
    } else if (sortFieldWaybill === 'od_start') {
      if (sortDirection === 'asc') {
        setSortedData([...filteredData].sort((a, b) => a.waybills_od_start - b.waybills_od_start)) || 0
      } else if (sortDirection === 'desc') {
        setSortedData([...filteredData].sort((a, b) => b.waybills_od_start - a.waybills_od_start)) || 0
      }
    } else if (sortFieldWaybill === 'od_finish') {
      if (sortDirection === 'asc') {
        setSortedData([...filteredData].sort((a, b) => a.waybills_od_finish - b.waybills_od_finish)) || 0
      } else if (sortDirection === 'desc') {
        setSortedData([...filteredData].sort((a, b) => b.waybills_od_finish - a.waybills_od_finish)) || 0
      }
    } else if (sortFieldWaybill === 'fuel_start') {
      if (sortDirection === 'asc') {
        setSortedData([...filteredData].sort((a, b) => a.waybills_fuel_start - b.waybills_fuel_start)) || 0
      } else if (sortDirection === 'desc') {
        setSortedData([...filteredData].sort((a, b) => b.waybills_fuel_start - a.waybills_fuel_start)) || 0
      }
    } else if (sortFieldWaybill === 'fuel_given') {
      if (sortDirection === 'asc') {
        setSortedData([...filteredData].sort((a, b) => a.waybills_fuel_given - b.waybills_fuel_given)) || 0
      } else if (sortDirection === 'desc') {
        setSortedData([...filteredData].sort((a, b) => b.waybills_fuel_given - a.waybills_fuel_given)) || 0
      }
    } else if (sortFieldWaybill === 'fuel_consumed') {
      if (sortDirection === 'asc') {
        setSortedData([...filteredData].sort((a, b) => a.waybills_fuel_consumed - b.waybills_fuel_consumed)) || 0
      } else if (sortDirection === 'desc') {
        setSortedData([...filteredData].sort((a, b) => b.waybills_fuel_consumed - a.waybills_fuel_consumed)) || 0
      }
    } else {
      setSortedData([...filteredData])
    }
  }, [sortFieldWaybill, filteredData, sortDirection])

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
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='role-select'>Select Vehicle</InputLabel>
                  <Select
                    fullWidth
                    value={selectedVehicleId}
                    id='select-vehicle'
                    label='Select Vehicle'
                    labelId='vehicle-select'
                    onChange={handleVehicleChange}
                    inputProps={{ placeholder: 'Select vehicle' }}
                  >
                    {data.map(number => (
                      <MenuItem key={number.id} value={number.id}>
                        {number.vehicle_plate_number}
                      </MenuItem>
                    ))}
                    {selectedVehicleId !== '' && (
                      <MenuItem value=''>
                        <Icon icon='material-symbols:delete-outline' onClick={() => setSelectedVehicleId('')} />
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='kind-select'>Select Kind</InputLabel>
                  <Select
                    fullWidth
                    value={selectedKind}
                    id='select-kind'
                    label='Select kind'
                    labelId='kind-select'
                    onChange={handleKindChange}
                    inputProps={{ placeholder: 'Select kind' }}
                  >
                    {vehicleKind.map(number => (
                      <MenuItem key={number.id} value={number.id}>
                        {number.vehicle_kindes_title}
                      </MenuItem>
                    ))}
                    {selectedKind !== '' && (
                      <MenuItem value=''>
                        <Icon icon='material-symbols:delete-outline' onClick={() => setSelectedKind('')} />
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
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
                    {columnsDefinition.map(column => (
                      <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                        {column.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.map(row => (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                      {columnsDefinition.map(column => (
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
            count={memorizedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Grid>

      <AddWaybills open={addUserOpen} toggle={toggleAddUserDrawer} />
      {editId ? <EditWaybill toggle={toggleUserEdit} /> : ' '}
    </Grid>
  )
}

export default UserList
