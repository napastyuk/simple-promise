class CustomPromise {
   constructor (then) 
   {
      this.then = then
   }
}

let p = new CustomPromise((resolve, reject) => {
    //делаем какую-нибудь медленную операцию
    if (Math.random() < 0.5) {
        resolve();
    } else {
        reject();
    }
});

p.then(()=>console.log('все ок'),()=>console.error('что то пошло не так'));


