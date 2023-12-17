import { useEffect, useState, useReducer } from 'react'

// UI Imports
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
import FormControl, { formControlClasses } from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/system/Unstable_Grid/Grid'
import Icon from 'src/@core/components/icon'
import InputAdornment from '@mui/material/InputAdornment'
import { Alert } from '@mui/material'
import Cleave from 'cleave.js/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { closeShowUpdate } from 'src/store/apps/vehicle/ShowUpdate'
import { useGetAllVehiclesQuery, useUpdateVehicleMutation } from 'src/store/apps/vehicle/api'
import { useGetVehiclesIdQuery } from 'src/store/apps/vehicle/api'

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
  vehicle_plate_number: yup.string().required('Vehicle plate number is required'),
  vehicle_brand: yup.string().required('Vehicle year is required'),
  vehicle_year: yup
    .number()
    .typeError('Vehicle year is required')
    .min(1, obj => showErrors('Year', obj.value, obj.min))
    .required(),
  vehicle_weight: yup
    .number()
    .typeError('Vehicle weight is required')
    .min(1, obj => showErrors('weight', obj.value, obj.min))
    .required(),
  vehicle_power: yup
    .number()
    .typeError('Vehicle power field is required')
    .min(1, obj => showErrors('power', obj.value, obj.min))
    .required(),
  vehicle_comsumption_mc: yup
    .number()
    .typeError('Comsumption mc field is required')
    .min(1, obj => showErrors('comsumption mc', obj.value, obj.min))
    .required(),
  vehicle_comsumption_day: yup
    .number()
    .typeError('Comsumption day field is required')
    .min(1, obj => showErrors('comsumption day', obj.value, obj.min))
    .required(),
  vehicle_comsumption_km: yup
    .number()
    .typeError('Comsumption km field is required')
    .min(1, obj => showErrors('comsumption km', obj.value, obj.min))
    .required(),
  vehicle_milage: yup
    .number()
    .typeError('Mileage field is required')
    .min(1, obj => showErrors('Mileage', obj.value, obj.min))
    .required(),
  vehicle_status: yup
    .number()
    .typeError('Status field is required')
    .min(1, obj => showErrors('Status', obj.value, obj.min))
    .required()
})

