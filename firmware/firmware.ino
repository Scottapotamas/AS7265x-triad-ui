//Import the ElectricUI Library
#include "electricui.h"
#include "SparkFun_AS7265X.h" //Click here to get the library: http://librarymanager/All#SparkFun_AS7265X
#include <Wire.h>

AS7265X sensor;

uint8_t   led_state  = 0;

float   spectral_data[18] = { 0 };
float   temperature       = 0;
uint8_t version_info[5]   = { 0 };

uint8_t gain_setting        = 2;  //16x
uint8_t mode_setting        = 0;
uint8_t integration_setting = 3;
uint8_t bulb_setting[3]     = { 0 };
uint8_t current_setting[3]  = { 0 };
uint8_t indicator_setting   = 0;

// Loop timing info in msec
uint32_t loop_time = 0;
uint32_t start_time = 0;

char nickname[] = "Sparkfun Triad Spectrometer";

// Instantiate the communication interface's management object
eui_interface_t serial_comms = EUI_INTERFACE_CB( &serial_write, &eui_callback ); 

// Electric UI manages variables referenced in this array
eui_message_t tracked_variables[] = 
{
  // Misc stats etc
  EUI_CHAR_RO_ARRAY("name", nickname),
  EUI_UINT32( "rate", loop_time),
  EUI_UINT8_RO_ARRAY( "version",  version_info ),

  // User configurable
  EUI_UINT8("gain", gain_setting),
  EUI_UINT8("mode", mode_setting),
  EUI_UINT8("integrate", integration_setting),
  EUI_UINT8_ARRAY("bulb", bulb_setting),
  EUI_UINT8_ARRAY( "current", current_setting ),
  EUI_UINT8( "indicator", indicator_setting ),
  
  // Sensor Data
  EUI_FLOAT_RO_ARRAY( "spec", spectral_data ),
  EUI_FLOAT_RO( "temp", temperature ),
};

void setup() 
{
  // Setup the serial port and status LED
  Serial.begin( 115200 );
  pinMode( LED_BUILTIN, OUTPUT );

  // Provide the library with the interface we just setup
  eui_setup_interface( &serial_comms );

  // Provide the tracked variables to the library
  EUI_TRACK( tracked_variables );

  // Provide a identifier to make this board easy to find in the UI
  eui_setup_identifier( "hello", 5 );

  while(sensor.begin() == false)
  {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(50);
    digitalWrite(LED_BUILTIN, LOW);
    delay(350);
  }
  
  Wire.setClock(1000000);

  version_info[0] = sensor.getDeviceType();
  version_info[1] = sensor.getHardwareVersion();
  version_info[2] = sensor.getMajorFirmwareVersion();
  version_info[3] = sensor.getPatchFirmwareVersion();
  version_info[4] = sensor.getBuildFirmwareVersion();

  // Configure our sensor defaults
  sensor.setMeasurementMode(AS7265X_MEASUREMENT_MODE_6CHAN_CONTINUOUS);
  sensor.setIntegrationCycles(integration_setting); 
  sensor.setGain( gain_setting );
  
  sensor.setBulbCurrent(AS7265X_LED_CURRENT_LIMIT_12_5MA, AS7265x_LED_IR);
  sensor.enableBulb(AS7265x_LED_IR);
  bulb_setting[0] = 1;
  current_setting[0] = 0;
//  
//  sensor.setBulbCurrent(AS7265X_LED_CURRENT_LIMIT_12_5MA, AS7265x_LED_WHITE);
  sensor.enableBulb(AS7265x_LED_WHITE);
  bulb_setting[1] = 1;
  current_setting[1] = 0;
//
//  sensor.setBulbCurrent(AS7265X_LED_CURRENT_LIMIT_12_5MA, AS7265x_LED_UV);
  sensor.enableBulb(AS7265x_LED_UV);
  bulb_setting[2] = 1;
  current_setting[2] = 0;
//
//  sensor.setIndicatorCurrent(AS7265X_INDICATOR_CURRENT_LIMIT_2MA);
  sensor.disableIndicator();
  indicator_setting = 0;

}

