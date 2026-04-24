-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2026 at 06:55 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kot_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `user_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`user_id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'kalpana', 'khk@gmail.com', '12345678', 'customer', '2026-03-31 15:00:36'),
(2, 'kalpana', 'k@gmail.com', '12345678', 'customer', '2026-03-31 15:43:28'),
(3, 'kalpana', 'i@gmail.com', '12345678', 'customer', '2026-03-31 16:31:35'),
(4, 'suma', 's@gmail.com', '12345678', 'customer', '2026-04-01 04:53:37'),
(5, 'chinni', 'c@gmail.com', '12345678', 'customer', '2026-04-02 01:04:32'),
(6, 'chinni', 'h@gmail.com', '12345678', 'customer', '2026-04-02 01:12:39'),
(7, 'kavi', 'kavi@gmail.com', '12345678', 'customer', '2026-04-02 15:28:03'),
(8, 'honey', 'honey@gmail.com', '12345678', 'customer', '2026-04-02 17:25:22'),
(9, 'kalpana', 'j@gmail.com', '12345678', 'customer', '2026-04-03 06:12:13'),
(10, 'admin', 'a@gmail.com', '12345678', 'customer', '2026-04-03 07:25:03'),
(11, 'admin', 'kk@gmail.com', '12345678', 'customer', '2026-04-03 07:34:53'),
(12, 'kalpana', 'kj@gmail.com', '12345678', 'customer', '2026-04-03 08:06:19'),
(13, 'kalpana', 'kaj@gmail.com', '12345678', 'customer', '2026-04-03 08:38:29'),
(14, 'chinni', 'chinni@gmail.com', '12345678', 'customer', '2026-04-03 08:52:49'),
(15, 'mahindra', 'm@gmail.com', '12345678', 'customer', '2026-04-03 08:59:15'),
(16, 'renuka', 'renuka@gmail.com', '12345678', 'customer', '2026-04-03 10:11:57'),
(17, 'renuka', 'renukaj@gmail.com', '12345678', 'customer', '2026-04-03 10:13:01'),
(18, 'admin', 'aadmin@gmail.com', '12345678', 'customer', '2026-04-03 10:16:39'),
(19, 'arjun', 'arjun@gmail.com', '12345678', 'customer', '2026-04-03 12:05:59'),
(20, 'sonu', 'sonu@gmail.com', '12345678', 'customer', '2026-04-03 12:27:44'),
(21, 'soo', 'soo@gmail.com', '12345678', 'customer', '2026-04-03 12:44:25'),
(22, 'chinni', 'chinnij@gmail.com', '12345678', 'customer', '2026-04-03 12:53:53'),
(23, 'kalpanaaj', 'kalpanaaj@gmail.com', '12345678', 'customer', '2026-04-03 13:29:00'),
(24, 'kalpana', 'kkk@gmail.com', '12345678', 'customer', '2026-04-03 13:29:28'),
(25, 'jay', 'jay@gmail.com', '12345678', 'customer', '2026-04-03 13:33:22'),
(26, 'john', 'john@gmail.com', '12345678', 'customer', '2026-04-03 14:14:26'),
(27, 'kkkk', 'kkkk@gmail.com', 'chef123', 'customer', '2026-04-03 16:25:35'),
(28, 'raksha', 'raksha@gmail.com', '12345678', 'customer', '2026-04-03 22:04:24'),
(29, 'joy', 'joy@gmail.com', '12345678', 'customer', '2026-04-03 22:49:43'),
(30, 'kalpanak', 'kkkkk@gmail.com', '12345678', 'customer', '2026-04-04 00:41:19'),
(31, 'sonu', 'sonu@kot.com', 'waiter123', 'customer', '2026-04-04 15:10:48'),
(32, 'doe', 'doe@gmail.com', '12345678', 'customer', '2026-04-05 12:47:04'),
(33, 'regi', 'regi@gmail.com', '12345678', 'customer', '2026-04-05 14:01:44'),
(34, 'tim', 'tim@gmail.com', '12345678', 'customer', '2026-04-06 01:40:27'),
(35, 'pannu', 'pannu@gmail.com', '12345678', 'customer', '2026-04-06 04:28:20'),
(36, 'soumya', 'soumya@gmail.com', '12345678', 'customer', '2026-04-06 06:26:02'),
(37, 'eg', 'eg@gmail.com', '12345678', 'customer', '2026-04-07 04:44:59'),
(38, 'karthik', 'karthik@gmail.com', '12345678', 'customer', '2026-04-07 05:13:21'),
(39, 'so', 'so@gmail.com', '12345678', 'customer', '2026-04-15 14:43:28');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` bigint(20) NOT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `customer_name`, `rating`, `comment`) VALUES
(1, 'kalpana', 5, 'nhhhhh'),
(2, 'Guest', 5, 'good food'),
(3, 'Guest', 5, 'bjghfj'),
(4, 'Guest', 5, 'good service'),
(5, 'Guest', 5, 'gjhh'),
(6, 'Guest', 5, 'sadf');

-- --------------------------------------------------------

--
-- Table structure for table `menu_category`
--

CREATE TABLE `menu_category` (
  `category_id` bigint(20) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_category`
