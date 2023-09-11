// подключение express с помощью require
const express = require("express");
// Аналог с импортом, которого нет в node 
// import express from 'express' 
// Запускаем express
// express, это метод, результат работы которого мы перемещаем в переменную app
const app = express();  
// Получаем плагн bodyParser в переменную
const bodyParser = require('body-parser');

//задействуем bodyParser в нашем приложении
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

class Test{

    atribute1 = 'Первый атрибут'
    atribute2 = 'Второй атрибут'
    atribute3 = 'Третий атрибут'
    name 
    family

    method1(param1){
        console.log('Первый метод: ', param1)
    }
    method2(param2){
        console.log('Второй метод: ', param2)
    }
    method3(){
        console.log('Третий метод: ', this.name, this.family)
    }
    constructor(param1, param2){
        //console.log('ПОявился новый объект Test')
        //console.log('Первый параметр', param1)
        //console.log('Второй параметр', param2)
        this.name = param1
        this.family = param2

        this.method1(param1);
        this.method2(param2);
        this.method3()
    }
}

//Используем класс
const obj1 = new Test('Михаил', 'Петрович')
console.log('Объект 1: ', obj1.name, obj1.family)
obj1.method3();
const obj2 = new Test('Иван', 'Иванов')
console.log('Объект 2: ', obj2.name, obj2.family)
obj2.method3();

class ChildrenTom{
    name='Tomas'
    family='Martin'
    #region = 'Северный регион'
    voice() {
       console.log('Привет')
    }
}

class ChildrenAlex extends ChildrenTom{

}
const tom = new ChildrenTom();
const Alex = new ChildrenAlex();
console.log('Имя первого ребенка: ', tom.name)
console.log('Имя второго ребенка: ', Alex.name)

tom.voice()
Alex.voice()


class David{
    #name = 'David'
    _family = 'Jonse'
    getName(){
        return this.#name
    }
    setName(name){
        this.#name = "some new"
    }
    constructor(){
        console.log("меня завут: ", this.#name)
    }
}
const david = new David()

console.log(david.getName())

david.setName('some new')
console.log(david.getName())

class Animal{
    getVoice(){
        if(this.type == "cat"){
            console.log('myau-myau')
        }
        if(this.type == "dog"){
            console.log('gav-gav')
        }
    }
}

class Dog extends Animal{
type = 'cat'
}
class Cat extends Animal{
type = 'dog'
}
const cat = new Cat()
const dog = new Dog()

cat.getVoice();
dog.getVoice();

class Parent{
    getName(){

    }
}
class Child1 extends Parent{
    getName(){
        console.log('my name is Ivan')
    }
}
class Child2 extends Parent{
    getName(){
        console.log('me name is Petr')
    }
}
const child1 = new Child1()
const child2 = new Child2()

child1.getName()
child2.getName()


/**
 * Корневой маршрут в приложении
 */
app.get("/", function(request, response){
    response.send("<h2>Привет Express!</h2>");
})

app.get('/test', function(request, response){
    response.send("<h2>Тестовый URL</h2>");
})

app.get('/test2', function(request, response){
    response.send("<h2>Тестовый URL 2</h2>");
})

app.post('/getdata', function(request, response){
    console.log(request.body.test)
    response.send(`<h2>Получение данных ${request.body.test}, ${request.body.inordic}</h2>`);
})

app.get('/senddata', function(request, response){
    response.send(
        `
        <h2>Отправка данных</h2>
        <form action='/getdata' method='POST'>
            <input type='text' name='test'>
            <input type='text' name='inordic'>
            <input type='submit' value='Отправить'>
        </form> 
        `
    );
})

app.get('/hello', function(request, response){
    console.log(request);
    response.send(
        `test = ${request.query.test}, inordic = ${request.query.inordic}`
    )
})
// Запускаем все, что было написано выше, на 3000 порте
app.listen(3000);