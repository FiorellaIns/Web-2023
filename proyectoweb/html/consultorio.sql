-- SQLBook: Code
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-11-2023 a las 13:22:48
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `consultorio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `ID_administrador` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `contraseña` varchar(30) NOT NULL,
  `aa` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `olvidelacontraseña`
--

CREATE TABLE `olvidelacontraseña` (
  `ID_olvide_la_contraseña` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `DNI` int(8) NOT NULL,
  `matricula medica` int(30) NOT NULL,
  `mail` varchar(30) NOT NULL,
  `contraseña` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `ID_registro` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `DNI` int(8) NOT NULL,
  `matricula medica` int(30) NOT NULL,
  `usuario(mail)` varchar(50) NOT NULL,
  `contraseña` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tabla_diagnostico`
--

CREATE TABLE `tabla_diagnostico` (
  `id_diagnostico` int(11) NOT NULL,
  `Diagnostico_medico` text NOT NULL,
  `Descripcion` text NOT NULL,
  `Fecha_de_Atencion` date NOT NULL,
  `Motivo_de_la_Atencion` text NOT NULL,
  `Nombre_Del_medico` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tabla_medicos`
--

CREATE TABLE `tabla_medicos` (
  `id_medicos` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `DNI` int(8) NOT NULL,
  `Matricula_del_medico` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `fotos` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tabla_pacientes`
--

CREATE TABLE `tabla_pacientes` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `DNI` int(8) NOT NULL,
  `Nro de Afiliado` int(5) NOT NULL,
  `Obra_social` varchar(100) NOT NULL,
  `Nro_de_celular` int(12) NOT NULL,
  `Fecha_de_consulta` date NOT NULL,
  `id_medicos` int(11) NOT NULL,
  `id__idpacientes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `Usuario` varchar(100) NOT NULL,
  `Contraseña` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`ID_administrador`);

--
-- Indices de la tabla `olvidelacontraseña`
--
ALTER TABLE `olvidelacontraseña`
  ADD PRIMARY KEY (`ID_olvide_la_contraseña`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`ID_registro`);

--
-- Indices de la tabla `tabla_diagnostico`
--
ALTER TABLE `tabla_diagnostico`
  ADD PRIMARY KEY (`id_diagnostico`);

--
-- Indices de la tabla `tabla_medicos`
--
ALTER TABLE `tabla_medicos`
  ADD PRIMARY KEY (`id_medicos`);

--
-- Indices de la tabla `tabla_pacientes`
--
ALTER TABLE `tabla_pacientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_medicos` (`id_medicos`),
  ADD KEY `fk_pacientes` (`id__idpacientes`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `ID_administrador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `olvidelacontraseña`
--
ALTER TABLE `olvidelacontraseña`
  MODIFY `ID_olvide_la_contraseña` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `ID_registro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tabla_diagnostico`
--
ALTER TABLE `tabla_diagnostico`
  MODIFY `id_diagnostico` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tabla_medicos`
--
ALTER TABLE `tabla_medicos`
  MODIFY `id_medicos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tabla_pacientes`
--
ALTER TABLE `tabla_pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tabla_pacientes`
--
ALTER TABLE `tabla_pacientes`
  ADD CONSTRAINT `fk_medicos` FOREIGN KEY (`id_medicos`) REFERENCES `tabla_medicos` (`id_medicos`),
  ADD CONSTRAINT `fk_pacientes` FOREIGN KEY (`id__idpacientes`) REFERENCES `tabla_diagnostico` (`id_diagnostico`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
