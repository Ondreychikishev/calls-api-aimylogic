# calls-api-aimylogic
Пример как можно делать звонки на определенном этапе сделки в Битрикс 24, используя Calls API Aimylogic.

Нажмите на кнопку ниже, чтобы запустить свою копию этого приложения

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/Ondreychikishev/calls-api-aimylogic)

## Как запустить на Heroku

Установите [git](https://git-scm.com/book/ru/v2/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-Git) и [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). Запустите терминал (или консоль) на своем компьютере и введите:
```
heroku login
heroku git:clone -a <your Heroku application name>
cd <your Heroku application name>
git remote add origin https://github.com/Ondreychikishev/calls-api-aimylogic
git pull origin master
```
  
Когда вы будете готовы выложить свои изменения в Heroku, введите:
```
git add .
git commit -am "some comments"
git push
```
## Что необходимо настроить

Укажите url вашего Вебхука Битрикс 24

```
var deal = request('GET', '<URL bitrix webhook>/crm.deal.get?id=' + dealId);
var contact = request('GET', '<URL bitrix webhook>/crm.contact.get?id=' + userId);
```
Укажите ID этапа сделки Битрикс 24, на котором необходимо инициализировать звонок.

```
deal.result.STAGE_ID == '<Your stageId>'
```

Укажите токен Calls API Aimylogic

```
'POST', 'https://app.aimylogic.com/api/calls/campaign/<token Calls API Aimylogic>/addPhones'
```
