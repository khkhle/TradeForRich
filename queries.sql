-- Create Account Table
CREATE TABLE IF NOT EXISTS account (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- Create Market Type Table
CREATE TABLE IF NOT EXISTS market_type (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- Create Market Table
CREATE TABLE IF NOT EXISTS market (
    name TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL PRIMARY KEY,
    typeId INT,
    common INT NOT NULL,
    FOREIGN KEY (typeId) REFERENCES market_type(id) ON DELETE CASCADE
);

-- Create Newspaper Table
CREATE TABLE IF NOT EXISTS newspaper (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- Create News Table
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    link TEXT NOT NULL UNIQUE,
    newspaperId INT,
    image_link TEXT NOT NULL UNIQUE,
    date DATE NOT NULL,
    FOREIGN KEY (newspaperId) REFERENCES newspaper(id) ON DELETE CASCADE
);

-- Create Favorite News Table
CREATE TABLE IF NOT EXISTS fav_news (
    accountId INT,
    newsId INT,
    PRIMARY KEY (accountId, newsId),
    FOREIGN KEY (accountId) REFERENCES account(id) ON DELETE CASCADE,
    FOREIGN KEY (newsId) REFERENCES news(id) ON DELETE CASCADE
);

-- Create Favorite Market Table
CREATE TABLE IF NOT EXISTS fav_market (
    accountId INT,
    marketCode TEXT,
    PRIMARY KEY (accountId, marketCode),
    FOREIGN KEY (accountId) REFERENCES account(id) ON DELETE CASCADE,
    FOREIGN KEY (marketCode) REFERENCES market(code) ON DELETE CASCADE
);

-- Insert Accounts
INSERT INTO account (name, email, password) VALUES
('Alice Smith', 'alice@example.com', 'password123'),
('Bob Johnson', 'bob@example.com', 'securepass456'),
('Charlie Brown', 'charlie@example.com', 'mypassword789');

-- Insert Market Types
INSERT INTO market_type (name) VALUES
('Stock'),
('Crypto'),
('Forex');

-- Insert Markets
INSERT INTO market (name, code, typeId, common) VALUES
('Bitcoin', 'BTC', 2, 1),
('Ethereum', 'ETH', 2, 0),
('Apple Inc.', 'AAPL', 1, 1),
('Tesla', 'TSLA', 1, 1),
('EUR/USD', 'EURUSD', 3, 0);

-- Insert Newspapers
INSERT INTO newspaper (name) VALUES
('The Financial Times'),
('Wall Street Journal'),
('Crypto Daily'),
('Fox News');

-- Insert News
INSERT INTO news (id, name, link, newspaperId, image_link, date) VALUES
(1, 'Trump vows to cut off federal funding to Maine over refusal to comply with "No Men in Women''s Sports" order', 
 'https://www.foxnews.com/sports/trump-vows-cut-off-federal-funding-maine-refsual-comply-no-men-womens-sports-order', 
 4, 
 'https://a57.foxnews.com/prod-hp.foxnews.com/images/2025/02/720/405/043d2d62a292c823304c7919afe7227e.jpg?tl=1&ve=1', 
 '2025-02-21'),
(2, 'Apple withdraws cloud encryption service from UK after government order', 
 'https://www.ft.com/content/bc20274f-f352-457c-8f86-32c6d4df8b92', 
 1, 
 'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Fe0b371d0-a202-46cd-b269-86c4b23da6a7.jpg?source=next-home-page&dpr=2&width=580&fit=scale-down', 
 '2025-02-21'),
(3, 'Why Is Warren Buffett Hoarding So Much Cash?', 
 'https://www.wsj.com/finance/stocks/warren-buffett-berkshire-hathaway-cash-annual-letter-2c956952?mod=hp_lead_pos8', 
 2, 
 'https://images.wsj.net/im-76129956?width=700&size=1.5005861664712778', 
 '2025-02-21'),
(5, 'Vladimir Putin prepares for return of western companies to Russia', 
 'https://www.ft.com/content/3c2f2147-5511-4b7c-b79b-2daf500a9d69', 
 1, 
 'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Fe2e64217-8f2d-4cc7-a1bc-580d32a5a9ee.jpg?source=next-home-page&dpr=2&width=280&fit=scale-down', 
 '2025-02-21'),
(8, 'US stocks post worst slide in two months on gloomy economic data', 
 'https://www.ft.com/content/83b85e0c-9751-4428-95c9-3828b691468a', 
 1, 
 'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F6284ef3a-1fba-4d49-ad53-0e261465666c.jpg?source=next-home-page&dpr=2&width=580&fit=scale-down', 
 '2025-02-22');

-- Insert Favorite News
INSERT INTO fav_news (accountId, newsId) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 5);

-- Insert Favorite Markets
INSERT INTO fav_market (accountId, marketCode) VALUES
(1, 'BTC'),
(1, 'AAPL'),
(2, 'ETH'),
(2, 'TSLA'),
(3, 'EURUSD');


