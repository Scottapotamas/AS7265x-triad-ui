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

import { SensorInfo } from './SensorInfo'
import { SensorSettings } from './SensorSettings'
import { SpectraDisplay } from './SpectraDisplay'
import { LoggingControls } from './LoggingControls'

const SparklineStats = () => {
  return (
    <React.Fragment>
      <div style={{ textAlign: 'right', marginBottom: '1em' }}>
        <Printer accessor="rate" />
        ms <b>Loop Time</b>
      </div>

      <ChartContainer height={100}>
        <LineChart dataSource={looptimeDataSource} maxItems={1000} />
        <RealTimeDomain window={10000} yMin={95} yMax={105} delay={100} />
      </ChartContainer>
      <IntervalRequester interval={500} variable="temp" />
      <div style={{ textAlign: 'right', marginBottom: '1em' }}>
        <Printer accessor="temp" precision={0} />° <b>Sensor Temperature</b>
      </div>
      <ChartContainer height={100}>
        <LineChart dataSource={tempDataSource} maxItems={1000} />

        <RealTimeDomain window={15000} yMin={20} yMax={40} delay={1000} />
      </ChartContainer>
    </React.Fragment>
  )
}

const looptimeDataSource = new MessageDataSource('rate')
const tempDataSource = new MessageDataSource('temp')

const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, indx) => start + indx)

export const OverviewPage = (props: RouteComponentProps) => {
  return (
    <React.Fragment>
      <Composition gap={10} templateCols="400px auto">
        <Composition gap={10} alignContent="start">
          <BlueprintButton
            fill
            minimal
            outlined
            text="Connections Page"
            icon="chevron-left"
            onClick={() => {
              navigate('/')
            }}
          />
          <Box>
            <Card>
              <SensorInfo />
            </Card>
          </Box>
          <Box>
            <Card>
              <SensorSettings />
            </Card>
          </Box>
          <Box>
            <Card>
              <LoggingControls />
            </Card>
          </Box>
        </Composition>

        <Composition gap={10} >
          <Box>
            <Card>
              <SpectraDisplay />
            </Card>
          </Box>
          {/* <Box>
            <SparklineStats />
          </Box> */}
        </Composition>
      </Composition>
    </React.Fragment>
  )
}
