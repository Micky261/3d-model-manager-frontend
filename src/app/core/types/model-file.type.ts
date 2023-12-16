export class ModelFile {
    constructor(
        public id: number,
        public userId: number,
        public modelId: number,
        public storage: string,
        public type: string,
        public filename: string,
        public position: number,
        public size: number,
        public createdAt: string,
        public updatedAt: string
    ) {
    }
}

