interface Array<T> {
    orderByLength(): Array<T>;
}

Array.prototype.orderByLength = function () {

    this.sort((a: any, b: any) => {
        if (a.length > b.length) return 1;
        if (a.length < b.length) return -1;
        return 0;
    });

    return this;
}