import * as React from 'react'
import { Chip } from '@mui/material'
import useStyles from './styles'
import { HomeContext } from '../../../../HomeContext'

const SchoolTypeChip = props => {
  const c = useStyles()

  const { handleSchoolTypeChipClick } = React.useContext(HomeContext)

  return (
    <React.Fragment>
      {props.chipState ? (
        <Chip
          label={`${props.label}`}
          className={c.chipItem}
          onClick={e => handleSchoolTypeChipClick(e, props.chipValue)}
          color='primary'
        />
      ) : (
        <Chip
          label={`${props.label}`}
          className={c.chipItem}
          onClick={e => handleSchoolTypeChipClick(e, props.chipValue)}
          variant='outlined'
        />
      )}
    </React.Fragment>
  )
}

export default SchoolTypeChip