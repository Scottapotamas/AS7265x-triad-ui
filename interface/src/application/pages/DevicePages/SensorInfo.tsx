import React from 'react'

import { Composition, Box } from 'atomic-layout'
import { Printer } from '@electricui/components-desktop'

export const SensorInfo = () => {
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
        </Box>
      </Composition>
    </React.Fragment>
  )
}
