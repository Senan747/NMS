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
import { setSortField } from 'src/store/apps/vehicle/sort'
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
import { setAddDataCondition, setAddDataLoading } from 'src/store/apps/vehicle/index1'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import UserUpdate from 'src/views/apps/user/list/UserUpdate'

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

const columns = ({ dispatch, setSortDirection, sortDirection }) => [
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
    headerName: (
      <div>
        <span>Brand</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortField('brand'))
              setSortDirection('desc')
            } else {
              dispatch(setSortField('brand'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' ? <Icon icon='clarity:arrow-line' /> : <Icon icon='clarity:arrow-line' rotate={2} />}
        </IconButton>
      </div>
    ),
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
    headerName: (
      <div>
        <span>Year</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortField('year'))
              setSortDirection('desc')
            } else {
              dispatch(setSortField('year'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' ? <Icon icon='clarity:arrow-line' /> : <Icon icon='clarity:arrow-line' rotate={2} />}
        </IconButton>
      </div>
    ),
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
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={type.id}>
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
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={kind.id}>
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
    headerName: (
      <div>
        <span>Weight</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortField('weight'))
              setSortDirection('desc')
            } else {
              dispatch(setSortField('weight'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' ? <Icon icon='clarity:arrow-line' /> : <Icon icon='clarity:arrow-line' rotate={2} />}
        </IconButton>
      </div>
    ),
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
    field: 'Power',
    headerName: (
      <div>
        <span>Power</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortField('power'))
              setSortDirection('desc')
            } else {
              dispatch(setSortField('power'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' ? <Icon icon='clarity:arrow-line' /> : <Icon icon='clarity:arrow-line' rotate={2} />}
        </IconButton>
      </div>
    ),
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
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={type.id}>
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
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={fuel.id}>
              {fuel.fuel_kindes_title}
            </Typography>
          ))}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 200,
    field: 'comsumption_km',
    headerName: (
      <div>
        <span>comsumption km</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortField('comsumption_km'))
              setSortDirection('desc')
            } else {
              dispatch(setSortField('comsumption_km'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' ? <Icon icon='clarity:arrow-line' /> : <Icon icon='clarity:arrow-line' rotate={2} />}
        </IconButton>
      </div>
    ),
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
    minWidth: 200,
    headerName: (
      <div>
        <span>comsumption mc</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortField('comsumption_mc'))
              setSortDirection('desc')
            } else {
              dispatch(setSortField('comsumption_mc'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' ? <Icon icon='clarity:arrow-line' /> : <Icon icon='clarity:arrow-line' rotate={2} />}
        </IconButton>
      </div>
    ),
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
    minWidth: 200,
    headerName: (
      <div>
        <span>comsumption day</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortField('comsumption_day'))
              setSortDirection('desc')
            } else {
              dispatch(setSortField('comsumption_day'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' ? <Icon icon='clarity:arrow-line' /> : <Icon icon='clarity:arrow-line' rotate={2} />}
        </IconButton>
      </div>
    ),
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
    minWidth: 200,
    headerName: (
      <div>
        <span>mileage</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortField('milage'))
              setSortDirection('desc')
            } else {
              dispatch(setSortField('milage'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' ? <Icon icon='clarity:arrow-line' /> : <Icon icon='clarity:arrow-line' rotate={2} />}
        </IconButton>
      </div>
    ),
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
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={condition.id}>
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
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={stack.id}>
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
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.index)
  const { addDataLoading } = useSelector(state => state.index1)
  const { updateId } = useSelector(state => state.ShowUpdate)
  const { dataCondition } = useSelector(state => state.index1)
  const { sortField } = useSelector(state => state.sort)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sortDirection, setSortDirection] = useState('asc')

  const columnsDefinition = columns({ dispatch, setSortDirection, sortDirection })

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
  const memorizedData = useMemo(() => data, [data])

  useEffect(() => {
    if (dataCondition) {
      const timeoutId = setTimeout(() => {
        dispatch(setAddDataCondition(''))
      }, 3000)

      return () => clearTimeout(timeoutId)
    }
  }, [dataCondition])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleEngineChange = useCallback(e => {
    setSelectedEngine(e.target.value)
  }, [])

  const handleFuelChange = useCallback(e => {
    setSelectedFuel(e.target.value)
  }, [])

  const handleTypeChange = useCallback(e => {
    setSelectedType(e.target.value)
  }, [])

  const handleKindChange = useCallback(e => {
    setSelectedKind(e.target.value)
  }, [])

  const handleConditionChange = useCallback(e => {
    setSelectedCondition(e.target.value)
  }, [])

  const handleColonChange = useCallback(e => {
    setSelectedColon(e.target.value)
  }, [])

  const [filteredData, setFilteredData] = useState([])
  const [selectedEngine, setSelectedEngine] = useState('')
  const [selectedFuel, setSelectedFuel] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedKind, setSelectedKind] = useState('')
  const [selectedCondition, setSelectedCondition] = useState('')
  const [selectedColon, setSelectedColon] = useState('')

  useEffect(() => {
    if (data !== null) {
      const filteredData = memorizedData.filter(vehicle => {
        const plateNumber = vehicle.vehicle_plate_number || ''
        const engineId = vehicle.id_vehicle_engine || ''
        const fuelId = vehicle.id_vehicle_fuel || ''
        const typeId = vehicle.id_vehicle_type || ''
        const kindId = vehicle.id_vehicle_subject || ''
        const conditionId = vehicle.id_vehicle_condition || ''
        const colonId = vehicle.id_vehicle_colon || ''

        return (
          plateNumber.toLowerCase().includes(value.toLowerCase()) &&
          (selectedEngine === '' || engineId === selectedEngine) &&
          (selectedFuel === '' || fuelId === selectedFuel) &&
          (selectedType === '' || typeId === selectedType) &&
          (selectedKind === '' || kindId === selectedKind) &&
          (selectedCondition === '' || conditionId === selectedCondition) &&
          (selectedColon === '' || colonId === selectedColon)
        )
      })

      setFilteredData(filteredData)
    }
  }, [data, memorizedData, value, selectedEngine, selectedFuel, selectedType, selectedKind, selectedCondition, selectedColon])

  const [sortedData, setSortedData] = useState([])
  useEffect(() => {
    if (sortField === 'brand') {
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
    } else if (sortField === 'year') {
      if (sortDirection === 'asc') {
        setSortedData([...filteredData].sort((a, b) => a.vehicle_year - b.vehicle_year)) || 0
      } else if (sortDirection === 'desc') {
        setSortedData([...filteredData].sort((a, b) => b.vehicle_year - a.vehicle_year)) || 0
      }
    } else if (sortField === 'weight') {
      if (sortDirection === 'asc') {
        setSortedData([...filteredData].sort((a, b) => a.vehicle_weight - b.vehicle_weight)) || 0
      } else if (sortDirection === 'desc') {
        setSortedData([...filteredData].sort((a, b) => b.vehicle_weight - a.vehicle_weight)) || 0
      }
    } else if (sortField === 'power') {
      if (sortDirection === 'asc') {
        setSortedData([...filteredData].sort((a, b) => a.vehicle_power - b.vehicle_power)) || 0
      } else if (sortDirection === 'desc') {
        setSortedData([...filteredData].sort((a, b) => b.vehicle_power - a.vehicle_power)) || 0
      }
    } else if (sortField === 'comsumption_km') {
      if (sortDirection === 'asc') {
        setSortedData([...filteredData].sort((a, b) => a.vehicle_comsumption_km - b.vehicle_comsumption_km)) || 0
      } else if (sortDirection === 'desc') {
        setSortedData([...filteredData].sort((a, b) => b.vehicle_comsumption_km - a.vehicle_comsumption_km)) || 0
      }
    } else if (sortField === 'comsumption_mc') {
      if (sortDirection === 'asc') {
        setSortedData([...filteredData].sort((a, b) => a.vehicle_comsumption_mc - b.vehicle_comsumption_mc)) || 0
      } else if (sortDirection === 'desc') {
        setSortedData([...filteredData].sort((a, b) => b.vehicle_comsumption_mc - a.vehicle_comsumption_mc)) || 0
      }
    } else if (sortField === 'comsumption_day') {
      if (sortDirection === 'asc') {
        setSortedData([...filteredData].sort((a, b) => a.vehicle_comsumption_day - b.vehicle_comsumption_day)) || 0
      } else if (sortDirection === 'desc') {
        setSortedData([...filteredData].sort((a, b) => b.vehicle_comsumption_day - a.vehicle_comsumption_day)) || 0
      }
    } else if (sortField === 'milage') {
      if (sortDirection === 'asc') {
        setSortedData([...filteredData].sort((a, b) => a.vehicle_milage - b.vehicle_milage)) || 0
      } else if (sortDirection === 'desc') {
        setSortedData([...filteredData].sort((a, b) => b.vehicle_milage - a.vehicle_milage)) || 0
      }
    } else {
      setSortedData([...filteredData])
    }
  }, [sortField, filteredData, sortDirection])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  const toggleUserUpdate = () => dispatch(closeShowUpdate())
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 5))
    setPage(0)
  }

  const startIndex = page * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const displayedRows = sortedData.slice(startIndex, endIndex)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='engine-select'>Select engine</InputLabel>
                  <Select
                    fullWidth
                    value={selectedEngine}
                    id='select-engine'
                    label='Select engine'
                    labelId='engine-select'
                    onChange={handleEngineChange}
                    inputProps={{ placeholder: 'Select engine' }}
                  >
                    {engineTypes.map(engine => (
                      <MenuItem key={engine.id} value={engine.id}>
                        {engine.engine_types_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='fuel-select'>Select fuel</InputLabel>
                  <Select
                    fullWidth
                    value={selectedFuel}
                    id='select-fuel'
                    label='Select fuel'
                    labelId='fuel-select'
                    onChange={handleFuelChange}
                    inputProps={{ placeholder: 'Select fuel' }}
                  >
                    {vehicleFuel.map(fuel => (
                      <MenuItem key={fuel.id} value={fuel.id}>
                        {fuel.fuel_kindes_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select type</InputLabel>
                  <Select
                    fullWidth
                    value={selectedType}
                    id='select-type'
                    label='Select type'
                    labelId='type-select'
                    onChange={handleTypeChange}
                    inputProps={{ placeholder: 'Select Type' }}
                  >
                    {vehicleType.map(type => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.vehicle_types_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select kind</InputLabel>
                  <Select
                    fullWidth
                    value={selectedKind}
                    id='select-kind'
                    label='Select kind'
                    labelId='kind-select'
                    onChange={handleKindChange}
                    inputProps={{ placeholder: 'Select kind' }}
                  >
                    {vehicleKind.map(kind => (
                      <MenuItem key={kind.id} value={kind.id}>
                        {kind.vehicle_kindes_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='technical-condition-select'>Select technical condition</InputLabel>
                  <Select
                    fullWidth
                    value={selectedCondition}
                    id='select-technical condition'
                    label='Select technical condition'
                    labelId='technical-condition-select'
                    onChange={handleConditionChange}
                    inputProps={{ placeholder: 'Select technical condition' }}
                  >
                    {technicalConditions.map(condition => (
                      <MenuItem key={condition.id} value={condition.id}>
                        {condition.technical_conditions_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='colon-select'>Select colon</InputLabel>
                  <Select
                    fullWidth
                    value={selectedColon}
                    id='select-colon'
                    label='Select colon'
                    labelId='colon-select'
                    onChange={handleColonChange}
                    inputProps={{ placeholder: 'Select colon' }}
                  >
                    {stacks.map(stack => (
                      <MenuItem key={stack.id} value={stack.id}>
                        {stack.stacks_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <Divider />
          {dataCondition == 'add' ? <Alert severity='success'>Data has added successfully</Alert> : ' '}
          {dataCondition == 'update' ? <Alert severity='success'>Data has updated successfully</Alert> : ' '}
          {dataCondition == 'delete' ? <Alert severity='warning'>Data deleted</Alert> : ' '}
          {dataCondition == 'cantDelete' ? (
            <Alert severity='warning'>Data didn't delete. Because this vehicle is using at waybills</Alert>
          ) : (
            ' '
          )}
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
                    {columnsDefinition.map(column => (
                      <TableCell key={column.field} align={column.align} sx={{ minWidth: column.minWidth }}>
                        {column.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedRows.map(row => (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                      {columnsDefinition.map(column => (
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
            count={sortedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Grid>
      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
      {updateId ? <UserUpdate toggle={toggleUserUpdate} /> : ' '}
    </Grid>
  )
}

export default UserList
