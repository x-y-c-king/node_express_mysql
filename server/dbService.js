const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	port: process.env.DB_PORT
});

connection.connect((err) => {
	if (err) {
		console.log(err.message);
	}
	// console.log('db ' + connection.state);
});

/**
 * 管理员登录
 * 管理用户（用户编辑， 删除）
 * 商品管理 （发布商品， 编辑 删除）
 * 订单管理
 */

class DbService {
	// static getDbServiceInstance () {
	//     return instance ? instance : new DbService();
	// }

	getResult (query, args = null) {
		return new Promise((resolve, reject) => {
			if (args) {
				connection.query(query, args, (err, results) => {
					console.log(err, results);
					if (err) {
						reject(err.sqlMessage)
					} else {
						resolve(results);
					}
				})
			} else {
				connection.query(query, (err, results) => {
					console.log(err, results);
					if (err) {
						reject(err.sqlMessage)
					} else {
						resolve(results);
					}
				})
			}
		})
	}

	// 获取轮播列表
	getCarousel () {
		const query = "select * from carousel;"
		return this.getResult(query);
	}

	getGoods (pageNum, pageSize) {
		const start = (pageNum - 1) * pageSize;
		const end = pageNum * pageSize
		const query = `select * from goods limit ?, ?;`
		return this.getResult(query, [start, end]);
	}

	/**
	 * 0 购物车
	 * 1 付款进行中
	 * 2 等待用户操作
	 * 3 完成
	 */
	getOrder (userId, status, pageNum, pageSize) {
		const start = (pageNum - 1) * pageSize;
		const end = pageNum * pageSize
		const query = `select * from orders where userid = ? and status = ? limit ?, ?;`
		return this.getResult(query, [userId, status, start, end]);
	}

	// 获取用户信息
	getUserInfo (userId) {
		const query = `select * from user where userid = ?;`
		return this.getResult(query, [userId]);
	}

	setUserInfo (userId, name, avatar) {
		const query = `insert into user(userid, name, avatar) values(?, ?, ?);`
		return this.getResult(query, [userId, name, avatar]);
	}





	// async login (name, pwd) {
	//     try {
	//         const query = `select * from admin where user = '${name}' and pwd = '${pwd}'`
	//         this.getResult(query).then(res => {

	//         })
	//         const result = await this.getResult(query);
	//         const response = await new Promise((resolve, reject) => {
	//             const query = `select * from admin where user = '${name}' and pwd = '${pwd}'`
	//             console.log(query)

	//             connection.query(query, (err, results) => {
	//                 if (err) reject(new Error(err.message));
	//                 if (results && results.length !== 0) {
	//                     resolve(true)
	//                 } else {
	//                     resolve(false)
	//                 }
	//             })
	//         })
	//         return response;
	//     } catch {
	//         return false
	//     }
	// }

	// async getAllData () {
	//     try {
	//         const response = await new Promise((resolve, reject) => {
	//             const query = "SELECT * FROM user;";

	//             connection.query(query, (err, results) => {
	//                 if (err) reject(new Error(err.message));
	//                 resolve(results);
	//             })
	//         });
	//         // console.log(response);
	//         return response;
	//     } catch (error) {
	//         console.log(error);
	//     }
	// }


	// async insertNewName (name) {
	//     try {
	//         const dateAdded = new Date();
	//         const insertId = await new Promise((resolve, reject) => {
	//             const query = "INSERT INTO names (name, date_added) VALUES (?,?);";

	//             connection.query(query, [name, dateAdded], (err, result) => {
	//                 if (err) reject(new Error(err.message));
	//                 resolve(result.insertId);
	//             })
	//         });
	//         return {
	//             id: insertId,
	//             name: name,
	//             dateAdded: dateAdded
	//         };
	//     } catch (error) {
	//         console.log(error);
	//     }
	// }

	// async deleteRowById (id) {
	//     try {
	//         id = parseInt(id, 10);
	//         const response = await new Promise((resolve, reject) => {
	//             const query = "DELETE FROM names WHERE id = ?";

	//             connection.query(query, [id], (err, result) => {
	//                 if (err) reject(new Error(err.message));
	//                 resolve(result.affectedRows);
	//             })
	//         });

	//         return response === 1 ? true : false;
	//     } catch (error) {
	//         console.log(error);
	//         return false;
	//     }
	// }

	// async updateNameById (id, name) {
	//     try {
	//         id = parseInt(id, 10);
	//         const response = await new Promise((resolve, reject) => {
	//             const query = "UPDATE names SET name = ? WHERE id = ?";

	//             connection.query(query, [name, id], (err, result) => {
	//                 if (err) reject(new Error(err.message));
	//                 resolve(result.affectedRows);
	//             })
	//         });

	//         return response === 1 ? true : false;
	//     } catch (error) {
	//         console.log(error);
	//         return false;
	//     }
	// }

	// async searchByName (name) {
	//     try {
	//         const response = await new Promise((resolve, reject) => {
	//             const query = "SELECT * FROM names WHERE name = ?;";

	//             connection.query(query, [name], (err, results) => {
	//                 if (err) reject(new Error(err.message));
	//                 resolve(results);
	//             })
	//         });

	//         return response;
	//     } catch (error) {
	//         console.log(error);
	//     }
	// }
}

const db = new DbService()

module.exports = db;