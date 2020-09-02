import {
  ChartContainer,
  LineChart,
  RealTimeDomain,
  TimeAxis,
  VerticalAxis,
} from '@electricui/components-desktop-charts'

import {
  Card,
  Colors,
  Popover,
  Button as BlueprintButton,
  HTMLTable,
} from '@blueprintjs/core'

import { Composition, Box } from 'atomic-layout'
import { IntervalRequester } from '@electricui/components-core'
import { MessageDataSource } from '@electricui/core-timeseries'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import {
  Slider,
  ProgressBar,
  RadioGroup,
  Checkbox,
  Switch,
  NumberInput,
} from '@electricui/components-desktop-blueprint'
import { Printer } from '@electricui/components-desktop'
import { render } from 'react-dom'
import { navigate } from '@electricui/utility-electron'

const layoutDescription = `
  Sensor Sparklines
  Sensor Config
`

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

        <RealTimeDomain window={30000} yMin={10} yMax={40} delay={1000} />
      </ChartContainer>
    </React.Fragment>
  )
}

const LEDCurrentSettings = () => {
  return (
    <Composition templateCols="1fr 1fr" padding={20} gap={40}>
      <Box>
        <h4>NIR LED</h4>
        <RadioGroup
          accessor={state => state.current[0]}
          writer={(state, value) => {
            state.current[0] = value
          }}
        >
          <RadioGroup.Radio value={0} label="12.5 mA" />
          <RadioGroup.Radio value={1} label="25 mA" />
          <RadioGroup.Radio value={2} label="50 mA" />
          <RadioGroup.Radio value={3} label="100 mA" disabled />
        </RadioGroup>
      </Box>
      <Box>
        <h4>Visible LED</h4>
        <RadioGroup
          accessor={state => state.current[1]}
          writer={(state, value) => {
            state.current[1] = value
          }}
        >
          <RadioGroup.Radio value={0} label="12.5 mA" />
          <RadioGroup.Radio value={1} label="25 mA" />
          <RadioGroup.Radio value={2} label="50 mA" />
          <RadioGroup.Radio value={3} label="100 mA" />
        </RadioGroup>
      </Box>
    </Composition>
  )
}

const SensorSettings = () => {
  return (
    <React.Fragment>
      <Composition templateCols="1fr 1fr" gap={10} style={{ height: '100%' }}>
        <Box>
          <h4 style={{ marginTop: '0em' }}>Operation</h4>
          Mode: <Printer accessor={state => state.mode} />
          <br />
          Temp: <Printer accessor={state => state.temp.toFixed(1)} /> °C
        </Box>

        <Box>
          <h4 style={{ marginTop: '0em' }}>Sensor Info</h4>
          {/* <HTMLTable condensed> */}
          <table style={{ borderSpacing: '0px' }}>
            <tr>
              <td>Device</td>
              <td style={{ paddingLeft: '0.5em' }}>
                <Printer accessor={state => state.version[0]} />
              </td>
            </tr>
            <tr>
              <td>Hardware</td>
              <td style={{ paddingLeft: '0.5em' }}>
                <Printer accessor={state => state.version[1]} />
              </td>
            </tr>
            <tr>
              <td>Firmware</td>
              <td style={{ paddingLeft: '0.5em' }}>
                <Printer accessor={state => state.version[2]} />.
                <Printer accessor={state => state.version[3]} />.
                <Printer accessor={state => state.version[4]} />
              </td>
            </tr>
          </table>
          {/* </HTMLTable> */}
        </Box>

        <Composition templateCols="1fr 1fr" alignItems="center" gapCol={20}>
          <h4>Samples:</h4>

          <NumberInput accessor="integrate" style={{ maxWidth: '150px' }} />
        </Composition>
        <Box></Box>

        <Box>
          <h4 style={{ marginTop: '0em' }}>Gain Control</h4>

          <RadioGroup accessor="gain">
            <RadioGroup.Radio value={0} label="1x" />
            <RadioGroup.Radio value={1} label="3.7x" />
            <RadioGroup.Radio value={2} label="16x" />
            <RadioGroup.Radio value={3} label="64x" />
          </RadioGroup>
        </Box>
        <Box>
          <h4 style={{ marginTop: '0em' }}>Light Source</h4>
          <Checkbox
            accessor={state => state.bulb[0]}
            checked={1}
            unchecked={0}
            writer={(state, value) => {
              state.bulb[0] = value
            }}
          >
            Near-IR
          </Checkbox>
          <Checkbox
            accessor={state => state.bulb[1]}
            checked={1}
            unchecked={0}
            writer={(state, value) => {
              state.bulb[1] = value
            }}
          >
            Daylight
          </Checkbox>
          <Checkbox
            accessor={state => state.bulb[2]}
            checked={1}
            unchecked={0}
            writer={(state, value) => {
              state.bulb[2] = value
            }}
          >
            Ultraviolet
          </Checkbox>
          {/* <br /> */}
          <Popover content={<LEDCurrentSettings />}>
            <BlueprintButton fill text="LED Current" icon="settings" />
          </Popover>
          <br />
        </Box>
        <Box>
          <div style={{ paddingTop: '0.5em' }}>
            <Switch
              unchecked={0}
              checked={1}
              accessor={state => state.indicator}
              writer={(state, value) => {
                state.indicator = value
              }}
            >
              Status LED
            </Switch>
          </div>
        </Box>
        <Box>
          <BlueprintButton
            fill
            text="Calibration"
            icon="step-chart"
            onClick={() => {
              navigate('/')
            }}
          />
        </Box>
      </Composition>
    </React.Fragment>
  )
}
const looptimeDataSource = new MessageDataSource('rate')
const spectraDataSource = new MessageDataSource('spec')
const tempDataSource = new MessageDataSource('temp')

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
]

export const OverviewPage = (props: RouteComponentProps) => {
  return (
    <React.Fragment>
      <Composition
        areas={layoutDescription}
        gap={10}
        autoCols="3fr 1fr"
        justifyContent="space-around"
        style={{ height: '100%' }}
      >
        {Areas => (
          <>
            <Areas.Sensor>
              <Card>
                <ChartContainer height={700}>
                  {Array.from(new Array<Number>(18)).map((_, index) => (
                    <LineChart
                      dataSource={spectraDataSource}
                      accessor={state => state.spec[index]}
                      maxItems={1000}
                      color={colors[index]}
                    />
                  ))}
                  <RealTimeDomain window={10000} delay={80} yMin={0} />
                  <TimeAxis />
                  <VerticalAxis />
                </ChartContainer>
              </Card>
            </Areas.Sensor>

            <Areas.Sparklines>
              <SparklineStats />
            </Areas.Sparklines>

            <Areas.Bars>
              <Card>
                {Array.from(new Array<Number>(18)).map((_, index) => (
                  <React.Fragment>
                    <ProgressBar
                      accessor={state => state.spec[index]}
                      min={0}
                      max={255}
                      // style={{ backgroundColor: '#0066cc' }}
                    />
                    <br />
                  </React.Fragment>
                ))}
              </Card>
            </Areas.Bars>

            <Areas.Config>
              <Card>
                <SensorSettings />
              </Card>
            </Areas.Config>
          </>
        )}
      </Composition>
    </React.Fragment>
  )
}
