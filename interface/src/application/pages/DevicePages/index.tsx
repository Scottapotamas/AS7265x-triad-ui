import { RouteComponentProps, Router } from '@reach/router'

import { DisconnectionModal } from '@electricui/components-desktop-blueprint'
import { Intent, Button, Alignment } from '@blueprintjs/core'
import { OverviewPage } from './OverviewPage'
import React from 'react'
import { navigate } from '@electricui/utility-electron'
import {} from '@blueprintjs/core'

interface InjectDeviceIDFromLocation {
  deviceID?: string
}

export const DevicePages = (
  props: RouteComponentProps & InjectDeviceIDFromLocation,
) => {
  if (!props.deviceID) {
    return <div>No deviceID?</div>
  }

  return (
    <React.Fragment>
      <DisconnectionModal
        intent={Intent.WARNING}
        icon="satellite"
        navigateToConnectionsScreen={() => navigate('/')}
      >
        <p>
          Connection has been lost with your device. If we successfully
          reconnect this dialog will be dismissed.
        </p>
      </DisconnectionModal>
      <Button
        minimal
        large
        icon="home"
        text="Back"
        onClick={() => {
          navigate('/')
        }}
      />
      <div className="device-pages">
        <div className="device-content">
          <OverviewPage path="/" />
        </div>
      </div>
    </React.Fragment>
  )
}
