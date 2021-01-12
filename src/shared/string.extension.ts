// eslint-disable-next-line @typescript-eslint/no-unused-vars,id-blacklist
declare interface String {
    breakToBr(this: string): string;
}

String.prototype.breakToBr = function (this: string): string {
    return this.replace(new RegExp("\n", "g"), "<br />");
};
