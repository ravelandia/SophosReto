import { NavItem,NavLink,Nav,Collapse,NavbarToggler,NavbarBrand,Navbar,Button, CardBody, CardHeader, Card, Col, Container, Row } from "reactstrap";
//import TablaCliente from "./componentes/TablaCliente";
import React, { useEffect, useState } from "react";
//import NuevoCliente from "./componentes/NuevoCliente";
import ManejoTablas from "./componentes/ManejoTablas";
import AlquilerTabla from "./componentes/AlquilerTabla";


const App = () => {


    const [clientes, setCliente] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);
    const [clienteJugador, setClienteJugador] = useState(true);

    const [isOpen, setIsOpen] = useState(false);

    const mostrarCliente = async () => {
        const response = await fetch("api/bd/Cliente");
        if (response.ok) {
            const data = await response.json();
            setCliente(data);
        } else {
            console.log("error en la lista");
        }
    }

    

    const guardarCliente = async (cliente) => {
        const response = await fetch("api/bd/NuevoCliente", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(cliente)
        });
        console.log(cliente);
        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarCliente();
        }
    }
    const editarCliente = async (cliente) => {
        const response = await fetch("api/bd/EditarCliente", {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(cliente)
        });
        console.log(cliente);
        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarCliente();
        }
    }
    const eliminarCliente = async (cliente) => {
        console.log(cliente.idCliente);
        var respuesta = window.confirm("Desea eliminar el cliente " + cliente.nombre + " " + cliente.nombre + " ?");
        if (!respuesta) {
            return;
        }
        const response = await fetch("api/bd/EliminarCliente/" + cliente.llave, {
            method: 'delete',
        });
        if (response.ok) {
            mostrarCliente();
        }
    }


    const [juegos, setJuegos] = useState([]);
    const mostrarJuego = async () => {
        const response = await fetch("api/bd/Juego");
        if (response.ok) {
            const data = await response.json();
            setJuegos(data);
        } else {
            console.log("error en la lista");
        }
    }

    useEffect(() => {
        mostrarCliente();
        mostrarJuego();
    }, [])

    const[colpase,setColapse]=useState(false);
    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand ><strong>GameStore</strong></NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="#"onClick={() => {
                                mostrarCliente();
                                setClienteJugador(true);
                            }}>
                                {clienteJugador ? <strong>Clientes</strong> : 
                                    
                                "Clientes"}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" onClick={() => {
                                mostrarJuego();
                                setClienteJugador(false);
                                }}>
                                {!clienteJugador ? <strong>Juegos</strong> :
                                    "Juegos"}
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>

            <Container className="mt-5 pb-0">
                {/*
                    <Row>
                    <Col lg="1">
                        
                        {
                            (clienteJugador) ? (
                                <Button className="btn btn-secondary " size="sm"
                                    onClick={() => setClienteJugador(true)}>
                                    Clientes
                                </Button>
                            ) : (
                                    <Button className="btn btn-success " size="sm"
                                        onClick={() => {
                                            mostrarCliente();
                                            setClienteJugador(true);
                                        }}>
                                        Clientes
                                    </Button>
                                    )
                        }

                    </Col>
                    <Col>
                        
                        {
                            (clienteJugador) ? (
                                <Button size="sm" className="btn btn-success " color="ligth"
                                    onClick={() => setClienteJugador(false)}>
                                    Juegos
                                </Button>
                            ) : (
                                    <Button size="sm" className="btn btn-secondary " color="ligth"
                                        onClick={() => setClienteJugador(false)}>
                                        Juegos
                                    </Button>
                                    )
                        }
                    </Col>
                </Row>
                */ }
            </Container>

            {
                (clienteJugador) ? (

                    <>


                        <ManejoTablas
                            data={clientes}
                            setEditar={setEditar}
                            mostrarModal={mostrarModal}
                            setMostrarModal={setMostrarModal}
                            eliminarCliente={eliminarCliente}
                            guardarCliente={guardarCliente}
                            editar={editar}
                            editarCliente={editarCliente}
                            esCliente={true}

                            filtroUsuarioFrecuente={true}
                            filtroMasAlquilado={false}
                        />
                    </>
                ) : (
                        <ManejoTablas
                            data={juegos}
                            setEditar={setEditar}
                            mostrarModal={mostrarModal}
                            setMostrarModal={setMostrarModal}
                            eliminarCliente={eliminarCliente}
                            guardarCliente={guardarCliente}
                            editar={editar}
                            editarCliente={editarCliente}
                            esCliente={false}

                            filtroUsuarioFrecuente={false }
                            filtroMasAlquilado={true }
                        />
                        )
            }

            <AlquilerTabla/>

            

        </div>

    )
}

export default App;