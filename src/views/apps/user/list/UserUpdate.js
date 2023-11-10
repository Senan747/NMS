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
import FormControl, { formControlClasses } from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/system/Unstable_Grid/Grid'
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { setAddDataCondition } from 'src/store/apps/vehicle/conditions'
import { closeShowUpdate } from 'src/store/apps/ShowUpdate'
import { useUpdateVehicleMutation } from 'src/store/apps/vehicle/api'
import { useGetVehiclesIdQuery } from 'src/store/apps/vehicle/api'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const SidebarAddUser = props => {
  const { toggle } = props
  const dispatch = useDispatch()
  const { updateId } = useSelector(state => state.ShowUpdate)
  const { ShowUpdate } = useSelector(state => state.ShowUpdate)
  const [check, setCheck] = useState(false)
  const { engineTypes, vehicleFuel, vehicleType, vehicleKind, technicalConditions, stacks } = useSelector(
    state => state.vehicleDetails
  )
  const { data, isLoading } = useGetVehiclesIdQuery(updateId)
  const [updateVehicle] = useUpdateVehicleMutation()
  const [formData, setFormData] = useState({
    vehicle_plate_number: '',
    vehicle_brand: '',
    vehicle_year: '',
    vehicle_weight: '',
    vehicle_power: '',
    vehicle_comsumption_mc: '',
    vehicle_comsumption_day: '',
    vehicle_comsumption_km: '',
    vehicle_milage: '',
    vehicle_status: '',
    id_vehicle_engine: '',
    id_vehicle_fuel: '',
    id_vehicle_type: '',
    id_vehicle_subject: '',
    id_vehicle_condition: '',
    id_vehicle_colon: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        vehicle_plate_number: data.vehicle_plate_number,
        vehicle_brand: data.vehicle_brand,
        vehicle_year: data.vehicle_year,
        vehicle_weight: data.vehicle_weight,
        vehicle_power: data.vehicle_power,
        vehicle_comsumption_km: data.vehicle_comsumption_km,
        vehicle_comsumption_mc: data.vehicle_comsumption_mc,
        vehicle_comsumption_day: data.vehicle_comsumption_day,
        vehicle_milage: data.vehicle_milage,
        vehicle_status: data.vehicle_status,
        id_vehicle_engine: data.id_vehicle_engine,
        id_vehicle_fuel: data.id_vehicle_fuel,
        id_vehicle_type: data.id_vehicle_type,
        id_vehicle_subject: data.id_vehicle_subject,
        id_vehicle_condition: data.id_vehicle_condition,
        id_vehicle_colon: data.id_vehicle_colon
      })
    }
  }, [data])

  const resetForm = () => {
    setFormData({
      ...formData,
      vehicle_plate_number: data.vehicle_plate_number,
      vehicle_brand: data.vehicle_brand,
      vehicle_year: data.vehicle_year,
      vehicle_weight: data.vehicle_weight,
      vehicle_power: data.vehicle_power,
      vehicle_comsumption_km: data.vehicle_comsumption_km,
      vehicle_comsumption_mc: data.vehicle_comsumption_mc,
      vehicle_comsumption_day: data.vehicle_comsumption_day,
      vehicle_milage: data.vehicle_milage,
      vehicle_status: data.vehicle_status,
      id_vehicle_engine: data.id_vehicle_engine,
      id_vehicle_fuel: data.id_vehicle_fuel,
      id_vehicle_type: data.id_vehicle_type,
      id_vehicle_subject: data.id_vehicle_subject,
      id_vehicle_condition: data.id_vehicle_condition,
      id_vehicle_colon: data.id_vehicle_colon
    })
  }

  const onSubmit = formData => {
    const combinedData = formData
    if (data === combinedData) {
      alert('No changes were made')
    } else {
      updateVehicle({ updateId, vehicleData: combinedData })
      toggle()
      dispatch(setAddDataCondition('update'))
    }
  }

  const handleClose = () => {
    toggle()
    dispatch(closeShowUpdate())
    resetForm()
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(formData)
  }

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
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit} key={updateId}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  required
                  placeholder='99 AA 100'
                  InputLabelProps={{ shrink: true }}
                  label='Plate number'
                  value={formData.vehicle_plate_number.toLocaleUpperCase()}
                  onChange={e => setFormData({ ...formData, vehicle_plate_number: e.target.value.toLocaleUpperCase() })}
                  InputProps={{ readOnly: true }}
                  id='form-props-read-only-input'
                />
                <FormHelperText sx={{ color: 'blue' }}>read only</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  required
                  placeholder='BMW'
                  InputLabelProps={{ shrink: true }}
                  label='Vehicle brand'
                  value={formData.vehicle_brand}
                  onChange={e => setFormData({ ...formData, vehicle_brand: e.target.value })}
                />
                {!formData.vehicle_brand && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle brand field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  required
                  label='Year'
                  placeholder='2000'
                  InputLabelProps={{ shrink: true }}
                  value={formData.vehicle_year}
                  onChange={e => setFormData({ ...formData, vehicle_year: e.target.value })}
                />
                {!formData.vehicle_year && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle year field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl required fullWidth sx={{ mb: 3 }}>
                <InputLabel id='demo-simple-select-required-label'>Type</InputLabel>
                <Select
                  fullWidth
                  value={formData.id_vehicle_type}
                  label='Select fuel'
                  id='demo-simple-select-required'
                  labelId='demo-simple-select-required-label'
                  onChange={e => setFormData({ ...formData, id_vehicle_type: e.target.value })}
                >
                  {vehicleType.map(type => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.vehicle_types_title}
                    </MenuItem>
                  ))}
                </Select>
                {!formData.id_vehicle_type && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle type field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl required fullWidth sx={{ mb: 3 }}>
                <InputLabel id='demo-simple-select-required-label'>Subject</InputLabel>
                <Select
                  fullWidth
                  value={formData.id_vehicle_subject}
                  label='Select fuel'
                  id='demo-simple-select-required'
                  labelId='demo-simple-select-required-label'
                  onChange={e => setFormData({ ...formData, id_vehicle_subject: e.target.value })}
                >
                  {vehicleKind.map(kind => (
                    <MenuItem key={kind.id} value={kind.id}>
                      {kind.vehicle_kindes_title}
                    </MenuItem>
                  ))}
                </Select>
                {!formData.id_vehicle_subject && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle subject field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  required
                  label='Weight'
                  placeholder='2000'
                  InputLabelProps={{ shrink: true }}
                  value={formData.vehicle_weight}
                  onChange={e => setFormData({ ...formData, vehicle_weight: e.target.value })}
                />
                {!formData.vehicle_weight && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle weight field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  required
                  label='Power'
                  placeholder='300'
                  InputLabelProps={{ shrink: true }}
                  value={formData.vehicle_power}
                  onChange={e => setFormData({ ...formData, vehicle_power: e.target.value })}
                />
                {!formData.vehicle_power && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle power field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl required fullWidth sx={{ mb: 3 }}>
                <InputLabel id='demo-simple-select-required-label'>Fuel</InputLabel>
                <Select
                  fullWidth
                  value={formData.id_vehicle_fuel}
                  label='Select fuel'
                  id='demo-simple-select-required'
                  labelId='demo-simple-select-required-label'
                  onChange={e => setFormData({ ...formData, id_vehicle_fuel: e.target.value })}
                >
                  {vehicleFuel.map(fuel => (
                    <MenuItem key={fuel.id} value={fuel.id}>
                      {fuel.fuel_kindes_title}
                    </MenuItem>
                  ))}
                </Select>
                {!formData.id_vehicle_fuel && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle fuel field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl required fullWidth sx={{ mb: 3 }}>
                <InputLabel id='demo-simple-select-required-label'>Engine</InputLabel>
                <Select
                  fullWidth
                  value={formData.id_vehicle_engine}
                  id='demo-simple-select-required'
                  labelId='demo-simple-select-required-label'
                  label='Select Engine'
                  onChange={e => setFormData({ ...formData, id_vehicle_engine: e.target.value })}
                >
                  {engineTypes.map(engine => (
                    <MenuItem key={engine.id} value={engine.id}>
                      {engine.engine_types_title}
                    </MenuItem>
                  ))}
                </Select>
                {!formData.id_vehicle_engine && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle engine field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  required
                  placeholder='Placeholder'
                  InputLabelProps={{ shrink: true }}
                  label='vehicle comsuption km'
                  type='text'
                  value={formData.vehicle_comsumption_km}
                  onChange={e => setFormData({ ...formData, vehicle_comsumption_km: e.target.value })}
                />
                {!formData.vehicle_comsumption_km && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle comsumption km field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  required
                  placeholder='Placeholder'
                  InputLabelProps={{ shrink: true }}
                  label='vehicle comsuption mc'
                  type='text'
                  value={formData.vehicle_comsumption_mc}
                  onChange={e => setFormData({ ...formData, vehicle_comsumption_mc: e.target.value })}
                />
                {!formData.vehicle_comsumption_mc && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle comsumption mc field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  required
                  placeholder='Placeholder'
                  InputLabelProps={{ shrink: true }}
                  label='vehicle comsuption day'
                  type='text'
                  value={formData.vehicle_comsumption_day}
                  onChange={e => setFormData({ ...formData, vehicle_comsumption_day: e.target.value })}
                />
                {!formData.vehicle_comsumption_day && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    Vehicle comsumption day field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  required
                  placeholder='300'
                  InputLabelProps={{ shrink: true }}
                  label='mileage'
                  type='text'
                  value={formData.vehicle_milage}
                  onChange={e => setFormData({ ...formData, vehicle_milage: e.target.value })}
                />
                {!formData.vehicle_milage && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle mileage field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl required fullWidth sx={{ mb: 3 }}>
                <InputLabel id='demo-simple-select-required-label'>Condition</InputLabel>
                <Select
                  fullWidth
                  value={formData.id_vehicle_condition}
                  id='demo-simple-select-required'
                  labelId='demo-simple-select-required-label'
                  label='Select Engine'
                  onChange={e => setFormData({ ...formData, id_vehicle_condition: e.target.value })}
                >
                  {technicalConditions.map(condition => (
                    <MenuItem key={condition.id} value={condition.id}>
                      {condition.technical_conditions_title}
                    </MenuItem>
                  ))}
                </Select>
                {!formData.id_vehicle_condition && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    Vehicle technical condition field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl required fullWidth sx={{ mb: 3 }}>
                <InputLabel id='demo-simple-select-required-label'>Colon</InputLabel>
                <Select
                  fullWidth
                  value={formData.id_vehicle_colon}
                  id='demo-simple-select-required'
                  labelId='demo-simple-select-required-label'
                  label='Select Engine'
                  onChange={e => setFormData({ ...formData, id_vehicle_colon: e.target.value })}
                >
                  {stacks.map(stack => (
                    <MenuItem key={stack.id} value={stack.id}>
                      {stack.stacks_title}
                    </MenuItem>
                  ))}
                </Select>
                {!formData.id_vehicle_colon && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle colon field is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  required
                  placeholder='300'
                  InputLabelProps={{ shrink: true }}
                  label='status'
                  type='text'
                  value={formData.vehicle_status}
                  onChange={e => setFormData({ ...formData, vehicle_status: e.target.value })}
                />
                {!formData.vehicle_status && check && (
                  <FormHelperText sx={{ color: 'error.main' }}>Vehicle status field is required</FormHelperText>
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
