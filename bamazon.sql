DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR (255),
price DECIMAL (10,2),
stock_quantity integer (10),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Stargate", "Movie", 7.99, 65), 
("Super Mario Bro", "Movie", 7.99, 85),
("Final Fantasy", "Video Game", 59.99, 2), 
("Glamour", "Magazine", 12.00, 70),
("Blitzkrieg", "DVD", 9.77, 43), 
("Independence Day", "Blue-ray", 14.99, 56),
("Disney Ultimate", "Toy", 26.22, 42), 
("Zombieland", "Blue-ray", 23.99, 21),
("LG TV", "Electronic", 499.00, 17), 
("MacBook Pro", "Electronic", 700.00, 1);

SELECT * FROM products;