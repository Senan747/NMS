import { useEffect, useState } from 'react'

// ** UI Imports
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
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Store Imports
import { useSelector } from 'react-redux'
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

const SidebarAddUser = props => {
  const { toggle, setDataCondition } = props
  const [date, setDate] = useState(new Date())
  const { editId } = useSelector(state => state.editWaybills)
  const [showError, setShowError] = useState(false)
  const { data } = useGetAllVehiclesQuery()
  const { data: dataWaybills } = useGetAllWaybillsQuery()

  const { data: idData, isLoading, isFetching } = useGetWaybillsIdQuery(editId)
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const { ShowEdit } = useSelector(state => state.editWaybills)
  const [updateWaybill] = useUpdateWaybillMutation()
  const [id_vehicle, setId_vehicle] = useState(idData?.id_vehicle || '')

  const defaultValues = {
    waybills_no: idData?.waybills_no || '',
    waybills_od_start: idData?.waybills_od_start || '',
    waybills_od_finish: idData?.waybills_od_finish || '',
    waybills_fuel_start: idData?.waybills_fuel_start || '',
    waybills_fuel_given: idData?.waybills_fuel_given || '',
    waybills_fuel_consumed: idData?.waybills_fuel_consumed || ''
  }

  console.log(idData)
  console.log(defaultValues)
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
    setId_vehicle(idData.id_vehicle)
    setDate(new Date())
  }

  const formatDate = date => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Add 1 to month since it's zero-based
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const newDate = formatDate(date)

  const onSubmit = formData => {
    const combinedData = { id: editId, ...formData, waybills_date: newDate, id_vehicle }

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
          <form onSubmit={handleSubmit(onSubmit)} key={editId}>
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
                    value={id_vehicle}
                    onChange={e => setId_vehicle(e.target.value)}
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
                </FormControl>
              </Grid>

              <Grid item='true' xs={6}>
                {' '}
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
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>Km</InputAdornment>
                        }}
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
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>Km</InputAdornment>
                        }}
                      />
                    )}
                  />

                  {errors.waybills_od_finish && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.waybills_od_finish.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item='true' xs={6}>
                {' '}
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
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>L</InputAdornment>
                        }}
                      />
                    )}
                  />
                  {errors.waybills_fuel_start && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.waybills_fuel_start.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item='true' xs={6}>
                {' '}
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
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>L</InputAdornment>
                        }}
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
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>L</InputAdornment>
                        }}
                      />
                    )}
                  />

                  {errors.waybills_fuel_consumed && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.waybills_fuel_consumed.message}
                    </FormHelperText>
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
      )}
    </Drawer>
  )
}

export default SidebarAddUser
