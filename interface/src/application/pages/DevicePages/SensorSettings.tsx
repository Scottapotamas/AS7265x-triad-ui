import React from 'react'

import {
  Card,
  Colors,
  Popover,
  Button as BlueprintButton,
  HTMLTable,
} from '@blueprintjs/core'
import { Composition, Box } from 'atomic-layout'

import {
  RadioGroup,
  Checkbox,
  Switch,
  NumberInput,
} from '@electricui/components-desktop-blueprint'

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

export const SensorSettings = () => {
  return (
    <React.Fragment>
      <Composition templateCols="1fr 1fr" gap={10} style={{ height: '100%' }}>
        
        <Composition templateCols="1fr 1fr" alignItems="center" justifyContent="space-between" gapCol={20}>
          <h4>Samples:</h4>

          <div style={{maxWidth: '200px'}}>
          <NumberInput accessor="integrate" />
          </div>
            
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
      </Composition>
    </React.Fragment>
  )
}

