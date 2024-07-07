CREATE TABLE products(
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    imageName NVARCHAR(100) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    description NVARCHAR(500),
    isSoldOut TINYINT NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
