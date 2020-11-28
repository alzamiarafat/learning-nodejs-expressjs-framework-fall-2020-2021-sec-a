-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2020 at 09:13 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travel_guide`
--

-- --------------------------------------------------------

--
-- Table structure for table `place`
--

CREATE TABLE `place` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `place` varchar(100) NOT NULL,
  `history` varchar(500) NOT NULL,
  `about` varchar(1000) NOT NULL,
  `travel_agency` varchar(100) NOT NULL,
  `cost` int(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `comment` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `place`
--

INSERT INTO `place` (`id`, `username`, `customer_name`, `country`, `place`, `history`, `about`, `travel_agency`, `cost`, `contact`, `status`, `comment`) VALUES
(3, 'zami', 'sakib', 'Bangladesh', 'Dhaka', 'Dhaka is the oldest area of bangladesh', 'dhaka is beautiful city', 'tour travel', 3000, '536475868', 'like', ''),
(4, 'zami', 'sakib', 'India', 'Siliguri', 'The \"Siliguri Corridor\" was formed when Bengal was divided into West Bengal and East Pakistan (later Bangladesh) in 1947, with Sikkim later merging with India in 1975.[18] At this point many immigrants came to settle here for better facilities which led to an increased population.', 'Siliguri is situated at the base of the Himalaya mountains in the plains of Darjeeling District by the side of River Mahananda. It is the 2nd largest city in West Bengal and known as the gateway of North-Eastern India.The strategic location of the place makes sure that travellers to the North-East has to pass through Siliguri. It is also the commercial capital of the region. The Sub-Division is bounded on the North by the Sub-Himalayan ranges and on the South by Bangladesh, U-Dinajpur & Bihar On the East lies Jalpaiguri District & Kalimpong Sub-Divn and boounded on the West by Nepal. Siliguri got its Sub-Divisional status in the year 1907 and presently it has got four(4) C.D. Blocks,namely,Matigara,Phansidewa,Naxalbari & Khoribari and one Corporation area - Siliguri Municipal Corporation under its administrative jurisdiction.', 'BD Tour Group', 3000, '5444', 'like', ''),
(16, 'zami', 'sakib', 'Malaysia', 'Kuala Lumpur', 'Kuala Lumpur was founded ca. 1857 at the confluence of the Gombak and Klang rivers. In English, the name Kuala Lumpur literally means \"muddy confluence\". The venture into the muddy confluence started when a member of the Selangor royal family hired tin prospectors to open tin mines in the Klang Valley.', 'Kuala Lumpur is the capital city of Malaysia, boasting gleaming skyscrapers, colonial architecture, charming locals, and a myriad of natural attractions. Divided into numerous districts, its main hub is called the Golden Triangle which comprises Bukit Bintang, KLCC and Chinatown. KL is widely recognised for numerous landmarks, including Petronas Twin Towers (the world’s tallest twin skyscrapers), Petaling Street flea market, and Batu Caves, which is over 400 million years old.', 'Malaysia tour group', 30000, '564531445', 'unlike', '');

-- --------------------------------------------------------

--
-- Table structure for table `place_reqst`
--

CREATE TABLE `place_reqst` (
  `id` int(11) NOT NULL,
  `scout_name` varchar(100) NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `country_name` varchar(100) NOT NULL,
  `place` varchar(100) NOT NULL,
  `history` varchar(1000) NOT NULL,
  `about` varchar(1000) NOT NULL,
  `travel_agency` varchar(100) NOT NULL,
  `cost` int(11) NOT NULL,
  `contact` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `action` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `dob` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `dob`, `type`, `address`, `contact`, `email`) VALUES
(1, 'AL Zami Arafat', 'zami', '123', '1/3/1980', 'admin', 'Dhaka', '76786', 'ar@gmail.com'),
(2, 'Mehedi Hasan', 'mehedi', '456', '21/2/199', 'scout', 'Rangpur', '2131', 'fdsa@gmail.com'),
(3, 'Sakib AL Hasan', 'sakib', '123', '1/3/1980', 'user', 'Comilla', '7584758', 's@gmail.com'),
(5, 'Aslam Habib', 'aslam', '123', '12/2/1999', 'scout', 'bogra', '5154465423', 'a@gmail.com'),
(6, 'Musfiqur Rahman', 'musi', '123', '1/1/19000', 'user', 'bogra', '52154', 'm@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `place_reqst`
--
ALTER TABLE `place_reqst`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `place_reqst`
--
ALTER TABLE `place_reqst`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
