function decodeUplink(input) {
        return { 
            data: Decode(input.fPort, input.bytes, input.variables)
        };   
}

function Decode(fPort, bytes, port) {
// Decode an uplink message from a buffer
// (array) of bytes to an object of fields.
var value=bytes[0]<<24 | bytes[1]<<16 | bytes[2]<<8 | bytes[3];
if(bytes[0] & 0x80)
{
value |=0xFFFFFFFF00000000;
}
var latitude=0;//gps latitude,units: Â°
if(value !== 0)
{
  latitude=value/1000000;//gps latitude,units: Â°
}
else
{
  latitude=null;//gps latitude,units: Â°
}

value=bytes[4]<<24 | bytes[5]<<16 | bytes[6]<<8 | bytes[7];
if(bytes[4] & 0x80)
{
value |=0xFFFFFFFF00000000;
}
var longitude = 0;
if(value !== 0)
{
  longitude=value/1000000;//gps longitude,units: Â°
}
else
{
 longitude=null;//gps longitude,units: Â°
}

var alarm=(bytes[8] & 0x40)?"TRUE":"FALSE";//Alarm status

value=((bytes[8] & 0x3f) <<8) | bytes[9];
var batV=value/1000;//Battery,units:V

value=(bytes[10] & 0xC0);
if(value==0x40)
{
  var motion_mode="Move";
}
else if(value==0x80)
{
  motion_mode="Collide";
}
else if(value==0xC0)
{
  motion_mode="User";
}
else
{
  motion_mode="Disable";
}                                            //mode of motion

var led_updown=(bytes[10] & 0x20)?"ON":"OFF";//LED status for position,uplink and downlink

var Firmware = 160+(bytes[10] & 0x1f);  // Firmware version; 5 bits 

value=bytes[11]<<8 | bytes[12];
if(bytes[11] & 0x80)
{
value |=0xFFFF0000;
}
var roll=value/100;//roll,units: Â°

value=bytes[13]<<8 | bytes[14];
if(bytes[13] & 0x80)
{
value |=0xFFFF0000;
}
var pitch=value/100; //pitch,units: Â°

value=bytes[15];
var pdop =value/100; //pdop,units: Â°

value=bytes[16]<<8 | bytes[17];
if(bytes[16] & 0x80)
{
value |=0xFFFF0000;
}
var altitude =value/100; //Altitude,units: Â°

return {
latitude: latitude,
longitude: longitude,
roll: roll,
pitch:pitch,
BatV:batV,
alarm_status:alarm,
md:motion_mode,
led:led_updown,
fw:Firmware,
pdop:pdop,
altitude:altitude,
};
}
