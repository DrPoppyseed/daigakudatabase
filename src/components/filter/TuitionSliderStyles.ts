import { createStyles, makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tuitionRangeSlider: {
      width: '100%',
    },
    tuitionRangeText: {
      marginBottom: theme.spacing(1),
    },
  })
)

export default useStyles
