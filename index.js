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


let p = new CustomPromise((resolve, reject) => {
    //делаем какую-нибудь операцию подверженную ошибкам или медленную
    if (Math.random() < 0.5) {
        resolve();
    } else {
        reject();
    }
});

p.then(() => console.log('все ок'), () => console.error('что то пошло не так'));