const SidebarAddUser = props => {
  const { toggle, setDataCondition } = props
  const dispatch = useDispatch()
  const { updateId } = useSelector(state => state.ShowUpdate)
  const { ShowUpdate } = useSelector(state => state.ShowUpdate)

  const { engineTypes, vehicleFuel, vehicleType, vehicleKind, technicalConditions, stacks } = useSelector(
    state => state.vehicleDetails
  )
  const [showError, setShowError] = useState(false)
  const { data: dataVehicle } = useGetAllVehiclesQuery()
  const { data, isLoading, isFetching } = useGetVehiclesIdQuery(updateId)
  const [updateVehicle] = useUpdateVehicleMutation()
  const [isPlateNumberFocused, setIsPlateNumberFocused] = useState(false)

  const defaultValues = {
    vehicle_plate_number: '',
    vehicle_brand: '',
    vehicle_year: '',
    vehicle_weight: '',
    vehicle_power: '',
    vehicle_comsumption_km: '',
    vehicle_comsumption_mc: '',
    vehicle_comsumption_day: '',
    vehicle_milage: '',
    vehicle_status: ''
  }

  const [initialState, setInitialState] = useState({
    id_vehicle_engine: '',
    id_vehicle_fuel: '',
    id_vehicle_type: '',
    id_vehicle_subject: '',
    id_vehicle_condition: '',
    id_vehicle_colon: ''
  })

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    setValue('vehicle_plate_number', data?.vehicle_plate_number || '')
    setValue('vehicle_brand', data?.vehicle_brand || '')
    setValue('vehicle_year', data?.vehicle_year || '')
    setValue('vehicle_weight', data?.vehicle_weight || '')
    setValue('vehicle_power', data?.vehicle_power || '')
    setValue('vehicle_comsumption_km', data?.vehicle_comsumption_km || '')
    setValue('vehicle_comsumption_mc', data?.vehicle_comsumption_mc || '')
    setValue('vehicle_comsumption_day', data?.vehicle_comsumption_day || '')
    setValue('vehicle_milage', data?.vehicle_milage || '')
    setValue('vehicle_status', data?.vehicle_status || '')
    setInitialState({
      ...initialState,
      id_vehicle_engine: data?.id_vehicle_engine || '',
      id_vehicle_fuel: data?.id_vehicle_fuel || '',
      id_vehicle_type: data?.id_vehicle_type || '',
      id_vehicle_subject: data?.id_vehicle_subject || '',
      id_vehicle_condition: data?.id_vehicle_condition || '',
      id_vehicle_colon: data?.id_vehicle_colon || ''
    })
  }, [data])

  const resetForm = () => {
    reset(defaultValues)
    setInitialState({
      id_vehicle_engine: '',
      id_vehicle_fuel: '',
      id_vehicle_type: '',
      id_vehicle_subject: '',
      id_vehicle_condition: '',
      id_vehicle_colon: ''
    })
  }

  const onSubmit = formData => {
    const combinedData = { ...formData, ...initialState }
    if (formData.vehicle_plate_number == data.vehicle_plate_number) {
      updateVehicle({ updateId, vehicleData: combinedData })
      toggle()
      reset()
      resetForm()
      setDataCondition('update')
      setShowError(false)
    } else {
      if (dataVehicle.vehicles.some(vehicle => vehicle.vehicle_plate_number == formData.vehicle_plate_number)) {
        setShowError(true)
      } else {
        updateVehicle({ updateId, vehicleData: combinedData })
        toggle()
        reset()
        resetForm()
        setDataCondition('update')
        setShowError(false)
      }
    }
  }

  const handleClose = () => {
    toggle()
    dispatch(closeShowUpdate())
    resetForm()
    reset()
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
      open={ShowUpdate}
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
        <Typography variant='h6'>Update vehicle</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      {showError ? <Alert severity='error'>New Plate number already exists!</Alert> : ' '}
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : (
        <Box sx={{ p: 5 }}>
          <form onSubmit={handleSubmit(onSubmit)} key={updateId}>
            <Grid container spacing={2}>
              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='vehicle_plate_number'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Cleave
                        value={value.toUpperCase()}
                        {...(errors.vehicle_plate_number && { error: 'true' })}
                        options={{ blocks: [2, 2, 3], delimiter: ' ', uppercase: true }}
                        onChange={onChange}
                        onFocus={() => setIsPlateNumberFocused(true)}
                        onBlur={() => setIsPlateNumberFocused(false)}
                        label='Vehicle plate number'
                        placeholder={
                          isPlateNumberFocused
                            ? errors.vehicle_plate_number
                              ? '10 AA 999'
                              : 'Plate number'
                            : 'Plate number'
                        }
                        className={`w-full p-[15px] rounded-[8px] border-bc text-base box-border transition duration-150 ease-in-out outline-none border-1 focus:shadow-outline-blue focus:border-blue-700  ${
                          errors.vehicle_plate_number ? 'border-red-500 placeholder:text-red-500' : ''
                        }`}
                      />
                    )}
                  />

                  {errors.vehicle_plate_number && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_plate_number.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='vehicle_brand'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Vehicle brand'
                        onChange={onChange}
                        placeholder='Mercedez'
                        error={Boolean(errors.vehicle_brand)}
                      />
                    )}
                  />
                  {errors.vehicle_brand && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_brand.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='vehicle_year'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Vehicle year'
                        onChange={onChange}
                        placeholder='2010'
                        error={Boolean(errors.vehicle_year)}
                      />
                    )}
                  />
                  {errors.vehicle_year && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_year.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel id='role-select'>Select engine</InputLabel>
                  <Select
                    fullWidth
                    value={initialState.id_vehicle_engine}
                    id='select-engine'
                    label='Select Engine'
                    labelId='engine-select'
                    onChange={e => setInitialState({ ...initialState, id_vehicle_engine: e.target.value })}
                    inputProps={{ placeholder: 'Select Engine' }}
                  >
                    {engineTypes.map(engine => (
                      <MenuItem key={engine.id} value={engine.id}>
                        {engine.engine_types_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel id='fuel-select'>Select Fuel</InputLabel>
                  <Select
                    fullWidth
                    value={initialState.id_vehicle_fuel}
                    id='select-fuel'
                    label='Select Fuel'
                    labelId='fuel-select'
                    onChange={e => setInitialState({ ...initialState, id_vehicle_fuel: e.target.value })}
                    inputProps={{ placeholder: 'Select Fuel' }}
                  >
                    {vehicleFuel.map(fuel => (
                      <MenuItem key={fuel.id} value={fuel.id}>
                        {fuel.fuel_kindes_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel id='type-select'>Select Type</InputLabel>
                  <Select
                    fullWidth
                    value={initialState.id_vehicle_type}
                    id='select-type'
                    label='Select Type'
                    labelId='type-select'
                    onChange={e => setInitialState({ ...initialState, id_vehicle_type: e.target.value })}
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

              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel id='kind-select'>Select Kind</InputLabel>
                  <Select
                    fullWidth
                    value={initialState.id_vehicle_subject}
                    id='select-kind'
                    label='Select Kind'
                    labelId='kind-select'
                    onChange={e => setInitialState({ ...initialState, id_vehicle_subject: e.target.value })}
                    inputProps={{ placeholder: 'Select Kind' }}
                  >
                    {vehicleKind.map(kind => (
                      <MenuItem key={kind.id} value={kind.id}>
                        {kind.vehicle_kindes_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel id='technical-conditions-select'>Select Technical Conditions</InputLabel>
                  <Select
                    fullWidth
                    value={initialState.id_vehicle_condition}
                    id='select-technical-conditions'
                    label='Select Technical Conditions'
                    labelId='technical-conditions-select'
                    onChange={e => setInitialState({ ...initialState, id_vehicle_condition: e.target.value })}
                    inputProps={{ placeholder: 'Select Technical Conditions' }}
                  >
                    {technicalConditions.map(condition => (
                      <MenuItem key={condition.id} value={condition.id}>
                        {condition.technical_conditions_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel id='stacks-select'>Select Stacks</InputLabel>
                  <Select
                    fullWidth
                    value={initialState.id_vehicle_colon}
                    id='select-stacks'
                    label='Select Stacks'
                    labelId='stacks-select'
                    onChange={e => setInitialState({ ...initialState, id_vehicle_colon: e.target.value })}
                    inputProps={{ placeholder: 'Select Stacks' }}
                  >
                    {stacks.map(stack => (
                      <MenuItem key={stack.id} value={stack.id}>
                        {stack.stacks_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='vehicle_weight'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='weight'
                        onChange={onChange}
                        placeholder='500'
                        error={Boolean(errors.vehicle_weight)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>Ton</InputAdornment>
                        }}
                      />
                    )}
                  />
                  {errors.vehicle_weight && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_weight.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='vehicle_power'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='power'
                        onChange={onChange}
                        placeholder='200'
                        error={Boolean(errors.vehicle_power)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>Mph</InputAdornment>
                        }}
                      />
                    )}
                  />
                  {errors.vehicle_power && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_power.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='vehicle_comsumption_km'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='comsumption km'
                        onChange={onChange}
                        placeholder='200'
                        error={Boolean(errors.vehicle_comsumption_km)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>Km</InputAdornment>
                        }}
                      />
                    )}
                  />
                  {errors.vehicle_comsumption_km && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.vehicle_comsumption_km.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='vehicle_comsumption_mc'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='comsumption mc'
                        onChange={onChange}
                        placeholder='200'
                        error={Boolean(errors.vehicle_comsumption_mc)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>Km</InputAdornment>
                        }}
                      />
                    )}
                  />
                  {errors.vehicle_comsumption_mc && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.vehicle_comsumption_mc.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='vehicle_comsumption_day'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='comsumption day'
                        onChange={onChange}
                        placeholder='5'
                        error={Boolean(errors.vehicle_comsumption_day)}
                      />
                    )}
                  />
                  {errors.vehicle_comsumption_day && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.vehicle_comsumption_day.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='vehicle_milage'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='mileage'
                        onChange={onChange}
                        placeholder='5'
                        error={Boolean(errors.vehicle_milage)}
                      />
                    )}
                  />
                  {errors.vehicle_milage && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_milage.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item='true' xs={4}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='vehicle_status'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='status'
                        onChange={onChange}
                        placeholder='1'
                        error={Boolean(errors.vehicle_status)}
                      />
                    )}
                  />
                  {errors.vehicle_status && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_status.message}</FormHelperText>
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
