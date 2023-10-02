const { response } = require('express');
const DataBase = require('./DataBase')
/**
 * Класс для работы с товарами из базы данных
 * getAll - метод для получения всех товаров
 */
module.exports = class Good extends DataBase{
    #STATUS_TEXT = {
        '200': 'Товар успешно добавлен',
        '500': 'Товар не добавлег , произошла ошибка'
    }
    constructor(){
        super();
        this.setTableName('goods')
    }
   

}