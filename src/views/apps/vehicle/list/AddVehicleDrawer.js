import { useEffect, useState } from 'react'

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
import Alert from '@mui/material/Alert'
import InputAdornment from '@mui/material/InputAdornment'
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import Cleave from 'cleave.js/react'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { useGetAllVehiclesQuery } from 'src/store/apps/vehicle/api'
import { useCreateVehicleMutation } from 'src/store/apps/vehicle/api'
import {
  fetchVehicleEngine,
  fetchVehicleFuel,
  fetchTechnicalConditions,
  fetchVehicleKindes,
  fetchVehicleTypes,
  fetchStacks
} from 'src/store/apps/vehicle/vehicleDetails'

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

const SidebarAddVehicle = props => {
  const { open, toggle, setDataCondition } = props
  const { data } = useGetAllVehiclesQuery()
  const [showError, setShowError] = useState(false)
  const { engineTypes, vehicleFuel, vehicleType, vehicleKind, technicalConditions, stacks } = useSelector(
    state => state.vehicleDetails
  ) 
  const dispatch = useDispatch()
  const [createVehicle] = useCreateVehicleMutation()
  const [initialState, setInitialState] = useState({
    id_vehicle_engine: '',
    id_vehicle_fuel: '',
    id_vehicle_type: '',
    id_vehicle_subject: '',
    id_vehicle_condition: '',
    id_vehicle_colon: ''
  })

  useEffect(() => {
    setInitialState({
      id_vehicle_engine: engineTypes.length > 0 ? engineTypes[0]?.id : '',
      id_vehicle_fuel: vehicleFuel.length > 0 ? vehicleFuel[0]?.id : '',
      id_vehicle_type: vehicleType.length > 0 ? vehicleType[0]?.id : '',
      id_vehicle_subject: vehicleKind.length > 0 ? vehicleKind[0]?.id : '',
      id_vehicle_condition: technicalConditions.length > 0 ? technicalConditions[0]?.id : '',
      id_vehicle_colon: stacks.length > 0 ? stacks[0]?.id : ''
    })
  }, [engineTypes, vehicleFuel, vehicleType, vehicleKind, technicalConditions, stacks])

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

    setInitialState({
      id_vehicle_engine: engineTypes[0]?.id,
      id_vehicle_fuel: vehicleFuel[0]?.id,
      id_vehicle_type: vehicleType[0]?.id,
      id_vehicle_subject: vehicleKind[0]?.id,
      id_vehicle_condition: technicalConditions[0]?.id,
      id_vehicle_colon: stacks[0]?.id
    })
  }

  const onSubmit = formData => {
    const combinedData = { ...formData, ...initialState }

    if (data.vehicles.some(vehicle => vehicle.vehicle_plate_number === formData.vehicle_plate_number)) {
      setShowError(true)
    } else {
      createVehicle(combinedData)
      toggle()
      reset()
      resetForm()
      setShowError(false)
      setDataCondition('add')
    }
  }

  const handleClose = () => {
    toggle()
    reset()
    resetForm()
    setShowError(false)
  }
 

  useEffect(() => {
    dispatch(fetchVehicleEngine())
    dispatch(fetchVehicleFuel())
    dispatch(fetchVehicleKindes())
    dispatch(fetchVehicleTypes())
    dispatch(fetchStacks())
    dispatch(fetchTechnicalConditions())
  }, [dispatch])

  const [isPlateNumberFocused, setIsPlateNumberFocused] = useState(false)
  
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
        <Typography variant='h6'>Add vehicle</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      {showError ? <Alert severity='error'>Plate number already exists!</Alert> : ' '}
      <Box sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
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
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_comsumption_km.message}</FormHelperText>
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
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_comsumption_mc.message}</FormHelperText>
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
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_comsumption_day.message}</FormHelperText>
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
    </Drawer>
  )
}

export default SidebarAddVehicle
