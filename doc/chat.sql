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
  `time` datetime NOT NULL
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
  
  
-- --------------------------------------------------------------------------------------------------------------


 INSERT INTO `users` (`code`, `name`, `surname`, `email`, `password`, `address`, `username`) VALUES
(null, 'David', 'López', 'davidl@gmail.com','', 'Calle Mayor 33 1ºC 24402 Ponferrada, León, España','' ),
(null, 'Adrián', 'Rodríguez', 'adrianr@gmail.com', '','Calle Mayor 33 1ºC 24402 Ponferrada, León, España','' ),
(null, 'Daniel', 'García', 'danielg@gmail.com', '','Calle Mayor 33 1ºC 24402 Ponferrada, León, España','' ),
(null, 'Guillermo', 'Gil', 'guillermog@gmail.com', '','Calle Mayor 33 1ºC 24402 Ponferrada, León, España','' ),
(null, 'Bernardo', 'Alcántara', 'bernardoa@gmail.com', '','Calle Mayor 33 1ºC 24402 Ponferrada, León, España','' ),
(null, 'Lu', 'Romero', 'lur@gmail.com', '','Calle Mayor 33 1ºC 24402 Ponferrada, León, España','' ),
(null, 'Angélica', 'Pérez', 'angelicap@gmail.com', '','Calle Mayor 33 1ºC 24402 Ponferrada, León, España','' ),
(null, 'Jorge', 'Sánchez', 'jorges@gmail.com', '','Calle Mayor 33 1ºC 24402 Ponferrada, León, España','' ),
(null, 'Roberto', 'Feernández', 'robertof@gmail.com','', 'Calle Mayor 33 1ºC 24402 Ponferrada, León, España','' ),
(null, 'Ariel', 'Martínez', 'arielm@gmail.com','', 'Calle Mayor 33 1ºC 24402 Ponferrada, León, España','' );




  
  INSERT INTO `message` (`id_msg`,`body`,`origin_user_id`,`time`) VALUES
  (null,'Lorem ipsum dolor sit amet','1','2020-11-12 10:10:10'),
  (null,'Lorem ipsum dolor sit amet','2','2020-11-13 10:10:30'),
  (null,'Lorem ipsum dolor sit amet','1','2020-11-13 10:11:10'),
  (null,'Lorem ipsum dolor sit amet','2','2020-11-13 10:10:20'),
   (null,'Lorem ipsum dolor sit amet','1','2020-11-14 10:10:10'),
  (null,'Lorem ipsum dolor sit amet','2','2020-11-15 10:10:30'),
  (null,'Lorem ipsum dolor sit amet','1','2020-11-15 10:11:10'),
  (null,'Lorem ipsum dolor sit amet','2','2020-11-15 10:10:20'),
   (null,'Lorem ipsum dolor sit amet','1','2020-11-16 10:10:10'),
  (null,'Lorem ipsum dolor sit amet','2','2020-11-17 10:10:30'),
  (null,'Lorem ipsum dolor sit amet','1','2020-11-17 10:11:10'),
  (null,'Lorem ipsum dolor sit amet','1','2020-11-17 10:10:20');







  
  