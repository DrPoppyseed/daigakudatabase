// @flow
import * as React from 'react'
import clsx from 'clsx'
import useStyles from './styles'
import { Fab, Typography, Container, Card } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import Skeleton from '@material-ui/lab/Skeleton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { Helmet } from 'react-helmet'
import { useQueryClient } from 'react-query'

import ScrollTop from '../Common/ScrollTop/ScrollTop.jsx'
import SchoolCardLarge from '../SchoolCards/SchoolCardLarge/SchoolCardLarge.jsx'
import SchoolCardLargeSkeleton from '../SchoolCards/SchoolCardLarge/SchoolCardLargeSkeleton.jsx'
import FilterBox from './FilterBox/FilterBox'
import SortByBox from './SortByBox/SortByBox'
import {
  DEFAULT_SAT_RANGE_LOW,
  DEFAULT_SAT_RANGE_HIGH,
  DEFAULT_TOEFL_RANGE,
  DEFAULT_TUITION_RANGE_HIGH,
  DEFAULT_TUITION_RANGE_LOW,
} from '../../util/final'
import { getSchools, useGetSchools } from '../../hooks/useSchools'

const Home = (props: any): React.Element<any> => {
  const c = useStyles()
  const queryClient = useQueryClient()
  const [pageNumber, setPageNumber] = React.useState(1)
  const [satRange, setSatRange] = React.useState([
    DEFAULT_SAT_RANGE_LOW || 600,
    DEFAULT_SAT_RANGE_HIGH || 1600,
  ])
  const [toeflRange, setToeflRange] = React.useState(DEFAULT_TOEFL_RANGE || 60)
  const [tuitionRange, setTuitionRange] = React.useState([
    DEFAULT_TUITION_RANGE_LOW || 0,
    DEFAULT_TUITION_RANGE_HIGH || 60000,
  ])
  const [stateLocation, setStateLocation] = React.useState('')
  const [selectMajor, setSelectMajor] = React.useState('')
  const [filterState, setFilterState] = React.useState({
    fourYear: false,
    twoYear: false,
    publicSchool: false,
    privateSchool: false,
    communityCollege: false,
    technicalCollege: false,
    other: false,
    liberalArtsCollege: false,
  })
  const [sortSelection, setSortSelection] = React.useState('default')
  const [searchCriteria, setSearchCriteria] = React.useState({
    satRange,
    toeflRange,
    tuitionRange,
    stateLocation,
    selectMajor,
    filterState,
    sortSelection,
  })

  const { status, data, isFetching } = useGetSchools(pageNumber, searchCriteria)

  React.useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(['projects', pageNumber + 1], () =>
        getSchools(pageNumber + 1)
      )
    }
  }, [data, pageNumber, queryClient, searchCriteria])

  const handlePageChange = (e, num) => {
    ;(e.target.ownerDocument || document)
      .querySelector('#back-to-top-anchor')
      .scrollIntoView({ behavior: 'instant', block: 'start' })
    setPageNumber(num)
  }

  const useSearchClick = () => {
    setSearchCriteria({
      satRange,
      toeflRange,
      tuitionRange,
      stateLocation,
      selectMajor,
      filterState,
      sortSelection,
    })
  }

  const handleClearCriteria = () => {
    setSatRange([DEFAULT_SAT_RANGE_LOW, DEFAULT_SAT_RANGE_HIGH])
    setToeflRange([DEFAULT_TOEFL_RANGE])
    setTuitionRange([DEFAULT_TUITION_RANGE_LOW, DEFAULT_TUITION_RANGE_HIGH])
    setStateLocation('')
    setSelectMajor('')
    setSortSelection('default')
    setFilterState({
      fourYear: false,
      twoYear: false,
      publicSchool: false,
      privateSchool: false,
      communityCollege: false,
      technicalCollege: false,
      other: false,
      liberalArtsCollege: false,
    })
  }

  const handleFilterChange = e => {
    setFilterState({ ...filterState, [e.target.name]: e.target.checked })
  }

  const handleSatRange = (e, newValue) => {
    setSatRange(newValue)
  }

  const handleToeflRange = (e, newValue) => {
    setToeflRange(newValue)
  }

  const handleTuitionRange = (e, newValue) => {
    setTuitionRange(newValue)
  }

  const handleStateLocationChange = e => {
    setStateLocation(e.target.value)
  }

  const handleMajorChange = e => {
    setSelectMajor(e.target.value)
  }

  const handleSortSelectionChange = e => {
    setSortSelection(e.target.value)
    setSearchCriteria({
      satRange,
      toeflRange,
      tuitionRange,
      stateLocation,
      selectMajor,
      filterState,
      sortSelection: `${e.target.value}`,
    })
  }
  const mapSchools = (schools: Array): Array<React.Node> => {
    return schools.map(school => (
      <SchoolCardLarge key={school.uuid} school={school} />
    ))
  }
  const renderSchools = React.useMemo(
    () => !!data && mapSchools(data.schools),
    [data]
  )

  return (
    <div className={c.root}>
      <Helmet>
        <title>アメリカ大学を検索しよう</title>
        <meta name="description" content="アメリカ大学のデータベース。" />
      </Helmet>
      <div className={c.filterContainer}>
        <FilterBox
          states={{
            satRange,
            toeflRange,
            tuitionRange,
            stateLocation,
            selectMajor,
            filterState,
          }}
          handleFilterChange={handleFilterChange}
          handleSatRange={handleSatRange}
          handleToeflRange={handleToeflRange}
          handleTuitionRange={handleTuitionRange}
          handleStateLocationChange={handleStateLocationChange}
          handleMajorChange={handleMajorChange}
          handleSearchClick={useSearchClick}
          handleClearCriteria={handleClearCriteria}
        />
      </div>
      <Container
        className={clsx(
          c.cardsContainer,
          status === 'loading' && c.rootLoading
        )}>
        {/** TODO: add chips for different university rankings and lists */}
        {status === 'loading' || isFetching ? (
          <div>
            <Card style={{ marginBottom: 16 }}>
              <Skeleton
                animation="wave"
                variant="rect"
                width={700}
                height={85}
              />
            </Card>
            <SchoolCardLargeSkeleton />
            <SchoolCardLargeSkeleton />
            <SchoolCardLargeSkeleton />
            <SchoolCardLargeSkeleton />
            <SchoolCardLargeSkeleton />
            <SchoolCardLargeSkeleton />
            <SchoolCardLargeSkeleton />
            <SchoolCardLargeSkeleton />
          </div>
        ) : status === 'error' ? (
          'エラー発生'
        ) : data.totalSchoolsFound === 0 ? (
          <Typography
            variant="caption"
            style={{ textAlign: 'center', marginTop: 20 }}>
            条件にあった学校は見つかりませんでした。
          </Typography>
        ) : (
          <div>
            <SortByBox
              hits={data.totalSchoolsFound}
              pageNumber={pageNumber}
              sortSelection={sortSelection}
              handleSortSelectionChange={handleSortSelectionChange}
            />
            {renderSchools}
          </div>
        )}
        {status === 'success' && !isFetching && (
          <Pagination
            count={Math.ceil(data.totalSchoolsFound / 8)}
            page={pageNumber}
            className={c.pagination}
            onChange={handlePageChange}
          />
        )}
      </Container>
      <ScrollTop {...props}>
        <Fab aria-label="key arrow up" className={c.fab}>
          <KeyboardArrowUpIcon className={c.fabIcon} />
        </Fab>
      </ScrollTop>
    </div>
  )
}
export default Home
