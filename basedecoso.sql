-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-02-2024 a las 20:27:08
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `basedecoso`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `claves`
--

CREATE TABLE `claves` (
  `ID` int(11) NOT NULL,
  `Clave` text NOT NULL,
  `Administrador` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historias clinicas`
--

CREATE TABLE `historias clinicas` (
  `ID` int(11) NOT NULL,
  `Diagnostico medico` text NOT NULL,
  `Descripcion` text NOT NULL,
  `Fecha de atencion` text NOT NULL,
  `Motivo de atencion` text NOT NULL,
  `ID medico` int(11) NOT NULL,
  `ID paciente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `ID` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Apellido` text NOT NULL,
  `DNI` int(11) NOT NULL,
  `Nro de afiliado` int(11) NOT NULL,
  `Obra social` text NOT NULL,
  `Nro de obra social` int(11) NOT NULL,
  `Nro de telefono` int(11) NOT NULL,
  `Domicilio` text NOT NULL,
  `Fecha_De_Consulta` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`ID`, `Nombre`, `Apellido`, `DNI`, `Nro de afiliado`, `Obra social`, `Nro de obra social`, `Nro de telefono`, `Domicilio`, `Fecha_De_Consulta`) VALUES
(1, 'fdfds', 'fdsfs534', 534534, 5345343, 'gfd453dfdfg', 423423, 645242, 'fsdfsdy535gs', '2024-02-06'),
(2, 'asai553za', '42342zsgsh', 721872, 781421, 'df53wffz', 5126213, 8566241, 'fsdfs235a', '2024-02-17'),
(3, 'fdfds', 'fdsfs534', 534534, 5345343, 'gfd453dfdfg', 423423, 645242, 'fsdfsdy535gs', '2024-02-06'),
(4, 'asai553za', '42342zsgsh', 721872, 781421, 'df53wffz', 5126213, 8566241, 'fsdfs235a', '2024-02-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Apellido` text NOT NULL,
  `DNI` int(11) NOT NULL,
  `Matricula medica` int(11) NOT NULL,
  `Usuario` text NOT NULL,
  `Contraseña` text NOT NULL,
  `EMail` text NOT NULL,
  `Administrador` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID`, `Nombre`, `Apellido`, `DNI`, `Matricula medica`, `Usuario`, `Contraseña`, `EMail`, `Administrador`) VALUES
(20, 'Tomas', 'Ferreyra', 44690211, 52342142, 'Toto45', 'Tomas0125', 'tomasferreyra40@gmail.com', 0),
(22, 'dasdasad', 'dasdasdasda', 535353, 5345353, 'toto41', 'Tomas0125', 'ferreyratomas326@gmail.com', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `claves`
--
ALTER TABLE `claves`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `historias clinicas`
--
ALTER TABLE `historias clinicas`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID Medico` (`ID medico`),
  ADD KEY `ID paciente` (`ID paciente`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `claves`
--
ALTER TABLE `claves`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `historias clinicas`
--
ALTER TABLE `historias clinicas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historias clinicas`
--
ALTER TABLE `historias clinicas`
  ADD CONSTRAINT `ID Medico` FOREIGN KEY (`ID medico`) REFERENCES `usuarios` (`ID`),
  ADD CONSTRAINT `historias clinicas_ibfk_1` FOREIGN KEY (`ID paciente`) REFERENCES `pacientes` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
