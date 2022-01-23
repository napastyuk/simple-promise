class CustomPromise {
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

    //в зависимости от status запускаем один из переданных колбеков
    then(onFulfilled, onRejected) {
        if (this.status === "fulfilled") {
            onFulfilled();
        } else if (this.status === "rejected") {
            onRejected();
        }
    }
}

let p = new CustomPromise((resolve, reject) => {
    //делаем какую-нибудь операцию подверженную ошибкам или медленную 
    if (Math.random() < 0.5) {
        resolve();
    } else {
        reject();
    }
});

console.log(p.status);




