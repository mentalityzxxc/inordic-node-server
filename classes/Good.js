const { response } = require('express');
const DataBase = require('./DataBase')
/**
 * Класс для работы с товарами из базы данных
 * getAll - метод для получения всех товаров
 * 
 */
module.exports = class Good extends DataBase{

    #STATUS_TEXT = {
        'UPDATE':{
            '200': 'Товар успешно обновлен',
            '500': 'Товар не обновлен , произошла ошибка'
        },
        'DELETE':{
            '200': 'Товар успешно удален',
            '500': 'Товар не удален , произошла ошибка'
        },
        'SELECT':{
            '200': 'Товар успешно получен',
            '500': 'Товар не получен , произошла ошибка'
        },
        'INSERT':{
            '200': 'Товар успешно добавлен',
            '500': 'Товар не добавлен , произошла ошибка'
        },

    }
    constructor(){
        super();
        this.setTableName('goods')
        this.setStatus(this.#STATUS_TEXT)
    }
   

}