# connection
# hostname: 127.0.0.1
# username: root
# password: mysql
# database: bookstore

# register book
INSERT INTO books (isbn, name, author) 
VALUES ({isbn}, {name}, {author});

#register delivery
INSERT INTO book_delivery (amount_delivery, f-price, bookshelf)
VALUES ({amount_delivery}, {f-price}, {bookshelf});