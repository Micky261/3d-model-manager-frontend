export class ModelFile {
    constructor(
        public model_id: number,
        public type: string,
        public filename: string,
        public position: number,
        public created_at: string,
        public updated_at: string
    ) {
    }
}

