CREATE TABLE products_argrements(
	id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    argrement_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (argrement_id) REFERENCES agrements(id)
);