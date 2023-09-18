const mysql = require("mysql")
module.exports = class DataBase{
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
    #table_name

    setTableName(tableName){
        this.#table_name = tableName
    }


    getConnect(){
        const connect = mysql.createPool(this.#config)
        return connect
    }


    getAll(res){
        //создаем соединение с базой
    //отправим запрос к базе данных
    this.getConnect().query(
            `SELECT * FROM ${this.#table_name}`,
            function(eroor, result){
                res.send(
                    result
            )

            }
        )
    }


    getItem(res, id){

        this.getConnect().query(
                `SELECT * FROM ${this.#table_name} WHERE ID="${id}"`,
                function (error, result) {
                    res.send(result)
                }
            )
    }


    delItem(res, id){
            this.getConnect().query(
                `DELETE FROM ${this.#table_name} WHERE ID="${id}"`,
                function (error, result) {
                res.send(result)
                }
            )
        }
}



