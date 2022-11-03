import { DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown, Button, CardBody, CardHeader, Card, Col, Container, Row, List } from "reactstrap";
import TablaCliente from "./TablaCliente";
import React, { useEffect, useState } from "react";
import NuevoCliente from "./NuevoCliente";
import NuevoJuego from "./NuevoJuego";

const plataformas = {
    1: "PlayStation",
    2: "Xbox",
    3: "Nintendo",
    4: "Pc"
}

const tupla = {
    1: [0,10],
    2: [10,20],
    3: [20,30],
    4: [30,40],
    5: [40,50],
    6: [50,60],
    7: [60,70],
    8: [70,999],
    9: [0,9999]
}


const ManejoTablas = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarCliente, guardarCliente, editar, editarCliente, esCliente, filtroMasAlquilado, filtroUsuarioFrecuente }) => {
    const [editarJuego, setEditarJuego] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const [nuevoJuego, setNuevoJuego] = useState(false);
    const [dropdownOpen, setOpen] = useState(false)
    const [botonJuego, setBotonJuego] = useState(false);//Sirve para cambiar entre datos normales y filtrados
    const [datos, setDatos] = useState(data);
    const [dataDrop, setDataDrop] = useState(true)
    const [director, setDirector] = useState([]);
    const [dataDirector, setDataDirector] = useState("");
    const [tipoTabla, setTipoTabla] = useState(false);
    const [dropdownOpenPlat, setDropdownOpenPlat] = useState(false);
    const [dataPlataforma, setDataPlataforma] = useState("");
    const [dropdownLanzamiento, setDropdownLanzamiento] = useState(false);
    const [años, setAños] = useState([]);
    const [dataAño, setAño] = useState("");

    const [dropdownEdades, setDropdownEdades] = useState(false);
    const[edades,setEdades]=useState([0,9999]);
    

    const mostrarJuego = async () => {
        const response = await fetch("api/bd/JuegoFrecuente");
        if (response.ok) {
            const data = await response.json();

            setDatos(data);
        } else {
            console.log("error en la lista");
        }
    }
    const mostrarCliente = async () => {
        const response = await fetch("api/bd/ClienteFrecuente");
        if (response.ok) {
            const data = await response.json();

            setDatos(data);
        } else {
            console.log("error en la lista");
        }
    }

    const mostrarDirector = async () => {
        const response = await fetch("api/bd/Juego/Directores");
        if (response.ok) {
            const data = await response.json();

            setDirector(data);
        } else {
            console.log("error en la lista");
        }
    }

    const Director_Juuego = async (director) => {
        const response = await fetch("api/bd/Juego/Directores/" + director);
        if (response.ok) {
            const data = await response.json();

            setDatos(data);
        } else {
            console.log("error en la lista");
        }
    }

    const mostrarPlataforma = async (plataforma) => {
        setDataPlataforma(plataforma);
        const response = await fetch("api/bd/Juego/Plataforma/" + plataforma);
        if (response.ok) {
            const data = await response.json();
            setDatos(data);
        } else {
            console.log("error en la lista");
        }
    }

    const mostrarLanzamiento = async () => {
        const response = await fetch("api/bd/Juego/Lanzamiento");
        if (response.ok) {
            const data = await response.json();
            setAños(data);
        } else {
            console.log("error en la lista");
        }
    }

    const mostrarAño = async (año) => {
        const response = await fetch("api/bd/Juego/Lanzamiento/" + año);
        if (response.ok) {
            const data = await response.json();
            setDatos(data);
        } else {
            console.log("error en la lista");
        }
    }

    const mostrarEdades = async (edad) => {
        console.log(edad);
        const response =await fetch("api/bd/Juego/MenosJugado/"+edad[0]+"/"+edad[1]);
        if (response.ok) {
            const data = await response.json();
            setDatos(data);
            setEdades(edad);
            setTipoTabla(true);
            
            setDataPlataforma("");
            setDataDrop(true);
            setAño("");
        }
        else {
            console.log("error en la lista");
        }
    }

    

    useEffect(() => {
        mostrarDirector();
        mostrarLanzamiento();
    }, [])

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>
                                {
                                    (esCliente) ? (
                                        "Lista de Clientes"
                                    ) : (
                                        "Lista de Juegos"
                                    )
                                }
                            </h5>
                        </CardHeader>
                        <CardBody>
                            <Row >
                                <Col lg="2">
                                    {
                                        (esCliente) ? (
                                            <Button size="md" color="success" onClick={() => setMostrarModal(!mostrarModal)}>
                                                Nuevo Cliente
                                            </Button>
                                        ) : (
                                            <Button size="md" color="success" onClick={() => {
                                                setMostrar(true);
                                                setNuevoJuego(true);
                                            }
                                            }>
                                                Nuevo Juego
                                            </Button>
                                        )
                                    }
                                </Col>
                                <Col lg="8">


                                    {
                                        (filtroMasAlquilado) ? (

                                            <Row>

                                                {
                                                    (botonJuego) ? (
                                                        <Col lg="3">
                                                            <Button size="md" color="secondary"
                                                                onClick={() => {
                                                                    setBotonJuego(false);
                                                                    setTipoTabla(false);
                                                                }}
                                                            >
                                                                Ordenar por mas aqluilado
                                                            </Button>
                                                        </Col>
                                                    ) : (
                                                        <>
                                                            <Col lg="3">
                                                                <Button size="md" color="primary"
                                                                    onClick={() => {
                                                                        mostrarJuego();
                                                                        setBotonJuego(true);
                                                                        setTipoTabla(true);
                                                                    }}>
                                                                    Ordenar por mas aqluilado
                                                                </Button>
                                                            </Col>

                                                        </>
                                                    )

                                                }
                                                < Col >
                                                    <ButtonDropdown toggle={() => { setOpen(!dropdownOpen) }}
                                                        isOpen={dropdownOpen}>
                                                        <DropdownToggle color="success" caret>

                                                            {
                                                                (dataDrop) ? (
                                                                    "Director"
                                                                ) : (
                                                                    dataDirector
                                                                )
                                                            }
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem
                                                                onClick={() => {
                                                                    setDataDrop(true);
                                                                    setTipoTabla(false);
                                                                    setEdades(tupla[9]);
                                                                }}
                                                            >
                                                                Sin filtro
                                                            </DropdownItem>
                                                            {
                                                                director.map((dir) => (
                                                                    <DropdownItem onClick={() => {
                                                                        setDataDrop(false);
                                                                        setDataDirector(dir);
                                                                        Director_Juuego(dir);
                                                                        setTipoTabla(true);

                                                                        setDataPlataforma("");
                                                                        setAño("");
                                                                        setEdades(tupla[9]);
                                                                    }}>{dir}</DropdownItem>
                                                                ))
                                                            }
                                                        </DropdownMenu>
                                                    </ButtonDropdown>
                                                </Col>

                                                <Col>
                                                    <ButtonDropdown
                                                        toggle={() => { setDropdownOpenPlat(!dropdownOpenPlat) }}
                                                        isOpen={dropdownOpenPlat}>
                                                        <DropdownToggle color="success" caret>
                                                            {
                                                                (dataPlataforma == "") ? (
                                                                    "Plataforma"
                                                                ) : (
                                                                    dataPlataforma
                                                                )
                                                            }
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem
                                                                onClick={() => {
                                                                    setTipoTabla(false);
                                                                    setDataPlataforma("");
                                                                    setEdades(tupla[9]);
                                                                }}>
                                                                Sin filtro
                                                            </DropdownItem>
                                                            {
                                                                Object.keys(plataformas).map((plat) => (
                                                                    <DropdownItem
                                                                        onClick={() => {
                                                                            mostrarPlataforma(plataformas[plat]);
                                                                            setTipoTabla(true);

                                                                            setDataDrop(true);
                                                                            setAño("");
                                                                            setEdades(tupla[9]);
                                                                        }}>{
                                                                            plataformas[plat]
                                                                        }</DropdownItem>
                                                                ))
                                                            }
                                                        </DropdownMenu>
                                                    </ButtonDropdown>
                                                </Col>
                                                <Col>
                                                    <ButtonDropdown
                                                        toggle={() => { setDropdownLanzamiento(!dropdownLanzamiento) }}
                                                        isOpen={dropdownLanzamiento}>
                                                        <DropdownToggle color="success" caret>
                                                            {
                                                                (dataAño == "") ? (
                                                                    "Año"
                                                                ) : (
                                                                    dataAño
                                                                )
                                                            }
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem
                                                                onClick={() => {
                                                                    setAño("");
                                                                    setTipoTabla(false);
                                                                    setEdades(tupla[9]);
                                                                }}>
                                                                Sin filtro
                                                            </DropdownItem>
                                                            {
                                                                años.map((año) => (
                                                                    <DropdownItem
                                                                        onClick={() => {
                                                                            mostrarAño(año);
                                                                            setAño(año);
                                                                            setTipoTabla(true);

                                                                            setDataPlataforma("");
                                                                            setDataDrop(true);
                                                                            setEdades(tupla[9]);
                                                                        }}>
                                                                        {año}</DropdownItem>
                                                                ))
                                                            }
                                                        </DropdownMenu>
                                                    </ButtonDropdown>
                                                </Col>
                                                <Col >
                                                    {
                                                        <ButtonDropdown
                                                            toggle={() => { setDropdownEdades(!dropdownEdades) }}
                                                            isOpen={dropdownEdades}>
                                                            <DropdownToggle color="success" caret>
                                                                {
                                                                    (edades[0]==0 && edades[1]==9999)?(
                                                                        "Edades"
                                                                    ):(
                                                                        (edades[1]==999)?(
                                                                            edades[0]+"-..."
                                                                        ):(
                                                                            edades[0]+"-"+edades[1]
                                                                        )
                                                                    )
                                                                }
                                                            </DropdownToggle>
                                                            <DropdownMenu>
                                                                <DropdownItem
                                                                    onClick={() => {
                                                                        setTipoTabla(false);
                                                                        setEdades(tupla[9]);

                                                                        
                                                                    }}
                                                                >
                                                                    Sin filtro
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    onClick={() => {
                                                                        mostrarEdades(tupla[1]);
                                                                    }}>0-10</DropdownItem>
                                                                <DropdownItem
                                                                onClick={()=>{

                                                                    mostrarEdades(tupla[2]);
                                                                }}>10-20</DropdownItem>
                                                                <DropdownItem 
                                                                onClick={()=>{
                                                                    mostrarEdades(tupla[3]);
                                                                }}>20-30</DropdownItem>
                                                                <DropdownItem
                                                                onClick={()=>{
                                                                    mostrarEdades(tupla[4]);
                                                                }}>30-40</DropdownItem>
                                                                <DropdownItem
                                                                onClick={()=>{
                                                                    mostrarEdades(tupla[5]);
                                                                }}>40-50</DropdownItem>
                                                                <DropdownItem
                                                                onClick={()=>{
                                                                    mostrarEdades(tupla[6]);
                                                                }}>50-60</DropdownItem>
                                                                <DropdownItem
                                                                onClick={()=>{
                                                                    mostrarEdades(tupla[7]);
                                                                }}>60-70</DropdownItem>
                                                                <DropdownItem
                                                                onClick={()=>{
                                                                    mostrarEdades(tupla[8]);
                                                                }}>70-...</DropdownItem>
                                                            </DropdownMenu>
                                                        </ButtonDropdown>
                                                    }
                                                </Col>
                                            </Row>
                                        ) : (
                                            <>
                                            </>
                                        )

                                    }
                                    {
                                        (filtroUsuarioFrecuente) ? (
                                            <>
                                                <Row>
                                                <Col lg="4">
                                                    {
                                                        (botonJuego) ? (
                                                            <Button size="md" color="secondary"
                                                                onClick={() => {
                                                                    setTipoTabla(false);
                                                                    setBotonJuego(false);
                                                                }}
                                                            >
                                                                Ordenar clientes frecuentes
                                                            </Button>
                                                        ) : (
                                                            <Button size="md" color="primary"
                                                                onClick={() => {
                                                                    mostrarCliente();
                                                                    setTipoTabla(true);
                                                                    setBotonJuego(true);
                                                                }}
                                                            >
                                                                Ordenar clientes frecuentes
                                                            </Button>
                                                        )
                                                    }
                                                </Col>

                                                
                                                </Row>
                                            </>

                                        ) : (
                                            <></>
                                        )

                                    }
                                    


                                </Col>
                            </Row>
                            
                            <hr></hr>
                            {
                                (tipoTabla) ? (
                                    <TablaCliente data={datos}
                                        setEditar={setEditar}
                                        mostrarModal={mostrarModal}
                                        setMostrarModal={setMostrarModal}
                                        eliminarCliente={eliminarCliente}
                                        esCliente={esCliente}


                                        setEditarJuego={setEditarJuego}
                                        setMostrar={setMostrar}
                                        setNuevoJuego={setNuevoJuego}
                                    />
                                ) : (
                                    <TablaCliente data={data}
                                        setEditar={setEditar}
                                        mostrarModal={mostrarModal}
                                        setMostrarModal={setMostrarModal}
                                        eliminarCliente={eliminarCliente}
                                        esCliente={esCliente}


                                        setEditarJuego={setEditarJuego}
                                        setMostrar={setMostrar}
                                        setNuevoJuego={setNuevoJuego}
                                    />
                                )
                            }

                        </CardBody>
                    </Card>
                </Col>
            </Row>


            {(esCliente) ? (

                <>
                    <NuevoCliente
                        mostrarModal={mostrarModal}
                        setMostrarModal={setMostrarModal}
                        GuardarCliente={guardarCliente}
                        editar={editar}
                        setEditar={setEditar}
                        editarCliente={editarCliente}

                    />
                </>
            ) : (
                <>
                    <NuevoJuego
                        mostrar={mostrar}
                        setMostrar={setMostrar}
                        editarJuego={editarJuego}
                        setEditarJuego={setEditarJuego}
                        nuevoJuego={nuevoJuego}
                        setNuevoJuego={setNuevoJuego}
                    />
                </>
            )
            }
        </Container>
    )
}
export default ManejoTablas;