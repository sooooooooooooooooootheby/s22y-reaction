import express from "express";
const router = express.Router();

// 读取配置
import * as dotenv from "dotenv";
dotenv.config();

// 连接 mysql
import mysql from "mysql";
const db = mysql.createPool({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	charset: process.env.CHARSET,
});

// 获取客户端IP地址
const getClientIp = (req) => {
	let ip = req.headers["x-forwarded-for"] || req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || "";
	if (ip.split(",").length > 0) {
		ip = ip.split(",")[0];
	}
	ip = ip.substr(ip.lastIndexOf(":") + 1, ip.length);
	return ip;
};

// 获取文章反应表情
router.get("/getReaction", (req, res) => {
	// 通过req.query获取客户端通过查询字符，发送到服务器的数据
	const { id } = req.query;
	const ip = getClientIp(req);

	// 获取文章的emoji
	const getReaction = (callback) => {
		const sqlStr = `SELECT emoji, COUNT(emoji) AS emoji_count FROM reaction WHERE id = ? GROUP BY emoji;`;
		db.query(sqlStr, [id], (err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: "Server error" });
			}

			callback(result);
		});
	};

	// 获取用户的点击记录
	const getUserClick = (callback) => {
		const sqlStr = `SELECT emoji AS user_click FROM reaction WHERE ip = ? AND id = ? GROUP BY emoji;`;
		db.query(sqlStr, [ip, id], (err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: "Server error" });
			}

			callback(result);
		});
	};

	// 整合数据
	const mergeResults = (callback) => {
		getReaction((reaction) => {
			getUserClick((userClick) => {
				let data = {
					reaction: reaction,
					userClick: userClick,
				};
				callback(data);
			});
		});
	};

	mergeResults((mergedData) => {
		res.status(200).json(mergedData);
	});
});

// 用户点击emoji
router.post("/userClickEmoji", (req, res) => {
	const { id, emoji, type } = req.body;
	const ip = getClientIp(req);

	// 添加用户点击记录
	const addClick = () => {
		const sqlStr = `INSERT INTO reaction (ip, id, emoji) VALUES (?, ?, ?);`;
		db.query(sqlStr, [ip, id, emoji], (err, result) => {
			if (err) {
				return res.status(500).json({ message: "Server error" });
			}

			res.status(200).json({ message: "operate successfully" });
		});
	};

	// 删除用户点击记录
	const delClick = (type, callback) => {
		const sqlStr = `DELETE FROM reaction WHERE ip = ?;`;
		db.query(sqlStr, [ip], (err, result) => {
			if (err) {
				return res.status(500).json({ message: "Server error" });
			}

			if (type) {
				res.status(200).json({ message: "operate successfully" });
			} else {
				callback();
			}
		});
	};

	if (type === "add") {
		delClick(false, () => {
			addClick();
		});
	} else if (type === "del") {
		delClick(true);
	} else {
		return res.status(400).json({ message: "type error" });
	}
});

export default router;
