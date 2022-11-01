import { Button, ModalFooter, Input, Label, FormGroup, Form, ModalBody, ModalHeader, Modal } from "reactstrap";
import React, { useEffect, useState } from "react";
const ModeloJuego = {
    nombreJuego:"",
    año:0,
    precio:0.0,
    protagonista:"",
    director:"",
    productor:"",
    plataforma:""
}
const NuevoJuego = ({ mostrar, setMostrar,editarJuego,setEditarJuego, nuevoJuego, setNuevoJuego }) => {

    const [editar, setEditar] = useState(true);
    //console.log(nuevoJuego);

    const actualizar = (e) => {
        console.log(e.target.name + " : " + e.target.value);
        setEditarJuego({
            ...editarJuego,
            [e.target.name]: e.target.value
        })
    }

    const EditarPrecioJuego = async () => {
        const response = await fetch("api/bd/EditarPrecioJuego", {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(editarJuego)
        });
        //console.log(editarJuego);
        if (response.ok) {
            cierrePestaña();
        }
    }

    const guardarJuego = async (juego) => {
        console.log(juego);
        const response = await fetch("api/bd/NuevoJuego", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(juego)
        });
        //console.log(juego);
        if (response.ok) {
            cierrePestaña()
        }
    }

    const cierrePestaña=() => {
        setEditar(true);
        setMostrar(false);
    }

    return (
        <Modal isOpen={mostrar }>
            <ModalHeader>
                Editar Cliente
            </ModalHeader>
            <ModalBody>
                <Form>
                    
                    {
                        (!nuevoJuego) ? (
                            <FormGroup>
                                <Label>
                                    Id Juego
                                </Label>
                                <Input name="idJuego" value={editarJuego.idJuego} disabled />
                            </FormGroup>
                        ) : (
                                <></>
                                )
                    }
                    <FormGroup>
                        <Label>
                            Juego
                        </Label>
                        {
                            (editar ==true && nuevoJuego==false) ? (
                                <Input name="nombreJuego" onChange={(e) => actualizar(e)} value={editarJuego.nombreJuego} disabled />
                            ) : (
                                    <Input name="nombreJuego" onChange={(e) => actualizar(e)} value={editarJuego.nombreJuego}  />
                                    )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Año
                        </Label>                      
                        {
                            (editar && nuevoJuego == false) ? (
                                <Input name="año" onChange={(e) => actualizar(e)} value={editarJuego.año} disabled />
                            ) : (
                                    <Input name="año" onChange={(e) => actualizar(e)} value={editarJuego.año}  />
                                    )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Director
                        </Label>
                        {
                            (editar && nuevoJuego == false) ? (
                                <Input name="director" onChange={(e) => actualizar(e)} value={editarJuego.director} disabled />
                            ) : (
                                    <Input name="director" onChange={(e) => actualizar(e)} value={editarJuego.director}  />
                                    )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Precio
                        </Label>
                        {
                            (editar && nuevoJuego == false) ? (
                                <Input name="precio" onChange={(e) => actualizar(e)} value={editarJuego.precio} disabled />
                            ) : (
                                    <Input name="precio" onChange={(e) => actualizar(e)} value={editarJuego.precio}  />
                                    )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Productor
                        </Label>
                        {
                            (editar && nuevoJuego == false) ? (
                                <Input name="productor" onChange={(e) => actualizar(e)} value={editarJuego.productor} disabled />
                            ) : (
                                    <Input name="productor" onChange={(e) => actualizar(e)} value={editarJuego.productor}  />
                                    )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Plataforma
                        </Label>
                        {
                            (editar && nuevoJuego == false) ? (
                                <Input name="plataforma" onChange={(e) => actualizar(e)} value={editarJuego.plataforma} disabled />
                            ) : (
                                    <Input name="plataforma" onChange={(e) => actualizar(e)} value={editarJuego.plataforma}  />
                                    )
                        }
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                {
                    (nuevoJuego) ? (
                        <Button color="success" size="sm"
                            onClick={() => guardarJuego(editarJuego)}>
                                Crear Juego
                            </Button>
                    ) : (
                                (editar) ?(
                                    <Button color = "success" size = "sm"
                                        onClick = { ()=> setEditar(false) }
                                        >
                                        Editar
                                      </Button>
                                  ): (
                                     <Button color="primary" size="sm"
                                        onClick={() =>
                                        EditarPrecioJuego()
                                        }>
                                         Guardar cambios
                                         </Button>
                                        )
                        )
                    
                }
               

                <Button color="danger" size="sm" onClick={()=>setMostrar(false)}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
        )
}
export default NuevoJuego;