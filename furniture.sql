-- 建置新的資料庫 furniture
CREATE DATABASE `furniture`;

select database();

USE `furniture`;

SET FOREIGN_KEY_CHECKS = 0;

SET FOREIGN_KEY_CHECKS = 1;

DROP table article;
DROP table article_category;
DROP table article_tag;
DROP table tag;

-- 開始新增資料庫表單
-----------------------------------------建置 article 表單
CREATE TABLE article (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100),
    content longtext,
    article_category_id INT NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    upload_at DATETIME,
    published_date DATETIME,
    is_valid TINYINT NOT NULL DEFAULT 1,
    FOREIGN KEY (`article_category_id`) REFERENCES article_category (`id`)
);

CREATE TABLE `article_img` (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL,
    img VARCHAR(500),
    FOREIGN KEY (`article_id`) REFERENCES article (`id`)
);

CREATE TABLE `article_category` (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20)
);

INSERT INTO `article_category` (`name`) VALUES 
('推薦風格'),
('有趣小知識'),
('家具保養與使用技巧'),
('家具選購指南'),
('美感生活誌');



CREATE TABLE `tag` (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(300),
    create_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `article_tag` (
    article_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (`article_id`) REFERENCES article (`id`),
    FOREIGN KEY (`tag_id`) REFERENCES tag (`id`)
);
SELECT article.*, article_category.name 
  FROM article
  left join article_category
  on article.article_category_id = article_category.id