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

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { closeShowEdit } from 'src/store/apps/waybills/editWaybills'
import { setAddWaybillCondition } from 'src/store/apps/vehicle/conditions'
import { fetchVehicleKindes } from 'src/store/apps/vehicle/vehicleDetails'
import { useGetAllWaybillsQuery, useGetWaybillsQuery } from 'src/store/apps/waybills/apiWaybill'
import { useGetAllVehiclesQuery } from 'src/store/apps/vehicle/api'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/waybills/list/TableHeader'
import AddWaybills from 'src/views/apps/waybills/list/AddWaybill'
import EditWaybill from 'src/views/apps/waybills/list/EditWaybill'
import columns from 'src/views/apps/waybills/list/Columns'

const UserList = () => {
  const [value, setValue] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const { data, isLoading: loading } = useGetAllVehiclesQuery()
  const { data: allDataWaybill, isLoading: allDataLoading } = useGetAllWaybillsQuery()
  let pageWaybill = page + 1
  const { data: waybill, isLoading, isFetching } = useGetWaybillsQuery({ pageWaybill, value })
  const [dataWaybills, setdataWaybills] = useState([])
  const { waybillCondition } = useSelector(state => state.conditions)
  const { sortFieldWaybill } = useSelector(state => state.sortWaybills)
  const [sortDirection, setSortDirection] = useState('asc')
  const { checkWaybillId } = useSelector(state => state.editWaybills)
  const columnsDefinition = columns({ dispatch, setSortDirection, sortDirection, sortFieldWaybill, checkWaybillId })
  const { editId } = useSelector(state => state.editWaybills)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isLoading) {
      setdataWaybills(waybill.waybills.data)
      setCount(waybill.waybills.total)
    }
    dispatch(fetchVehicleKindes())
  }, [waybill, page, value, waybillCondition])

  const { vehicleKind } = useSelector(state => state.vehicleDetails)

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
    if (waybill !== null) {
      const filteredData = dataWaybills.filter(waybill => {
        const vehicleId = waybill.id_vehicle || ''
        const kindId = waybill.id_vehicle_subject || ''

        return (
          (selectedVehicleId === '' || vehicleId === selectedVehicleId) &&
          (selectedKind === '' || kindId === selectedKind)
        )
      })

      setFilteredData(filteredData)
    }
  }, [waybill, dataWaybills, value, selectedVehicleId, selectedKind])

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 15))
    setPage(0)
  }

  useEffect(() => {
    if (waybillCondition) {
      const timeoutId = setTimeout(() => {
        dispatch(setAddWaybillCondition(''))
      }, 4000)

      return () => clearTimeout(timeoutId)
    }
  }, [waybillCondition])

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
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: '200px'
                        }
                      }
                    }}
                  >
                    {selectedVehicleId !== '' && (
                      <MenuItem value=''>
                        <Icon icon='material-symbols:delete-outline' onClick={() => setSelectedVehicleId('')} />
                      </MenuItem>
                    )}
                    {loading
                      ? ' '
                      : data.vehicles.map(number => (
                          <MenuItem key={number.id} value={number.id}>
                            {number.vehicle_plate_number}
                          </MenuItem>
                        ))}
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
                    {selectedKind !== '' && (
                      <MenuItem value=''>
                        <Icon icon='material-symbols:delete-outline' onClick={() => setSelectedKind('')} />
                      </MenuItem>
                    )}
                    {vehicleKind.map(number => (
                      <MenuItem key={number.id} value={number.id}>
                        {number.vehicle_kindes_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <Divider />
          {waybillCondition == 'add' ? <Alert severity='success'>Data has added successfully</Alert> : ' '}
          {waybillCondition == 'update' ? <Alert severity='success'>Data has updated successfully</Alert> : ' '}
          {waybillCondition == 'delete' ? <Alert severity='warning'>Data deleted</Alert> : ' '}

          <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columnsDefinition.map(column => (
                    <TableCell key={column.field} align={column.align} sx={{ minWidth: column.minWidth }}>
                      {column.headerName({ allDataLoading, allDataWaybill })}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {isLoading || isFetching ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={7} align='center'>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
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
                        backgroundColor: checkWaybillId.some(id => id == row.id) ? '#F3F3FF' : ''
                      }}
                    >
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

      <AddWaybills open={addUserOpen} toggle={toggleAddUserDrawer} />
      {editId ? <EditWaybill toggle={toggleUserEdit} /> : ' '}
    </Grid>
  )
}

export default UserList
