-- -------------------------------------------------------------
-- TablePlus 5.9.6(546)
--
-- https://tableplus.com/
--
-- Database: db_movie
-- Generation Time: 2024-04-14 18:34:26.6680
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `banners`;
CREATE TABLE `banners` (
  `banner_id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int DEFAULT NULL,
  `banner_image` varchar(100) NOT NULL,
  PRIMARY KEY (`banner_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `banners_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `book_ticket`;
CREATE TABLE `book_ticket` (
  `user_id` int NOT NULL,
  `showtime_id` int NOT NULL,
  `chair_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`,`showtime_id`),
  KEY `showtime_id` (`showtime_id`),
  CONSTRAINT `book_ticket_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `book_ticket_ibfk_2` FOREIGN KEY (`showtime_id`) REFERENCES `showtime` (`showtime_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `chairs`;
CREATE TABLE `chairs` (
  `chair_id` int NOT NULL AUTO_INCREMENT,
  `chair_name` varchar(10) DEFAULT NULL,
  `chair_type` varchar(20) DEFAULT NULL,
  `theater_id` int DEFAULT NULL,
  PRIMARY KEY (`chair_id`),
  KEY `theater_id` (`theater_id`),
  CONSTRAINT `chairs_ibfk_1` FOREIGN KEY (`theater_id`) REFERENCES `theater` (`theater_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `movie_id` int NOT NULL AUTO_INCREMENT,
  `movie_name` varchar(100) NOT NULL,
  `trailer` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `description` varchar(225) NOT NULL,
  `premiere_date` date DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `is_hot` tinyint(1) DEFAULT NULL,
  `is_showing` tinyint(1) DEFAULT NULL,
  `is_comming_soon` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `showtime`;
CREATE TABLE `showtime` (
  `showtime_id` int NOT NULL AUTO_INCREMENT,
  `theater_id` int DEFAULT NULL,
  `movie_id` int DEFAULT NULL,
  `showtime_date` datetime DEFAULT NULL,
  `ticket_price` int DEFAULT NULL,
  PRIMARY KEY (`showtime_id`),
  KEY `theater_id` (`theater_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `showtime_ibfk_1` FOREIGN KEY (`theater_id`) REFERENCES `theater` (`theater_id`),
  CONSTRAINT `showtime_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `theater`;
CREATE TABLE `theater` (
  `theater_id` int NOT NULL AUTO_INCREMENT,
  `theater_name` varchar(50) DEFAULT NULL,
  `group_id` int DEFAULT NULL,
  PRIMARY KEY (`theater_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `theater_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `theater_group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `theater_group`;
CREATE TABLE `theater_group` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `system_id` int DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  KEY `system_id` (`system_id`),
  CONSTRAINT `theater_group_ibfk_1` FOREIGN KEY (`system_id`) REFERENCES `theater_system` (`system_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `theater_system`;
CREATE TABLE `theater_system` (
  `system_id` int NOT NULL AUTO_INCREMENT,
  `system_name` varchar(50) NOT NULL,
  `logo` varchar(100) NOT NULL,
  PRIMARY KEY (`system_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(150) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `pass_word` varchar(225) NOT NULL,
  `user_type` varchar(20) DEFAULT 'USER',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `chairs` (`chair_id`, `chair_name`, `chair_type`, `theater_id`) VALUES
(1, 'A1', 'NORMAL', 1),
(2, 'A2', 'NORMAL', 1),
(3, 'A3', 'NORMAL', 1),
(4, 'A4', 'NORMAL', 1),
(5, 'A5', 'NORMAL', 1),
(6, 'B1', 'NORMAL', 1),
(7, 'B2', 'NORMAL', 1),
(8, 'B3', 'NORMAL', 1),
(9, 'B4', 'NORMAL', 1),
(10, 'B5', 'NORMAL', 1),
(11, 'C1', 'VIP', 1),
(12, 'C2', 'VIP', 1),
(13, 'C3', 'VIP', 1),
(14, 'C4', 'VIP', 1),
(15, 'C5', 'VIP', 1),
(16, 'A1', 'NORMAL', 2),
(17, 'A2', 'NORMAL', 2),
(18, 'A3', 'NORMAL', 2),
(19, 'A4', 'NORMAL', 2),
(20, 'A5', 'NORMAL', 2),
(21, 'B1', 'NORMAL', 2),
(22, 'B2', 'NORMAL', 2),
(23, 'B3', 'NORMAL', 2),
(24, 'B4', 'NORMAL', 2),
(25, 'B5', 'NORMAL', 2),
(26, 'C1', 'VIP', 2),
(27, 'C2', 'VIP', 2),
(28, 'C3', 'VIP', 2),
(29, 'C4', 'VIP', 2),
(30, 'C5', 'VIP', 2),
(31, 'A1', 'NORMAL', 3),
(32, 'A2', 'NORMAL', 3),
(33, 'A3', 'NORMAL', 3),
(34, 'A4', 'NORMAL', 3),
(35, 'A5', 'NORMAL', 3),
(36, 'B1', 'NORMAL', 3),
(37, 'B2', 'NORMAL', 3),
(38, 'B3', 'NORMAL', 3),
(39, 'B4', 'NORMAL', 3),
(40, 'B5', 'NORMAL', 3),
(41, 'C1', 'VIP', 3),
(42, 'C2', 'VIP', 3),
(43, 'C3', 'VIP', 3),
(44, 'C4', 'VIP', 3),
(45, 'C5', 'VIP', 3);

INSERT INTO `theater` (`theater_id`, `theater_name`, `group_id`) VALUES
(1, 'Rap1', 1),
(2, 'Rap2', 1),
(3, 'Rap1', 2);

INSERT INTO `theater_group` (`group_id`, `group_name`, `address`, `system_id`) VALUES
(1, 'CGV 1', '1 Nguyễn Văn A, phường Aa, quận Aaa', 1),
(2, 'CGV 2', '2 Nguyễn Văn B, phường Bb, quận Bbb', 1),
(3, 'Galaxy 1', '1 Lê Văn C, phường Cc, quận Ccc', 2),
(4, 'Galaxy 2', '2 Lê Văn D, phường Dd, quận Ddd', 2);

INSERT INTO `theater_system` (`system_id`, `system_name`, `logo`) VALUES
(1, 'CGV', 'cgv-logo.webp'),
(2, 'Galaxy', 'default-theater-logo.webp');

INSERT INTO `users` (`user_id`, `full_name`, `email`, `phone`, `user_name`, `pass_word`, `user_type`) VALUES
(1, NULL, 'b.example@gmail.com', NULL, NULL, '$2b$10$o2ebT7rj4wywpGwwxg3yT.BmLSHmyKlEBuNynyqQDqXRkmIESRZlq', 'USER'),
(2, NULL, 'a.example@gmail.com', NULL, NULL, '$2b$10$fMNG00axAcLbEkMHHh/taeN6kVKzVyfRI.//3nEX0KXZoG03rsDe.', 'USER'),
(3, 'Tuan Tran', 'admin.example@gmail.com', NULL, 'fme849', '$2b$10$XBPVsNU1A5LtOG7ihQVNHOmdbwmaX4I3NYJ0Wp6tYOc9hPdgtA02y', 'ADMIN'),
(4, NULL, 'c.example@gmail.com', NULL, NULL, '$2b$10$ZV0dhuWwhEdcMhBfmcyX2ujJVW2UHaX0dy2wPdw3wAAFK6d9lamJ6', 'ADMIN'),
(5, NULL, 'd.example@gmail.com', NULL, NULL, '$2b$10$0qbnCZ2JfMCjCgYAz8KpvedrynVjlXaAp1U7C8RUOuhSZA48CxQAu', 'ADMIN'),
(6, NULL, 'e.example@gmail.com', NULL, NULL, '$2b$10$FKFdBtTZ5ri43o/2b2Sc3uEgMcxCYVXpDA02GgLcTMHYGA2xk39w2', 'USER');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;