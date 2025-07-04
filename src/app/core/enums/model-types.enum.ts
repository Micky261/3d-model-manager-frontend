export enum ModelType {
    Model,
    Image,
    Diagram,
    Document,
    Sliced,
    Various
}

export const modelTypesMap: Map<ModelType, string> = new Map([
    [ModelType.Model, "model"],
    [ModelType.Image, "image"],
    [ModelType.Diagram, "diagram"],
    [ModelType.Document, "document"],
    [ModelType.Sliced, "sliced"],
    [ModelType.Various, "various"]
]);