--

INSERT INTO `menu_category` (`category_id`, `category_name`) VALUES
(1, 'Main Course'),
(2, 'Fast Food'),
(3, 'Beverages'),
(4, 'Starters'),
(5, 'Desserts'),
(6, 'Breakfast'),
(7, 'Soups & Salads'),
(8, 'Combos & Platters'),
(9, 'Add-ons/Extra');

-- --------------------------------------------------------

--
-- Table structure for table `menu_item`
--

CREATE TABLE `menu_item` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT 'default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_item`
--

INSERT INTO `menu_item` (`id`, `name`, `price`, `category_id`, `image_url`) VALUES
(1, 'Pizza', 250.00, 2, 'pizza.webp'),
(2, 'Burger', 120.00, 2, 'burger.webp'),
(3, 'Pasta', 180.00, 2, 'pasta.jpeg'),
(4, 'Sandwich', 90.00, 2, 'Sandwich.webp'),
(5, 'Cold Coffee', 80.00, 3, 'cold coffee.jpg'),
(6, 'Paneer 65', 210.00, 4, 'paneer-65.jpg'),
(7, 'Gobi Manchurian', 180.00, 4, 'gobi.jpg'),
(8, 'Crispy Corn', 160.00, 4, 'crispy_corn.jpg'),
(9, 'Chocolate Brownie', 150.00, 5, 'choco.jpg'),
(10, 'Gulab Jamun (2pcs)', 80.00, 5, 'gulabjamun.jpg'),
(11, 'Vanilla Ice Cream', 90.00, 5, 'vanilla-ice-cream.jpg'),
(12, 'Masala Dosa', 110.00, 6, 'dosa.jpg'),
(13, 'Idli Sambar', 70.00, 6, 'Idli-Sambar.webp'),
(14, 'Poha', 60.00, 6, 'poha.jpg'),
(15, 'Tomato Soup', 120.00, 7, 'soup.jpg'),
(16, 'Sweet Corn Soup', 130.00, 7, 'cornsoup.jpg'),
(17, 'Green Salad', 90.00, 7, 'Salad.jpg'),
(18, 'Executive Veg Thali', 280.00, 8, 'thali.avif'),
(19, 'Chinese Combo', 250.00, 8, 'chinese.avif'),
(21, 'Extra Cheese', 40.00, 9, 'Cheese.jpg'),
(22, 'Extra Pav (2pcs)', 30.00, 9, 'pav.jpg'),
(23, 'Mayonnaise Dip', 20.00, 9, 'mayo.webp'),
(24, 'Paneer Butter Masala', 220.00, 1, 'pbm.jpg'),
(25, 'Veg Kadai', 200.00, 1, 'vk.webp'),
(26, 'Dal Tadka', 150.00, 1, 'dt.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `total_amount` decimal(38,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_name`, `total_amount`, `status`, `created_at`) VALUES
(4, 'Kalpana', 80.00, 'SERVED', '2026-04-02 17:33:44'),
(5, 'Kalpana', 170.00, 'SERVED', '2026-04-03 06:12:25'),
(6, 'Kalpana', 360.00, 'SERVED', '2026-04-03 07:25:15'),
(7, 'Kalpana', 120.00, 'PLACED', '2026-04-03 07:34:57'),
(8, 'Kalpana', 90.00, 'PLACED', '2026-04-03 08:06:32'),
(9, 'Kalpana', 250.00, 'PLACED', '2026-04-03 08:37:07'),
(10, 'Kalpana', 120.00, 'PLACED', '2026-04-03 08:38:34'),
(11, 'Kalpana', 250.00, 'PLACED', '2026-04-03 08:46:43'),
(12, 'Kalpana', 250.00, 'PLACED', '2026-04-03 08:52:56'),
(13, 'Kalpana', 250.00, 'PLACED', '2026-04-03 08:58:04'),
(14, 'Kalpana', 120.00, 'PLACED', '2026-04-03 08:59:31'),
(15, 'Kalpana', 180.00, 'PLACED', '2026-04-03 10:12:07'),
(16, 'Kalpana', 90.00, 'PLACED', '2026-04-03 10:13:09'),
(17, 'Kalpana', 90.00, 'PLACED', '2026-04-03 10:16:47'),
(18, NULL, NULL, 'PLACED', '2026-04-03 12:27:59'),
(19, 'Guest', 250.00, 'DELIVERED', '2026-04-03 14:04:29'),
(20, 'Guest', 80.00, 'DELIVERED', '2026-04-03 14:14:43'),
(21, 'Guest', 80.00, 'DELIVERED', '2026-04-03 16:25:44'),
(22, 'Guest', 80.00, 'DELIVERED', '2026-04-03 22:04:40'),
(23, 'Guest', 80.00, 'DELIVERED', '2026-04-03 22:15:24'),
(24, 'Guest', 250.00, 'DELIVERED', '2026-04-03 22:57:51'),
(25, 'Guest', 500.00, 'DELIVERED', '2026-04-04 00:49:43'),
(26, 'Guest', 180.00, 'DELIVERED', '2026-04-04 00:50:26'),
(27, 'Guest', 90.00, 'DELIVERED', '2026-04-04 00:50:51'),
(28, 'Guest', 0.00, 'DELIVERED', '2026-04-05 13:11:12'),
(29, 'Guest', 0.00, 'DELIVERED', '2026-04-05 13:11:29'),
(30, 'Guest', 0.00, 'DELIVERED', '2026-04-05 13:12:06'),
(31, 'Guest', 0.00, 'DELIVERED', '2026-04-05 13:56:23'),
(32, 'Guest', 0.00, 'DELIVERED', '2026-04-05 13:56:30'),
(33, 'Guest', 0.00, 'DELIVERED', '2026-04-05 13:56:32'),
(34, 'Guest', 0.00, 'DELIVERED', '2026-04-05 13:56:39'),
(35, 'Guest', 378.00, 'DELIVERED', '2026-04-05 14:00:58'),
(36, 'Guest', 0.00, 'DELIVERED', '2026-04-05 14:01:15'),
(37, 'Guest', 0.00, 'DELIVERED', '2026-04-05 14:01:16'),
(38, 'Guest', 168.00, 'DELIVERED', '2026-04-05 14:02:02'),
(39, 'Guest', 0.00, 'DELIVERED', '2026-04-05 14:02:12'),
(40, 'Guest', 0.00, 'DELIVERED', '2026-04-05 14:02:17'),
(41, 'Guest', 189.00, 'DELIVERED', '2026-04-05 14:04:59'),
(42, 'Guest', 168.00, 'DELIVERED', '2026-04-05 15:25:15'),
(43, 'Guest', 168.00, 'DELIVERED', '2026-04-06 01:40:38'),
(44, 'Guest', 84.00, 'DELIVERED', '2026-04-06 04:29:03'),
(45, 'Guest', 168.00, 'DELIVERED', '2026-04-06 04:30:37'),
(46, 'Guest', 263.00, 'DELIVERED', '2026-04-06 06:26:45'),
(47, 'Guest', 84.00, 'DELIVERED', '2026-04-07 04:45:10'),
(48, 'Guest', 263.00, 'DELIVERED', '2026-04-07 05:13:46'),
(49, 'Guest', 441.00, 'DELIVERED', '2026-04-15 15:32:08');

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id` bigint(20) NOT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `menu_item_id` bigint(20) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`id`, `order_id`, `menu_item_id`, `quantity`) VALUES
(20, 4, 5, 1),
(21, 5, 4, 1),
(22, 5, 5, 1),
(23, 6, 2, 3),
(24, 7, 2, 1),
(25, 8, 4, 1),
(26, 9, 1, 1),
(27, 10, 2, 1),
(28, 11, 1, 1),
(29, 12, 1, 1),
(30, 13, 1, 1),
(31, 14, 2, 1),
(32, 15, 3, 1),
(33, 16, 4, 1),
(34, 17, 4, 1),
(35, 18, 5, 1),
(36, 19, 1, 1),
(37, 20, 5, 1),
(38, 21, 5, 1),
(39, 22, 5, 1),
(40, 23, 5, 1),
(41, 24, 1, 1),
(42, 25, 1, 2),
(43, 26, 3, 1),
(44, 27, 4, 1),
(45, 28, 8, 1),
(46, 29, 8, 1),
(47, 30, 4, 1),
(48, 31, 5, 1),
(49, 31, 2, 1),
(50, 32, 5, 1),
(51, 32, 2, 1),
(52, 33, 5, 1),
(53, 33, 2, 1),
(54, 34, 5, 1),
(55, 34, 2, 1),
(56, 35, 8, 1),
(57, 35, 2, 1),
(58, 35, 5, 1),
(59, 36, 8, 1),
(60, 37, 8, 1),
(61, 38, 8, 1),
(62, 39, 5, 1),
(63, 40, 5, 1),
(64, 41, 7, 1),
(65, 42, 8, 1),
(66, 43, 8, 1),
(67, 44, 5, 1),
(68, 45, 8, 1),
(69, 46, 8, 1),
(70, 46, 4, 1),
(71, 47, 5, 1),
(72, 48, 1, 1),
(73, 49, 1, 1),
(74, 49, 5, 1),
(75, 49, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` bigint(20) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `order_id`, `payment_method`, `amount`, `status`, `payment_date`) VALUES
(1, 11, 'cash', NULL, 'PAID', '2026-04-03 08:46:47'),
(2, 11, 'cash', NULL, 'PAID', '2026-04-03 08:51:14'),
(3, 12, 'cash', NULL, 'PAID', '2026-04-03 08:53:02'),
(4, 19, 'card', 250, 'SUCCESS', '2026-04-03 14:04:30'),
(5, 20, 'card', 80, 'SUCCESS', '2026-04-03 14:14:46'),
(6, 21, 'card', 80, 'SUCCESS', '2026-04-03 16:25:46'),
(7, 22, 'upi', 80, 'SUCCESS', '2026-04-03 22:04:46'),
(8, 22, 'upi', 80, 'SUCCESS', '2026-04-03 22:05:00'),
(9, 23, 'cash', 80, 'SUCCESS', '2026-04-03 22:15:30'),
(10, 23, 'card', 80, 'SUCCESS', '2026-04-03 22:17:21'),
(11, 23, 'card', 80, 'SUCCESS', '2026-04-03 22:36:03'),
(12, 24, 'upi', 250, 'SUCCESS', '2026-04-03 22:57:59'),
(13, 24, 'upi', 250, 'SUCCESS', '2026-04-03 23:01:58'),
(14, 25, 'cash', 500, 'SUCCESS', '2026-04-04 00:49:51'),
(15, 26, 'cash', 180, 'SUCCESS', '2026-04-04 00:50:31'),
(16, 27, 'upi', 90, 'SUCCESS', '2026-04-04 00:50:59'),
(17, 41, 'upi', 189, 'SUCCESS', '2026-04-05 14:05:05'),
(18, 42, 'card', 168, 'SUCCESS', '2026-04-05 15:25:17'),
(19, 43, 'cash', 168, 'SUCCESS', '2026-04-06 01:40:48'),
(20, 44, 'cash', 84, 'SUCCESS', '2026-04-06 04:29:09'),
(21, 45, 'card', 168, 'SUCCESS', '2026-04-06 04:30:39'),
(22, 46, 'cash', 263, 'SUCCESS', '2026-04-06 06:27:02'),
(23, 47, 'cash', 84, 'SUCCESS', '2026-04-07 04:45:18'),
(24, 48, 'cash', 263, 'SUCCESS', '2026-04-07 05:13:52'),
(25, 49, 'cash', 441, 'SUCCESS', '2026-04-15 15:32:44');

