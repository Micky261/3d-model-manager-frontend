export class ModelLink {
    constructor(
        public id: number,
        public userId: number,
        public modelId: number,
        public title: string,
        public link: string,
        public description: string,
        public position: number,
        public createdAt: string,
        public updatedAt: string
    ) {
    }
}

