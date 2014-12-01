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
where isbn like {isbn} and upper(author) like upper({author}) and upper(name) like upper({name});