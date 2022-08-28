export class ModelFile {
    constructor(
        public id: number,
        public user_id: number,
        public model_id: number,
        public storage: string,
        public type: string,
        public filename: string,
        public position: number,
        public size: number,
        public created_at: string,
        public updated_at: string
    ) {
    }
}

