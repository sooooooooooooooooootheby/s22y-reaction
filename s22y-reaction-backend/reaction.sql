/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80039
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 80039
 File Encoding         : 65001

 Date: 05/10/2024 11:01:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for reaction
-- ----------------------------
DROP TABLE IF EXISTS `reaction`;
CREATE TABLE `reaction`  (
  `ip` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `emoji` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reaction
-- ----------------------------
INSERT INTO `reaction` VALUES ('55.229.5.252', '0', '37Clap');
INSERT INTO `reaction` VALUES ('3.210.250.4', '0', '37_Eureka');
INSERT INTO `reaction` VALUES ('0.21.69.138', '0', 'Isolde_Heh');
INSERT INTO `reaction` VALUES ('0.145.243.33', '0', '37_Eureka');
INSERT INTO `reaction` VALUES ('3.198.45.255', '0', '37_Eureka');
INSERT INTO `reaction` VALUES ('4.187.124.76', '0', 'Marcus_Happy');
INSERT INTO `reaction` VALUES ('215.226.115.83', '0', '37Clap');
INSERT INTO `reaction` VALUES ('133.165.4.5', '0', '37Clap');
INSERT INTO `reaction` VALUES ('255.171.246.97', '0', 'Isolde_Heh');
INSERT INTO `reaction` VALUES ('79.252.215.255', '0', 'Isolde_Heh');
INSERT INTO `reaction` VALUES ('4.225.227.255', '0', 'PickleDumb');
INSERT INTO `reaction` VALUES ('0.189.185.20', '0', 'Isolde_Heh');
INSERT INTO `reaction` VALUES ('155.253.252.255', '0', '37Clap');
INSERT INTO `reaction` VALUES ('127.254.6.252', '0', 'Isolde_Heh');
INSERT INTO `reaction` VALUES ('61.251.64.5', '0', 'PickleDumb');
INSERT INTO `reaction` VALUES ('132.230.223.251', '0', '37_Eureka');
INSERT INTO `reaction` VALUES ('0.163.213.254', '0', 'Isolde_Heh');
INSERT INTO `reaction` VALUES ('2.1.8.6', '0', 'Marcus_Happy');
INSERT INTO `reaction` VALUES ('247.213.228.232', '0', '37Clap');
INSERT INTO `reaction` VALUES ('71.254.236.216', '0', '37Clap');
INSERT INTO `reaction` VALUES ('253.144.5.233', '0', '37Clap');
INSERT INTO `reaction` VALUES ('30.64.226.172', '0', 'PickleDumb');
INSERT INTO `reaction` VALUES ('1.8.174.2', '0', 'Marcus_Happy');
INSERT INTO `reaction` VALUES ('192.168.31.111', '0', 'SothebyTehe');

SET FOREIGN_KEY_CHECKS = 1;
