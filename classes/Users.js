const { response } = require('express');
const DataBase = require('./DataBase')
/**
 * Класс для работы с товарами из базы данных
 * getAll - метод для получения всех товаров
 */
module.exports = class Users extends DataBase{
    #STATUS_TEXT = {
        '200': 'Пользователь успешно добавлен',
        '500': 'Пользователь не добавлег , произошла ошибка'
    }
    constructor(){
        super();
        this.setTableName('goods')
    }
   

}