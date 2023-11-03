import { useEffect, useState, useReducer } from 'react'

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

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { postData, fetchData } from 'src/store/apps/vehicle'
import { setAddDataLoading, setAddDataCondition } from 'src/store/apps/vehicle/index1'
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
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
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
  vehicle_plate_number: yup.string().required(),
  vehicle_brand: yup.string().required().typeError('Vehicle brand is required'),
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
    .typeError('vehicle power field is required')
    .min(1, obj => showErrors('power', obj.value, obj.min))
    .required(),
  vehicle_comsumption_mc: yup
    .number()
    .typeError('comsumption mc field is required')
    .min(1, obj => showErrors('comsumption mc', obj.value, obj.min))
    .required(),
  vehicle_comsumption_day: yup
    .number()
    .typeError('comsumption day field is required')
    .min(1, obj => showErrors('comsumption day', obj.value, obj.min))
    .required(),
  vehicle_comsumption_km: yup
    .number()
    .typeError('comsumption km field is required')
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

const initialState = {
  id_vehicle_engine: '',
  id_vehicle_fuel: '',
  id_vehicle_type: '',
  id_vehicle_subject: '',
  id_vehicle_condition: '',
  id_vehicle_colon: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_ENGINE':
      return { ...state, id_vehicle_engine: action.payload }
    case 'UPDATE_SELECTED_FUEL':
      return { ...state, id_vehicle_fuel: action.payload }
    case 'UPDATE_SELECTED_TYPE':
      return { ...state, id_vehicle_type: action.payload }
    case 'UPDATE_SELECTED_KIND':
      return { ...state, id_vehicle_subject: action.payload }
    case 'UPDATE_SELECTED_TECHNICAL_CONDITIONS':
      return { ...state, id_vehicle_condition: action.payload }
    case 'UPDATE_SELECTED_STACKS':
      return { ...state, id_vehicle_colon: action.payload }
    default:
      return state
  }
}

