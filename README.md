# SophosReto
#
## Por: Rafael Velandia
***
### Este programa es software libre: usted puede redistribuirlo y/o modificarlo
## Descripcion:
    El programa busca administrar una tienda de videojuegos, en la cual se pueden registrar los juegos, los clientes y las ventas.
    Ademas de eso permite realizar ciertas filtraciones que faciliten las tomas de decisiones del negocio, como por ejemplo:
        - Los juegos mas rentados
        - Los juegos menos rentados por cierto rango de edad
        - Los juegos mas rentados de cierta plataforma
## Como usarlo:
    Se debe usar la base de datos de MySQL, seguido a eso se corre el script Query.sql para crear las tablas y las relaciones entre ellas, luego de eso comunicar la base de datos con el programa, para ello dirijase a visual studio y en la consola ejecute la siguiente linea de codigo:
    "Scaffold-DbContext "Server=(servidor); DataBase=(basedatos);Integrated Security=true" Microsoft.EntityFrameworkCore.SqlServer -OutPutDir Models"
    seguido a eso se debe ejecutar el programa y listo.
## Requisitos:
    - Visual Studio 2019
    - MySQL
    - .Net Core 6.0
    - Entity Framework Core 6.0
    - Entity Framework Core Tools 6.0
    - Entity Framework Core SqlServer 6.0
    - React 18.2.0
    - Reactstrap 9.1.1
## Funcionamiento:
    El programa cuenta con una interfaz grafica, la cual permite realizar las operaciones basicas de un CRUD, tanto para lo juegos, como para los clientes, en las ventas nada mas se puede realizar la creacion de una nueva venta, ya que las demas operaciones no son necesarias.

    Se tiene una tabla que muestra la informacion de los clientes o los juegos, en ella cuenta con un boton de creacion y una serie de botones que permite realizar diversas filtraciones; en la tabla de Alquileres se puede ver los juegos rentados, oredenados por la fecha en que fueron rentados, esta tabla permite filtrar por los juegos que fueron rentados en el dia.

    Internamente el Programa tiene una serie de Apis que se encargan de realizar las tareas de fitracion, estas apis se encuentran en la carpeta Controllers, y se comunican con la base de datos a traves de los modelos que se encuentran en la carpeta Models.

    
