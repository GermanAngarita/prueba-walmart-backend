import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import variables from './configuraciones/variablesEntorno';
import logger from './configuraciones/logger';
import { conectarBaseDatos } from './configuraciones/base-datos/mongo-db-conexion';
import enrutador from './enrutador/v1/';
import moment from 'moment-timezone';
import path from 'path';

moment.tz.add("America/Bogota|BMT -05 -04|4U.g 50 40|0121|-2eb73.I 38yo3.I 2en0|90e5");
moment.tz.setDefault( variables.zonaHoraria );
moment.locale('es')

const app: Application = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use( cors() )
app.use(bodyParser.json())

app.use(`${variables.pathPrincipal}`, enrutador );

app.use(express.static('public'));
app.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html');
});

app.listen( variables.puerto, async () => {
    await conectarBaseDatos()
    logger.info('Servidor corriendo en: ', `${variables.dominio}${variables.pathPrincipal}`)
})