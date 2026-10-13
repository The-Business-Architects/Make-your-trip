-- ============================================================
-- MakeYourTrip Inc. — CRM Database Schema
-- Hostinger MySQL / MariaDB compatible
-- ============================================================

CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `reference_code` VARCHAR(32) NOT NULL UNIQUE,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `country` VARCHAR(100) DEFAULT 'Worldwide',
  `journey_type` ENUM('one-way', 'return', 'multi-destination') DEFAULT 'one-way',
  `travel_class` ENUM('economy', 'premium-economy', 'business', 'first') DEFAULT 'economy',
  `adults` INT DEFAULT 1,
  `children` INT DEFAULT 0,
  `infants` INT DEFAULT 0,
  `return_date` VARCHAR(50) DEFAULT NULL,
  `requirements` TEXT DEFAULT NULL,
  `legs_json` LONGTEXT DEFAULT NULL,
  `status` ENUM('new', 'contacted', 'in_progress', 'quoted', 'booked', 'cancelled') DEFAULT 'new',
  `source` VARCHAR(50) DEFAULT 'website_form',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_status` (`status`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `inquiry_notes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `inquiry_id` INT NOT NULL,
  `admin_name` VARCHAR(100) DEFAULT 'Admin',
  `note` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`inquiry_id`) REFERENCES `inquiries`(`id`) ON DELETE CASCADE,
  INDEX `idx_inquiry_id` (`inquiry_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
