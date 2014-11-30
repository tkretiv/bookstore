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
FROM books, book_delivery WHERE book_delivery.isbn=books.isbn;

