export class Model {
    constructor(
        public id: number,
        public name: string,
        public links: string[],
        public description: string,
        public notes: string,
        public favorite: boolean,
        public author: string,
        public licence: string,
        public created_at: string,
        public updated_at: string,
        public imported_name?: string,
        public import_source?: string,
        public imported_description?: string,
        public imported_author?: string,
        public imported_licence?: string,
    ) {
    }
}

