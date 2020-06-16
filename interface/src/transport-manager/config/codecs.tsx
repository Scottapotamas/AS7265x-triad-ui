import { Codec, Message, PushCallback } from '@electricui/core'

import { LEDSettings } from '../../application/typedState'
import { SmartBuffer } from 'smart-buffer'

/**
 * If you are following the hello-blink example, structure use needs to be added.
 * Follow the getting started tutorial for UI development for notes.
 */
export class LEDCodec extends Codec {
  filter(message: Message): boolean {
    return message.messageID === 'led'
  }

  encode(message: Message<LEDSettings>, push: PushCallback<Message<Buffer>>) {
    // The null case
    if (message.payload === null) {
      return push(message.setPayload(Buffer.alloc(0)))
    }

    // SmartBuffers automatically keep track of read and write offsets / cursors.
    const packet = new SmartBuffer({ size: 4 })
    packet.writeUInt16LE(message.payload.glow_time)
    packet.writeUInt8(message.payload.enable)

    // Push it up the pipeline
    return push(message.setPayload(packet.toBuffer()))
  }

  decode(
    message: Message<Buffer>,
    push: PushCallback<Message<LEDSettings | null>>,
  ) {
    // The null case
    if (message.payload === null) {
      console.log('LED custom type payload was null')
      return push((message as unknown) as Message<null>)
    }

    const reader = SmartBuffer.fromBuffer(message.payload)

    const settings: LEDSettings = {
      glow_time: reader.readUInt16LE(),
      enable: reader.readUInt8(),
    }

    // Push it up the pipeline
    return push(message.setPayload(settings))
  }
}

// Create the instances of the codecs
export const customCodecs = [
  new LEDCodec(), // An instance of the LEDSettings Codec
]
