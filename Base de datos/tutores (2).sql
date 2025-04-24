-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-04-2025 a las 23:10:32
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
-- Base de datos: `tutores`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `IDalumnos` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Grado` varchar(255) NOT NULL,
  `Carrera` varchar(255) NOT NULL,
  `Gmail` varchar(255) NOT NULL,
  `Numero` varchar(20) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Foto` varchar(255) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `Activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`IDalumnos`, `Nombre`, `Grado`, `Carrera`, `Gmail`, `Numero`, `Contraseña`, `Foto`, `Fecha`, `Activo`) VALUES
(1, 'Emily Mariana', '6-A', 'BTDS', 'emilymariana@gmail.com', '33 1141 1360', 'emily123', '1744599395406-WhatsApp Image 2025-04-01 at 17.22.29.jpeg', '2025-04-14 02:56:35', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat_messages`
--

CREATE TABLE `chat_messages` (
  `message_id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `chat_messages`
--

INSERT INTO `chat_messages` (`message_id`, `room_id`, `sender_id`, `username`, `role`, `message`, `created_at`) VALUES
(15, 2, 3, 'Regina Haydee', 'tutor', 'Hola, Buenas tardes alumnos', '2025-04-12 01:19:10'),
(16, 1, 1, 'Leslie Livier', 'tutor', 'hola', '2025-04-12 03:16:14'),
(17, 1, 3, 'Regina Haydee', 'tutor', 'Hola amigos', '2025-04-13 02:49:15'),
(18, 1, 4, 'Arely Fabiola ', 'tutor', 'hola gente', '2025-04-14 02:27:57'),
(19, 1, 1, 'Emily Mariana', 'alumno', 'Holi', '2025-04-14 03:00:46'),
(20, 2, 1, 'Emily Mariana', 'alumno', 'muy buenas tardes', '2025-04-14 03:05:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat_rooms`
--

CREATE TABLE `chat_rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_private` tinyint(1) DEFAULT 0,
  `password` varchar(255) DEFAULT NULL,
  `average_rating` decimal(3,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `chat_rooms`
--

INSERT INTO `chat_rooms` (`id`, `name`, `description`, `image_url`, `is_private`, `password`, `average_rating`) VALUES
(1, 'Matematicas BTDS', 'Una sala apara ayudar a los alumnos de BTDS en las matematicas', '1744267879167-mathematics-doodle-hand-drawn-school-set-vector.jpg', 1, 'matebtds', 0.00),
(2, 'Ingles BTDS', 'Una sala de chat para poyar a los alumnos de BTDS en la materia de ingles', '1744414286722-ingleÌs.jpg', 1, 'inglesbtds', 0.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat_room_users`
--

CREATE TABLE `chat_room_users` (
  `user_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `role` enum('tutor','alumno') NOT NULL,
  `tutor_id` int(11) DEFAULT NULL,
  `alumno_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `chat_room_users`
--

INSERT INTO `chat_room_users` (`user_id`, `room_id`, `role`, `tutor_id`, `alumno_id`) VALUES
(1, 1, 'tutor', NULL, NULL),
(1, 1, 'alumno', NULL, NULL),
(1, 2, 'alumno', NULL, NULL),
(3, 1, 'tutor', NULL, NULL),
(3, 2, 'tutor', NULL, NULL),
(4, 1, 'tutor', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados_alumnos`
--

CREATE TABLE `resultados_alumnos` (
  `ID_resultado` int(11) NOT NULL,
  `ID_alumno` int(11) NOT NULL,
  `Materia` varchar(255) NOT NULL,
  `Semestre` varchar(255) NOT NULL,
  `Correctas` int(11) NOT NULL,
  `Incorrectas` int(11) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados_tutores`
--

CREATE TABLE `resultados_tutores` (
  `ID` int(11) NOT NULL,
  `ID_tutor` int(11) NOT NULL,
  `Materia` varchar(255) NOT NULL,
  `Semestre` varchar(50) NOT NULL,
  `Correctas` int(11) NOT NULL,
  `Incorrectas` int(11) NOT NULL,
  `Fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resultados_tutores`
--

INSERT INTO `resultados_tutores` (`ID`, `ID_tutor`, `Materia`, `Semestre`, `Correctas`, `Incorrectas`, `Fecha`) VALUES
(4, 3, 'Sistemas numéricos computacionales', 'Primer Semestre', 10, 0, '2025-04-17 15:12:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `room_ratings`
--

CREATE TABLE `room_ratings` (
  `id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` between 1 and 5),
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `room_ratings`
--

INSERT INTO `room_ratings` (`id`, `room_id`, `user_id`, `username`, `rating`, `comment`, `created_at`) VALUES
(1, 1, 1, 'Leslie Livier', 5, 'Muy buena sala de chat', '2025-04-13 01:48:28'),
(2, 1, 4, 'Arely Fabiola ', 5, 'Son muy atentos y explican muy bien', '2025-04-14 02:28:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutor`
--

CREATE TABLE `tutor` (
  `ID` int(11) NOT NULL,
  `Tutor` varchar(255) NOT NULL,
  `Descripcion` text NOT NULL,
  `Numero` varchar(20) DEFAULT NULL,
  `Gmail` varchar(255) DEFAULT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Foto` varchar(255) DEFAULT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `Activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tutor`
--

INSERT INTO `tutor` (`ID`, `Tutor`, `Descripcion`, `Numero`, `Gmail`, `Contrasena`, `Foto`, `Fecha`, `Activo`) VALUES
(1, 'Leslie Livier', 'Hola soy tutora en matematicas y puedo ayudar a los alumnos orientandolos', '3333743387', 'livier2007@gmail.com', 'leslie080107', '1744267221086-WhatsApp Image 2025-04-10 at 00.36.44.jpeg', '2025-04-10 06:40:21', 1),
(3, 'Regina Haydee', 'Soy tutora de Ingles, puedo apoyar en la traduccion y el comprender mejor los textos', '3322144345', 'ayde3otxz@gmail.com', 'Reginaotz', '1744414175011-488421821_2038488879978343_394986790104944305_n.jpg', '2025-04-11 23:29:35', 1),
(4, 'Arely Fabiola ', 'Soy tutora de arte, puedo ayudarles a regresar con su ex', '3326985022', 'arelypina@gmail.com', 'arely123', '1744597613149-WhatsApp Image 2025-04-13 at 20.17.57.jpeg', '2025-04-14 02:26:53', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`IDalumnos`),
  ADD UNIQUE KEY `Gmail` (`Gmail`);

--
-- Indices de la tabla `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`message_id`),
  ADD UNIQUE KEY `idx_message_unique` (`room_id`,`sender_id`,`message`(255),`created_at`);

--
-- Indices de la tabla `chat_rooms`
--
ALTER TABLE `chat_rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `chat_room_users`
--
ALTER TABLE `chat_room_users`
  ADD PRIMARY KEY (`user_id`,`room_id`,`role`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `fk_tutor` (`tutor_id`),
  ADD KEY `fk_alumno` (`alumno_id`);

--
-- Indices de la tabla `resultados_alumnos`
--
ALTER TABLE `resultados_alumnos`
  ADD PRIMARY KEY (`ID_resultado`),
  ADD KEY `ID_alumno` (`ID_alumno`);

--
-- Indices de la tabla `resultados_tutores`
--
ALTER TABLE `resultados_tutores`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_tutor` (`ID_tutor`);

--
-- Indices de la tabla `room_ratings`
--
ALTER TABLE `room_ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indices de la tabla `tutor`
--
ALTER TABLE `tutor`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `IDalumnos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `chat_rooms`
--
ALTER TABLE `chat_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `resultados_alumnos`
--
ALTER TABLE `resultados_alumnos`
  MODIFY `ID_resultado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `resultados_tutores`
--
ALTER TABLE `resultados_tutores`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `room_ratings`
--
ALTER TABLE `room_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tutor`
--
ALTER TABLE `tutor`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `chat_room_users`
--
ALTER TABLE `chat_room_users`
  ADD CONSTRAINT `chat_room_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tutor` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `chat_room_users_ibfk_3` FOREIGN KEY (`room_id`) REFERENCES `chat_rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_alumno` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`IDalumnos`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tutor` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`ID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `resultados_alumnos`
--
ALTER TABLE `resultados_alumnos`
  ADD CONSTRAINT `resultados_alumnos_ibfk_1` FOREIGN KEY (`ID_alumno`) REFERENCES `alumnos` (`IDalumnos`) ON DELETE CASCADE;

--
-- Filtros para la tabla `resultados_tutores`
--
ALTER TABLE `resultados_tutores`
  ADD CONSTRAINT `resultados_tutores_ibfk_1` FOREIGN KEY (`ID_tutor`) REFERENCES `tutor` (`ID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `room_ratings`
--
ALTER TABLE `room_ratings`
  ADD CONSTRAINT `room_ratings_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `chat_rooms` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
