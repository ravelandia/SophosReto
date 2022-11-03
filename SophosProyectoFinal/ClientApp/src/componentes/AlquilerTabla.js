import { Button, CardBody, CardHeader, Card, Col, Container, Row, Table, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import React, { useEffect, useState } from "react";
import NuevoAlquiler from "./NuevoAlquiler";



const AlquilerTabla = () => {


    const [alquiler, setAlquiler] = useState([])
    const [cliente, setCliente] = useState([])
    const [juego, setJuego] = useState([])
    const [mostrar, setmostrar] = useState(false)
    const [frecuente, setFrecuente] = useState(false)
    const [dropdownLanzamiento, setDropdownLanzamiento] = useState(false)
    const [clienteTabla, setClienteTabla] = useState([])
    const [clienteAlquila, setClienteAlquila] = useState([])
    const [contenidoTabla, setContenidoTabla] = useState([])

    const obtenerAlquiler = async () => {
        const response = await fetch("api/bd/Alquiler");
        if (response.ok) {
            const data = await response.json();
            data.map((mapa) => {
                mapa.fechaAlquiler = mapa.fechaAlquiler.slice(0, 10);
                mapa.fechaRetorno = mapa.fechaRetorno.slice(0, 10);
            })
            setAlquiler(data);
        } else {
            console.log("error en la lista");
        }
    }

    const obtenerAlquilerDia = async () => {
        const response = await fetch("api/bd/AlquilerDelDia");
        if (response.ok) {
            const data = await response.json();
            setAlquiler(data);
        } else {
            console.log("error en la lista");
        }
    }

    const obtenerCliente = async () => {
        const response = await fetch("api/bd/Cliente");
        if (response.ok) {
            const data = await response.json();
            setCliente(data);
        } else {
            console.log("error en la lista");
        }
    }

    const obtenerJuego = async () => {
        const response = await fetch("api/bd/Juego");
        if (response.ok) {
            const data = await response.json();
            setJuego(data);
        } else {
            console.log("error en la lista");
        }
    }

    const AlquilerClientes = async () => {
        const response = await fetch("api/bd/Alquiler/Clientes");
        if (response.ok) {
            const data = await response.json();
            setClienteTabla(data);
        } else {
            console.log("error en la lista");
        }
    }

    const obtenerAlquilerCliente = async (idcliente) => {
        const response = await fetch("api/bd/Alquiler");
        if (response.ok) {
            const data = await response.json();
            data.map((mapa) => {
                mapa.fechaAlquiler = mapa.fechaAlquiler.slice(0, 10);
                mapa.fechaRetorno = mapa.fechaRetorno.slice(0, 10);
            })
            //quitar los que no son del cliente
            const alquilerCliente = data.filter((alquiler) => alquiler.idCliente === idcliente);

            setAlquiler(alquilerCliente);
        } else {
            console.log("error en la lista");
        }
    }

    useEffect(() => {
        obtenerAlquiler();
        AlquilerClientes();
    }, [])

    const cargarDatos = () => {
        obtenerCliente();
        obtenerJuego();
        obtenerAlquiler();
        setmostrar(true);
    }



    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <h4>
                                Lista de Alquileres
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col lg="2">
                                    <Button
                                        onClick={() => cargarDatos()}>
                                        Alquilar Juego
                                    </Button>
                                </Col>
                                <Col lg="2">
                                    {
                                        (frecuente) ? (
                                            <Button color="secondary"
                                                onClick={() => {
                                                    obtenerAlquiler();
                                                    setFrecuente(false);
                                                }}>
                                                Ventas del dia
                                            </Button>
                                        ) : (
                                            <Button color="success"
                                                onClick={() => {
                                                    obtenerAlquilerDia();
                                                    setFrecuente(true);
                                                }}>
                                                Ventas del dia
                                            </Button>
                                        )
                                    }
                                </Col>
                                <Col>
                                    <ButtonDropdown
                                        toggle={() => { setDropdownLanzamiento(!dropdownLanzamiento) }}
                                        isOpen={dropdownLanzamiento}>
                                        <DropdownToggle color="success" caret>
                                            {
                                                (clienteAlquila.length === 0) ? (
                                                    "Clientes"
                                                ) : (
                                                    clienteAlquila.nombre + " " + clienteAlquila.apellido
                                                )
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem
                                                onClick={() => {
                                                    obtenerAlquiler();
                                                    setClienteAlquila([]);
                                                }}>
                                                Sin filtro
                                            </DropdownItem>
                                            {
                                                clienteTabla.map((cliente) => {
                                                    return (
                                                        <DropdownItem
                                                            onClick={() => {
                                                                setClienteAlquila(cliente);
                                                                obtenerAlquilerCliente(cliente.idCliente);
                                                            }}>
                                                            {cliente.nombre} {cliente.apellido}
                                                        </DropdownItem>
                                                    )
                                                })

                                            }
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Table>
                                <thead>
                                    <tr>
                                        <th># Factura</th>
                                        <th>Nombre Cliente</th>
                                        <th>Apellido Cliente</th>
                                        <th>Id Cliente</th>
                                        <th>Juego</th>
                                        <th>Fecha Alquiler</th>
                                        <th>Fechar Retorno</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        alquiler.map((recibo) => (
                                            <tr>
                                                {
                                                    <>
                                                        <td>{recibo.idRecibo}</td>
                                                        <td>{recibo.nombreCliente}</td>
                                                        <td>{recibo.apellidoCliente}</td>
                                                        <td>{recibo.idCliente}</td>
                                                        <td>{recibo.juego}</td>
                                                        <td>{recibo.fechaAlquiler}</td>
                                                        <td>{recibo.fechaRetorno}</td>
                                                        <td>{recibo.total}</td>
                                                    </>
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <NuevoAlquiler
                juegos={juego}
                clientes={cliente}
                mostrar={mostrar}
                setMostrar={setmostrar}
                actualizarTabla={cargarDatos}
            />

        </Container>
    )
}
export default AlquilerTabla;