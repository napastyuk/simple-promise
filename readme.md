# Реализация промисов

задача: реализуйте стандартный класс Promise.
подробности: https://docs.google.com/document/d/1JeySBTi659KpPoOgM7G4uSihzsAUgeGEAI815LnDBw4/edit

Решение в файле index.js.

Примерный ход решения.

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
        reject();
    }
}

```

5. тоже самое с вызовом resolve/reject внутри setTimeout не заработал, контекст теряется Вариант с сохранением this в переменную self внутри класса не помог, this все равно глобальный. Обычно в этом случае я использую bind но сейчас это противоречит синтаксису промисов.


6. для организации цепочки вызовов then, нужно будет в методе then возвращать  еще один new CustomPromise. Так же так как у нас будет несколько параметров  resolve, reject их надо будет складывать в массив что бы вызывать последовательно.

7. так же, для корректной реализации нужно будет добавить параметр к функции reject() что бы в нем пробрасывать наверх ошибку 