void loop() 
{
  start_time = millis();
  serial_rx_handler();  //check for new inbound data

  if( sensor.dataAvailable() ) 
  {
    spectral_data[0] = sensor.getCalibratedA();  //410
    spectral_data[1] = sensor.getCalibratedB();  //435
    spectral_data[2] = sensor.getCalibratedC();  //460
    spectral_data[3] = sensor.getCalibratedD();  //485
    spectral_data[4] = sensor.getCalibratedE();  //510
    spectral_data[5] = sensor.getCalibratedF();  //535
    spectral_data[6] = sensor.getCalibratedG();  //560
    spectral_data[7] = sensor.getCalibratedH();  //585
    spectral_data[8] = sensor.getCalibratedR();  //610
    spectral_data[9] = sensor.getCalibratedI();  //645
    spectral_data[10] = sensor.getCalibratedS(); //680
    spectral_data[11] = sensor.getCalibratedJ(); //705
    spectral_data[12] = sensor.getCalibratedT(); //730
    spectral_data[13] = sensor.getCalibratedU(); //760
    spectral_data[14] = sensor.getCalibratedV(); //810
    spectral_data[15] = sensor.getCalibratedW(); //860
    spectral_data[16] = sensor.getCalibratedK(); //900
    spectral_data[17] = sensor.getCalibratedL(); //940

    eui_send_tracked("spec");
  }

  temperature = sensor.getTemperatureAverage();
        
  led_state = !led_state;
  digitalWrite( LED_BUILTIN, led_state ); //update the LED to match the intended state
  
  loop_time = millis() - start_time;
  eui_send_tracked("rate");
}

void serial_rx_handler()
{
  // While we have data, we will pass those bytes to the ElectricUI parser
  while( Serial.available() > 0 )  
  {  
    eui_parse( Serial.read(), &serial_comms );  // Ingest a byte
  }
}

void eui_callback( uint8_t message )
{
  switch(message)
  {
    case EUI_CB_TRACKED:    // UI recieved a tracked message ID and has completed processing
    {
      // Grab parts of the inbound packet which are are useful
      eui_header_t header   = serial_comms.packet.header;
      uint8_t      *name_rx = serial_comms.packet.id_in;
      void         *payload = serial_comms.packet.data_in;

      // See if the inbound packet name matches our intended variable
      if( strcmp( (char*)name_rx, "gain" ) == 0 )
      {
        constrain( gain_setting, 0, 4); // 1x, 3.7x, 16x, 64x
        sensor.setGain( gain_setting );
      }    
        
      if( strcmp( (char*)name_rx, "integrate" ) == 0 )
      {
        constrain( integration_setting, 0, 250); // 2.8ms each, double in mode 2 or 3
        sensor.setIntegrationCycles( integration_setting );
      }

      if( strcmp( (char*)name_rx, "bulb" ) == 0 )
      {
        ( bulb_setting[0] ) ? sensor.enableBulb(AS7265x_LED_IR)     : sensor.disableBulb(AS7265x_LED_IR);
        ( bulb_setting[1] ) ? sensor.enableBulb(AS7265x_LED_WHITE)  : sensor.disableBulb(AS7265x_LED_WHITE);
        ( bulb_setting[2] ) ? sensor.enableBulb(AS7265x_LED_UV)     : sensor.disableBulb(AS7265x_LED_UV);
      }
      
      if( strcmp( (char*)name_rx, "current" ) == 0 )
      {        
        // Settings are 12.5mA, 25mA, 50mA, 100mA
        constrain( current_setting[0], 0, 3); //IR has 65mA rating
        constrain( current_setting[1], 0, 3); //White has 120mA rating
        constrain( current_setting[2], 0, 1); //UV has 30mA rating

        sensor.setBulbCurrent( current_setting[0], AS7265x_LED_IR );
        sensor.setBulbCurrent( current_setting[1], AS7265x_LED_WHITE );
//        sensor.setBulbCurrent( current_setting[2], AS7265x_LED_UV );

      }

      if( strcmp( (char*)name_rx, "indicator" ) == 0 )
      {
        ( indicator_setting ) ? sensor.enableIndicator() : sensor.disableIndicator();
      }
      

    }
    break;

    case EUI_CB_UNTRACKED:
    {
      // UI passed in an untracked message ID
    }
    break;

    case EUI_CB_PARSE_FAIL:
      // Inbound message parsing failed, this callback help while debugging

    break;
  }
}

void serial_write( uint8_t *data, uint16_t len )
{
  Serial.write( data, len ); //output on the main serial port
}