const SidebarAddUser = props => {
  const { open, toggle } = props
  const [state, dispatchSelect] = useReducer(reducer, initialState)

  const [createVehicle] = useCreateVehicleMutation()

  const data = useSelector(state => state.index)
  const [showError, setShowError] = useState(false)
  const { addDataLoading } = useSelector(state => state.index1)
  const { engineTypes, vehicleFuel, vehicleType, vehicleKind, technicalConditions, stacks } = useSelector(
    state => state.vehicleDetails
  )
  const [check, setCheck] = useState(false)
  const newStates = {
    id_vehicle_engine: state.id_vehicle_engine,
    id_vehicle_fuel: state.id_vehicle_fuel,
    id_vehicle_type: state.id_vehicle_type,
    id_vehicle_subject: state.id_vehicle_subject,
    id_vehicle_condition: state.id_vehicle_condition,
    id_vehicle_colon: state.id_vehicle_colon
  }

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
    dispatchSelect({
      type: 'UPDATE_SELECTED_ENGINE',
      payload: initialState.id_vehicle_engine
    })
    dispatchSelect({
      type: 'UPDATE_SELECTED_FUEL',
      payload: initialState.id_vehicle_fuel
    })
    dispatchSelect({
      type: 'UPDATE_SELECTED_TYPE',
      payload: initialState.id_vehicle_type
    })
    dispatchSelect({
      type: 'UPDATE_SELECTED_KIND',
      payload: initialState.id_vehicle_subject
    })
    dispatchSelect({
      type: 'UPDATE_SELECTED_TECHNICAL_CONDITIONS',
      payload: initialState.id_vehicle_condition
    })
    dispatchSelect({
      type: 'UPDATE_SELECTED_STACKS',
      payload: initialState.id_vehicle_colon
    })
  }

  const onSubmit = formData => {
    const combinedData = { ...formData, ...newStates }

    if (data.data.some(vehicle => vehicle.vehicle_plate_number === formData.vehicle_plate_number)) {
      setShowError(true)
    } else {
      createVehicle(combinedData)
      toggle()
      reset()
      resetForm()
      dispatch(setAddDataLoading(!addDataLoading))
      setShowError(false)
      dispatch(setAddDataCondition('add'))
      setCheck(false)
    }
  }

  const handleClose = () => {
    toggle()
    reset()
    resetForm()
    setShowError(false)
    setCheck(false)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchVehicleEngine())
    dispatch(fetchVehicleFuel())
    dispatch(fetchVehicleKindes())
    dispatch(fetchVehicleTypes())
    dispatch(fetchStacks())
    dispatch(fetchTechnicalConditions())
  }, [dispatch])

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
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='vehicle_plate_number'
                  control={control}
                  rules={{ required: +true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value.toUpperCase()}
                      label='Plate number'
                      onChange={onChange}
                      placeholder='10 AA 999'
                      error={Boolean(errors.vehicle_plate_number)}
                    />
                  )}
                />
                {!state.vehicle_plate_number && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle plate number field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='vehicle brand'
                  control={control}
                  rules={{ required: +true }}
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
                {!state.vehicle_brand && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle brand field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='vehicle year'
                  control={control}
                  rules={{ required: +true }}
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
                {errors.vehicle_year && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_year.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id='role-select'>Select engine</InputLabel>
                <Select
                  fullWidth
                  value={state.id_vehicle_engine}
                  id='select-engine'
                  label='Select Engine'
                  labelId='engine-select'
                  onChange={e => dispatchSelect({ type: 'UPDATE_SELECTED_ENGINE', payload: e.target.value })}
                  inputProps={{ placeholder: 'Select Engine' }}
                >
                  {engineTypes.map(engine => (
                    <MenuItem key={engine.id} value={engine.id}>
                      {engine.engine_types_title}
                    </MenuItem>
                  ))}
                </Select>
                {!state.id_vehicle_engine && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle engine field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id='fuel-select'>Select Fuel</InputLabel>
                <Select
                  fullWidth
                  value={state.id_vehicle_fuel}
                  id='select-fuel'
                  label='Select Fuel'
                  labelId='fuel-select'
                  onChange={e => dispatchSelect({ type: 'UPDATE_SELECTED_FUEL', payload: e.target.value })}
                  inputProps={{ placeholder: 'Select Fuel' }}
                >
                  {vehicleFuel.map(fuel => (
                    <MenuItem key={fuel.id} value={fuel.id}>
                      {fuel.fuel_kindes_title}
                    </MenuItem>
                  ))}
                </Select>
                {!state.id_vehicle_fuel && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle fuel field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id='type-select'>Select Type</InputLabel>
                <Select
                  fullWidth
                  value={state.id_vehicle_type}
                  id='select-type'
                  label='Select Type'
                  labelId='type-select'
                  onChange={e => dispatchSelect({ type: 'UPDATE_SELECTED_TYPE', payload: e.target.value })}
                  inputProps={{ placeholder: 'Select Type' }}
                >
                  {vehicleType.map(type => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.vehicle_types_title}
                    </MenuItem>
                  ))}
                </Select>
                {!state.id_vehicle_type && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle type field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id='kind-select'>Select Kind</InputLabel>
                <Select
                  fullWidth
                  value={state.id_vehicle_subject}
                  id='select-kind'
                  label='Select Kind'
                  labelId='kind-select'
                  onChange={e => dispatchSelect({ type: 'UPDATE_SELECTED_KIND', payload: e.target.value })}
                  inputProps={{ placeholder: 'Select Kind' }}
                >
                  {vehicleKind.map(kind => (
                    <MenuItem key={kind.id} value={kind.id}>
                      {kind.vehicle_kindes_title}
                    </MenuItem>
                  ))}
                </Select>
                {!state.id_vehicle_subject && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle subject field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id='technical-conditions-select'>Select Technical Conditions</InputLabel>
                <Select
                  fullWidth
                  value={state.id_vehicle_condition}
                  id='select-technical-conditions'
                  label='Select Technical Conditions'
                  labelId='technical-conditions-select'
                  onChange={e =>
                    dispatchSelect({ type: 'UPDATE_SELECTED_TECHNICAL_CONDITIONS', payload: e.target.value })
                  }
                  inputProps={{ placeholder: 'Select Technical Conditions' }}
                >
                  {technicalConditions.map(condition => (
                    <MenuItem key={condition.id} value={condition.id}>
                      {condition.technical_conditions_title}
                    </MenuItem>
                  ))}
                </Select>
                {!state.id_vehicle_condition && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle condition field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id='stacks-select'>Select Stacks</InputLabel>
                <Select
                  fullWidth
                  value={state.id_vehicle_colon}
                  id='select-stacks'
                  label='Select Stacks'
                  labelId='stacks-select'
                  onChange={e => dispatchSelect({ type: 'UPDATE_SELECTED_STACKS', payload: e.target.value })}
                  inputProps={{ placeholder: 'Select Stacks' }}
                >
                  {stacks.map(stack => (
                    <MenuItem key={stack.id} value={stack.id}>
                      {stack.stacks_title}
                    </MenuItem>
                  ))}
                </Select>
                {!state.id_vehicle_colon && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle colon field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='vehicle weight'
                  control={control}
                  rules={{ required: +true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='weight'
                      onChange={onChange}
                      placeholder='500'
                      error={Boolean(errors.vehicle_weight)}
                    />
                  )}
                />
                {errors.vehicle_weight && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_weight.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='vehicle power'
                  control={control}
                  rules={{ required: +true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='power'
                      onChange={onChange}
                      placeholder='200'
                      error={Boolean(errors.vehicle_power)}
                    />
                  )}
                />
                {errors.vehicle_power && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_power.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='vehicle_comsumption_km'
                  control={control}
                  rules={{ required: +true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='comsumption km'
                      onChange={onChange}
                      placeholder='200'
                      error={Boolean(errors.vehicle_comsumption_km)}
                    />
                  )}
                />
                {errors.vehicle_comsumption_km && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_comsumption_km.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='vehicle_comsumption_mc'
                  control={control}
                  rules={{ required: +true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='comsumption mc'
                      onChange={onChange}
                      placeholder='200'
                      error={Boolean(errors.vehicle_comsumption_mc)}
                    />
                  )}
                />
                {errors.vehicle_comsumption_mc && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_comsumption_mc.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='vehicle_comsumption_day'
                  control={control}
                  rules={{ required: +true }}
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

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='vehicle_milage'
                  control={control}
                  rules={{ required: +true }}
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
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='vehicle_status'
                  control={control}
                  rules={{ required: +true }}
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

export default SidebarAddUser
