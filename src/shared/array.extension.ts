// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface Array<T> {
    remove(array: T[], element: T): void;
}

Array.prototype.remove = <T>(array: T[], element: T): void => {
    const index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
    }
};
