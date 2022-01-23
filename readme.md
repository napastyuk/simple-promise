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
эти параметры будут отвечать за колбэки после выполнения промиса
```javascript
class CustomPromise {
    constructor(executor) {
        this.status = "fulfilled"; //пока захардкодим
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

4. теперь добавим запуск executor-а. Это будет функция с двумя параметрами. При успешном выполнении асинхронного действия будет вызыватся первый параметр(назовем его resolve) при неудачном второй(назовем его reject). Запуск обернем в try catch что бы вылавливать ошибки выполнения executor-а
```javascript
constructor(executor) {
    this.status = "pending";

    //колбеки для смены флага status. 
    //вызовется только один из них
    const resolve = () => {
        if (this.status === "pending") this.status = "fulfilled"
    };

    const reject = () => {
        if (this.status === "pending") this.status = "rejected"
    };

    try {
        //пробуем выполнить переданный executor
        executor(resolve, reject);
    } catch (err) {
        //пока err никуда не выводим
        reject();
    }
}

```
