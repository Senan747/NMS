import { useState, useEffect } from 'react'
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Store Imports
import { useDispatch } from 'react-redux'
import {
  openShowEdit,
  setEditId,
  setCheckWaybillId,
  deleteCheckWaybillId,
  removeCheckWaybillId
} from 'src/store/apps/waybills/editWaybills'

import { useDeleteWaybillMutation } from 'src/store/apps/waybills/apiWaybill'

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

const CheckboxHeader = ({
  allDataWaybill,
  allDataLoading,
  dispatch,
  setCheckWaybillId,
  removeCheckWaybillId,
  checkWaybillId
}) => {
  const [checked, setChecked] = useState(false)
  const [allId, setAllId] = useState([])

  useEffect(() => {
    if (!allDataLoading) {
      setAllId(allDataWaybill.waybills.map(data => data.id))
    }
  }, [allDataWaybill, allDataLoading])

  const handleClick = () => {
    if (checkWaybillId.length > 0) {
      dispatch(removeCheckWaybillId())
      setChecked(false)
    } else if (checkWaybillId.length == 0) {
      dispatch(setCheckWaybillId(allId))
      setChecked(true)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onClick={handleClick}
            disabled={allDataLoading}
            name='controlled'
            indeterminate={checkWaybillId.length > 0 && !checked ? true : false}
          />
        }
      />
    </div>
  )
}

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

  const [deleteWaybill, { isError }] = useDeleteWaybillMutation()

  const handleDelete = async () => {
    try {
      await deleteWaybill(id)
        .unwrap()
        .then(payload => {
          setDataCondition('delete')
          handleRowOptionsClose()
        })
    } catch (error) {}
  }

  const handleEdit = () => {
    dispatch(openShowEdit())
    handleRowOptionsClose()
    dispatch(setEditId(id))
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

const columns = ({
  dispatch,
  setSortDirection,
  sortDirection,
  sortField,
  setSortField,
  checkWaybillId,
  setDataCondition
}) => [
  {
    flex: 0.05,
    minWidth: 50,
    field: 'Checkbox',
    headerName: ({ allDataWaybill, allDataLoading }) => (
      <CheckboxHeader
        allDataWaybill={allDataWaybill}
        allDataLoading={allDataLoading}
        dispatch={dispatch}
        setCheckWaybillId={setCheckWaybillId}
        removeCheckWaybillId={removeCheckWaybillId}
        checkWaybillId={checkWaybillId}
      />
    ),
    renderCell: ({ row }) => {
      const isChecked = checkWaybillId.includes(row.id)

      const handleCheckboxChange = () => {
        if (isChecked) {
          dispatch(deleteCheckWaybillId(row.id))
        } else {
          dispatch(setCheckWaybillId(row.id))
        }
      }

      return (
        <Box>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills date',
    headerName: () => (
      <div>
        <span>Waybill date</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('date')
              setSortDirection('desc')
            } else {
              setSortField('date')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'date' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
    renderCell: ({ row }) => {
      return (
        <Box>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <LinkStyled href='/apps/user/view/overview/'>{row.waybills_date}</LinkStyled>
            </div>
          </div>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills no',
    headerName: () => (
      <div>
        <span>Waybill no</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('waybill_no')
              setSortDirection('desc')
            } else {
              setSortField('waybill_no')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'waybill_no' ? (
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
          {row.waybills_no}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Vehicle brand',
    headerName: () => (
      <div>
        <span>Vehicle brand</span>
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
    renderCell: ({ row, data }) => (
      <div variant='body2' key={row.id}>
        {data.vehicles
          .filter(type => row.id_vehicle === type.id)
          .map(type => (
            <div sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={type.id}>
              {type.vehicle_brand}
            </div>
          ))}
      </div>
    )
  },

  {
    flex: 0.2,
    minWidth: 200,
    field: 'Vehicle kind',
    headerName: () => {
      return <Box>Vehicle kind</Box>
    },
    renderCell: ({ row, data, vehicleKind }) => (
      <div variant='body2' key={row.id}>
        {data.vehicles
          .filter(type => row.id_vehicle === type.id)
          .map(type => {
            const kind = vehicleKind.find(k => k.id === type.id_vehicle_subject)

            return (
              <div sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={type.id}>
                {kind && kind.vehicle_kindes_title}
              </div>
            )
          })}
      </div>
    )
  },

  {
    flex: 0.2,
    minWidth: 200,
    field: 'Vehicle plate number',
    headerName: () => {
      return <Box>Vehicle Plate number</Box>
    },
    renderCell: ({ row, data }) => (
      <div variant='body2' key={row.id}>
        {data.vehicles
          .filter(type => row.id_vehicle === type.id)
          .map(type => (
            <div sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={type.id}>
              {type.vehicle_plate_number}
            </div>
          ))}
      </div>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills od start',
    headerName: () => (
      <div>
        <span>Waybill od start</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('od_start')
              setSortDirection('desc')
            } else {
              setSortField('od_start')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'od_start' ? (
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
          {row.waybills_od_start}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills od finish',
    headerName: () => (
      <div>
        <span>Waybill od finish</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('od_finish')
              setSortDirection('desc')
            } else {
              setSortField('od_finish')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'od_finish' ? (
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
          {row.waybills_od_finish}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills od gone',
    headerName: () => (
      <div>
        <span>Waybill od gone</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('od_gone')
              setSortDirection('desc')
            } else {
              setSortField('od_gone')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'od_gone' ? (
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
          {row.waybills_od_gone}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills fuel start',
    headerName: () => (
      <div>
        <span>Waybill fuel start</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('fuel_start')
              setSortDirection('desc')
            } else {
              setSortField('fuel_start')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'fuel_start' ? (
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
          {row.waybills_fuel_start}
        </Typography>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills fuel given',
    headerName: () => (
      <div>
        <span>Waybill fuel given</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('fuel_given')
              setSortDirection('desc')
            } else {
              setSortField('fuel_given')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'fuel_given' ? (
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
          {row.waybills_fuel_given}
        </Typography>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 230,
    field: 'Waybills fuel consumed',
    headerName: () => (
      <div>
        <span>Waybill fuel consumed</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('fuel_consumed')
              setSortDirection('desc')
            } else {
              setSortField('fuel_consumed')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'fuel_consumed' ? (
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
          {row.waybills_fuel_consumed}
        </Typography>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills fuel finish',
    headerName: () => (
      <div>
        <span>Waybill fuel finish</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              setSortField('fuel_finish')
              setSortDirection('desc')
            } else {
              setSortField('fuel_finish')
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortField === 'fuel_finish' ? (
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
          {row.waybills_fuel_finish}
        </Typography>
      )
    }
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
