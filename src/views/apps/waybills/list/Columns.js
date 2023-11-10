import { useState, useEffect, useCallback, useMemo } from 'react'
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

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { openShowEdit, setEditId } from 'src/store/apps/waybills/editWaybills'
import { setAddWaybillCondition } from 'src/store/apps/vehicle/conditions'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { setSortFieldWaybill } from 'src/store/apps/waybills/sortWaybills'
import { useDeleteWaybillMutation } from 'src/store/apps/waybills/apiWaybill'

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

const RowOptions = ({ id }) => {
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
          dispatch(setAddWaybillCondition('delete'))
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

const columns = ({ dispatch, setSortDirection, sortDirection, sortFieldWaybill, data }) => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'Waybills date',
    headerName: (
      <div>
        <span>Waybill date</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('date'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('date'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'date' ? (
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
    headerName: (
      <div>
        <span>Waybill no</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('waybill_no'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('waybill_no'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'waybill_no' ? (
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
    headerName: (
      <div>
        <span>Vehicle brand</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('brand'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('brand'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'brand' ? (
            <Icon icon='clarity:arrow-line' />
          ) : (
            <Icon icon='clarity:arrow-line' rotate={2} />
          )}
        </IconButton>
      </div>
    ),
    renderCell: ({ row, data }) => (
      <div variant='body2'>
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
    headerName: 'Vehicle kind',
    renderCell: ({ row, data, vehicleKind }) => (
      <div variant='body2'>
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
    headerName: 'Vehicle plate number',
    renderCell: ({ row, data }) => (
      <div variant='body2'>
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
    headerName: (
      <div>
        <span>Waybill od start</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('od_start'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('od_start'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'od_start' ? (
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
    headerName: (
      <div>
        <span>Waybill od finish</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('od_finish'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('od_finish'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'od_finish' ? (
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
    headerName: (
      <div>
        <span>Waybill od gone</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('od_gone'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('od_gone'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'od_gone' ? (
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
    headerName: (
      <div>
        <span>Waybill fuel start</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('fuel_start'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('fuel_start'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'fuel_start' ? (
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
    headerName: (
      <div>
        <span>Waybill fuel given</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('fuel_given'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('fuel_given'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'fuel_given' ? (
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
    headerName: (
      <div>
        <span>Waybill fuel consumed</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('fuel_consumed'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('fuel_consumed'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'fuel_consumed' ? (
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
    headerName: (
      <div>
        <span>Waybill fuel finish</span>
        <IconButton
          size='small'
          onClick={() => {
            if (sortDirection === 'asc') {
              dispatch(setSortFieldWaybill('fuel_finish'))
              setSortDirection('desc')
            } else {
              dispatch(setSortFieldWaybill('fuel_finish'))
              setSortDirection('asc')
            }
          }}
        >
          {sortDirection === 'asc' && sortFieldWaybill === 'fuel_finish' ? (
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
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]

export default columns
