// ** React Imports
import { useEffect, useState, useReducer } from 'react'
import { useTheme } from '@mui/material/styles'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/system/Unstable_Grid/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import DatePicker from 'react-datepicker'
import CustomInput from './CustomInput'
import { Alert } from '@mui/material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { setAddWaybillCondition } from 'src/store/apps/vehicle/conditions'
import { useCreateWaybillMutation } from 'src/store/apps/waybills/apiWaybill'
import { useGetAllWaybillsQuery } from 'src/store/apps/waybills/apiWaybill'
import { useGetAllVehiclesQuery } from 'src/store/apps/vehicle/api'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const SidebarAddWaybill = props => {
  const { open, toggle } = props
  const [check, setCheck] = useState(false)
  const [date, setDate] = useState(new Date())

  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const [createWaybill] = useCreateWaybillMutation()
  const [showError, setShowError] = useState(false)
  const [filteredItems, setFilteredItems] = useState([])
  const { data: dataWaybills } = useGetAllWaybillsQuery()
  const { data, isLoading } = useGetAllVehiclesQuery()

  const [formData, setFormData] = useState({
    waybills_no: '',
    id_vehicle: '',
    waybills_od_start: '',
    waybills_od_finish: '',
    waybills_fuel_start: '',
    waybills_fuel_given: '',
    waybills_fuel_consumed: ''
  })

  const resetForm = () => {
    setFormData({
      ...formData,
      waybills_no: '',
      id_vehicle: '',
      waybills_od_start: '',
      waybills_od_finish: '',
      waybills_fuel_start: '',
      waybills_fuel_given: '',
      waybills_fuel_consumed: ''
    })
  }

  const dispatch = useDispatch()

  const formatDate = date => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const newDate = formatDate(date)

  const filterItems = input => {
    const filtered = data.vehicles.filter(item => item.vehicle_plate_number.toLowerCase().includes(input.toLowerCase()))
    setFilteredItems(filtered)
  }

  const onSubmit = formData => {
    const combinedData = { ...formData, waybills_date: newDate }

    if (dataWaybills.waybills.some(waybill => waybill.waybills_no == formData.waybills_no)) {
      setShowError(true)
    } else {
      createWaybill(combinedData)
      toggle()
      resetForm()
      setDate(new Date())
      dispatch(setAddWaybillCondition('add'))
      setCheck(false)
    }
  }

  const handleClose = () => {
    toggle()
    resetForm()
    setCheck(false)
    setShowError(false)
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(formData)
  }

  useEffect(() => {
    if (showError == true) {
      const timeout = setTimeout(() => {
        setShowError(false)
      }, 4000)
      return () => clearTimeout(timeout)
    }
  }, [showError])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: 200, sm: 800 },
          maxHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Header>
        <Typography variant='h6'>Add waybill</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      {showError ? <Alert severity='error'>Waybill already exists!</Alert> : ' '}
      <Box sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  value={formData.waybills_no}
                  label='waybill no'
                  required
                  onChange={e => setFormData({ ...formData, waybills_no: e.target.value })}
                  placeholder='10'
                />

                {!formData.waybills_no && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>waybills no field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <DatePickerWrapper>
                  <DatePicker
                    selected={date}
                    id='basic-input'
                    required
                    value={date}
                    popperPlacement={popperPlacement}
                    onChange={date => setDate(date)}
                    placeholderText='Click to select a date'
                    customInput={<CustomInput label='Basic' />}
                  />
                </DatePickerWrapper>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id='vehicle-select'>Select vehicle</InputLabel>
                <Select
                  fullWidth
                  onChange={e => setFormData({ ...formData, id_vehicle: e.target.value })}
                  id='select-vehicle'
                  label='Select vehicle'
                  labelId='vehicle-select'
                  inputProps={{ placeholder: 'Select vehicle' }}
                  value={formData.id_vehicle}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: '200px'
                      }
                    }
                  }}
                >
                  {isLoading ? " " : data.vehicles.map(number => (
                    <MenuItem key={number.id} value={number.id}>
                      {number.vehicle_plate_number}
                    </MenuItem>
                  ))}
                </Select>
                {!formData.id_vehicle && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>waybills vehicle field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  value={formData.waybills_od_start}
                  label='waybill od start'
                  required
                  onChange={e => setFormData({ ...formData, waybills_od_start: e.target.value })}
                  placeholder='10'
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>Km</InputAdornment>
                  }}
                />
                {!formData.waybills_od_start && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>waybills od start field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  value={formData.waybills_od_finish}
                  label='waybill od finish'
                  required
                  onChange={e => setFormData({ ...formData, waybills_od_finish: e.target.value })}
                  placeholder='10'
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>Km</InputAdornment>
                  }}
                />

                {!formData.waybills_od_finish && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>waybills od finish field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  value={formData.waybills_fuel_start}
                  label='waybill fuel start'
                  required
                  onChange={e => setFormData({ ...formData, waybills_fuel_start: e.target.value })}
                  placeholder='10'
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>L</InputAdornment>
                  }}
                />
                {!formData.waybills_fuel_start && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>waybills fuel start field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  value={formData.waybills_fuel_given}
                  label='waybill fuel given'
                  required
                  onChange={e => setFormData({ ...formData, waybills_fuel_given: e.target.value })}
                  placeholder='10'
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>L</InputAdornment>
                  }}
                />
                {!formData.waybills_fuel_given && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>waybills fuel given field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  value={formData.waybills_fuel_consumed}
                  label='waybill fuel consumed'
                  required
                  onChange={e => setFormData({ ...formData, waybills_fuel_consumed: e.target.value })}
                  placeholder='10'
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>L</InputAdornment>
                  }}
                />
                {!formData.waybills_fuel_consumed && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>waybills fuel consumed field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} onClick={() => setCheck(true)}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddWaybill
