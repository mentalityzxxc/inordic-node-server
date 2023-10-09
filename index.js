// подключение express с помощью require
const express = require("express");
// Аналог с импортом, которого нет в node 
// import express from 'express' 
// Запускаем express
// express, это метод, результат работы которого мы перемещаем в переменную app
const app = express();  

const fs = require('fs')

const multer = require('multer')
const uploadFromForm = multer({dest: 'uploads/'})
const fileFromForm = uploadFromForm.single('INORDICFILE')

// Импорт моделей клссов
const Good = require("./classes/Good")

const User = require("./classes/Users")

const File= require("./classes/File")
// Получаем плагн bodyParser в переменную
const bodyParser = require('body-parser');

//задействуем bodyParser в нашем приложении
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

/**
 * Корневой маршрут в приложении
 */
app.get("/", function(request, response){
    response.send(`
        <h1>
            Корневой маршрут
        </h1>
             <ul>
                <li>
                    <a href='/good/get'>Получение всех товаров: /good/get</a>
                </li>
                <li>
                    <a href='/good/get/1'>Получения одного товара: /good/get/[id]</a>
                </li>
             </ul>
    `);
})

/**
 * Маршрут для получения товаров из интернет магазина
 * Пример использования: http://localhost:3000/good/get
 */
app.get('/good/get', function(request, response){
    //Создаем на основе класса объект
    const good = new Good();
    //Задействуем метод, который описан внутри класса
    good.getAll(response)
})

/**
 * Маршрут для получения одного товара из интернет магазина
 * Динамический маршрут
 * Пример использования: http://localhost:3000/good/get/:id
 */
app.get('/good/get/:id', function(request, response){
    //Создаем на основе класса объект
    const good = new Good();
    //Получить идентификатор из адресной строки
    const id = request.params.id
    //Задействуем метод, который описан внутри класса
    good.getItem(response, id)
})

/**
 * Маршрут для удаления одного товара из интернет магазина
 * Динамический маршрут
 * Пример использования: http://localhost:3000/good/del/:id
 */
app.get('/good/del/:id', function(request, response){
    //Создаем на основе класса объект
    const good = new Good();
    //Получить идентификатор из адресной строки
    const id = request.params.id
    //Задействуем метод, который описан внутри класса
    good.delItem(response, id)
})


/**
 * Маршрут для получения всех пользователй
 * Пример: Http://lockalhost:3000/user/get
 */
    app.get(   
        '/user/get',
        //создаем объект на основе класса Users
        function(request, response){
            const user = new User()
            //передаем в метод ролучения данных о всех пользователяъ
            //ответ от сервера (response)
            user.getAll(response)
        }
)

/**
 * Маршрут для получения одного пользователя
 * Пример: Http://lockalhost:3000/user/get/:id
 */

app.get('/user/get/:id', function(request, response){
    //Создаем на основе класса объект
    const user = new User()
    const id = request.params.id
    user.getItem(response, id)
    //Получить идентификатор из адресной строки

})


/**
 * Маршрут для обновления пользователя
 * Пример: http://lockalhost:3000/user/form/add
 * type - GET
 */
app.get(
    '/user/form/add',
    function(request, response){
        response.send(
            `
            <h1>Добаление пользователя</h1>
            <form action='/user/add' method='POST'>
                <input name='NAME' placeholder='Имя' />
                <input name='SURNAME' placeholder='Фамилия' />
                <input name='IMG' placeholder='Аватар' />
                <input name='PASSWORD' placeholder='Пароль' />
                <input name='EMAIL' placeholder='Почта' />
                <input name='PHONE' placeholder='Телефон' />
                <input name='LOGIN' placeholder='Логин' />
                <input name='ROLE' placeholder='Роль' />
                <input type='submit' value='Обновить пользователя'  />
            </form>
            `)
        }
            )
/**
 * Маршрут для добавление одного пользователя
 * Пример: Http://lockalhost:3000/user/add
 */

            app.get('/user/del/:id',
            function(request, response){
                const user = new User()
                const id = request.params.id
                user.addItem(response, id)
        
        })



/**
 * Маршрут для удаление одного пользователя
 * Пример: Http://lockalhost:3000/user/del/:id
 */

app.get('/user/del/:id',
    function(request, response){
        const user = new User()
        const id = request.params.id
        user.delItem(response, id)

})


/**
 * Маршрут для удаления файла
 * Пример - http/lockalhost:3000/file/del/:name
 * type - GET
 */
app.get('/file/del/:name', function(request, response){
        const fileName =request.params.name
        fs.unlink(`./uploads/${fileName}` , function(error){
                
                const responseObject = {}

            if(error){
                responseObject.status = 500
                responseObject.massage = 'файл не удалился'
                response.send(JSON.stringify(responseObject))
            }
                    responseObject.status = 200
                    responseObject.massage = 'файл удалился'
                    response.send(JSON.stringify(responseObject))
        })
})

