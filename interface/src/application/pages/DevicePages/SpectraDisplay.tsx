import React, { useCallback, useState } from 'react'

import { Alignment, Colors, HTMLTable, Switch } from '@blueprintjs/core'

import {
  ChartContainer,
  BarChartDomain,
  VerticalAxis,
  HorizontalAxis,
  BarChart,
} from '@electricui/components-desktop-charts'
import { MessageDataSource } from '@electricui/core-timeseries'
import { Printer } from '@electricui/components-desktop'
import { Composition, Box } from 'atomic-layout'
import { ALIGNMENT_LEFT } from '@blueprintjs/icons/lib/esm/generated/iconContents'

const spectraDataSource = new MessageDataSource('spec')

const colors = [
  Colors.VIOLET3,
  Colors.INDIGO3,
  Colors.COBALT3,
  Colors.BLUE3,
  Colors.TURQUOISE3,
  Colors.GREEN3,
  Colors.FOREST3,
  Colors.LIME3,
  Colors.GOLD3,
  Colors.ORANGE3,
  Colors.RED3,
  Colors.VERMILION3,
  Colors.ROSE4,
  Colors.SEPIA5,
  Colors.LIGHT_GRAY1,
  Colors.GRAY2,
  Colors.DARK_GRAY1,
]

export const SpectraWavelengths = [
  410,
  435,
  460,
  485,
  510,
  535,
  560,
  585,
  610,
  645,
  680,
  705,
  730,
  760,
  810,
  860,
  900,
  940,
]

const SpectraChart = () => {
  return (
    <ChartContainer height="80vh">
      <BarChart
        dataSource={spectraDataSource}
        columns={channel_num}
        barGap={0}
        color={colors}
      />
      <HorizontalAxis
        label="Wavelength (nm)"
        tickCount={channel_num}
        tickFormat={i => `${SpectraWavelengths[i]}`}
      />
      <VerticalAxis />

      <BarChartDomain xMin={0} xMax={17} yMin={0} yMax={250} />
    </ChartContainer>
  )
}

const SpectraTable = () => {
  return (
    <div style={{ height: '80vh' }}>
      <HTMLTable bordered interactive striped condensed style={{minWidth: '500px'}}>
        <thead>
          <tr>
            <th>Wavelength (nm)</th>
            <th>Counts</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(new Array(SpectraWavelengths.length)).map((_, index) => (
            <tr>
              <td>{SpectraWavelengths[index]}</td>
              <td>
                <span style={{ textAlign: 'left' }}>
                  <Printer accessor={state => state.spec[index]} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    </div>
  )
}

const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, indx) => start + indx)

const channel_num: number = 17

export const SpectraDisplay = () => {
  let [useTableView, setTableView] = useState(false)

  const updateChecked: React.FormEventHandler<HTMLInputElement> = useCallback(
    event => {
      setTableView((event.target as HTMLInputElement).checked)
    },
    [],
  )

  return (
    <div>
      <Composition>
        <Box justify="end">
        <Switch
        checked={useTableView}
        onChange={updateChecked}
        label="Table View"
        inline
        alignIndicator={Alignment.RIGHT}
      />

        </Box>
      {useTableView ? <SpectraTable /> : <SpectraChart />}

      </Composition>
    </div>
  )
}
