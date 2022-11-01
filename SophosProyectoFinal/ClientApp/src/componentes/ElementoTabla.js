import { Input, Button, Table } from "reactstrap";
import React, { useEffect, useState } from "react";



const ElementoTabla = ({ juego, setEditarJuego, setMostrar, setNuevoJuego }) => {
    const [cambio, setCambio] = useState(true);
    const [precioJuego, setPrecioJuego] = useState(juego.precio);

    const actualizar = (e) => {
        setPrecioJuego(
            e.target.value
        )
    }


    const EditarPrecioJuego = async () => {
        juego.precio = precioJuego;
        const response = await fetch("api/bd/EditarPrecioJuego", {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(juego)
        });
        console.log(juego);
        if (response.ok) {
            setCambio(true);
        }
    }

    const EnviarDatos = () => {
        setMostrar(true);
        setEditarJuego(juego);
        setNuevoJuego(false);
    }

    const EliminarJuego = async (juego) => {
        console.log(juego.idJuego);
        var respuesta = window.confirm("Desea eliminar el cliente " + juego.nombreJuego + " ?");
        if (!respuesta) {
            return;
        }
        const response = await fetch("api/bd/EliminarJuego/" + juego.idJuego, {
            method: 'delete',
        });
        if (response.ok) {
            window.alert("Juego Eliminado");
        }
    }

    return (
        <>

            <td>{juego.nombreJuego}</td>
            <td>{juego.plataforma}</td>
            <td>{juego.productor}</td>
            {
                (cambio) ? (
                    <>
                        <td>
                            <Input className="w-25" name="precio" value={precioJuego} disabled />
                        </td>
                    </>
                ) : (
                    <>
                        <td>
                                <Input className="w-25" name="precio" value={precioJuego} onChange={(e) => actualizar(e)} />
                        </td>
                    </>
                )
            }
            <td>
                {
                    (cambio) ? (
                        <>
                            <Button color="success" size="sm" className="me-2"
                                onClick={() => setCambio(false)} >
                                Cambio rapido
                            </Button>
                        </>
                    ) : (
                            <Button color="primary" size="sm" className="me-2"
                                onClick={()=>EditarPrecioJuego() }>
                                Guardar
                            </Button>
                            )
                }
            </td>
            <td>
                <Button color="primary" size="sm" className="me-2"
                    onClick={() => EnviarDatos()  }>
                    Informacion...
                </Button>
            </td>
            <td>
                <Button color="danger" size="sm"
                    onClick={() => EliminarJuego(juego) }>
                    Eliminar
                </Button>
            </td>

        </>
        )
}
export default ElementoTabla;