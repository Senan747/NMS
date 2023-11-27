import { useEffect, useState } from 'react'

// ** MUI Imports
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function CheckboxHeader({ allDataVehicle, isAllLoading, dispatch, setCheckId, removeCheckId, checkId }) {
  const [checked, setChecked] = useState(false)
  const [allId, setAllId] = useState([])

  useEffect(() => {
    if (!isAllLoading) {
      setAllId(allDataVehicle.vehicles.map(data => data.id))
    }
  }, [allDataVehicle, isAllLoading])

  const handleClick = () => {
    if (checkId.length > 0) {
      dispatch(removeCheckId())
      setChecked(false)
    } else if (checkId.length == 0) {
      dispatch(setCheckId(allId))
      setChecked(true)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '10px' }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onClick={handleClick}
            disabled={isAllLoading}
            name='controlled'
            indeterminate={checkId.length > 0 && !checked ? true : false}
          />
        }
      />
    </div>
  )
}
