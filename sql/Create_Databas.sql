CREATE DATABASE IF NOT EXISTS  bookshop CHARACTER SET utf8 COLLATE utf8_general_ci;
use bookshop;

CREATE TABLE  IF NOT EXISTS books (
isbn int(13),
name varchar(255),
author varchar(255),
Description varchar(500),
PRIMARY KEY (isbn)
);

CREATE TABLE  IF NOT EXISTS book_delivery (
isbn int(13) not null,
date_delivery TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
amount_delivery int(10),
fprice decimal(10,2),
koefficient decimal(4,2) DEFAULT 1.80,
bookshelf varchar(10),
FOREIGN KEY (isbn) REFERENCES books(isbn)
);

CREATE TABLE  IF NOT EXISTS book_sales (
isbn int(13) not null,
date_sale TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
amount_sale int(10),
bookstock_balance int(10),
FOREIGN KEY (isbn) REFERENCES books(isbn)
);

