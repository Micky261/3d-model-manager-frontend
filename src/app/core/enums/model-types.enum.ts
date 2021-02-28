export enum ModelTypes {
    Model,
    Image,
    Diagram,
    Document
}

export const modelTypesMap: Map<ModelTypes, string> = new Map([
    [ModelTypes.Model , "model"],
    [ModelTypes.Image , "image"],
    [ModelTypes.Diagram , "diagram"],
    [ModelTypes.Document , "document"]
]);
