// ** React Imports
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'

// ** UI Imports
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
import DatePicker from 'react-datepicker'
import CustomInput from './CustomInput'
import { Alert } from '@mui/material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Icon from 'src/@core/components/icon'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Store Imports
import { useCreateWaybillMutation } from 'src/store/apps/waybills/apiWaybill'
import { useGetAllWaybillsQuery } from 'src/store/apps/waybills/apiWaybill'
import { useGetAllVehiclesQuery } from 'src/store/apps/vehicle/api'

const showErrors = (field, valueLen, min) => {
  const fieldNameWithoutUnderscores = field.replace(/_/g, '')
  if (valueLen === 0) {
    return `${fieldNameWithoutUnderscores} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${fieldNameWithoutUnderscores} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  waybills_no: yup
    .number()
    .typeError('Waybill no is required')
    .min(1, obj => showErrors('Waybill no', obj.value, obj.min))
    .required(),
  waybills_od_start: yup
    .number()
    .typeError('Wabill od start is required')
    .min(1, obj => showErrors('Wabill od start', obj.value, obj.min))
    .required(),
  waybills_od_finish: yup
    .number()
    .typeError('Wabill od finish is required')
    .min(1, obj => showErrors('Wabill od finish', obj.value, obj.min))
    .required(),
  waybills_fuel_start: yup
    .number()
    .typeError('Wabill fuel start is required')
    .min(1, obj => showErrors('Wabill fuel start', obj.value, obj.min))
    .required(),
  waybills_fuel_given: yup
    .number()
    .typeError('Wabill fuel given is required')
    .min(1, obj => showErrors('Wabill fuel given', obj.value, obj.min))
    .required(),
  waybills_fuel_consumed: yup
    .number()
    .typeError('Wabill fuel conwaybills_fuel_consumed is required')
    .min(1, obj => showErrors('Wabill fuel conwaybills_fuel_consumed', obj.value, obj.min))
    .required()
})

const defaultValues = {
  waybills_no: '',
  waybills_od_start: '',
  waybills_od_finish: '',
  waybills_fuel_start: '',
  waybills_fuel_given: '',
  waybills_fuel_consumed: ''
}

const SidebarAddWaybill = props => {
  const { open, toggle, setDataCondition } = props
  const [date, setDate] = useState(new Date())
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const [createWaybill] = useCreateWaybillMutation()
  const [showError, setShowError] = useState(false)
  const { data: dataWaybills } = useGetAllWaybillsQuery()
  const { data, isLoading } = useGetAllVehiclesQuery()
  const [id_vehicle, setId_vehicle] = useState('')

  useEffect(() => {
    if (!isLoading) {
      setId_vehicle(data?.vehicles[0]?.id)
    }
  }, [data])

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const resetForm = () => {
    reset(defaultValues)
    setDate(new Date())
    setId_vehicle(data?.vehicles[0]?.id)
  }

  const formatDate = date => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const newDate = formatDate(date)

  const onSubmit = formData => {
    const combinedData = { ...formData, waybills_date: newDate, id_vehicle }

    if (dataWaybills.waybills.some(waybill => waybill.waybills_no == formData.waybills_no)) {
      setShowError(true)
    } else {
      createWaybill(combinedData)
      toggle()
      resetForm()

      setDataCondition('add')
    }
  }

  const handleClose = () => {
    toggle()
    resetForm()

    setShowError(false)
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item='true' xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Controller
                  name='waybills_no'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='waybill no'
                      onChange={onChange}
                      placeholder='10'
                      error={Boolean(errors.waybills_no)}
                    />
                  )}
                />

                {errors.waybills_no && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.waybills_no.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item='true' xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <DatePickerWrapper>
                  <DatePicker
                    selected={date}
                    id='basic-input'
                    value={date}
                    popperPlacement={popperPlacement}
                    onChange={date => setDate(date)}
                    placeholderText='Click to select a date'
                    customInput={<CustomInput label='Basic' />}
                  />
                </DatePickerWrapper>
              </FormControl>
            </Grid>

            <Grid item='true' xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id='vehicle-select'>Select vehicle</InputLabel>
                <Select
                  fullWidth
                  onChange={e => setId_vehicle(e.target.value)}
                  id='select-vehicle'
                  label='Select vehicle'
                  labelId='vehicle-select'
                  inputProps={{ placeholder: 'Select vehicle' }}
                  value={id_vehicle}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: '200px'
                      }
                    }
                  }}
                >
                  {isLoading
                    ? ' '
                    : data.vehicles.map(number => (
                        <MenuItem key={number.id} value={number.id}>
                          {number.vehicle_plate_number}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item='true' xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Controller
                  name='waybills_od_start'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='waybill od start'
                      onChange={onChange}
                      placeholder='10'
                      error={Boolean(errors.waybills_od_start)}
                    />
                  )}
                />

                {errors.waybills_od_start && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.waybills_od_start.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item='true' xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Controller
                  name='waybills_od_finish'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='waybill od finish'
                      onChange={onChange}
                      placeholder='10'
                      error={Boolean(errors.waybills_od_finish)}
                    />
                  )}
                />

                {errors.waybills_od_finish && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.waybills_od_finish.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item='true' xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Controller
                  name='waybills_fuel_start'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='waybill fuel start'
                      onChange={onChange}
                      placeholder='10'
                      error={Boolean(errors.waybills_fuel_start)}
                    />
                  )}
                />

                {errors.waybills_fuel_start && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.waybills_fuel_start.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item='true' xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Controller
                  name='waybills_fuel_given'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='waybill fuel given'
                      onChange={onChange}
                      placeholder='10'
                      error={Boolean(errors.waybills_fuel_given)}
                    />
                  )}
                />

                {errors.waybills_fuel_given && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.waybills_fuel_given.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item='true' xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Controller
                  name='waybills_fuel_consumed'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='waybill fuel consumed'
                      onChange={onChange}
                      placeholder='10'
                      error={Boolean(errors.waybills_fuel_consumed)}
                    />
                  )}
                />

                {errors.waybills_fuel_consumed && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.waybills_fuel_consumed.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
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
