// Import required modules
const componentMappings = {
  resistor: ['resistor', 'resistance'],
  capacitor: ['capacitor', 'cap'],
  ic: ['integrated circuit', 'ic', 'microchip'],
  connector: ['connector', 'port', 'socket', 'connector socket'],
  led: ['led', 'light emitting diode'],
  transistor: ['transistor', 'bjt', 'mosfet', 'fet'],
  diode: ['diode', 'rectifier'],
  inductor: ['inductor', 'coil', 'choke'],
  switch: ['switch', 'button', 'toggle', 'pushbutton'],
  relay: ['relay', 'contactor', 'electromechanical relay'],
  fuse: ['fuse', 'circuit breaker', 'circuit protector'],
  transformer: ['transformer', 'xfmr', 'voltage transformer'],
  crystal: ['crystal', 'oscillator', 'quartz crystal'],
  battery: ['battery', 'cell'],
  potentiometer: ['potentiometer', 'pot', 'variable resistor'],
  thermistor: ['thermistor', 'temperature sensor'],
  photoresistor: ['photoresistor', 'ldr', 'light dependent resistor'],
  piezoelectric: ['piezoelectric', 'piezo', 'buzzer'],
  motor: ['motor', 'actuator', 'electric motor'],
  servo: ['servo', 'servo motor'],
  encoder: ['encoder', 'rotary encoder', 'decoder'],
  display: ['display', 'lcd', 'oled', 'led display'],
  keypad: ['keypad', 'keyboard'],
  sensor: ['sensor', 'detector', 'transducer'],
  accelerometer: ['accelerometer', 'acceleration sensor'],
  gyroscope: ['gyroscope', 'gyro'],
  magnetometer: ['magnetometer', 'compass'],
  gps: ['gps', 'global positioning system'],
  rfid: ['rfid', 'radio frequency identification'],
  nfc: ['nfc', 'near field communication'],
  bluetooth: ['bluetooth', 'ble'],
  wifi: ['wifi', 'wireless', 'wireless lan'],
  antenna: ['antenna', 'aerial'],
  microphone: ['microphone', 'mic'],
  speaker: ['speaker', 'loudspeaker'],
  amplifier: ['amplifier', 'amp', 'op-amp'],
  opamp: ['opamp', 'operational amplifier'],
  comparator: ['comparator'],
  regulator: ['regulator', 'voltage regulator'],
  converter: ['converter', 'adc', 'dac'],
  mcu: ['mcu', 'microcontroller'],
  fpga: ['fpga', 'field programmable gate array'],
  memory: ['memory', 'ram', 'rom', 'eeprom'],
  clock: ['clock', 'oscillator'],
  filter: ['filter', 'capacitive filter', 'inductive filter'],
  attenuator: ['attenuator', 'pad'],
  coupler: ['coupler', 'directional coupler'],
  balun: ['balun', 'balanced-unbalanced'],
  mixer: ['mixer', 'frequency mixer'],
  multiplexer: ['multiplexer', 'mux'],
  demultiplexer: ['demultiplexer', 'demux'],
  transceiver: ['transceiver', 'transmitter', 'receiver'],
  modem: ['modem', 'modulator', 'demodulator'],
  optocoupler: ['optocoupler', 'optoisolator'],
  power_supply: ['power supply', 'psu'],
  pcb: ['printed circuit board', 'pcb'],
  heatsink: ['heatsink', 'heat sink'],
  fan: ['fan', 'cooling fan'],
  cable: ['cable', 'wire', 'jumper'],
  touchpad: ['touchpad', 'touch pad'],
  solenoid: ['solenoid', 'electromagnetic coil'],
  photodiode: ['photodiode', 'light sensor'],
  ethernet: ['ethernet'],
  usb: ['usb', 'universal serial bus'],
  serial: ['serial', 'uart', 'rs232'],
  spi: ['spi', 'serial peripheral interface'],
  i2c: ['i2c', 'inter-integrated circuit'],
  };

// Function to parse user answers and identify components
function identifyComponents(answers) {
  let identifiedComponents = [];

  answers.forEach(answer => {
    Object.keys(componentMappings).forEach(component => {
      componentMappings[component].forEach(term => {
        if (answer.toLowerCase().includes(term)) {
          identifiedComponents.push(component);
        }
      });
    });
  });

  // Remove duplicates
  identifiedComponents = [...new Set(identifiedComponents)];

  console.log("Identified components from user answers:", identifiedComponents);

  return identifiedComponents;
}

module.exports = { identifyComponents };