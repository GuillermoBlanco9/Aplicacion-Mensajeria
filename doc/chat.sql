-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-10-2019 a las 19:26:21
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `chat`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `CodCat` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`CodCat`, `Name`, `Description`) VALUES
(1, 'Food', 'Ingredients'),
(2, 'Non alcoholic', 'Non alcoholic drinks'),
(3, 'Alcoholic', 'Alcoholic drinks');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderproducts`
--

CREATE TABLE `orderproducts` (
  `CodOrdProd` int(11) NOT NULL,
  `Order` int(11) NOT NULL,
  `Product` int(11) NOT NULL,
  `Units` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `orderproducts`
--

INSERT INTO `orderproducts` (`CodOrdProd`, `Order`, `Product`, `Units`) VALUES
(76, 87, 3, 100),
(77, 87, 5, 150),
(78, 112, 1, 5),
(79, 113, 1, 5),
(80, 113, 3, 2),
(81, 113, 5, 1),
(82, 114, 1, 5),
(83, 114, 3, 2),
(84, 114, 5, 1),
(85, 117, 5, 1),
(86, 117, 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `CodOrd` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Sent` int(11) NOT NULL,
  `Restaurant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`CodOrd`, `Date`, `Sent`, `Restaurant`) VALUES
(87, '2019-10-16 10:31:32', 0, 1),
(92, '2019-10-21 16:06:58', 0, 1),
(93, '2019-10-21 16:07:03', 0, 1),
(94, '2019-10-21 16:09:00', 0, 1),
(95, '2019-10-21 16:09:22', 0, 1),
(96, '2019-10-21 16:09:58', 0, 1),
(97, '2019-10-21 16:11:06', 0, 1),
(98, '2019-10-21 16:11:52', 0, 1),
(99, '2019-10-21 16:13:48', 0, 1),
(100, '2019-10-21 16:13:49', 0, 1),
(101, '2019-10-21 16:13:49', 0, 1),
(102, '2019-10-21 16:13:50', 0, 1),
(103, '2019-10-21 16:15:00', 0, 1),
(104, '2019-10-21 16:15:01', 0, 1),
(105, '2019-10-21 16:15:02', 0, 1),
(106, '2019-10-21 16:15:02', 0, 1),
(107, '2019-10-21 16:15:02', 0, 1),
(108, '2019-10-21 16:15:03', 0, 1),
(109, '2019-10-21 16:15:03', 0, 1),
(110, '2019-10-21 16:15:04', 0, 1),
(111, '2019-10-21 16:16:18', 0, 1),
(112, '2019-10-21 16:16:19', 0, 1),
(113, '2019-10-21 16:19:03', 0, 1),
(114, '2019-10-21 16:19:18', 0, 1),
(115, '2019-10-21 16:28:25', 0, 1),
(116, '2019-10-21 16:29:17', 0, 1),
(117, '2019-10-22 15:27:48', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `CodProd` int(11) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Description` varchar(90) NOT NULL,
  `Weight` float NOT NULL,
  `Stock` int(11) NOT NULL,
  `Category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`CodProd`, `Name`, `Description`, `Weight`, `Stock`, `Category`) VALUES
(1, 'Flour', '8 packets of 1 kg each', 8, 84, 1),
(2, 'Salt', '20 packets of 1 kg each', 20, 3, 1),
(3, 'Water 0.5', '100 bottles of 0.5 litres each', 51, 77, 2),
(4, 'Water 1.5', '20 bottles of 1.5 litres each', 31, 45, 2),
(5, 'Beer Alhambra 1/3', '24 bottles of 33cl', 10, 9, 3),
(6, 'Red Wine Rioja 0.75', '6 bottles of 0.75 ', 5.5, 7, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurants`
--

CREATE TABLE `restaurants` (
  `CodRes` int(11) NOT NULL,
  `Mail` varchar(90) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `Country` varchar(45) NOT NULL,
  `P.C.` int(5) DEFAULT NULL,
  `City` varchar(45) NOT NULL,
  `Address` varchar(200) NOT NULL,
  `Role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `restaurants`
--

INSERT INTO `restaurants` (`CodRes`, `Mail`, `Password`, `Country`, `P.C.`, `City`, `Address`, `Role`) VALUES
(1, 'madrid1@empresa.com', '1234', 'España', 28002, 'Madrid', 'C/ Padre  Claret, 8', 0),
(2, 'cadiz1@empresa.com', '1234', 'España', 11001, 'Cádiz', 'C/ Portales, 2 ', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`CodCat`),
  ADD UNIQUE KEY `UN_NOM_CAT` (`Name`);

--
-- Indices de la tabla `orderproducts`
--
ALTER TABLE `orderproducts`
  ADD PRIMARY KEY (`CodOrdProd`),
  ADD KEY `CodPed` (`Order`),
  ADD KEY `CodProd` (`Product`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`CodOrd`),
  ADD KEY `Restaurante` (`Restaurant`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`CodProd`),
  ADD KEY `Categoria` (`Category`);

--
-- Indices de la tabla `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`CodRes`),
  ADD UNIQUE KEY `UN_RES_COR` (`Mail`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `CodCat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `orderproducts`
--
ALTER TABLE `orderproducts`
  MODIFY `CodOrdProd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `CodOrd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `CodProd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `CodRes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orderproducts`
--
ALTER TABLE `orderproducts`
  ADD CONSTRAINT `orderproducts_ibfk_1` FOREIGN KEY (`Order`) REFERENCES `orders` (`Codord`),
  ADD CONSTRAINT `orderproducts_ibfk_2` FOREIGN KEY (`Product`) REFERENCES `products` (`CodProd`);

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`Restaurant`) REFERENCES `restaurants` (`CodRes`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`Category`) REFERENCES `categories` (`CodCat`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
