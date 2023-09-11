# Cерверное приложение nodejs-project

## Cодержание:

* Основные команды 
* Плагины
* Инструкции для запуска
* Классы для работы
* Маршруты и работа с ними

## Основные команды 

* npi i - установка модулей проекта
* npm run start - запускаем проект прри пощи этой команды\

## 

1) Необходимо устоновить модули проекта 
2) Запустить проект

## Классы для работы 

1) Goods - класс для работы с товарами
2) Users - класс для работы с пользователями
3) Files - класс для работы с файлами
4) Oerder - класс для рработы с заказами

## Маршруты для работы с ними

### товары:
1) `/goods` - получение всех товаров     (GET)  
2) `/goods/:id` - выбор одного товара   (:id - динамический атрибут)  (GET)
3) `/goods/del/id:` - удаление одного товара    (GET)
4) `/goods/add` - добавление товаров    (POST)
5) `/goods/update` -обновление товара   (POST)

### пользователи:
1) `/users` - получение всех пользователей    (GET)  
2) `/users/:id` - выбор одного пользователя   (:id - динамический атрибут)  (GET)
3) `/users/del/id:` - удаление одного пользователя   (GET)
4) `/users/add` - добавление пользователей    (POST)
5) `/users/update` -обновление пользователей  (POST)

### Файлы:
1) `/files/add` - добавление файлов (POST)
2) `/files/del/:id` - удаление файлов   (GET)

### Заказы:
1) `/order/create` - создание заказа     (POST)
2) `/order/get/:id` - получение заказов     (GET)
3) `/order/del/id:` - удалеие заказов    (GET)
