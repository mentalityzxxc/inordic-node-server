const mysql = require("mysql")
/**
 * Класс для работы с товарами из базы данных
 * getAll - метод для получения всех товаров
 */
module.exports = class Good {

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

        //Обратимся к файлу конигурации и передадим его параметров в функцию подключения к базе данных
        //Нам вернется подключение к базе данных
        const connect = mysql.createPool(this.#config)
        //Функция для отправки запроса в базу данных
        connect.query(
            'SELECT * FROM goods',
            function (error, result) {
                res.send(result)
            }
        )
    }

    getItem(res, id){
        const connect = mysql.createPool(this.#config)
        connect.query(
            `SELECT * FROM goods WHERE ID="${id}"`,
            function (error, result) {
                res.send(result)
            }
        )
    }

    delItem(res, id){
        const connect = mysql.createPool(this.#config)
        connect.query(
            `DELETE FROM goods WHERE ID="${id}"`,
            function (error, result) {
                res.send(result)
            }
        )
    }


}