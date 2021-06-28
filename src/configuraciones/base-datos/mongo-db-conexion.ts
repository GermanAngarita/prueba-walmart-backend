
import mongoose from 'mongoose';
import logger from '../logger';
import variables from '../variablesEntorno';

mongoose.set('useFindAndModify', false);

export const conectarBaseDatos = async () => {

    try {

        await mongoose.connect( variables.urlBaseDatos, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        logger.info('Conectado con BD: ', variables.baseDeDatos)

    } catch ( error ) {
        
        logger.error(`Error al conectar con BD: ${variables.baseDeDatos} `, JSON.stringify( error ))
    }
    
}


