import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
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
import { closeShowUpdate } from 'src/store/apps/vehicle/ShowUpdate'
import { useDispatch, useSelector } from 'react-redux'
import { useGetVehiclesQuery, useGetAllVehiclesQuery } from 'src/store/apps/vehicle/api'
import { setAddDataCondition } from 'src/store/apps/vehicle/conditions'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import UserUpdate from 'src/views/apps/user/list/UserUpdate'
import Columns from 'src/views/apps/user/list/Columns'

const UserList = () => {
  const [value, setValue] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const dispatch = useDispatch()
  const { updateId } = useSelector(state => state.ShowUpdate)
  const { dataCondition } = useSelector(state => state.conditions)
  const { sortField } = useSelector(state => state.sort)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const [sortDirection, setSortDirection] = useState('asc')
  let pageVehicle = page + 1
  const { data, error, isLoading, isFetching } = useGetVehiclesQuery({ pageVehicle, value })
  const [dataVehicles, setDataVehicles] = useState([])  
  const { checkId } = useSelector(state => state.ShowUpdate)
  const columnsDefinition = Columns({ dispatch, setSortDirection, sortDirection, sortField, checkId })
  const { data: allDataVehicle} = useGetAllVehiclesQuery()


  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isLoading) {
      setDataVehicles(data.vehicles.data)
      setCount(data.vehicles.total)
    }
  }, [page, data, dataCondition, value])

  const { engineTypes, vehicleFuel, vehicleType, vehicleKind, technicalConditions, stacks } = useSelector(
    state => state.vehicleDetails
  )

  useEffect(() => {
    if (dataCondition) {
      const timeoutId = setTimeout(() => {
        dispatch(setAddDataCondition(''))
      }, 4000)

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
      const filteredData = dataVehicles.filter(vehicle => {
        const engineId = vehicle.id_vehicle_engine || ''
        const fuelId = vehicle.id_vehicle_fuel || ''
        const typeId = vehicle.id_vehicle_type || ''
        const kindId = vehicle.id_vehicle_subject || ''
        const conditionId = vehicle.id_vehicle_condition || ''
        const colonId = vehicle.id_vehicle_colon || ''

        return (
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
  }, [
    dataVehicles,
    dataVehicles,
    value,
    selectedEngine,
    selectedFuel,
    selectedType,
    selectedKind,
    selectedCondition,
    selectedColon
  ])

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
    setRowsPerPage(parseInt(event.target.value, rowsPerPage))
    setPage(0)
  }

  console.log(checkId)

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
                    {selectedEngine !== '' && (
                      <MenuItem value=''>
                        <Icon icon='material-symbols:delete-outline' onClick={() => setSelectedEngine('')} />
                      </MenuItem>
                    )}
                    {engineTypes.map(engine => (
                      <MenuItem key={engine.id} value={engine.id}>
                        {engine.engine_types_title}
                      </MenuItem>
                    ))}{' '}
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
                    {selectedFuel !== '' && (
                      <MenuItem value=''>
                        <Icon icon='material-symbols:delete-outline' onClick={() => setSelectedFuel('')} />
                      </MenuItem>
                    )}
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
                    {selectedType !== '' && (
                      <MenuItem value=''>
                        <Icon icon='material-symbols:delete-outline' onClick={() => setSelectedType('')} />
                      </MenuItem>
                    )}
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
                    {selectedKind !== '' && (
                      <MenuItem value=''>
                        <Icon icon='material-symbols:delete-outline' onClick={() => setSelectedKind('')} />
                      </MenuItem>
                    )}
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
                    {selectedCondition !== '' && (
                      <MenuItem value=''>
                        <Icon
                          icon='material-symbols:delete-outline'
                          onClick={() => setSelectedConselectedCondition('')}
                        />
                      </MenuItem>
                    )}
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
                    {selectedColon !== '' && (
                      <MenuItem value=''>
                        <Icon icon='material-symbols:delete-outline' onClick={() => setSelectedCoselectedColon('')} />
                      </MenuItem>
                    )}
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
          <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            {isFetching || isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', minWidth: 'full', minHeight: '400px' }}>
                <CircularProgress />
              </div>
            ) : (
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {columnsDefinition.map(column => (
                      <TableCell key={column.field} align={column.align} sx={{ minWidth: column.minWidth }}>
                        {column.headerName(allDataVehicle.vehicles)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.map(row => (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.id}
                      style={{
                        backgroundColor: checkId.some(id => id == row.id) ? '#CFECF7' : '' 
                      }}
                    >
                      {columnsDefinition.map(column => (
                        <TableCell key={column.field} align={column.align} className=''>
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
            rowsPerPageOptions={[15]} // Add the available rows per page options
            component='div'
            count={isLoading ? 0 : count}
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
