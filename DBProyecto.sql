create table Contratos 
(
	ContratoID int not null,
	ClienteID int not null,
	PaqueteID int not null,
	TecnicoID int not null,
	FechaInicio datetime,
	FechaFinal datetime,
	Estado CHAR
);

create table ContratoDetalle 
(
	ContratoID int not null,
	ArticuloID int not null,
	Cantidad int,
	Precio float,
	Tasa float
);

CREATE TABLE FacturaContrato (
  ID_factura INT PRIMARY KEY,
  ContratoID INT,
  Estado CHAR,
  Fecha DATE,
  Total DECIMAL(10, 2)
);

create table Visitas
(
	ContratoID int not null,
	TecnicoID int,
	Fecha datetime,
	Horas int
)

CREATE TABLE Tecnicos (
  ID_tecnico INT PRIMARY KEY,
  Nombre VARCHAR(100),
  Apellido VARCHAR(100),
  Area_de_especializacion VARCHAR(100),
  Fecha_de_nacimiento datetime,
  Fecha_de_contratacion datetime,
  Salario float,
  Horario varchar(80),
  Estado BIT 
);

CREATE TABLE Clientes (
  ID_cliente INT PRIMARY KEY,
  Nombre VARCHAR(100),
  Apellido VARCHAR(100),
  Direccion VARCHAR(200),
  CorreoElectronico VARCHAR(100),
  Telefono VARCHAR(20)
);

CREATE TABLE Servicios (
  ID_servicio INT PRIMARY KEY,
  Descripcion VARCHAR(200),
  Precio DECIMAL(10, 2)
);

--La siguiente tabla es para ver los servicios que hay dentro de un paquete
create table ContratoServicioDetalle
(
	ClienteID int not null,
	PaqueteID int not null,
	TecnicoID int not null,
	FechaInicio datetime,
	FechaFinal datetime,
);

create table FacturaServicio
(
  ID_factura INT PRIMARY KEY,
  ServicioID int,
  Estado CHAR,
  Fecha DATE,
  Total DECIMAL(10, 2)
)

create table ServicioDetalle 
(
	ServicioID int not null,
	ArticuloID int not null,
	Cantidad int,
	Precio float,
	Tasa float
);

CREATE TABLE Articulos (
  ArticuloID INT NOT NULL,
  Nombre VARCHAR(80) NOT NULL,
  TipoID INT NOT NULL,
  Existencia INT NOT NULL,
  Precio FLOAT NOT NULL
);

CREATE TABLE Impuesto (
  ImpuestoID INT NOT NULL,
  Nombre VARCHAR(50) NOT NULL,
  Valor FLOAT NOT NULL,
  PRIMARY KEY (ImpuestoID)
);

CREATE TABLE Tipo (
  TipoID INT NOT NULL,
  Nombre VARCHAR(80) NOT NULL,
  ImpuestoID INT NOT NULL,
  PRIMARY KEY (TipoID),
  FOREIGN KEY (ImpuestoID) REFERENCES Impuesto(ImpuestoID)
);

CREATE TABLE Transacciones_bancarias (
  ID_transaccion INT PRIMARY KEY,
  ID_cliente INT,
  Tipo VARCHAR(20),
  Monto DECIMAL(10, 2),
  Fecha DATE,
  FOREIGN KEY (ID_cliente) REFERENCES Clientes(ID_cliente)
);