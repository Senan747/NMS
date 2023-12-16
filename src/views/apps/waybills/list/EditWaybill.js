import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/system/Unstable_Grid/Grid'
import { useTheme } from '@mui/material/styles'
import DatePicker from 'react-datepicker'
import CustomInput from './CustomInput'
import InputAdornment from '@mui/material/InputAdornment'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Icon from 'src/@core/components/icon'
import { Alert } from '@mui/material'


// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { closeShowEdit } from 'src/store/apps/waybills/editWaybills'
import { useGetAllWaybillsQuery, useUpdateWaybillMutation } from 'src/store/apps/waybills/apiWaybill'
import { useGetWaybillsIdQuery } from 'src/store/apps/waybills/apiWaybill'
import { useGetAllVehiclesQuery } from 'src/store/apps/vehicle/api'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const SidebarAddUser = props => {
  const { toggle, setDataCondition } = props
  const dispatch = useDispatch()
  const [date, setDate] = useState(new Date())
  const { editId } = useSelector(state => state.editWaybills)
  const [showError, setShowError] = useState(false)
  const { data } = useGetAllVehiclesQuery()
  const { data: dataWaybills } = useGetAllWaybillsQuery()

  const { data: idData, isLoading, isFetching } = useGetWaybillsIdQuery(editId)
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const [check, setCheck] = useState(false)
  const { ShowEdit } = useSelector(state => state.editWaybills)
  const [updateWaybill] = useUpdateWaybillMutation()

  const [formData, setFormData] = useState({
    waybills_no: null,
    id_vehicle: null,
    waybills_od_start: null,
    waybills_od_finish: null,
    waybills_fuel_start: null,
    waybills_fuel_given: null,
    waybills_fuel_consumed: null
  })

  useEffect(() => {
    if (idData) {
      setFormData({
        ...formData,
        waybills_no: idData.waybills_no || '',
        id_vehicle: idData.id_vehicle || '',
        waybills_od_start: idData.waybills_od_start || '',
        waybills_od_finish: idData.waybills_od_finish || '',
        waybills_fuel_start: idData.waybills_fuel_start || '',
        waybills_fuel_given: idData.waybills_fuel_given || '',
        waybills_fuel_consumed: idData.waybills_fuel_consumed || ''
      })
    }
  }, [idData])

  const resetForm = () => {
    setFormData({
      ...formData,
      waybills_no: idData.waybills_no,
      id_vehicle: idData.id_vehicle,
      waybills_od_start: idData.waybills_od_start,
      waybills_od_finish: idData.waybills_od_finish,
      waybills_fuel_start: idData.waybills_fuel_start,
      waybills_fuel_given: idData.waybills_fuel_given,
      waybills_fuel_consumed: idData.waybills_fuel_consumed
    })
  }

  const formatDate = date => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Add 1 to month since it's zero-based
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const newDate = formatDate(date)

  const onSubmit = formData => {
    const combinedData = { id: editId, ...formData, waybills_date: newDate }

    if (formData.waybills_no == idData.waybills_no) {
      updateWaybill({ editId, waybillData: combinedData })
      toggle()
      setDataCondition('update')
      setDate(new Date())
      setShowError(false)
    } else {
      if (dataWaybills.waybills.some(waybill => waybill.waybills_no == formData.waybills_no)) {
        setShowError(true)
      } else {
        updateWaybill({ editId, waybillData: combinedData })
        toggle()
        setDataCondition('update')
        setDate(new Date())
        setShowError(false)
      }
    }
  }

  const handleClose = () => {
    toggle()
    resetForm()
    dispatch(closeShowEdit())
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
      open={ShowEdit}
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
        <Typography variant='h6'>Update waybill</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      {showError ? <Alert severity='error'>New waybill no already exists!</Alert> : ' '}
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : (
        <Box sx={{ p: 3 }}>
          <form onSubmit={handleSubmit} key={editId}>
            <Grid container spacing={2}>
              <Grid item='true' xs={6}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <TextField
                    value={formData.waybills_no || ''}
                    label='waybill no'
                    required
                    onChange={e => setFormData({ ...formData, waybills_no: e.target.value })}
                    placeholder='10'
                    InputLabelProps={{ shrink: true }}
                  />
                  {!formData.waybills_no && check && (
                    <FormHelperText sx={{ color: 'error.main' }}>waybills no is required</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item='true' xs={6}>
                {' '}
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <DatePickerWrapper>
                    <DatePicker
                      selected={date}
                      required
                      id='basic-input'
                      value={date}
                      popperPlacement={popperPlacement}
                      onChange={date => setDate(date)}
                      placeholderText='Click to select a date'
                      customInput={<CustomInput label='Basic' />}
                      InputLabelProps={{ shrink: true }}
                    />
                  </DatePickerWrapper>
                </FormControl>
              </Grid>

              <Grid item='true' xs={6}>
                {' '}
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Select
                    fullWidth
                    value={formData.id_vehicle || ''}
                    onChange={e => setFormData({ ...formData, id_vehicle: e.target.value })}
                    inputProps={{ 'aria-label': 'Without label' }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: '200px'
                        }
                      }
                    }}
                  >
                    {data?.vehicles.map(number => (
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

              <Grid item='true' xs={6}>
                {' '}
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <TextField
                    value={formData.waybills_od_start || ''}
                    InputLabelProps={{ shrink: true }}
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
              <Grid item='true' xs={6}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <TextField
                    value={formData.waybills_od_finish || ''}
                    label='waybill od finish'
                    required
                    onChange={e => setFormData({ ...formData, waybills_od_finish: e.target.value })}
                    placeholder='10'
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>Km</InputAdornment>
                    }}
                  />

                  {!formData.waybills_od_finish && check && (
                    <FormHelperText sx={{ color: 'error.main' }}>waybills od finish field is required</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item='true' xs={6}>
                {' '}
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <TextField
                    required
                    value={formData.waybills_fuel_start || ''}
                    label='waybill fuel start'
                    onChange={e => setFormData({ ...formData, waybills_fuel_start: e.target.value })}
                    placeholder='10'
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>L</InputAdornment>
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item='true' xs={6}>
                {' '}
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <TextField
                    required
                    value={formData.waybills_fuel_given || ''}
                    label='waybill fuel given'
                    onChange={e => setFormData({ ...formData, waybills_fuel_given: e.target.value })}
                    placeholder='10'
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>L</InputAdornment>
                    }}
                  />
                  {!formData.waybills_fuel_given && check && (
                    <FormHelperText sx={{ color: 'error.main' }}>waybills fuel given field is required</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item='true' xs={6}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <TextField
                    required
                    value={formData.waybills_fuel_consumed || ''}
                    label='waybill fuel consumed'
                    onChange={e => setFormData({ ...formData, waybills_fuel_consumed: e.target.value })}
                    placeholder='10'
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>L</InputAdornment>
                    }}
                  />
                  {!formData.waybills_fuel_consumed && check && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      waybills fuel consumed field is required
                    </FormHelperText>
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
      )}
    </Drawer>
  )
}

export default SidebarAddUser
