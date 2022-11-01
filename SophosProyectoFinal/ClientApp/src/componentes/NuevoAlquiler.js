import { Col,Row,ButtonDropdown, DropdownItem,DropdownMenu,DropdownToggle,Dropdown, Button, ModalFooter, Input, Label, FormGroup, Form, ModalBody, ModalHeader, Modal } from "reactstrap";
import React, { useEffect, useState } from "react";


const ModeloAlquiler = {
    nombreCliente: "",
    apellidoCliente: "",
    idCliente: 0,
    juego: "",
    idJuego: 0,
    fechaAlquiler:"",
    fechaRetorno: "",
    total:0.0
}

const NuevoAlquiler = ({mostrar,juegos,clientes,setMostrar,actualizarTabla }) => {
    

    const [guardarCliente, setGuardarCliente] = useState([]);
    const [guardarJuego, setGuardarJuego] = useState([]);
    const [boton, setBoton] = useState(false);
    const [dropdownOpen, setOpen] = useState(false)
    const [dropdownOpen2, setOpen2] = useState(false)
    const [boton2, setBoton2] = useState(false);
    const [nuevoAlquiler, setNuevoAlquiler] = useState(ModeloAlquiler);

    const actualizar = (e) => {
        setNuevoAlquiler({
            ...nuevoAlquiler,
            [e.target.name]: e.target.value
        })
    }

    const cerrar = () => {
        setNuevoAlquiler(ModeloAlquiler);
        setMostrar(false);
        setBoton(false);
        setBoton2(false);
    }

    const enviar =async () => {
        if (
            ModeloAlquiler.fechaAlquiler != nuevoAlquiler.fechaAlquiler &&
            ModeloAlquiler.fechaRetorno != nuevoAlquiler.fechaRetorno &&
            ModeloAlquiler.juego != guardarJuego.nombreJuego &&
            ModeloAlquiler.nombreCliente != guardarCliente.nombre&&
            ModeloAlquiler.total != nuevoAlquiler.total
        ) {
            const Alquila = {
                nombreCliente: "",
                apellidoCliente: "",
                idCliente: 0,
                juego: "",
                idJuego: 0,
                fechaAlquiler: "",
                fechaRetorno: "",
                total: 0.0
            }
            Alquila.nombreCliente = guardarCliente.nombre;
            Alquila.apellidoCliente = guardarCliente.apellido;
            Alquila.idCliente = guardarCliente.idCliente;
            Alquila.juego = guardarJuego.nombreJuego;
            Alquila.idJuego = guardarJuego.idJuego;
            Alquila.fechaAlquiler = nuevoAlquiler.fechaAlquiler.toString() + "T00:00:00";
            Alquila.fechaRetorno = nuevoAlquiler.fechaRetorno.toString() + "T00:00:00";
            Alquila.total = nuevoAlquiler.total;
            console.log(Alquila);
            
            const response = await fetch("api/bd/NuevoAlquiler", {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(Alquila)
            });
            if (response.ok) {
                actualizarTabla();
                cerrar();
            }

        } else {
            window.alert("Llene todos los campos")
        }

    }

    return (
        <Modal isOpen={mostrar }>
            <ModalHeader>
                Alquilar Juego
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Row>
                            <Col>
                                <ButtonDropdown toggle={() => { setOpen(!dropdownOpen) }}
                                    isOpen={dropdownOpen}>
                                    <DropdownToggle color="success" caret>

                                        {
                                            (!boton) ? (
                                                "Cliente"
                                            ) : (
                                                guardarCliente.apellido + " " + guardarCliente.nombre
                                            )
                                        }
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {
                                            clientes.map((cliente) => (
                                                <DropdownItem onClick={() => {
                                                    setGuardarCliente(cliente);
                                                    setBoton(true);
                                                }}
                                                >{cliente.apellido + " " + cliente.nombre}</DropdownItem>
                                            ))
                                        }
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </Col>

                            <Col>
                                <ButtonDropdown toggle={() => { setOpen2(!dropdownOpen2) }}
                                    isOpen={dropdownOpen2}>
                                    <DropdownToggle color="success" caret>

                                        {
                                            (!boton2) ? (
                                                "Juego"
                                            ) : (
                                                guardarJuego.nombreJuego
                                            )
                                        }
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {
                                            juegos.map((juego) => (
                                                <DropdownItem onClick={() => {
                                                    setGuardarJuego(juego);
                                                    setBoton2(true);
                                                }}
                                                >{juego.nombreJuego}</DropdownItem>
                                            ))
                                        }
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Label>
                                    Fecha alquiler
                                </Label>
                                <Input  value={nuevoAlquiler.fechaAlquiler} onChange={(e) => actualizar(e)} name="fechaAlquiler"/>
                            </Col>
                            <Col>
                                <Label>
                                    Fecha retorno
                                </Label>
                                <Input  value={nuevoAlquiler.fechaRetorno} onChange={(e) => actualizar(e)} name="fechaRetorno"/>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Label>
                                    Precio
                                </Label>
                                <Input type="number" value={nuevoAlquiler.total} onChange={(e) => actualizar(e)} name="total" />
                            </Col>
                        </Row>
                    </FormGroup>

                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="md" onClick={() => enviar()}>
                    Enviar
                </Button>
                <Button color="danger" size="md" onClick={() => cerrar() }>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
        )
}
export default NuevoAlquiler;