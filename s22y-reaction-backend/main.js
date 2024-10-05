// 记录启动服务器的时间
const start = process.hrtime();

// 导入依赖包
import express from "express";
import cors from "cors";

// 读取配置
import * as dotenv from "dotenv";
dotenv.config();

// 创建express实例
const service = express();

// Cors跨域
service.use(cors());
// 解析body json中间件
service.use(express.json());
service.use(express.urlencoded({ extended: true }));

// 路由
import router from "./router.js";
// 注册路由
service.use('/reaction', router);

// 记录启动使用的时间
const diff = process.hrtime(start);
const timeTaken = diff[0] * 1e3 + diff[1] / 1e6;

// 监听进程
service.listen(process.env.PORT, (err) => {
	console.clear();
	console.log("service was started using " + timeTaken + "ms");
	console.log("service runs on port " + process.env.PORT);
});
