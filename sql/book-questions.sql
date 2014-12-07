# connection
# hostname: 127.0.0.1
# username: root
# password: mysql
# database: bookshop

# register book
INSERT INTO books (isbn, name, author) VALUES ({isbn}, {name}, {author});

# get book
SELECT * FROM books, book_delivery WHERE isbn={isbn};

# register delivery
INSERT INTO book_delivery (isbn, amount_delivery, fprice, bookshelf) VALUES ({isbn}, {amount_delivery}, {fprice}, {bookshelf}); 

# process delivery
SELECT books.isbn, books.name, books.author 
FROM books, book_delivery WHERE book_delivery.isbn={isbn} && book_delivery.amount_delivery={amount_delivery} && book_delivery.fprice={fprice} && book_delivery.bookshelf={bookshelf};

# show delivery
SELECT books.isbn, books.name, books.author, book_delivery.amount_delivery, book_delivery.fprice, book_delivery.bookshelf 
FROM books, book_delivery WHERE book_delivery.isbn=books.isbn ORDER BY date_delivery DESC LIMIT 1;

#kundsearching
Select b.isbn, b.name, b.author, 
	(select kund_price 
	from history_kundprice hk 
	where hk.isbn = b.isbn 
	order by data_change desc 
	limit 1) kund_price, 
	(select sum(amount) 
	from (select isbn, amount_delivery amount 
			from book_delivery 
			union select isbn, -amount_sale 
			from book_sales ) t
	 where t.isbn=b.isbn 
	 group by isbn) bookstore_balance 
from books b 
where b.isbn like {isbn} and upper(b.author) like upper({author}) and upper(b.name) like upper({name});

# change customerprice
INSERT INTO history_kundprice (isbn, kund_price) 
VALUES ({isbn}, {kund_price});

# insert customerprice
INSERT INTO history_kundprice (isbn, kund_price)
VALUES ({isbn}, ({fprice}*1.8*1.06));

# rapport
 	Select b.isbn, b.name, b.author, 
	bd.fprice, bd.amount_delivery, bd.fprice*bd.amount_delivery Delivery_costnad,
	(select kund_price 
	from history_kundprice hk 
	where hk.isbn = b.isbn and hk.data_change<=bos.date_sale
	order by data_change desc 
	limit 1) kund_price, bos.date_sale,
	ifnull(bos.amount_sale,0) Sold,	
    ifnull(bos.amount_sale,0)*ifnull(bos.hk,0) sum_sold,
	bd.amount_delivery-ifnull((select sum(amount_sale) 
						from book_sales bbs
						where bbs.isbn=bd.isbn
							and bbs.date_sale<=bos.date_sale),0) bookstore_balance
from books b 
join book_delivery bd on (bd.isbn=b.isbn)
left outer join (select bs.isbn, bs.date_sale, bs.amount_sale,(select  kund_price
      		from history_kundprice hp   
      		where hp.data_change<=ifnull(bs.date_sale, now())
                 and hp.isbn=bs.isbn
      		order by data_change desc
      		limit 1 
      		) hk
from  book_sales bs 
where bs.date_sale<=now())  bos on (bos.isbn=b.isbn)
where b.isbn like  {isbn} and upper(b.author) like upper({author}) and upper(b.name) like upper({name})
order by b.isbn, bd.date_delivery, bos.date_sale