import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { render } from 'react-dom'
import { navigate } from '@electricui/utility-electron'

import {
  Card,
  Colors,
  Popover,
  Button as BlueprintButton,
  HTMLTable,
} from '@blueprintjs/core'
import { Composition, Box } from 'atomic-layout'

import {
  ChartContainer,
  LineChart,
  RealTimeDomain,
  RealTimeSlicingDomain,
  BarChartDomain,
  TimeAxis,
  VerticalAxis,
  HorizontalAxis,
  BarChart,
} from '@electricui/components-desktop-charts'
import { IntervalRequester } from '@electricui/components-core'
import { MessageDataSource } from '@electricui/core-timeseries'
import { PolledCSVLogger } from '@electricui/components-desktop-blueprint-loggers'
import {
  Slider,
  ProgressBar,
  RadioGroup,
  Checkbox,
  Switch,
  NumberInput,
} from '@electricui/components-desktop-blueprint'
import { Printer } from '@electricui/components-desktop'

const spectraDataSource = new MessageDataSource('spec')

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

export const LoggingControls = (props: RouteComponentProps) => {
  return (
    <React.Fragment>
      <PolledCSVLogger
        interval={50}
        columns={[
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[0]}nm`,
            accessor: event => event[0],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[1]}nm`,
            accessor: event => event[1],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[2]}nm`,
            accessor: event => event[2],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[3]}nm`,
            accessor: event => event[3],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[4]}nm`,
            accessor: event => event[4],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[5]}nm`,
            accessor: event => event[5],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[6]}nm`,
            accessor: event => event[6],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[7]}nm`,
            accessor: event => event[7],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[8]}nm`,
            accessor: event => event[8],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[9]}nm`,
            accessor: event => event[9],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[10]}nm`,
            accessor: event => event[10],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[11]}nm`,
            accessor: event => event[11],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[12]}nm`,
            accessor: event => event[12],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[13]}nm`,
            accessor: event => event[13],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[14]}nm`,
            accessor: event => event[14],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[15]}nm`,
            accessor: event => event[15],
          },
          {
            dataSource: spectraDataSource,
            column: `${SpectraWavelengths[16]}nm`,
            accessor: event => event[16],
          },
        ]}
      />
    </React.Fragment>
  )
}
