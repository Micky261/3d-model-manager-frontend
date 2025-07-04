// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface Array<T> {
    remove(this: T[], element: T): void;

    returnAllRemoved(this: T[], elements: T[]): T[];

    removeAt(this: T[], index: number): void;
}

Array.prototype.remove = function <T>(this: T[], element: T): void {
    const index = this.indexOf(element);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.returnAllRemoved = function <T>(this: T[], elements: T[]): T[] {
    const returnValue = Object.assign([], this);
    elements.forEach((element: T) => returnValue.remove(element));

    return returnValue;
};

Array.prototype.removeAt = function <T>(this: T[], index: number): void {
    if (index > -1) {
        this.splice(index, 1);
    }
};
