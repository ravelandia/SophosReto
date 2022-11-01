import {Button,ModalFooter,Input,Label, FormGroup, Form, ModalBody,ModalHeader, Modal } from "reactstrap";
import React, { useEffect, useState } from "react";
const ModeloCliente = {
    idCliente:0,
    nombre: "",
    apellido: "",
    direccion: "",
    edad: 0,
    saldo: 0.0
}

const NuevoCliente = ({mostrarModal,setMostrarModal,GuardarCliente,editar,setEditar,editarCliente }) => {
    const [cliente, SetCliente] = useState(ModeloCliente);
    const [BTNeditar, setBTN]=useState(false);

    const actualizar = (e) => {
        console.log(e.target.name + " : " + e.target.value);
        SetCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (editar != null) {
            console.log(editar)
            SetCliente(editar)
            setBTN(true)
        } else {
            SetCliente(ModeloCliente)
            setBTN(false)
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }

    const GuardarEditar = (valor) => {
        if (valor == null) {
            GuardarCliente(cliente)
            
        } else {
            editarCliente(cliente)
        }
        cerrarModal();
    }

    return (
        <Modal isOpen={mostrarModal }>
            <ModalHeader>
                {
                    (editar == null) ?("Nuevo Contacto"):("Informacion Del contacto")
                }
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>
                            Nombre
                        </Label>               
                        {
                            (BTNeditar == false) ? (
                                <Input name="nombre" onChange={(e) => actualizar(e)} value={cliente.nombre} />
                            ) : (
                                    <Input name="nombre" onChange={(e) => actualizar(e)} value={cliente.nombre} disabled/>
                            )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Apellido
                        </Label>                        
                        {
                            (BTNeditar == false) ? (
                                <Input name="apellido" onChange={(e) => actualizar(e)} value={cliente.apellido} />
                            ) : (
                                    <Input name="apellido" onChange={(e) => actualizar(e)} value={cliente.apellido} disabled/>
                            )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Identificacion
                        </Label>                   
                        {
                            (BTNeditar == false) ? (
                                <Input type="number" name="idCliente" onChange={(e) => actualizar(e)} value={cliente.idCliente} />
                            ) : (
                                    <Input type="number" name="idCliente" onChange={(e) => actualizar(e)} value={cliente.idCliente} disabled/>
                            )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Edad
                        </Label>                        
                        {
                            (BTNeditar == false) ? (
                                <Input type="number" name="edad" onChange={(e) => actualizar(e)} value={cliente.edad} />
                            ) : (
                                    <Input type="number" name="edad" onChange={(e) => actualizar(e)} value={cliente.edad} disabled/>
                            )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Direccion
                        </Label>
                        {
                            (BTNeditar == false) ? (
                                <Input name="direccion" onChange={(e) => actualizar(e)} value={cliente.direccion} />
                            ) : (
                                <Input name="direccion" onChange={(e) => actualizar(e)} value={cliente.direccion} disabled />
                            )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Saldo Inicial
                        </Label>
                        
                        {
                            (BTNeditar == false) ? (
                                <Input type="number" name="saldo" onChange={(e) => actualizar(e)} value={cliente.saldo} />
                            ) : (
                                    <Input type="number" name="saldo" onChange={(e) => actualizar(e)} value={cliente.saldo} disabled/>  
                                    )
                        }
                    </FormGroup>
                </Form>  
            </ModalBody>
            <ModalFooter>
                {
                    (BTNeditar ==false)?(
                        <Button color="primary" size="sm" onClick={() => GuardarEditar(editar)}>
                            Guardar
                        </Button>
                    ):(
                <Button color="success" size="sm" onClick={() => setBTN(false)}>
                            Editar
                           </Button> 
                    )
                }
                <Button color="danger" size="sm" onClick={cerrarModal}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
        )
}
export default NuevoCliente;