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
    #status_text

    setStatus(statusText){
        this.#status_text = statusText
    }
    setTableName(tableName){
        this.#table_name = tableName
    }


    getConnect(){
        const connect = mysql.createPool(this.#config)
        return connect
    }


    getAll(response){
        //создаем соединение с базой
    //отправим запрос к базе данных
    const sql =  `SELECT * FROM ${this.#table_name}`
    this.sendSqlToBase(sql, response, 'SELECT')
            }
        
   


    getItem(response, id){

        const sql = `SELECT * FROM ${this.#table_name} WHERE ID="${id}"`
        this.sendSqlToBase(sql, response, 'SELECT')
    }


    delItem(response, id){
        const sql = `DELETE FROM ${this.#table_name} WHERE ID="${id}"`
            this.sendSqlToBase(sql, response, 'DELETE')
        }

        addItem(response, data){
            //генерируем случайный ID через uuid
            const id = uid.v4()
            data['ID'] = id
            console.log(id)
            let fieldsName = '(';
            let valueFields = '(';
            let key = 0;

            for(let field in data){
                fieldsName += field;
                valueFields += `'${data[field]}'`;
                if(Object.keys(data).length - 1 === key){
                    fieldsName += ')';
                    valueFields += ')';
                }else{
                    fieldsName += ', ';
                    valueFields += ', ';
                }

                key++
            }
            const sql = 
            `INSERT INTO ${this.#table_name} ${fieldsName}
             VALUES ${valueFields}
             `
            this.sendSqlToBase(sql, response, 'INSERT')
        }
        sendSqlToBase(sql, response, type){
            const status = this.#status_text[type]
            const connect = this.getConnect()
            connect.query(sql, function(error, result){
               //console.log('error', error)
               // console.log('result', result)
               if(error){
                   const responseObject = {
                        status: 500,
                       statusText: status['500'],
                     data: error
                  }
                   response.send(
                       JSON.stringify(responseObject)
                       )
               }
               console.log(result)
               if(result){
                   const responseObject = {
                       status: 200,
                       statusText: status['200'],
                       data: result
                   }
                   console.log(responseObject)
                  response.send(
                      JSON.stringify(responseObject)
                      )
                    
              }
        })

        }

   updateItem(response, data){
            console.log(data)
/**
 * UPDATE users SET 
 * NAME = '',
 * SURNAME = '',
 * IMG = '',
 * PASSWORD = '',
 * EMAIL = '',
 * PHONE = '',
 * LOGIN = '',
 * ROLE = ''
 * WHERE ID = ${}
 */

    let values = '';
    let key = 0;

    for(let field in data){
        if(field !== `ID`){

            values += `${field} = '${data[field]}'`;
            console.log(Object.keys(data).length - 2 === key)
            if(Object.keys(data).length - 2 === key){
                values += '';
            }else{
                values += ', ';
            }
            key++

        }
    }

    let sql = `UPDATE ${this.#table_name} SET ${values} WHERE ID = '${data.ID}'`;
    console.log(sql)
    this.sendSqlToBase(sql, response, 'UPDATE')
   }     
}



