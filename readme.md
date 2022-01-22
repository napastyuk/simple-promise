1. пишем конструктор класса, что бы не пересекатся со стандартными промисами назовем его CustomPromise.
вариант 1. 
просто возврашаем контекст вызова в методе then
```javascript
class CustomPromise {
   constructor (then) 
   {
      this.then = then
   }
}
```