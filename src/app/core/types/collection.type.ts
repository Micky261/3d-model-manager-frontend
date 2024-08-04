export class Collection {
    constructor(
        public id: number,
        public userId: number,
        public name: string,
        public description: string,
        public mainModel: number,
        public createdAt?: string,
        public updatedAt?: string,
    ) {
    }
}
