// @flow
import clsx from 'clsx'
import * as React from 'react'
import { TableCell, TableRow, Typography } from '@material-ui/core'

import useStyles from './styles'

type Props = {
  title: string,
  content: string,
  children: any,
}

const TableNode = ({
  title,
  content,
  children,
}: {
  ...Props,
}): React.Element<any> => {
  const c = useStyles()

  return (
    <TableRow className={c.root}>
      <TableCell className={c.titleCell} component="th" scope="row">
        <Typography className={clsx(c.tableItem, c.title)} variant="body2">
          {children}
          {title}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography className={clsx(c.tableItem, c.content)} variant="body2">
          {content}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default TableNode