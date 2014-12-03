SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `bookshop` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `bookshop`;

DROP TABLE IF EXISTS `book_delivery`;
DROP TABLE IF EXISTS `book_sales`;
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `isbn` varchar(13) NOT NULL DEFAULT '',
  `name` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `books` VALUES
('9780932633163', 'Are your lights on?', 'Gerald Weinberg', NULL),
('9780932633699', 'Perfect Software - And other illusions about software testing', 'Gerald Weinberg', NULL),
('9781430235330', 'Pro Agile .NET Development with SCRUM', 'Scott Millett', NULL),
('9781550021912', 'Scrum Wars', 'Allan G. Levine', NULL),
('9789087537203', 'Scrum - a pocket guide', 'Gunther Verheyen', NULL);


CREATE TABLE `book_delivery` (
  `isbn` varchar(13) NOT NULL,
  `date_delivery` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount_delivery` int(10) DEFAULT NULL,
  `fprice` decimal(10,2) NOT NULL,
  `bookshelf` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `History_kundprice`;
CREATE TABLE `History_kundprice` (
  `isbn` varchar(13) DEFAULT NULL,
  `kund_price` decimal(9,2) DEFAULT NULL,
  `data_change` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `book_sales` (
  `isbn` varchar(13) NOT NULL,
  `date_sale` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount_sale` int(10) DEFAULT NULL,
  `bookstock_balance` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `book_sales` VALUES
('9781550021912', '2014-11-24 11:20:23', 1, NULL);


INSERT INTO `book_delivery` VALUES
('9780932633163', '2014-11-24 09:30:51', 10, '200.00', 'A1'),
('9780932633699', '2014-11-24 09:30:51', 5, '250.00', 'A2'),
('9781430235330', '2014-11-24 09:30:51', 10, '230.00', 'A3'),
('9781550021912', '2014-11-24 09:30:51', 15, '130.00', 'A2');


ALTER TABLE `books`
 ADD PRIMARY KEY (`isbn`);

ALTER TABLE `book_delivery`
 ADD KEY `isbn` (`isbn`);

ALTER TABLE `book_sales`
 ADD KEY `isbn` (`isbn`);

ALTER TABLE `History_kundprice`
 ADD KEY `isbn` (`isbn`);


ALTER TABLE `book_delivery`
ADD CONSTRAINT `book_delivery_ibfk_1` FOREIGN KEY (`isbn`) REFERENCES `books` (`isbn`);

ALTER TABLE `book_sales`
ADD CONSTRAINT `book_sales_ibfk_1` FOREIGN KEY (`isbn`) REFERENCES `books` (`isbn`);

ALTER TABLE `History_kundprice`
ADD CONSTRAINT `history_kundprice_ibfk_1` FOREIGN KEY (`isbn`) REFERENCES `books` (`isbn`);
