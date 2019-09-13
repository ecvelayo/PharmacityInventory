-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2019 at 02:27 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory2-1`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `account_type` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `username`, `password`, `account_type`) VALUES
(1, 'admin', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `deletedproducts`
--

CREATE TABLE `deletedproducts` (
  `transaction_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(64) NOT NULL,
  `product_category` varchar(32) NOT NULL,
  `prod_generic_name` varchar(32) NOT NULL,
  `current_quantity` int(11) NOT NULL,
  `purchase_price` int(11) NOT NULL,
  `selling_price` int(11) NOT NULL,
  `product_supplier` varchar(32) NOT NULL,
  `expiration_date` int(11) NOT NULL,
  `date_deleted` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `deletedproducts`
--

INSERT INTO `deletedproducts` (`transaction_id`, `product_id`, `product_name`, `product_category`, `prod_generic_name`, `current_quantity`, `purchase_price`, `selling_price`, `product_supplier`, `expiration_date`, `date_deleted`) VALUES
(1, 8, 'MEDICOL', 'Medicine', 'Paracetamol', 150, 100, 150, 'Belcris', 2020, '2019-08-06 11:56:40'),
(2, 7, 'MEDICOL', 'Medicine', 'Paracetamol', 150, 100, 150, 'Belcris', 2020, '2019-08-06 12:22:03'),
(3, 9, 'BIOGESIC 500MG ', 'Medicine', 'Paracetamol', 150, 100, 130, 'Test', 2020, '2019-08-06 12:22:08'),
(4, 10, 'BIOGESIC 500MG ', 'Medicine', 'Paracetamol', 150, 100, 130, 'Test', 2020, '2019-08-06 12:22:10'),
(5, 11, 'BIOGESIC 500MG ', 'Medicine', 'Paracetamol', 150, 100, 130, 'Test', 2020, '2019-08-06 12:22:51'),
(6, 12, 'BIOGESIC 500MG ', 'Medicine', 'Paracetamol', 150, 100, 130, 'Test', 2020, '2019-08-06 12:23:37'),
(7, 13, 'BIOGESIC 500MG ', 'Medicine', 'Paracetamol', 150, 100, 130, 'Test', 2020, '2019-08-06 12:24:05'),
(8, 14, 'BIOGESIC 500MG ', 'Medicine', 'Paracetamol', 150, 100, 130, 'Test', 2020, '2019-08-06 12:24:08'),
(9, 16, 'TESTING', 'Medicine', 'Paracetamol', 150, 100, 150, 'Test', 2020, '2019-08-06 12:24:54'),
(10, 38, 'test', 'Medicine', 'Paracetamol', 150, 100, 150, 'Pabugnawan', 2019, '2019-08-12 14:45:15');

-- --------------------------------------------------------

--
-- Table structure for table `prescription_info`
--

CREATE TABLE `prescription_info` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `physician` varchar(128) NOT NULL,
  `patient` varchar(128) NOT NULL,
  `product_id` int(11) NOT NULL,
  `dosage_and_str` varchar(255) NOT NULL,
  `batch_or_lotNo` varchar(32) NOT NULL,
  `expiry_date` date NOT NULL,
  `qty_served` int(11) NOT NULL,
  `remarks` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(64) NOT NULL,
  `product_category` varchar(32) DEFAULT NULL,
  `product_manufacturer` varchar(255) NOT NULL,
  `prod_generic_name` varchar(32) NOT NULL,
  `current_quantity` int(11) NOT NULL,
  `selling_price` float NOT NULL,
  `supply_details_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_category`, `product_manufacturer`, `prod_generic_name`, `current_quantity`, `selling_price`, `supply_details_id`) VALUES
(3, 'test', 'Medicine', 'Testing', 'Paracetamol', 150, 130, 0),
(4, 'Biogesic 500mg', 'Medicine', 'John Lloyd Cruz', 'Paracetamol', 100, 150, 0),
(5, 'Biogesic 1000mg', 'Medicine', 'John Lloyd Cruz', 'Paracetamol', 100, 200, 0);

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `company` varchar(128) NOT NULL,
  `contact_no` varchar(14) NOT NULL,
  `location` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `supply_details`
--

