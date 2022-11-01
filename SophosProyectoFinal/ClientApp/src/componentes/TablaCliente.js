import { Input,Button,Table  } from "reactstrap";
import React, { useEffect, useState } from "react";
import ElementoTabla from "./ElementoTabla";

const TablaCliente = ({ eliminarCliente, data, setEditar, mostrarModal, setMostrarModal, esCliente, editarJuego, setEditarJuego, mostrar, setMostrar, setNuevoJuego }) => {

    //const [cambio,setCambio] = useState(true);


    const enviarDatos = (cliente) => {
        setEditar(cliente)
        setMostrarModal(!mostrarModal)
    }


    return (
        <div>
            <Table striped responsive>
                <thead>
                    <tr>
                        
                        {
                            (esCliente) ? (
                                <>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                </>
                            )
                                : (
                                    <>
                                    <th>Juego</th>
                                    <th>Plataforma</th>
                                    <th>Productor</th>
                                    <th>Precio</th>
                                    </>
                                )
                        }
                    </tr>
                </thead>
                <tbody>
                    {

                        (data.length < 1) ? (
                            <tr>
                                <td colSpan="4">Sin Registros</td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr >
                                    {
                                        (esCliente) ? (
                                            <>
                                                <td>{item.idCliente}</td>
                                                <td>{item.nombre}</td>
                                                <td>{item.apellido}</td>
                                                <td>
                                                    <Button color="primary" size="sm" className="me-2"
                                                        onClick={() => enviarDatos(item)}>
                                                        Informacion...
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button color="danger" size="sm"
                                                        onClick={() => eliminarCliente(item)}>
                                                        Eliminar
                                                    </Button>
                                                </td>
                                            </>
                                        ): (
                                                <>
                                                    
                                                    <ElementoTabla
                                                        juego={item}
                                                        setEditarJuego={setEditarJuego}
                                                        setMostrar={setMostrar}
                                                        setNuevoJuego={setNuevoJuego }
                                                    />
                                                    
                                                </>
                                            )
                                    }

                                </tr>
                            ))
                        )
                    }
                </tbody>
            </Table>

            
        </div>
        
    )
    
}

export default TablaCliente;