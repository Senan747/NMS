import { useState } from 'react'
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Checkbox from '@mui/material/Checkbox'
import CheckboxHeader from './CheckBoxHeader'

// ** Store Imports
import {
  openShowUpdate,
  setUpdateId,
  setCheckId,
  deleteCheckId,
  removeCheckId
} from 'src/store/apps/vehicle/ShowUpdate'
import { useDispatch } from 'react-redux'
import { useDeleteVehicleMutation } from 'src/store/apps/vehicle/api'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const renderClient = row => {
  if (row.avatar) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
      >
        {getInitials(row.vehicle_brand ? row.vehicle_brand : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id, setDataCondition }) => {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const [deleteVehicle] = useDeleteVehicleMutation()

  const handleDelete = async () => {
    try {
      await deleteVehicle(id)
        .unwrap()
        .then(payload => {
          setDataCondition('delete')
          handleRowOptionsClose()
        })
        .catch(error => {
          setDataCondition('cantDelete')
        })
    } catch (error) {}
  }

  const handleEdit = () => {
    dispatch(openShowUpdate())
    handleRowOptionsClose()
    dispatch(setUpdateId(id))
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted={true}
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns = ({ dispatch, setSortDirection, sortDirection, sortField, setSortField, checkId, setDataCondition }) => [
  {
    flex: 0.2,
    minWidth: 50,
    field: 'Checkbox',
    headerName: ({ allDataVehicle, isAllLoading }) => (
      <CheckboxHeader
        allDataVehicle={allDataVehicle}
        isAllLoading={isAllLoading}
        dispatch={dispatch}
        setCheckId={setCheckId}
        removeCheckId={removeCheckId}
        checkId={checkId}
      />
    ),
    renderCell: ({ row }) => {
      const isChecked = checkId.includes(row.id)

      const handleCheckboxChange = () => {
        if (isChecked) {
          dispatch(deleteCheckId(row.id))
        } else {
          dispatch(setCheckId(row.id))
        }
      }

      return (
        <Typography>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Plate number',
    headerName: () => {
      return <Box>Plate number</Box>
    },
    renderCell: ({ row }) => {
      return (
        <Box>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <LinkStyled href='/apps/user/view/overview/'>{row.vehicle_plate_number}</LinkStyled>
            </div>
          </div>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'Brand',
    headerName: () => (
      <div>
        <span>Brand</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('brand')
              setSortDirection('desc')
            } else {
              setSortField('brand')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'brand' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.vehicle_brand}
        </Typography>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 150,
    field: 'Vehicle year',
    headerName: () => (
      <div>
        <span>Year</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('year')
              setSortDirection('desc')
            } else {
              setSortField('year')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'year' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.vehicle_year}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'Type',
    headerName: () => {
      return <Box>Type</Box>
    },
    renderCell: ({ row, vehicleType }) => (
      <div variant='body2'>
        {vehicleType
          .filter(type => row.id_vehicle_type === type.id)
          .map(type => (
            <div sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={type.id}>
              {type.vehicle_types_title}
            </div>
          ))}
      </div>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'Subject',
    headerName: () => {
      return <Box>Subject</Box>
    },
    renderCell: ({ row, vehicleKind }) => (
      <div variant='body2'>
        {vehicleKind
          .filter(kind => row.id_vehicle_subject === kind.id)
          .map(kind => (
            <div sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={kind.id}>
              {kind.vehicle_kindes_title}
            </div>
          ))}
      </div>
    )
  },
  {
    flex: 0.2,
    field: 'Weight',
    minWidth: 150,
    headerName: () => (
      <div>
        <span>Weight</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('weight')
              setSortDirection('desc')
            } else {
              setSortField('weight')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'weight' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
          <Icon icon={''} fontSize={20} />
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.vehicle_weight}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: 'Power',
    headerName: () => (
      <div>
        <span>Power</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('power')
              setSortDirection('desc')
            } else {
              setSortField('power')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'power' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.vehicle_power}
        </Typography>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 150,
    field: 'Engine',
    headerName: () => {
      return <Box>Engine</Box>
    },
    renderCell: ({ row, engineTypes }) => (
      <div variant='body2'>
        {engineTypes
          .filter(type => row.id_vehicle_engine === type.id)
          .map(type => (
            <div sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={type.id}>
              {type.engine_types_title}
            </div>
          ))}
      </div>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'Fuel',
    headerName: () => {
      return <Box>Fuel</Box>
    },
    renderCell: ({ row, vehicleFuel }) => (
      <div variant='body2'>
        {vehicleFuel
          .filter(fuel => row.id_vehicle_fuel === fuel.id)
          .map(fuel => (
            <div sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={fuel.id}>
              {fuel.fuel_kindes_title}
            </div>
          ))}
      </div>
    )
  },
  {
    flex: 0.1,
    minWidth: 200,
    field: 'comsumption_km',
    headerName: () => (
      <div>
        <span>comsumption km</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('comsumption_km')
              setSortDirection('desc')
            } else {
              setSortField('comsumption_km')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'comsumption_km' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.vehicle_comsumption_km}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 200,
    headerName: () => (
      <div>
        <span>comsumption mc</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('comsumption_mc')
              setSortDirection('desc')
            } else {
              setSortField('comsumption_mc')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'comsumption_mc' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
    field: 'Comsuption mc',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.vehicle_comsumption_mc}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 200,
    headerName: () => (
      <div>
        <span>comsumption day</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('comsumption_day')
              setSortDirection('desc')
            } else {
              setSortField('comsumption_day')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'comsumption_day' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
    field: 'Comsuption day',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.vehicle_comsumption_day}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 200,
    headerName: () => (
      <div>
        <span>mileage</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('milage')
              setSortDirection('desc')
            } else {
              setSortField('milage')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'milage' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
    field: 'mileage',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.vehicle_milage}
        </Typography>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 150,
    field: 'Conditions',
    headerName: () => {
      return <Box>Conditions</Box>
    },
    renderCell: ({ row, technicalConditions }) => (
      <div variant='body2'>
        {technicalConditions
          .filter(condition => row.id_vehicle_condition === condition.id)
          .map(condition => (
            <div sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={condition.id}>
              {condition.technical_conditions_title}
            </div>
          ))}
      </div>
    )
  },

  {
    flex: 0.2,
    minWidth: 150,
    field: 'Colon',
    headerName: () => {
      return <Box>Colon</Box>
    },
    renderCell: ({ row, stacks }) => (
      <div variant='body2'>
        {stacks
          .filter(stack => row.id_vehicle_colon === stack.id)
          .map(stack => (
            <div sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={stack.id}>
              {stack.stacks_title}
            </div>
          ))}
      </div>
    )
  },

  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: () => {
      return <Box>Actions</Box>
    },
    renderCell: ({ row }) => <RowOptions id={row.id} setDataCondition={setDataCondition} />
  }
]

export default columns
