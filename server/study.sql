/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : study

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2022-04-25 15:52:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `Addressid` int(11) NOT NULL AUTO_INCREMENT,
  `Username` char(40) NOT NULL,
  `Name` char(40) NOT NULL,
  `Phonenum` char(40) NOT NULL,
  `Address` varchar(500) NOT NULL,
  `AddressDetail` varchar(500) NOT NULL,
  `PostalCode` char(20) NOT NULL,
  `Isdefault` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Addressid`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of address
-- ----------------------------

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) CHARACTER SET gb2312 NOT NULL DEFAULT '' COMMENT '管理员名',
  `pwd` varchar(255) CHARACTER SET gb2312 NOT NULL DEFAULT '' COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------

-- ----------------------------
-- Table structure for appraise
-- ----------------------------
DROP TABLE IF EXISTS `appraise`;
CREATE TABLE `appraise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodid` varchar(255) NOT NULL,
  `content` varchar(500) NOT NULL,
  `rate` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of appraise
-- ----------------------------

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `Username` char(40) NOT NULL,
  `Goodid` int(11) NOT NULL,
  `Cartcount` int(11) NOT NULL,
  PRIMARY KEY (`Goodid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of cart
-- ----------------------------

-- ----------------------------
-- Table structure for good
-- ----------------------------
DROP TABLE IF EXISTS `good`;
CREATE TABLE `good` (
  `Goodid` int(11) NOT NULL AUTO_INCREMENT,
  `Goodname` varchar(500) NOT NULL,
  `GoodPrice` double NOT NULL,
  `GoodPriceaftersale` double NOT NULL,
  `Goodcount` int(11) NOT NULL,
  `Gooddescribe` varchar(2000) NOT NULL,
  `Gooddealprice` int(11) NOT NULL,
  `GoodItem` varchar(500) DEFAULT NULL,
  `GoodImg` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`Goodid`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of good
-- ----------------------------

-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `ItemId` int(11) NOT NULL AUTO_INCREMENT,
  `Itemname` varchar(500) NOT NULL,
  PRIMARY KEY (`ItemId`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of item
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `Username` varchar(40) NOT NULL,
  `Password` char(120) NOT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for userorder
-- ----------------------------
DROP TABLE IF EXISTS `userorder`;
CREATE TABLE `userorder` (
  `Orderid` int(11) NOT NULL AUTO_INCREMENT,
  `Username` char(40) NOT NULL,
  `Addressid` int(11) NOT NULL,
  `totalMoney` int(11) NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '0',
  `content` varchar(300) NOT NULL,
  `rate` int(1) NOT NULL,
  PRIMARY KEY (`Orderid`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of userorder
-- ----------------------------

-- ----------------------------
-- Table structure for usersuborder
-- ----------------------------
DROP TABLE IF EXISTS `usersuborder`;
CREATE TABLE `usersuborder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MainOrderId` int(11) NOT NULL,
  `GoodId` int(11) NOT NULL,
  `Count` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of usersuborder
-- ----------------------------
SET FOREIGN_KEY_CHECKS=1;
