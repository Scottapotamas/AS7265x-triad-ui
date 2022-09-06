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
  EventColumnDataSource,
  PolledColumnDataSource,
} from '@electricui/components-desktop-charts'
import { IntervalRequester, useHardwareState } from '@electricui/components-core'
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
  const spectralData = useHardwareState('spec')
  const numWavelengths: number = spectralData?.length ?? 0

  let columnFields : PolledColumnDataSource[] = []

  if( numWavelengths )
  {
    for(let wavelength = 0; wavelength < numWavelengths; wavelength++ )
    {
      const field: PolledColumnDataSource = {
        dataSource: spectraDataSource,
        column: `${SpectraWavelengths[wavelength]}nm`,
        accessor: event => event[wavelength],
      }
  
      columnFields.push(field)
    }
  
  }

  return (
    <React.Fragment>
      <PolledCSVLogger
        interval={50}
        columns={columnFields}
      />
    </React.Fragment>
  )
}