-- --------------------------------------------------------

--
-- Table structure for table `service_requests`
--

CREATE TABLE `service_requests` (
  `id` bigint(20) NOT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `request_type` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `request_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_requests`
--

INSERT INTO `service_requests` (`id`, `order_id`, `customer_name`, `request_type`, `status`, `request_time`) VALUES
(1, 43, 'Guest', 'Cleaning', 'COMPLETED', '2026-04-06 01:40:58'),
(2, 45, 'Guest', 'Cleaning', 'COMPLETED', '2026-04-06 04:31:12'),
(3, 48, 'Guest', 'Cleaning', 'COMPLETED', '2026-04-07 05:14:17'),
(4, 49, 'Guest', 'Water', 'PENDING', '2026-04-15 16:50:25');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'Chef', 'chef@kot.com', 'chef123', 'CHEF'),
(2, 'Waiter', 'waiter@kot.com', 'waiter123', 'WAITER'),
(3, 'Admin', 'admin@kot.com', 'admin123', 'ADMIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_category`
--
ALTER TABLE `menu_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `menu_item`
--
ALTER TABLE `menu_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKqrrmg534c9fint7sxs1tmnyou` (`category_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_item_id` (`menu_item_id`),
  ADD KEY `fk_order` (`order_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `service_requests`
--
ALTER TABLE `service_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_service` (`order_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `menu_category`
--
ALTER TABLE `menu_category`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `menu_item`
--
ALTER TABLE `menu_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `service_requests`
--
ALTER TABLE `service_requests`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `menu_item`
--
ALTER TABLE `menu_item`
  ADD CONSTRAINT `FKqrrmg534c9fint7sxs1tmnyou` FOREIGN KEY (`category_id`) REFERENCES `menu_category` (`category_id`);

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `fk_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_item` (`id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `service_requests`
--
ALTER TABLE `service_requests`
  ADD CONSTRAINT `fk_order_service` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
