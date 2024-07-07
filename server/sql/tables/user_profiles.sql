CREATE TABLE user_profiles (
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    username NVARCHAR(100) NOT NULL,
    profileImageName NVARCHAR(100),
    money DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)