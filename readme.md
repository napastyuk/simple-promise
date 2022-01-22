1. пишем конструктор класса, что бы не пересекатся со стандартными промисами назовем его CustomPromise.

2. в конструкторе класса записываем в свойство then колбэк который приходит первым параметром от new CustomPromise()
```javascript
class CustomPromise {
   constructor (then) 
   {
      this.then = then
   }
}
```
3. then переносим в метод и определяем вызов параметров onFulfilled и onRejected которые туда передает new CustomPromise. Статус пока захардкодим 
```javascript
class CustomPromise {
    constructor(executor) {
        this.status = "fulfilled"; //временно
    }

    then(onFulfilled, onRejected) {
        if (this.status === "fulfilled") {
            onFulfilled();
        } else if (this.status === "rejected") {
            onRejected();
        }
    }
}
``` 
