const { response } = require('express');
const DataBase = require('./DataBase')
/**
 * Класс для работы с товарами из базы данных
 * getAll - метод для получения всех товаров
 */
module.exports = class Good extends DataBase{
    constructor(){
        super();
        this.setTableName('goods')
    }
   

}