const opciones = {
    timestampFormat:'YYYYMMDD h:mm:ss a',
    color:'red'
}
const simpleNodeLogger = require('simple-node-logger');
const log = simpleNodeLogger.createSimpleLogger( opciones )

export default log