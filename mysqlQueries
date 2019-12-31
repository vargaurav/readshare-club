CREATE DATABASE readshare; 

CREATE TABLE `auth` (
    `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int(12) DEFAULT NULL,
    `token` varchar(255) DEFAULT NULL,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_id` (`user_id`),
    KEY `idx_token` (`token`),
    KEY `idx_user_id` (`user_id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 

  CREATE TABLE `book` (
    `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    `writer` varchar(255) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `genre` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`),
    KEY `idx_name` (`name`),
    KEY `idx_writer` (`writer`),
    KEY `idx_genre` (`genre`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1


  CREATE TABLE `book_summary` (
    `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
    `book_id` int(12) DEFAULT NULL,
    `user_id` int(12) DEFAULT NULL,
    `content` text,
    `is_thread` tinyint(4) DEFAULT '0',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `genre` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_book_id` (`book_id`),
    KEY `idx_created_at` (`created_at`),
    KEY `idx_genre` (`genre`)
  ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 


  CREATE TABLE `essays` (
    `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int(12) DEFAULT NULL,
    `content` text,
    `is_thread` tinyint(4) DEFAULT '0',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `genre` varchar(255) DEFAULT NULL,
    `name` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_created_at` (`created_at`),
    KEY `idx_genre` (`genre`),
    KEY `idx_name` (`name`)
  ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1


  CREATE TABLE `podcast` (
    `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    `writer` varchar(255) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `genre` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`),
    KEY `idx_name` (`name`),
    KEY `idx_writer` (`writer`),
    KEY `idx_genre` (`genre`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1



  CREATE TABLE `podcast_summary` (
    `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
    `podcast_id` int(12) DEFAULT NULL,
    `user_id` int(12) DEFAULT NULL,
    `content` text,
    `is_thread` tinyint(4) DEFAULT '0',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `genre` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_podcast_id` (`podcast_id`),
    KEY `idx_created_at` (`created_at`),
    KEY `idx_genre` (`genre`)
  ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1



  CREATE TABLE `user` (
    `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
    `user_name` varchar(255) DEFAULT NULL,
    `password` varchar(255) DEFAULT NULL,
    `gmail_id` varchar(255) DEFAULT NULL,
    `status` smallint(6) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `gmail_id` (`gmail_id`),
    KEY `idx_gmail_id` (`gmail_id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1