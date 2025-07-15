import {Model} from "./model.type";

export class ProfileStats {
    constructor(
        public modelCount: number,
        public modelImportedCount: number,
        public authorCount: number,
        public tagCount: number,
        public favoriteCount: number,
        public linkCount: number,
        public collectionCount: number,
        public modelsInCollectionsCount: number,
        public imageFileCount: number,
        public threedModelFileCount: number,
        public fileCount: number,
        public mostCommonImportSource: string,
        public largestFileModel: Model,
        public largestFileSize: string,
        public mostFrequentAuthor: string,
        public usedSpace: string,
        public modelWithMostFiles: Model,
        public modelWithMostFilesCount: number,
        public modelWithMost3DModels: Model,
        public modelWithMost3DModelsCount: number,
        public firstModel: Model,
        public latestModel: Model,
        public lastEditedModel: Model,
    ) {
    }
}
