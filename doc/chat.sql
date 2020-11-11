create database if not exists chats;

use chats;
-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create table if not exists `users`
 (
  `code` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `surName` varchar(30) NOT NULL,
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
  
  
  
  
  