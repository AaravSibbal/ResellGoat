CREATE TABLE IF NOT EXISTS users (
    -- 36 IS FOR THE UUID
    id VARCHAR(36) PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(150),
    pass VARCHAR(72)
);