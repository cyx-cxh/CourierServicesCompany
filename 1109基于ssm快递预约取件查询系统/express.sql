/*
Navicat MySQL Data Transfer

Source Server         : 139.196.98.33
Source Server Version : 50528
Source Host           : 139.196.98.33:3306
Source Database       : express

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2018-10-26 17:29:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `channel`
-- ----------------------------
DROP TABLE IF EXISTS `channel`;
CREATE TABLE `channel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `startAddress` varchar(255) DEFAULT NULL,
  `endAddress` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of channel
-- ----------------------------
INSERT INTO `channel` VALUES ('2', null, '江苏省徐州市', '江苏省南京市');
INSERT INTO `channel` VALUES ('3', null, '江苏省徐州市', '江苏省南京市');
INSERT INTO `channel` VALUES ('4', null, '江苏省徐州市', '江苏省南京市');
INSERT INTO `channel` VALUES ('5', null, '江苏省徐州市', '江苏省南京市');
INSERT INTO `channel` VALUES ('6', null, '江苏省徐州市', '江苏省南京市');

-- ----------------------------
-- Table structure for `city`
-- ----------------------------
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `provinceId` int(11) DEFAULT NULL,
  `isDelete` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of city
-- ----------------------------
INSERT INTO `city` VALUES ('1', '徐州市', '4', null);
INSERT INTO `city` VALUES ('3', '南京市', '4', null);

-- ----------------------------
-- Table structure for `company`
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `bz` varchar(255) DEFAULT NULL,
  `fy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES ('1', 'SF', '顺丰快递', '1111', '/resource/upload/-180196534911.jpg', null, '速度', '10');
INSERT INTO `company` VALUES ('5', 'YTO', '圆通速递', '123254564646', '/resource/upload/-168304542311.jpg', null, '适当放松的防守防守对方', '12');
INSERT INTO `company` VALUES ('10', 'STO', '申通快递', '141423423424', '/resource/upload/-1502214428123.jpg', null, '11', '13');
INSERT INTO `company` VALUES ('11', 'YD', '韵达快递', '1232312313', '/resource/upload/-1419645735123.jpg', null, '撒旦法是否', '19');
INSERT INTO `company` VALUES ('13', 'JTKD', '捷特快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('14', 'ZTKY', '中铁快运', null, null, null, null, '10');
INSERT INTO `company` VALUES ('15', 'GTO', '国通快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('16', 'XFEX', '信丰快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('17', 'SUBIDA', '速必达物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('18', 'QFKD', '全峰快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('19', 'HXLWL', '华夏龙物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('20', 'MHKD', '民航快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('21', 'CCES', 'CCES快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('22', 'XBWL', '新邦物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('23', 'FKD', '飞康达', null, null, null, null, '10');
INSERT INTO `company` VALUES ('24', 'ZENY', '增益快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('25', 'CJKD', '城际快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('26', 'FEDEX', '联邦', null, null, null, null, '10');
INSERT INTO `company` VALUES ('27', 'ZJS', '宅急送', null, null, null, null, '10');
INSERT INTO `company` VALUES ('28', 'AJ', '安捷快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('29', 'SURE', '速尔快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('30', 'YFSD', '亚风快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('31', 'CITY100', '城市100', null, null, null, null, '10');
INSERT INTO `company` VALUES ('32', 'UAPEX', '全一快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('33', 'SBWL', '盛邦物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('34', 'AMAZON', '亚马逊物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('35', 'DTWL', '大田物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('36', 'JYWL', '佳怡物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('37', 'ZTE', '众通快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('38', 'SFWL', '盛丰物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('39', 'NEDA', '能达速递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('40', 'QUICK', '快客快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('41', 'QRT', '全日通快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('42', 'ZTO', '中通速递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('43', 'COE', 'COE东方快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('44', 'LHT', '联昊通速递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('45', 'HOAU', '天地华宇', null, null, null, null, '10');
INSERT INTO `company` VALUES ('46', 'HTKY', '百世快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('47', 'WXWL', '万象物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('48', 'ST', '速通物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('49', 'BQXHM', '北青小红帽', null, null, null, null, '10');
INSERT INTO `company` VALUES ('50', 'ZHQKD', '汇强快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('51', 'JGSD', '京广速递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('52', 'CNPEX', '中邮快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('53', 'JLDT', '嘉里物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('54', 'HFWL', '汇丰物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('55', 'XYT', '希优特', null, null, null, null, '10');
INSERT INTO `company` VALUES ('56', 'LB', '龙邦快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('57', 'YCWL', '远成物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('58', 'PANEX', '泛捷快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('59', 'FAST', '快捷速递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('60', 'DSWL', 'D速物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('61', 'SAWL', '圣安物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('62', 'AYCA', '澳邮专线', null, null, null, null, '10');
INSERT INTO `company` VALUES ('63', 'JJKY', '佳吉快运', null, null, null, null, '10');
INSERT INTO `company` VALUES ('64', 'UC', '优速快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('65', 'DBL', '德邦', null, null, null, null, '10');
INSERT INTO `company` VALUES ('66', 'MLWL', '明亮物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('67', 'RFD', '如风达', null, null, null, null, '10');
INSERT INTO `company` VALUES ('68', 'YXKD', '亿翔快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('69', 'YDH', '义达国际物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('70', 'YTKD', '运通快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('71', 'PADTF', '平安达腾飞快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('72', 'HHTT', '天天快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('73', 'ZTWL', '中铁物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('74', 'GDEMS', '广东邮政', null, null, null, null, '10');
INSERT INTO `company` VALUES ('75', 'YFEX', '越丰物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('76', 'EMS', 'EMS', null, null, null, null, '10');
INSERT INTO `company` VALUES ('77', 'JIUYE', '九曳供应链', null, null, null, null, '10');
INSERT INTO `company` VALUES ('78', 'JXD', '急先达', null, null, null, null, '10');
INSERT INTO `company` VALUES ('79', 'SAD', '赛澳递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('80', 'ANE', '安能物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('81', 'BTWL', '百世快运', null, null, null, null, '10');
INSERT INTO `company` VALUES ('82', 'SDWL', '上大物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('83', 'WJWL', '万家物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('84', 'RFEX', '瑞丰速递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('85', 'YZPY', '邮政平邮/小包', null, null, null, null, '10');
INSERT INTO `company` VALUES ('86', 'YFHEX', '原飞航物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('87', 'JYKD', '晋越快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('88', 'HYLSD', '好来运快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('89', 'SHWL', '盛辉物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('90', 'QCKD', '全晨快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('91', 'STWL', '速腾快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('92', 'BFDF', '百福东方', null, null, null, null, '10');
INSERT INTO `company` VALUES ('93', 'GSD', '共速达', null, null, null, null, '10');
INSERT INTO `company` VALUES ('94', 'GTSD', '高铁速递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('95', 'JYM', '加运美', null, null, null, null, '10');
INSERT INTO `company` VALUES ('96', 'KYWL', '跨越物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('97', 'hq568', '华强物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('98', 'HPTEX', '海派通物流公司', null, null, null, null, '10');
INSERT INTO `company` VALUES ('99', 'TSSTO', '唐山申通', null, null, null, null, '10');
INSERT INTO `company` VALUES ('100', 'YADEX', '源安达快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('101', 'AXD', '安信达快递', null, null, null, null, '10');
INSERT INTO `company` VALUES ('102', 'HOTSCM', '鸿桥供应链', null, null, null, null, '10');
INSERT INTO `company` VALUES ('103', 'XJ', '新杰物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('104', 'HLWL', '恒路物流', null, null, null, null, '10');
INSERT INTO `company` VALUES ('105', 'CSCY', '长沙创一', null, null, null, null, '10');

-- ----------------------------
-- Table structure for `county`
-- ----------------------------
DROP TABLE IF EXISTS `county`;
CREATE TABLE `county` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `isDelete` int(11) DEFAULT NULL,
  `cityId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of county
-- ----------------------------
INSERT INTO `county` VALUES ('1', '云龙区', null, '1');

-- ----------------------------
-- Table structure for `evaluates`
-- ----------------------------
DROP TABLE IF EXISTS `evaluates`;
CREATE TABLE `evaluates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `addTime` date DEFAULT NULL,
  `pf` double(11,0) DEFAULT NULL,
  `workId` int(11) DEFAULT NULL,
  `bz` varchar(255) DEFAULT NULL,
  `usersId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of evaluates
-- ----------------------------
INSERT INTO `evaluates` VALUES ('1', '2018-10-25', '5', '2', '地方大幅度', '1');
INSERT INTO `evaluates` VALUES ('2', '2018-10-25', '5', '2', '大方豆腐', '1');
INSERT INTO `evaluates` VALUES ('3', '2018-10-26', '5', '2', '呃呃呃呃呃', '1');
INSERT INTO `evaluates` VALUES ('4', '2018-10-26', '5', '2', '少时诵诗书所', '1');
INSERT INTO `evaluates` VALUES ('5', '2018-10-26', '4', '3', '顶顶顶顶', '1');

-- ----------------------------
-- Table structure for `expressperson`
-- ----------------------------
DROP TABLE IF EXISTS `expressperson`;
CREATE TABLE `expressperson` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `networkId` int(11) DEFAULT NULL,
  `companyId` int(11) DEFAULT NULL,
  `realName` varchar(255) DEFAULT NULL,
  `pw` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of expressperson
-- ----------------------------
INSERT INTO `expressperson` VALUES ('1', 'zhangsan', '1232312313', '0', '1', '1', '张三', '111111');

-- ----------------------------
-- Table structure for `network`
-- ----------------------------
DROP TABLE IF EXISTS `network`;
CREATE TABLE `network` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `companyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of network
-- ----------------------------
INSERT INTO `network` VALUES ('1', '云龙区顺丰快递1', '1111', '云龙区顺丰快递', '117.297735', '34.249347', '1');
INSERT INTO `network` VALUES ('2', '云龙区顺丰快递2', '2222', '云龙区顺丰快递', '117.271505', '34.248392', '1');
INSERT INTO `network` VALUES ('3', '云龙区顺丰快递3', '3333', '', '117.292346', '34.230605', '1');
INSERT INTO `network` VALUES ('4', '中通速递1', null, '徐州市中通快递', '117.29280728431543', '34.216468843523934', '42');
INSERT INTO `network` VALUES ('5', '韵达快递1', null, '徐州市韵达快递', '117.1947989004126', '34.2821062708651', '11');
INSERT INTO `network` VALUES ('6', '申通快递1', null, '徐州市申通快递', '117.20768750670013', '34.27454040108523', '10');
INSERT INTO `network` VALUES ('7', '圆通快递', null, '徐州市圆通快递', '117.17856509962627', '34.2644095029722', '5');

-- ----------------------------
-- Table structure for `prescription`
-- ----------------------------
DROP TABLE IF EXISTS `prescription`;
CREATE TABLE `prescription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provinceId` int(11) DEFAULT NULL,
  `cityId` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `jg` double DEFAULT NULL,
  `endProvinceId` int(11) DEFAULT NULL,
  `endCityId` int(11) DEFAULT NULL,
  `companyId` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of prescription
-- ----------------------------
INSERT INTO `prescription` VALUES ('9', '4', '1', '5', '15', '4', '3', '6,1');
INSERT INTO `prescription` VALUES ('10', '4', '1', '3', '20', '4', '3', '10,5');

-- ----------------------------
-- Table structure for `province`
-- ----------------------------
DROP TABLE IF EXISTS `province`;
CREATE TABLE `province` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `isDelete` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of province
-- ----------------------------
INSERT INTO `province` VALUES ('4', '江苏省', null);
INSERT INTO `province` VALUES ('6', '黑龙江省', null);
INSERT INTO `province` VALUES ('7', '浙江省', null);

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `realName` varchar(255) DEFAULT NULL,
  `pw` varchar(255) DEFAULT NULL,
  `yx` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `provinceId` int(11) DEFAULT NULL,
  `cityId` int(11) DEFAULT NULL,
  `countyId` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '', 'admin', '管理员', '111111', '1234123', '1', 'admin', null, null, null, '', '0');
INSERT INTO `users` VALUES ('68', null, 'sdfsfs', '第三方', '111111', '11111', '0', '138100000', null, null, null, null, '1');
INSERT INTO `users` VALUES ('75', null, 'admin2', 'admin2', null, null, '1', '1232312313', null, null, null, null, '0');
INSERT INTO `users` VALUES ('76', null, 'sss', 'ss', 'sss', null, null, 'sss', null, null, null, null, '1');
INSERT INTO `users` VALUES ('77', null, '666', '666', '66', null, null, '66', null, null, null, null, '1');
INSERT INTO `users` VALUES ('78', null, '777', '777', '77', null, null, '77', null, null, null, null, '1');
INSERT INTO `users` VALUES ('79', null, '888', '88', '88', null, null, '88', null, null, null, null, '1');
INSERT INTO `users` VALUES ('80', null, '999', '999', '99', null, null, '999', null, null, null, null, '1');
INSERT INTO `users` VALUES ('81', null, '00', '00', '00', null, null, '00', null, null, null, null, '1');

-- ----------------------------
-- Table structure for `workorder`
-- ----------------------------
DROP TABLE IF EXISTS `workorder`;
CREATE TABLE `workorder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `jg` double DEFAULT NULL,
  `isQj` int(11) DEFAULT NULL,
  `isPj` int(11) DEFAULT NULL,
  `expressPersonId` int(11) DEFAULT NULL,
  `channelId` int(11) DEFAULT NULL,
  `companyId` int(11) DEFAULT NULL,
  `networkId` int(11) DEFAULT NULL,
  `addtime` date DEFAULT NULL,
  `usersId` int(11) DEFAULT NULL,
  `sjr` int(11) DEFAULT NULL,
  `sjrName` varchar(255) DEFAULT NULL,
  `sjrAddress` varchar(255) DEFAULT NULL,
  `sjrPhone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of workorder
-- ----------------------------
INSERT INTO `workorder` VALUES ('2', '777', '0', '10', '150', '1', '0', '1', '2', '1', '1', '2018-10-25', '1', null, null, null, null);
INSERT INTO `workorder` VALUES ('3', '1111', '0', '2', '38', '1', '0', '1', '4', '12', '1', '2018-10-25', '1', null, '送达方式', '适当放松的防守对方', '11111111');
INSERT INTO `workorder` VALUES ('4', '111', '0', '12', '120', '1', '0', '1', '5', '1', '1', '2018-10-25', '1', null, 'sdfs', 'sdf', '1111');
INSERT INTO `workorder` VALUES ('5', '75103377100294', '0', '10', null, '1', '0', '1', '6', '42', null, '2018-10-26', '1', null, '张三', '1134243舒服舒服', '111111111');
