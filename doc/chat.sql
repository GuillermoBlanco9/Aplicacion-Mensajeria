create database if not exists chats;

use chats;
-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create table if not exists `users`
 (
  `code` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `address` varchar(30) NOT NULL,
  `username` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `users`
  ADD PRIMARY KEY (`code`);

ALTER TABLE `users`
  MODIFY `code` int(10) NOT NULL AUTO_INCREMENT;

-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create table if not exists `message`
 (
  `id_msg` int(10) NOT NULL,
  `body` varchar(1000) NOT NULL,
  `origin_user_id` int(10) NOT NULL,
  `time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `message`
  ADD PRIMARY KEY (`id_msg`),
  ADD KEY `code_user` (`origin_user_id`);

ALTER TABLE `message`
  MODIFY `id_msg` int(10) NOT NULL AUTO_INCREMENT;

-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create table if not exists `sent_to`
 (
	`code_sent` int(10) NOT NULL,
  `id_msg` int(10) NOT NULL,
  `id_dest_user` int(10) NOT NULL,
  `read` boolean NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `sent_to`
  ADD PRIMARY KEY (`code_sent`),
  ADD KEY `message_id` (`id_msg`),
  ADD KEY `message_des` (`id_dest_user`);


ALTER TABLE `sent_to`
  MODIFY `code_sent` int(10) NOT NULL AUTO_INCREMENT;


-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



ALTER TABLE `message`
  ADD CONSTRAINT `origin_user_id_fk` FOREIGN KEY (`origin_user_id`) REFERENCES `users` (`code`);
  
  
ALTER TABLE `sent_to`
  ADD CONSTRAINT `dest_user_id_fk` FOREIGN KEY (`id_dest_user`) REFERENCES `users` (`code`),
  ADD CONSTRAINT `id_msg_fk` FOREIGN KEY (`id_msg`) REFERENCES `message` (`id_msg`);
  
-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  INSERT INTO `users` (`code`, `name`, `surname`, `email`, `password`, `address`, `username`) VALUES
(null, 'David', 'López', 'davidl@gmail.com', '$2y$10$fRoHxArYEAG74of6CV/TsuR1H0.olHyRBsLcUs4Ou.qKZ.m4/vxtW','Calle Mayor 33 1ºC 24402 Ponferrada, León, España', ''),
(null, 'Adrián', 'Rodríguez', 'adrianr@gmail.com', '$2y$10$8AkI98nhu494Ke.1M4S0Luah3vaIT0sDKCCpNLd49Kybb1TdgsFs2','Calle Mayor 33 1ºC 24402 Ponferrada, León, España', ''),
(null, 'Daniel', 'García', 'danielg@gmail.com', '$2y$10$GU7nuhRImp/V9Yx3aPyC3e8fDIf1nPyD2cWh7AEkSfKEbdhgb4PEq','Calle Mayor 33 1ºC 24402 Ponferrada, León, España', ''),
(null, 'Guillermo', 'Gil', 'guillermog@gmail.com', '$2y$10$yCl.AV8C/gWP1CxAHXEBZeCaIlgrcr2.mpWI2vhAyb/mXnJFSi5jS','Calle Mayor 33 1ºC 24402 Ponferrada, León, España', ''),
(null, 'Bernardo', 'Alcántara', 'bernardoa@gmail.com', '$2y$10$4LIdhSZd2diKQbCWnKk6GOq0l6oDsERL1zK6tjzhKUsyJwnNVC.U','Calle Mayor 33 1ºC 24402 Ponferrada, León, España', ''),
(null, 'Lu', 'Romero', 'lur@gmail.com', '$2y$10$8fknlPWHtuVOuCNJQ4XOpO/FGLB0zCVEx7KrFuhsHgbHkWv1mGXSu','Calle Mayor 33 1ºC 24402 Ponferrada, León, España', ''),
(null, 'Angélica', 'Pérez', 'angelicap@gmail.com', '$2y$10$.5E2mH7E3ug0SGmKhbKiKeXBcjfF3BYrRikrJ.RP0z5ItMI8CuuuC','Calle Mayor 33 1ºC 24402 Ponferrada, León, España', ''),
(null, 'Jorge', 'Sánchez', 'jorges@gmail.com', '$2y$10$5IswkizKeS2JnMoma7MvMeCFR.dnCH2XEA0OsjDFFxH1piIjDjRye','Calle Mayor 33 1ºC 24402 Ponferrada, León, España', ''),
(null, 'Roberto', 'Fernández', 'robertof@gmail.com', '$2y$10$3UD0KOOHMVemftHVBSiXJejAo18XBHDAuryW85j3oRQcKdiZk/fCi','Calle Mayor 33 1ºC 24402 Ponferrada, León, España', ''),
(null, 'Ariel', 'Martínez', 'arielm@gmail.com', '$2y$10$ken3dj3KmyhNcYsKTTrP4.LL2abqL34IDQBB5KFThOTcgKZfByTmy','Calle Mayor 33 1ºC 24402 Ponferrada, León, España', ''),;

  
  