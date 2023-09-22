const mysql = require("mysql")
const uid = require('uuid')
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

        addItem(response, data){
            const id = uid.v4()
            data['ID'] = id
            console.log(id)
            let fiedlsName = '(';
            let valueFields = '(';
            let key = 0;

            for(let field in data){
                fidlsName += field
                if(Object.keys(data).length - 1 === key){
                    fidlsName += ')'
                }else{
                    fiedlsName += ', '
                }

                key++
            }
            const sql = 
            `INSERT INTO ${this.#table_name} ${fiedlsName}
             VALUES
             ('${id}', '${data.TITLE}', '${data.DISCR}', '${data.PRICE}', '${data.IMG}', '${data.COUNT}')
             `
             //const connect = this.getConnect()
             //connect.query(sql, function(error, result){
               // if(error){
                 //   const responseObject = {
                 //       status: 500,
                   //     data: error
                 //   }
                 //   response.send(
                  //      JSON.stringify(responseObject)
                //        )
             //   }
               // if(result.affectedRows === 1){
                 //   const responseObject = {
                   //     status: 200,
                   //     data: data
                  //  }
                  //  response.send(
                   //    JSON.stringify(responseObject)
                   //    )
    
              //  }
            // })
        }
}



