// ** React Imports
import { useState } from 'react'

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

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addUser } from 'src/store/apps/vehicle'
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
  marka: yup.string().required(),
  dovlet_nisani: yup.string().required(),
  yanacaq_novu: yup.string().required(),
  yanacaq_doldurma_novu: yup.string().required(),
  dəstə: yup
    .number()
    .typeError('Dəstə field is required')
    .min(1, obj => showErrors('Dəstə', obj.value, obj.min))
    .required()
})

const defaultValues = {
  marka: '',
  dovlet_nisani: '',
  yanacaq_novu: '',
  yanacaq_doldurma_novu: '',
  dəstə: ''
}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle } = props

  // ** State

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)

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

  const onSubmit = data => {
    if (store.allData.some(u => u.marka === data.marka)) {
      setError('marka', {
        message: 'Marka already exists!'
      })
    } else {
      dispatch(addUser({ ...data }))
      toggle()
      reset()
    }
  }

  const handleClose = () => {
    // toggle();
    dispatch(closeShowUpdate())
    reset()
  }

  const handleClick = () => {
    dispatch(closeShowUpdate())
  }

  const { ShowUpdate } = useSelector(state => state.ShowUpdate)

  return (
    <Drawer
      open={ShowUpdate}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Update User</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} onClick={handleClick} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='marka'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Marka'
                  onChange={onChange}
                  placeholder='Mercedez'
                  error={Boolean(errors.marka)}
                />
              )}
            />
            {errors.marka && <FormHelperText sx={{ color: 'error.main' }}>{errors.marka.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='dovlet_nisani'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Dövlət nişanı'
                  onChange={onChange}
                  placeholder='10 AA 99'
                  error={Boolean(errors.dovlet_nisani)}
                />
              )}
            />
            {errors.dovlet_nisani && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.dovlet_nisani.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='yanacaq_novu'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Yanacaq növü'
                  onChange={onChange}
                  placeholder='Dizel'
                  error={Boolean(errors.yanacaq_novu)}
                />
              )}
            />
            {errors.yanacaq_novu && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.yanacaq_novu.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='yanacaq_doldurma_novu'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Yanacaq doldurma forması'
                  onChange={onChange}
                  placeholder='Çən no 1'
                  error={Boolean(errors.yanacaq_doldurma_novu)}
                />
              )}
            />
            {errors.yanacaq_doldurma_novu && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.yanacaq_doldurma_novu.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='dəstə'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Dəstə'
                  onChange={onChange}
                  placeholder='1'
                  error={Boolean(errors.dəstə)}
                />
              )}
            />
            {errors.dəstə && <FormHelperText sx={{ color: 'error.main' }}>{errors.dəstə.message}</FormHelperText>}
          </FormControl>

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
