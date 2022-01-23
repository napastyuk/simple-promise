class CustomPromise {
    constructor(executor) {
        this.status = "pending";

        //колбеки для смены флага status. 
        //вызовется только один из них
        //проверка status что бы избежать повторных запусков
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

    //в зависимости от status запускаем один из переданных колбеков
    //если статус pending то не запустимся совсем что бы избежать досрочного запуска
    then(onFulfilled, onRejected) {
        if (this.status === "fulfilled") {
            onFulfilled();
        } else if (this.status === "rejected") {
            onRejected();
        }
    }
}

let p = new CustomPromise((resolve, reject) => {
    //делаем какую-нибудь операцию подверженную ошибкам  
    if (Math.random() < 0.5) {
        resolve();
    } else {
        reject();
    }
    //setTimeout(() => resolve(), 1000);

});

p.then(()=>console.log('все ок'),()=>console.log('ошибка'))





