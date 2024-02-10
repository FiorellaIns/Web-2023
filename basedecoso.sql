-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-02-2024 a las 17:47:48
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
  `Clave` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `claves`
--

INSERT INTO `claves` (`ID`, `Clave`) VALUES
(2, 'fd234zxzxc234');

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
  `ID del medico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `EMail` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID`, `Nombre`, `Apellido`, `DNI`, `Matricula medica`, `Usuario`, `Contraseña`, `EMail`) VALUES
(1, 'Tomas', 'Ferreyra', 44690211, 33242342, 'toto234', 'Tomas0125', 'tomasferreyra40@gmail.com'),
(2, 'fsdfsdfsd', 'fsdfsdfsdf', 45453452, 24342423, 'fsfsdfsdfsd', 'Tomas0126', 'tomasferreyra40@gmail.com'),
(3, 'fsdfsd', 'fsdfsd', 4232324, 3242424, 'toto234', 'Tomas0125', 'tomasferreyra40@gmail.com'),
(4, 'fsdfsd', 'fsdfsd', 4232324, 3242424, 'toto234', 'Tomas0125', 'tomasferreyra40@gmail.com'),
(5, 'fsdfsd', 'fsdfsd', 4232324, 3242424, 'toto234', 'Tomas0125', 'tomasferreyra40@gmail.com'),
(6, 'fsdfsd', 'fsdfsd', 4232324, 3242424, 'toto234', 'Tomas0125', 'tomasferreyra40@gmail.com'),
(7, 'fsdfsd', 'fsdfsd', 4232324, 3242424, 'toto234', 'Tomas0125', 'tomasferreyra40@gmail.com'),
(8, 'fsdfsd', 'fsdfsd', 4232324, 3242424, 'toto234', 'Tomas0125', 'tomasferreyra40@gmail.com'),
(9, 'fsdfsd', 'fsdfsd', 4232324, 3242424, 'toto234', 'Tomas0125', 'tomasferreyra40@gmail.com'),
(10, 'fsdfsd', 'fsdfsd', 4232324, 3242424, 'toto234', 'Tomas0125', 'tomasferreyra40@gmail.com'),
(11, 'fsdfsd', 'fsdfsd', 4232324, 3242424, 'toto234', 'Tomas0125', 'tomasferreyra40@gmail.com');

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `historias clinicas`
--
ALTER TABLE `historias clinicas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
