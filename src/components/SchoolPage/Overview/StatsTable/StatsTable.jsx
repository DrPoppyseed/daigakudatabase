// think of fields to include, and create a simple table
// use React.useMemo to set the data!

/**
 * 1. retrieve data from props
 * 2. use react-table to create a table
 * 	  - it would be nice if the table had a way to deal with
 * 		- null values
 *
 * 		- What info would we want to display ?
 */

// @flow
import * as React from 'react'
import { Table, TableContainer } from '@material-ui/core'
import {
  LocationCity as LocationCityIcon,
  People as PeopleIcon,
  Equalizer as EqualizerIcon,
  OpenInNew as OpenInNewIcon,
  AttachMoney as AttachMoneyIcon,
} from '@material-ui/icons'

import useStyles from './styles'
import TableNode from '../TableNode/TableNode'

const StatsTable = ({
  basicInfo = {},
}: {
  basicInfo: Object,
}): React.Element<any> => {
  const c = useStyles()

  const {
    school_homepage_url,
    campus_address_short,
    admission_rate,
    students,
    cost,
  } = basicInfo

  return (
    <TableContainer>
      <Table className={c.table} aria-label="学校の基本情報">
        <tbody>
          <TableNode
            title={'学校ホームページ'}
            content={`${school_homepage_url}`}>
            <OpenInNewIcon
              fontSize="small"
              style={{ marginRight: 10, color: 'blue' }}
            />
          </TableNode>
          <TableNode title={'キャンパス'} content={`${campus_address_short}`}>
            <LocationCityIcon
              fontSize="small"
              style={{ marginRight: 10, color: 'green' }}
            />
          </TableNode>
          <TableNode title="入学合格率" content={`${admission_rate}%`}>
            <EqualizerIcon
              fontSize="small"
              style={{ marginRight: 10, color: 'green' }}
            />
          </TableNode>
          <TableNode title="学生総数" content={`${students.size}人`}>
            <PeopleIcon
              fontSize="small"
              style={{ marginRight: 10, color: 'grey' }}
            />
          </TableNode>
          {/* TODO: get student vs faculty ratio */}
          <TableNode title="教師一人当たりの学生数" content={`${'未測定'}人`}>
            <PeopleIcon
              fontSize="small"
              style={{ marginRight: 10, color: 'red' }}
            />
          </TableNode>
          <TableNode
            title="学費"
            content={`${cost.in_state_tuition} ~ ${cost.out_of_state_tuition}`}>
            <AttachMoneyIcon
              fontSize="small"
              style={{ marginRight: 10, color: 'yellow' }}
            />
          </TableNode>
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default StatsTable