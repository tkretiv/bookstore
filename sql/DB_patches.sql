alter table book_delivery change koefficient kund_price decimal(10,2);
alter table book_delivery modify fprice decimal(10,2) not null;

CREATE TRIGGER calc_custprice BEFORE INSERT ON book_delivery
   FOR EACH ROW SET NEW.kund_price=NEW.fprice*1.8;