CREATE TABLE `supply_details` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date_arrived` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `customer_name` varchar(32) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `user_id`, `customer_name`, `date`) VALUES
(4, 1, 'joseph joe', '2019-09-13 10:02:30'),
(5, 1, 'quejarra de asis', '2019-09-13 10:02:56'),
(6, 1, 'quejarra de asis', '2019-09-13 10:03:41'),
(7, 1, 'quejarra de asis', '2019-09-13 10:05:41'),
(8, 1, 'ss', '2019-09-13 10:06:28'),
(9, 1, 'joseph joe', '2019-09-13 10:08:50'),
(10, 1, 'quejarra de asis', '2019-09-13 10:09:03'),
(11, 1, 'joseph joe', '2019-09-13 10:10:44'),
(12, 1, 'quejarra de asis', '2019-09-13 10:13:32'),
(13, 1, 'joseph joe', '2019-09-13 10:21:26'),
(14, 1, 'wads', '2019-09-13 10:22:02'),
(15, 1, 'joseph joe', '2019-09-13 10:23:30'),
(16, 1, 'joseph joe', '2019-09-13 10:25:57'),
(17, 1, 'joseph joe', '2019-09-13 10:27:59'),
(18, 1, 'joseph joe', '2019-09-13 10:28:02'),
(19, 1, 'joseph joe', '2019-09-13 10:28:20'),
(20, 1, 'quejarra de asis', '2019-09-13 10:29:02'),
(21, 1, 'quejarra de asis', '2019-09-13 10:30:02'),
(22, 1, 'quejarra de asis', '2019-09-13 10:32:26'),
(23, 1, 'quejarra de asis', '2019-09-13 10:33:17'),
(24, 1, 'quejarra de asis', '2019-09-13 10:33:35'),
(25, 1, 'quejarra de asis', '2019-09-13 10:33:47'),
(26, 1, 'quejarra de asis', '2019-09-13 10:34:49'),
(27, 1, 'joseph joe', '2019-09-13 10:34:59'),
(28, 1, 'sad', '2019-09-13 10:35:36'),
(29, 1, 'sad', '2019-09-13 10:35:36'),
(30, 1, 'sad', '2019-09-13 10:35:37'),
(31, 1, 'sad', '2019-09-13 10:35:37'),
(32, 1, 'sad', '2019-09-13 10:35:37'),
(33, 1, 'joseph joe', '2019-09-13 10:43:13'),
(34, 1, 'test', '2019-09-13 10:43:40'),
(35, 1, 'test', '2019-09-13 10:44:09'),
(36, 1, 'quejarra de asis', '2019-09-13 10:48:00'),
(37, 1, 'quejarra de asis', '2019-09-13 10:53:31'),
(38, 1, 'quejarra de asis', '2019-09-13 10:53:48'),
(39, 1, 'quejarra de asis', '2019-09-13 10:54:15'),
(40, 1, 'quejarra de asis', '2019-09-13 11:03:22'),
(41, 1, 'quejarra de asis', '2019-09-13 11:07:34'),
(42, 1, 'quejarra de asis', '2019-09-13 11:07:52'),
(43, 1, 'quejarra de asis', '2019-09-13 11:09:06'),
(44, 1, 'quejarra de asis', '2019-09-13 11:15:05'),
(45, 1, 'quejarra de asis', '2019-09-13 11:15:53'),
(46, 1, 'quejarra de asis', '2019-09-13 11:16:15'),
(47, 1, 'quejarra de asis', '2019-09-13 11:17:11'),
(48, 1, 'quejarra de asis', '2019-09-13 11:57:14'),
(49, 1, 'quejarra de asis', '2019-09-13 11:57:58'),
(50, 1, 'quejarra de asis', '2019-09-13 11:58:56');

-- --------------------------------------------------------

--
-- Table structure for table `transactionitems`
--

CREATE TABLE `transactionitems` (
  `id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `item` varchar(32) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactionitems`
--

INSERT INTO `transactionitems` (`id`, `transaction_id`, `item`, `quantity`) VALUES
(1, 0, 'test', 2),
(2, 0, 'Biogesic 500mg', 3),
(3, 0, 'test', 2),
(4, 0, 'Biogesic 500mg', 3),
(5, 0, 'test', 2),
(6, 0, 'Biogesic 500mg', 3),
(7, 50, 'test', 2),
(8, 50, 'Biogesic 500mg', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `deletedproducts`
--
ALTER TABLE `deletedproducts`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `prescription_info`
--
ALTER TABLE `prescription_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `supply_details_id` (`supply_details_id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supply_details`
--
ALTER TABLE `supply_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transactionitems`
--
ALTER TABLE `transactionitems`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `deletedproducts`
--
ALTER TABLE `deletedproducts`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `prescription_info`
--
ALTER TABLE `prescription_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supply_details`
--
ALTER TABLE `supply_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `transactionitems`
--
ALTER TABLE `transactionitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `prescription_info`
--
ALTER TABLE `prescription_info`
  ADD CONSTRAINT `prescription_info_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `supply_details`
--
ALTER TABLE `supply_details`
  ADD CONSTRAINT `supply_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `supply_details_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`account_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
