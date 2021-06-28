export default interface IRespuesta {
    estatus: boolean;
    resultadoOperacion: string;
    data?: any;
    error?: string;
    link?: string;
}