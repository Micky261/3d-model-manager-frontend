// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface Array<T> {
    remove(this: T[], element: T): void;
}

Array.prototype.remove = function<T>(this: T[], element: T): void {
    const index = this.indexOf(element);
    if (index > -1) {
        this.splice(index, 1);
    }
};
