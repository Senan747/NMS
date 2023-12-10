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

// ** Custom Table Components Imports

import TableHeader from 'src/views/apps/vehicle/list/TableHeader'
import AddUserDrawer from 'src/views/apps/vehicle/list/AddVehicleDrawer'
import UserUpdate from 'src/views/apps/vehicle/list/VehicleUpdate'
import Columns from 'src/views/apps/vehicle/list/Columns'

const UserList = () => {
  const [value, setValue] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const dispatch = useDispatch()
  const [sortField, setSortField] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const [sortDirection, setSortDirection] = useState('asc')
  let pageVehicle = page + 1
  const { data, error, isLoading, isFetching } = useGetVehiclesQuery({ pageVehicle, value })
  const [dataVehicles, setDataVehicles] = useState([])
  const { checkId } = useSelector(state => state.ShowUpdate)

  const { data: allDataVehicle, isLoading: isAllLoading, isFetching: isAllFetching } = useGetAllVehiclesQuery()
  const [filterSelections, setFilterSelections] = useState({
    selectedEngine: '',
    selectedCondition: '',
    selectedFuel: '',
    selectedKind: '',
    selectedType: '',
    selectedColon: ''
  })
  const [count, setCount] = useState(0)
  const [dataCondition, setDataCondition] = useState('')
  const columnsDefinition = Columns({
    dispatch,
    setSortDirection,
    sortDirection,
    sortField,
    setSortField,
    checkId,
    setDataCondition
  })
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
        setDataCondition('')
      }, 4000)

      return () => clearTimeout(timeoutId)
    }
  }, [dataCondition])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleEngineChange = useCallback(e => {
    setFilterSelections(prevSelections => ({ ...prevSelections, selectedEngine: e.target.value }))
  }, [])

  const handleFuelChange = useCallback(e => {
    setFilterSelections(prevSelections => ({ ...prevSelections, selectedFuel: e.target.value }))
  }, [])

  const handleTypeChange = useCallback(e => {
    setFilterSelections(prevSelections => ({ ...prevSelections, selectedType: e.target.value }))
  }, [])

  const handleKindChange = useCallback(e => {
    setFilterSelections(prevSelections => ({ ...prevSelections, selectedKind: e.target.value }))
  }, [])

  const handleConditionChange = useCallback(e => {
    setFilterSelections(prevSelections => ({ ...prevSelections, selectedCondition: e.target.value }))
  }, [])

  const handleColonChange = useCallback(e => {
    setFilterSelections(prevSelections => ({ ...prevSelections, selectedColon: e.target.value }))
  }, [])

  const [filteredData, setFilteredData] = useState([])

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
          (filterSelections.selectedEngine === '' || engineId === filterSelections.selectedEngine) &&
          (filterSelections.selectedFuel === '' || fuelId === filterSelections.selectedFuel) &&
          (filterSelections.selectedType === '' || typeId === filterSelections.selectedType) &&
          (filterSelections.selectedKind === '' || kindId === filterSelections.selectedKind) &&
          (filterSelections.selectedCondition === '' || conditionId === filterSelections.selectedCondition) &&
          (filterSelections.selectedColon === '' || colonId === filterSelections.selectedColon)
        )
      })

      setFilteredData(filteredData)
    }
  }, [
    dataVehicles,
    value,
    filterSelections.selectedEngine,
    filterSelections.selectedFuel,
    filterSelections.selectedType,
    filterSelections.selectedKind,
    filterSelections.selectedCondition,
    filterSelections.selectedColon
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
                    value={filterSelections.selectedEngine}
                    id='select-engine'
                    label='Select engine'
                    labelId='engine-select'
                    onChange={handleEngineChange}
                    inputProps={{ placeholder: 'Select engine' }}
                  >
                    {filterSelections.selectedEngine !== '' && (
                      <MenuItem value=''>
                        <Icon
                          icon='material-symbols:delete-outline'
                          onClick={() =>
                            setFilterSelections(prevSelections => ({ ...prevSelections, selectedEngine: '' }))
                          }
                        />
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
                    value={filterSelections.selectedFuel}
                    id='select-fuel'
                    label='Select fuel'
                    labelId='fuel-select'
                    onChange={handleFuelChange}
                    inputProps={{ placeholder: 'Select fuel' }}
                  >
                    {filterSelections.selectedFuel !== '' && (
                      <MenuItem value=''>
                        <Icon
                          icon='material-symbols:delete-outline'
                          onClick={() =>
                            setFilterSelections(prevSelections => ({ ...prevSelections, selectedFuel: '' }))
                          }
                        />
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
                    value={filterSelections.selectedType}
                    id='select-type'
                    label='Select type'
                    labelId='type-select'
                    onChange={handleTypeChange}
                    inputProps={{ placeholder: 'Select Type' }}
                  >
                    {filterSelections.selectedType !== '' && (
                      <MenuItem value=''>
                        <Icon
                          icon='material-symbols:delete-outline'
                          onClick={() =>
                            setFilterSelections(prevSelections => ({ ...prevSelections, selectedType: '' }))
                          }
                        />
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
                    value={filterSelections.selectedKind}
                    id='select-kind'
                    label='Select kind'
                    labelId='kind-select'
                    onChange={handleKindChange}
                    inputProps={{ placeholder: 'Select kind' }}
                  >
                    {filterSelections.selectedKind !== '' && (
                      <MenuItem value=''>
                        <Icon
                          icon='material-symbols:delete-outline'
                          onClick={() =>
                            setFilterSelections(prevSelections => ({ ...prevSelections, selectedKind: '' }))
                          }
                        />
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
                    value={filterSelections.selectedCondition}
                    id='select-technical condition'
                    label='Select technical condition'
                    labelId='technical-condition-select'
                    onChange={handleConditionChange}
                    inputProps={{ placeholder: 'Select technical condition' }}
                  >
                    {filterSelections.selectedCondition !== '' && (
                      <MenuItem value=''>
                        <Icon
                          icon='material-symbols:delete-outline'
                          onClick={() =>
                            setFilterSelections(prevSelections => ({ ...prevSelections, selectedCondition: '' }))
                          }
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
                    value={filterSelections.selectedColon}
                    id='select-colon'
                    label='Select colon'
                    labelId='colon-select'
                    onChange={handleColonChange}
                    inputProps={{ placeholder: 'Select colon' }}
                  >
                    {filterSelections.selectedColon !== '' && (
                      <MenuItem value=''>
                        <Icon
                          icon='material-symbols:delete-outline'
                          onClick={() =>
                            setFilterSelections(prevSelections => ({ ...prevSelections, selectedColon: '' }))
                          }
                        />
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
          <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columnsDefinition.map(column => (
                    <TableCell key={column.field} align={column.align} sx={{ minWidth: column.minWidth }}>
                      {column.headerName({ isAllLoading, allDataVehicle, isAllFetching })}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {isFetching || isLoading ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={9} align='center'>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '400px',
                          width: '100%'
                        }}
                      >
                        <CircularProgress />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {sortedData.map(row => (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.id}
                      style={{
                        backgroundColor: checkId.some(id => id == row.id) ? '#F3F3FF' : ''
                      }}
                    >
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
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[15]}
            component='div'
            count={isLoading ? 0 : count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Grid>
      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} setDataCondition={setDataCondition} />
      <UserUpdate toggle={toggleUserUpdate} setDataCondition={setDataCondition} /> 
    </Grid>
  )
}

export default UserList
