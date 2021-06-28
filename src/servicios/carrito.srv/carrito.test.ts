import IRespuesta from '@src/interfaces/repuesta.interface';
import { crearCarrito } from '.';

describe('CARRITO DE COMPRAS: ', () => {

    const respuestaExitosa = {
        estatus: true,
        resultadoOperacion: ''
    }

    const respuestaFallida = {
        estatus: false,
        resultadoOperacion: ''
    }

    it('CREAR CARRITO: EXITOSO', async () => {

        const crearCarrito = jest.fn()
        crearCarrito.mockResolvedValue(respuestaExitosa)

        const respuesta = await crearCarrito()

        expect( respuesta ).toEqual( respuestaExitosa )
    })
})