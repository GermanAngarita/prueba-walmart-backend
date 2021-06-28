import IRespuesta from "@src/interfaces/repuesta.interface";

export const test = async ( payload: any ): Promise<IRespuesta> => {

    const data = payload;

    
    try {
        return {
            estatus: true,
            resultadoOperacion: 'Servidor corriendo',
            data: {
                hora: new Date( Date.now() )
            }
        }
    } catch (error) {
        return {
            estatus: false,
            resultadoOperacion: 'Error del servidor',
            error: error
        }
    }
}