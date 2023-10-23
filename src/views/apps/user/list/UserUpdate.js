// ** React Imports
import { useEffect, useState, useReducer } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { postData, fetchData, putData } from 'src/store/apps/vehicle'
import { setAddDataLoading } from 'src/store/apps/vehicle/index1'

import {
  fetchVehicleEngine,
  fetchVehicleFuel,
  fetchTechnicalConditions,
  fetchVehicleKindes,
  fetchVehicleTypes,
  fetchStacks
} from 'src/store/apps/vehicle/vehicleDetails'

import { closeShowUpdate } from 'src/store/apps/ShowUpdate'

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
  vehicle_brand: yup.string().required(),
  vehicle_year: yup
    .number()
    .typeError('Year field is required')
    .min(1, obj => showErrors('Year', obj.value, obj.min))
    .required(),
  vehicle_weight: yup
    .number()
    .typeError('Year field is required')
    .min(1, obj => showErrors('Year', obj.value, obj.min))
    .required(),
  vehicle_power: yup
    .number()
    .typeError('Year field is required')
    .min(1, obj => showErrors('Year', obj.value, obj.min))
    .required(),
  vehicle_comsumption_mc: yup
    .number()
    .typeError('comsumption mc field is required')
    .min(1, obj => showErrors('Year', obj.value, obj.min))
    .required(),
  vehicle_comsumption_day: yup
    .number()
    .typeError('comsumption day field is required')
    .min(1, obj => showErrors('Year', obj.value, obj.min))
    .required(),
  vehicle_comsumption_km: yup
    .number()
    .typeError('comsumption day field is required')
    .min(1, obj => showErrors('Year', obj.value, obj.min))
    .required(),

  vehicle_milage: yup
    .number()
    .typeError('Mileage field is required')
    .min(1, obj => showErrors('Year', obj.value, obj.min))
    .required(),
  vehicle_status: yup
    .number()
    .typeError('Mileage field is required')
    .min(1, obj => showErrors('Year', obj.value, obj.min))
    .required()
})

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
  // ** Props
  const { open, toggle } = props
  const dispatch = useDispatch()
  const { updateId } = useSelector(state => state.ShowUpdate)
  const { data } = useSelector(state => state.index)

  const idData = data.find(vehicle => vehicle.id === updateId)

  const defaultValues = {
    vehicle_plate_number: idData ? idData.vehicle_plate_number : '',
    vehicle_brand: idData ? idData.vehicle_brand : '',
    vehicle_year: idData ? idData.vehicle_year : '',
    vehicle_weight: idData ? idData.vehicle_weight : '',
    vehicle_power: idData ? idData.vehicle_power : '',
    vehicle_comsumption_km: idData ? idData.vehicle_comsumption_km : '',
    vehicle_comsumption_mc: idData ? idData.vehicle_comsumption_mc : '',
    vehicle_comsumption_day: idData ? idData.vehicle_comsumption_day : '',
    vehicle_milage: idData ? idData.vehicle_milage : '',
    vehicle_status: idData ? idData.vehicle_status : ''
  }

  const initialState = {
    id_vehicle_engine: idData ? idData.id_vehicle_engine : '',
    id_vehicle_fuel: idData ? idData.id_vehicle_fuel : '',
    id_vehicle_type: idData ? idData.id_vehicle_type : '',
    id_vehicle_subject: idData ? idData.id_vehicle_subject : '',
    id_vehicle_condition: idData ? idData.id_vehicle_condition : '',
    id_vehicle_colon: idData ? idData.id_vehicle_colon : ''
  }

  const [state, dispatch1] = useReducer(reducer, initialState)
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
    reset(defaultValues) // Reset the form fields

    // Reset newStates to their initial values
    dispatch1({
      type: 'UPDATE_SELECTED_ENGINE',
      payload: initialState.id_vehicle_engine
    })

    dispatch1({
      type: 'UPDATE_SELECTED_FUEL',
      payload: initialState.id_vehicle_fuel
    })

    dispatch1({
      type: 'UPDATE_SELECTED_TYPE',
      payload: initialState.id_vehicle_type
    })

    dispatch1({
      type: 'UPDATE_SELECTED_KIND',
      payload: initialState.id_vehicle_subject
    })

    dispatch1({
      type: 'UPDATE_SELECTED_TECHNICAL_CONDITIONS',
      payload: initialState.id_vehicle_condition
    })

    dispatch1({
      type: 'UPDATE_SELECTED_STACKS',
      payload: initialState.id_vehicle_colon
    })
  }

  const onSubmit = formData => {
    const combinedData = { ...formData, ...newStates }

    dispatch(putData({ combinedData, updateId }))
    dispatch(fetchData())
    toggle()
    reset()
    resetForm()
    dispatch(setAddDataLoading(true))
  }
  useEffect(() => {
    dispatch(fetchVehicleEngine())
    dispatch(fetchVehicleFuel())
    dispatch(fetchVehicleKindes())
    dispatch(fetchVehicleTypes())
    dispatch(fetchStacks())
    dispatch(fetchTechnicalConditions())
  }, [dispatch])

  const handleClose = () => {
    // toggle();
    dispatch(closeShowUpdate())
    reset()
  }

  const handleClick = () => {
    dispatch(closeShowUpdate())
  }

  const { engineTypes, vehicleFuel, vehicleType, vehicleKind, technicalConditions, stacks } = useSelector(
    state => state.vehicleDetails
  )

  const { ShowUpdate } = useSelector(state => state.ShowUpdate)
  return (
    <Drawer
      open={ShowUpdate}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 200, sm: 800 } }, maxHeight: '100vh' }}
    >
      <Header>
        <Typography variant='h6'>Update vehicle</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name='vehicle_plate_number'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Plate number'
                      onChange={onChange}
                      placeholder='10 AA 99'
                      error={Boolean(errors.vehicle_plate_number)}
                    />
                  )}
                />
                {errors.vehicle_plate_number && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_plate_number.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
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

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
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

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='role-select'>Select Role</InputLabel>
                <Select
                  fullWidth
                  value={state.id_vehicle_engine}
                  id='select-engine'
                  label='Select Engine'
                  labelId='engine-select'
                  onChange={e => dispatch1({ type: 'UPDATE_SELECTED_ENGINE', payload: e.target.value })}
                  inputProps={{ placeholder: 'Select Engine' }}
                >
                  {engineTypes.map(engine => (
                    <MenuItem key={engine.id} value={engine.id}>
                      {engine.engine_types_title}
                    </MenuItem>
                  ))}
                </Select>
                {errors.vehicle_brand && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_brand.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='fuel-select'>Select Fuel</InputLabel>
                <Select
                  fullWidth
                  value={state.id_vehicle_fuel}
                  id='select-fuel'
                  label='Select Fuel'
                  labelId='fuel-select'
                  onChange={e => dispatch1({ type: 'UPDATE_SELECTED_FUEL', payload: e.target.value })}
                  inputProps={{ placeholder: 'Select Fuel' }}
                >
                  {vehicleFuel.map(fuel => (
                    <MenuItem key={fuel.id} value={fuel.id}>
                      {fuel.fuel_kindes_title}
                    </MenuItem>
                  ))}
                </Select>
                {errors.vehicle_brand && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_brand.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='type-select'>Select Type</InputLabel>
                <Select
                  fullWidth
                  value={state.id_vehicle_type}
                  id='select-type'
                  label='Select Type'
                  labelId='type-select'
                  onChange={e => dispatch1({ type: 'UPDATE_SELECTED_TYPE', payload: e.target.value })}
                  inputProps={{ placeholder: 'Select Type' }}
                >
                  {vehicleType.map(type => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.vehicle_types_title}
                    </MenuItem>
                  ))}
                </Select>
                {errors.vehicle_brand && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_brand.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='kind-select'>Select Kind</InputLabel>
                <Select
                  fullWidth
                  value={state.id_vehicle_subject}
                  id='select-kind'
                  label='Select Kind'
                  labelId='kind-select'
                  onChange={e => dispatch1({ type: 'UPDATE_SELECTED_KIND', payload: e.target.value })}
                  inputProps={{ placeholder: 'Select Kind' }}
                >
                  {vehicleKind.map(kind => (
                    <MenuItem key={kind.id} value={kind.id}>
                      {kind.vehicle_kindes_title}
                    </MenuItem>
                  ))}
                </Select>
                {errors.vehicle_brand && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_brand.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='technical-conditions-select'>Select Technical Conditions</InputLabel>
                <Select
                  fullWidth
                  value={state.id_vehicle_condition}
                  id='select-technical-conditions'
                  label='Select Technical Conditions'
                  labelId='technical-conditions-select'
                  onChange={e => dispatch1({ type: 'UPDATE_SELECTED_TECHNICAL_CONDITIONS', payload: e.target.value })}
                  inputProps={{ placeholder: 'Select Technical Conditions' }}
                >
                  {technicalConditions.map(condition => (
                    <MenuItem key={condition.id} value={condition.id}>
                      {condition.technical_conditions_title}
                    </MenuItem>
                  ))}
                </Select>
                {errors.vehicle_brand && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_brand.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='stacks-select'>Select Stacks</InputLabel>
                <Select
                  fullWidth
                  value={state.id_vehicle_colon}
                  id='select-stacks'
                  label='Select Stacks'
                  labelId='stacks-select'
                  onChange={e => dispatch1({ type: 'UPDATE_SELECTED_STACKS', payload: e.target.value })}
                  inputProps={{ placeholder: 'Select Stacks' }}
                >
                  {stacks.map(stack => (
                    <MenuItem key={stack.id} value={stack.id}>
                      {stack.stacks_title}
                    </MenuItem>
                  ))}
                </Select>
                {errors.vehicle_brand && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_brand.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
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
                    />
                  )}
                />
                {errors.vehicle_weight && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_weight.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
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
                    />
                  )}
                />
                {errors.vehicle_power && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_power.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
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
                    />
                  )}
                />
                {errors.vehicle_comsumption_km && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_comsumption_km.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
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
                    />
                  )}
                />
                {errors.vehicle_comsumption_mc && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle_comsumption_mc.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
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

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
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

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name='vehicle_status'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='vehicle status'
                      onChange={onChange}
                      placeholder='Active'
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

export default SidebarAddUser
