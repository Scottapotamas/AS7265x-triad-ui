/**
 * To strictly type all accessors and writers, remove
 *
 * [messageID: string]: any
 *
 * And replace with your entire state shape after codecs have decoded them.
 */
declare global {
  interface ElectricUIDeveloperState {
    [messageID: string]: any

    readonly name: string
    readonly rate: number
    readonly version: [deviceType: number, hardwareVersion: number, majorFirmwareVersion: number, minorFirmwareVersion: number, patchFirmwareVersion: number]

    gain: number,
    mode: number,
    integrate: number,
    bulb: [number, number, number],
    current: [number, number, number],
    indicator: number,

    spec: number[]
    temp: number
  }
}

// Export custom struct types for use in both codecs and the application
export type LEDSettings = {
  glow_time: number
  enable: number
}

// This exports these types into the dependency tree.
export {}
