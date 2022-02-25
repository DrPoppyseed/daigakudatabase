// @flow
import * as React from 'react'
import { Button, Divider, ListItem, Container } from '@material-ui/core'
import clsx from 'clsx'
import SATSlider from '../SATSlider'
import TuitionSlider from '../TuitionSlider'
import UrbanButtonGroup from '../UrbanButtonGroup'
import StateSelector from '../StateSelector'
import SchoolTypeForm from '../SchoolTypeForm'
import { Delete as DeleteIcon } from '@material-ui/icons'
import useStyles from './styles'
import { HomeContext } from '../../../../HomeContext'

const FilterInner = () => {
  const c = useStyles()
  const { handleSearchClick, handleClearCriteria } =
    React.useContext(HomeContext)
  return (
    <Container className={c.filterInnerContainer}>
      <ListItem className={c.listItem}>
        <Button
          variant="contained"
          color="primary"
          className={c.filterSearchButton}
          onClick={handleSearchClick}>
          条件がけで検索
        </Button>
      </ListItem>
      <Divider />
      <ListItem className={c.listItem}>
        <SchoolTypeForm />
      </ListItem>
      <Divider />
      <ListItem className={clsx(c.testRangeContainer, c.listItem)}>
        <SATSlider />
      </ListItem>
      <Divider />
      <ListItem className={c.listItem}>
        <TuitionSlider />
      </ListItem>
      <Divider />
      <ListItem className={clsx(c.buttonGroupContainer, c.listItem)}>
        <UrbanButtonGroup />
      </ListItem>
      <Divider />
      <ListItem className={c.listItem}>
        <StateSelector />
      </ListItem>
      <Divider />
      <ListItem className={c.listItem}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<DeleteIcon />}
          className={c.filterSearchButton}
          onClick={handleClearCriteria}>
          条件をクリアする
        </Button>
      </ListItem>
    </Container>
  )
}

export default FilterInner