/**
 * Маршрут для удаления файла
 * Пример - http/lockalhost:3000/file/form/add
 * type - GET
 */
app.get('/file/form/add', 
    function(request, response){
            response.send(`
            <h1>Форма для отвправки файла</h1>
                <form action='/file/add' method='POST' enctype='multipart/form-data'>
                    <input type='file' / name='INORDICFILE'>
                    <input type='submit' />
                </form>
        `)
    })


/**
 * Маршрут для добавления одного товара
 * Пример : http://lockalhost:3000/file/add
 * type - POST 
 **/
app.post('/file/add',
     fileFromForm ,
    function(request, response){
        console.log(request.file)
        const filePath = request.file.path
        const pathToSave = `uploads/${request.file.originalname}`
        const pathForReadFile = fs.createReadStream(filePath)

        const desc = fs.createWriteStream(pathToSave)

        pathForReadFile.pipe(desc)
        

        const responseObject = {}

        pathForReadFile.on('error', function(){
            responseObject.status = 500
            responseObject.massage = 'файл не записан'
            response.send(JSON.stringify(responseObject))
        })

        pathForReadFile.on('end', function(){
            responseObject.status = 200
            responseObject.massage = 'файл успешно записан'
            response.send(JSON.stringify(responseObject))
        })
})
    


/**
 * Маршрут для добавления одного товара
 * Пример : http://lockalhost:3000/good/add
 * type - POST
 * data : {TITLE ,DISCR, PRICE, IMG, COUNT}
 */

app.post(
    '/good/add',
    function(request, response){
        console.log(request.body)
        const good = new Good()
        good.addItem(response, request.body)
  
    }
)


/**
 * Маршрут для добавления одного пользователя
 * Пример : http://lockalhost:3000/user/add
 * type - POST
 * data : {TITLE ,DISCR, PRICE, IMG, COUNT}
 */

app.post(
    '/user/add',
    function(request, response){
        console.log(request.body)
        const user = new User()
        user.addItem(response, request.body)
  
    }
)

/**
 * Маршрут для обновления пользователя
 * Пример: http://lockalhost:3000/user/form/update/:id
 * type - GET
 */
app.get(
    '/user/form/update/:id',
    function(request, response){
        const id = request.params.id
        response.send(
            `
            <h1>Редактируем пользователя: ${id}</h1>
            <form action='/user/update' method='POST'>
            <input type='hidden' name='ID' value='${id}' />
                <input name='NAME' placeholder='Имя' />
                <input name='SURNAME' placeholder='Фамилия' />
                <input name='IMG' placeholder='Аватар' />
                <input name='PASSWORD' placeholder='Пароль' />
                <input name='EMAIL' placeholder='Почта' />
                <input name='PHONE' placeholder='Телефон' />
                <input name='LOGIN' placeholder='Логин' />
                <input name='ROLE' placeholder='Роль' />
                <input type='submit' value='Обновить пользователя'  />
            </form>
            `)
        }
            )





/**
 * Маршрут для обновления пользователя
 * Пример - http://lockalhost:3000/user/update/
 * type - POST
 */

app.post(
    '/user/update',
    function(request, response){
        console.log(request.body)
        const user = new User()
        user.updateItem(response, request.body)
  
    }
)

/**
 * Маршрут для обновления товара
 * Пример - http://lockalhost:3000/good/update/
 * type - POST
 */

app.post(
    '/good/update',
    function(request, response){
        console.log(request.body)
        const good = new Good()
        good.updateItem(response, request.body)
  
    }
)



/**
 * вспомогательный маршрут для добавлениия товара
 * Форма для добавления товара
 * Type - GET
 */

app.get(
    '/good/form/add',
    function(request, response){
        response.send(
            `
            <form action='/good/add' method='POST'>
                <input name='TITLE' placeholder='Название товара' />
                <input name='DISCR' placeholder='Описание товара' />
                <input name='PRICE' placeholder='Цена товара' type='number' />
                <input name='IMG' placeholder='Изобрважение товара' />
                <input name='COUNT' placeholder='Количество товара' type='number' />
                <input type='submit' value='Добавить товар'  />
            </form>
            `
        )

    }
)


/**
 * вспомогательный маршрут для добавлениия товара
 * Форма для обновления товара
 * Type - GET   
 */

app.get(
    '/good/form/update/:id',
    function(request, response){
        const id = request.params.id
        response.send(
            ` <h1>Редактируем товара: ${id}</h1>
            <form action='/good/update' method='POST'>
            <input type='hidden' name='ID' value='${id}' />
                <input name='TITLE' placeholder='Название товара' />
                <input name='DISCR' placeholder='Описание товара' />
                <input name='PRICE' placeholder='Цена товара' type='number' />
                <input name='IMG' placeholder='Изобрважение товара' />
                <input name='COUNT' placeholder='Количество товара' type='number' />
                <input type='submit' value='Обновить товар'  />
            </form>
            `
        )

    }
)




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