-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 11. 08:29
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `nyuszihopp`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `maindata`
--
DROP TABLE IF EXISTS `maindata`;
CREATE TABLE `maindata` (
  `id` varchar(191) NOT NULL,
  `JWTSecret` varchar(191) NOT NULL,
  `JWTExpiration` int(11) NOT NULL,
  `JWTAlgorithm` varchar(191) NOT NULL,
  `RefreshTokenSecret` varchar(191) NOT NULL,
  `RefreshTokenExpiration` int(11) NOT NULL,
  `RefreshTokenAlgorithm` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `maindata`
--

INSERT INTO `maindata` (`id`, `JWTSecret`, `JWTExpiration`, `JWTAlgorithm`, `RefreshTokenSecret`, `RefreshTokenExpiration`, `RefreshTokenAlgorithm`) VALUES
('e3dda1b3-015e-4e7a-9493-3c0141ab5bd0', 'cdc7c5027d9adf125f224feaa42bdf172978a76bc42fc4cf33b73df333528c9753f34771c30fe348cb0e5d4394529d20e3cda77386eaee7ce2a7d1ae7a46ef84fc4b212a7fee81f24abbb1340d028f1e9ca407dc0df013017649480ea586b1a', 600000, 'HS256', 'cdc7c5027d9adf125f224feaa42bdf172978a76bc42fc4cf33b73df333528c9753f34771c30fe348cb0e5d4394529d20e3cda77386eaee7ce2a7d1ae7a46ef84fc4b212a7fee81f24abbb1340d028f1e9ca407dc0df013017649480ea586b1a', 1800000, 'HS256');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `maindata`
--
ALTER TABLE `maindata`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
