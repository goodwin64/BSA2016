DROP DATABASE IF EXISTS `hotels`;

--
-- Database: `hotels`
--
CREATE DATABASE IF NOT EXISTS `hotels` DEFAULT CHARACTER SET `utf8`;
USE `hotels`;

-- --------------------------------------------------------

--
-- Table structure for table `Country`
--
CREATE TABLE IF NOT EXISTS `Country` (
  `Name` VARCHAR(50),
  `Description` VARCHAR(255) NOT NULL,

  PRIMARY KEY (`Name`)
) ENGINE=InnoDB;

--
-- Table structure for table `Hotel`
--
CREATE TABLE IF NOT EXISTS `Hotel` (
  `id` INT NOT NULL UNIQUE AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  `Country` VARCHAR(50),
  `Description` VARCHAR(255) NOT NULL,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`Country`) REFERENCES `Country`(`Name`)
) ENGINE=InnoDB;

--
-- Dumping data for table `Country`
--
INSERT INTO Country (`Name`, `Description`) VALUES
  ('ua', 'des1'),
  ('rus', 'des2'),
  ('eng', 'des3'),
  ('usa', 'des4');

--
-- Dumping data for table `Hotel`
--
INSERT INTO `Hotel` (`id`, `Name`, `Country`, `Description`) VALUES
  (1, 'hotelName1', 'ua', 'hotelDes1'),
  (2, 'hotelName2', 'rus', 'hotelDes2'),
  (3, 'hotelName3', 'eng', 'hotelDes3'),
  (4, 'hotelName4', 'usa', 'hotelDes4');
