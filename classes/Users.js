const mysql = require("mysql")

module.exports = class Users {
    #config = {
        host: "94.228.126.172",
        port: 3306,
        user: "inordic_sch_usr",
        password: "VANCfzNsov9GDt1M",
        database: "inordic_school",
        connectionLimit : 1000,
        connectTimeout  : 60 * 60 * 1000,
        acquireTimeout  : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000
    }

    getAll(res){
        //создаем соединение с базой
    const connect = mysql.createPool(this.#config)
    //отправим запрос к базе данных
    connect.query(
        'SELECT * FROM users',
        function(eroor, result){
            res.send(
                result
            )

        }
    )
    }

    getItem(res, id){
        const connect = mysql.createPool(this.#config)
        connect.query(
            `SELECT * FROM users WHERE ID="${id}"`,
            function (error, result) {
                res.send(result)
            })
    }

    delItem(res, id){
        const connect = mysql.createPool(this.#config)
        connect.query(
            `DELETE FROM users WHERE ID="${id}"`,
            function (error, result) {
                res.send(result)
            })
    }
}