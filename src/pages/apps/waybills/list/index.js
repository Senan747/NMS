import { useState, useEffect, useCallback, useMemo } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
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

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { closeShowEdit, openShowEdit, setEditId } from 'src/store/apps/waybills/editWaybills'
import { setAddDataLoading, setAddWaybillCondition } from 'src/store/apps/vehicle/index1'
// import { setPage } from 'src/store/apps/vehicle/index1'
import { setPage } from 'src/store/apps/waybills/editWaybills'

// ** Actions Imports
import { fetchWaybills, deleteWaybills } from 'src/store/apps/waybills/CRUD'
import { fetchVehicleKindes } from 'src/store/apps/vehicle/vehicleDetails'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/waybills/list/TableHeader'
import AddWaybills from 'src/views/apps/waybills/list/AddWaybill'
import EditWaybill from 'src/views/apps/waybills/list/EditWaybill'
import columns from 'src/views/apps/waybills/list/Columns'

import { useGetWaybillsQuery } from 'src/store/apps/waybills/apiWaybill'
import { useGetVehiclesQuery } from 'src/store/apps/vehicle/api'

const UserList = () => {
  const [value, setValue] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  const dispatch = useDispatch()
  // const { data } = useSelector(state => state.index)
  // const { dataWaybills } = useSelector(state => state.CRUD)
  const { page } = useSelector(state => state.editWaybills)
  let page1 = page + 1
  const { data, isLoading: isLoading1 } = useGetVehiclesQuery(page1)
  const { data: waybill, isLoading, isFetching } = useGetWaybillsQuery(page1)

  const [dataWaybills1, setdataWaybills1] = useState([])
  const [dataVehicle, setDataVehicle] = useState([])
  const { addDataLoading, waybillCondition } = useSelector(state => state.index1)
  // const [isLoading, setIsLoading] = useState(true)
  const { sortFieldWaybill } = useSelector(state => state.sortWaybills)
  const [sortDirection, setSortDirection] = useState('asc')
  const columnsDefinition = columns({ dispatch, setSortDirection, sortDirection, sortFieldWaybill })
  const { editId } = useSelector(state => state.editWaybills)
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isLoading) {
      setdataWaybills1(waybill.waybills.data)
      setCount(waybill.waybills.total)
    }
    if (!isLoading1) {
      setDataVehicle(data.vehicles.data)
    }
    dispatch(fetchVehicleKindes())
  }, [waybill, data, addDataLoading, isLoading, isLoading1])

  const { vehicleKind } = useSelector(state => state.vehicleDetails)

  const memorizedData = useMemo(() => dataWaybills1, [dataWaybills1])

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
  }, [waybill, memorizedData, value, selectedVehicleId, selectedKind])

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

  const [rowsPerPage, setRowsPerPage] = useState(4)

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage))
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 4))
    dispatch(setPage(0))
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
                    {dataVehicle.map(number => (
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
              <div style={{ display: 'flex', justifyContent: 'center', minWidth: 'full', minHeight: '1300px' }}>
                <CircularProgress />
              </div>
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
                            dataVehicle
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
            count={count}
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
