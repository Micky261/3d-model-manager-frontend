import {Link} from "./link.type";

export class Model {
    constructor(
        public id: number,
        public name: string,
        public links: Link[],
        public description: string,
        public notes: string,
        public favorite: boolean,
        public author: string,
        public licence: string,
        public createdAt?: string,
        public updatedAt?: string,
        public importedName?: string,
        public importSource?: string,
        public importedDescription?: string,
        public importedAuthor?: string,
        public importedLicence?: string,
    ) {
    }
}

export class ModelWithTags {
    constructor(
        public id: number,
        public name: string,
        public links: Link[],
        public description: string,
        public notes: string,
        public favorite: boolean,
        public author: string,
        public licence: string,
        public createdAt?: string,
        public updatedAt?: string,
        public importedName?: string,
        public importSource?: string,
        public importedDescription?: string,
        public importedAuthor?: string,
        public importedLicence?: string,
        public tags?: string[],
    ) {
    }
}

