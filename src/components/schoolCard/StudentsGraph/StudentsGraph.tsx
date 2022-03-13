import D3StudentsViz from './D3StudentsGraph'
import { List, ListItemButton, Typography } from '@mui/material'
import React, { FC } from 'react'
import { KeyValueObject } from '../../../types/common'
import { SexGraphics } from '../../../util/constants'
import { DemographicsGraphics } from '../../../constants/DemographicsGraphics'
import useStyles from './StudentsGraphStyles'

export interface StudentsGraphProps {
  students: any
  unitid: string
}

const StudentsGraph: FC<StudentsGraphProps> = ({ students, unitid }) => {
  const c = useStyles()
  const [highlightedRace, setHighlightedRace] = React.useState('')

  const cleanDemographicsData = (rawData: KeyValueObject) =>
    Object.entries(rawData).reduce(
      (prev, [key, value]) => [
        ...prev,
        {
          race: key,
          percentage: value,
          color: DemographicsGraphics[key].color,
          ja: DemographicsGraphics[key].ja,
        },
      ],
      [] as {
        race: string
        percentage: number
        color: string
        ja: string
      }[]
    )

  const cleanSexData = (men: number, women: number) => [
    {
      sex: 'men',
      percentage: men,
      color: SexGraphics.men.color,
      ja: SexGraphics.men.color,
    },
    {
      sex: 'women',
      percentage: women,
      color: SexGraphics.women.color,
      ja: SexGraphics.women.ja,
    },
  ]

  return (
    <div className={c.graphContainer}>
      {students.enrollment.men !== null ||
      students.enrollment.demographics.white !== null ? (
        <div className={c.studentsGraphContainer}>
          <div className={`D3StudentsGraphContainer-${unitid}`}>
            <D3StudentsViz
              height={210}
              width={250}
              sex={cleanSexData(
                students.enrollment.men,
                students.enrollment.women
              )}
              demographics={cleanDemographicsData(
                students.enrollment.demographics
              )}
              identifier={`D3StudentsGraphContainer-${unitid}`}
              highlightedRace={highlightedRace}
            />
          </div>
          <div className={c.studentsTextBlock}>
            <Typography variant='caption'>
              生徒総数：{students.enrollment.size}人
            </Typography>
            <List className={c.raceNamesContainer}>
              {cleanDemographicsData(students.enrollment.demographics).map(
                d => {
                  const itemId = `slice-D3StudentsGraphContainer-${unitid}-${d.race}`
                  return (
                    <ListItemButton
                      className={c.raceNameContainer}
                      key={`${unitid}-${d.race}`}
                      onMouseEnter={() => setHighlightedRace(itemId)}
                      onMouseLeave={() => setHighlightedRace('')}
                    >
                      <div
                        className={c.raceIndicatorColorBox}
                        style={{ backgroundColor: `${d.color}` }}
                      />
                      <Typography variant='caption'>
                        {d.ja}：{d.percentage}%
                      </Typography>
                    </ListItemButton>
                  )
                }
              )}
            </List>
          </div>
        </div>
      ) : (
        <div className={c.nullStudentsGraphContainer}>データがありません。</div>
      )}
    </div>
  )
}

export default StudentsGraph