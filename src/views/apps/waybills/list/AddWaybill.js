// ** React Imports
import { useEffect, useState, useReducer } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
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

import DatePicker from 'react-datepicker'
import CustomInput from './CustomInput'
import * as source from 'src/views/apps/waybills/list/PickerSourceCode'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData } from 'src/store/apps/vehicle'
import { setAddDataLoading, setAddWaybillCondition } from 'src/store/apps/vehicle/index1'
import { fetchWaybills, postWaybills } from 'src/store/apps/waybills/CRUD'



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

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle } = props

  const [date, setDate] = useState(new Date())

  const [formData, setFormData] = useState({
    waybills_no: null,
    id_vehicle: null,
    waybills_od_start: null,
    waybills_od_finish: null,
    waybills_fuel_start: null,
    waybills_fuel_given: null,
    waybills_fuel_consumed: null
  })

  const resetForm = () => {
    setFormData({
      ...formData,
      waybills_no: null,
      id_vehicle: null,
      waybills_od_start: null,
      waybills_od_finish: null,
      waybills_fuel_start: null,
      waybills_fuel_given: null,
      waybills_fuel_consumed: null
    })
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchData()).then(() => {})
    dispatch(fetchData())
  }, [dispatch])

  const data = useSelector(state => state.index)
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const dataWaybills = useSelector(state => state.CRUD)

  const formatDate = date => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Add 1 to month since it's zero-based
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const newDate = formatDate(date)

  const onSubmit = formData => {
    console.log(formData)
    console.log('salam  ')
    const combinedData = { ...formData, waybills_date: newDate }

    console.log(combinedData)
    if (dataWaybills.dataWaybills.some(waybill => waybill.waybills_no === formData.waybills_no)) {
      console.error('Waybill already exists!')
    } else {
      dispatch(postWaybills(combinedData))
      dispatch(fetchWaybills())
      toggle()
      // reset()
      resetForm()
      dispatch(setAddDataLoading(true))
      setDate(new Date())
      setAddWaybillCondition('add')
    }
  }

  const handleClose = () => {
    toggle()
    // reset()
    resetForm()
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(formData)
  }
  const [check, setCheck] = useState(false)

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
      <Box sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  value={formData.waybills_no}
                  label='waybill no'
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
                >
                  {data.data.map(number => (
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
                  onChange={e => setFormData({ ...formData, waybills_od_start: e.target.value })}
                  placeholder='10'
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
                  onChange={e => setFormData({ ...formData, waybills_od_finish: e.target.value })}
                  placeholder='10'
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
                  onChange={e => setFormData({ ...formData, waybills_fuel_start: e.target.value })}
                  placeholder='10'
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  value={formData.waybills_fuel_given}
                  label='waybill fuel given'
                  onChange={e => setFormData({ ...formData, waybills_fuel_given: e.target.value })}
                  placeholder='10'
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
                  onChange={e => setFormData({ ...formData, waybills_fuel_consumed: e.target.value })}
                  placeholder='10'
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

export default SidebarAddUser
