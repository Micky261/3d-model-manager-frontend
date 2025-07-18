export class Sorting {
    public static defaultModel = "DateAddedDesc";
    public static defaultModelsInCollection = "NameAsc";
    public static defaultTag = "CountDesc";
    public static defaultCollection = "NameAsc";

    public static sortingsModel = [
        "DateAddedAsc",
        "DateAddedDesc",
        "DateUpdatedAsc",
        "DateUpdatedDesc",
        "NameAsc",
        "NameDesc",
        "AuthorAsc",
        "AuthorDesc"
    ];

    public static sortingsModelsInCollection = [
        "NameAsc",
        "NameDesc",
        "AuthorAsc",
        "AuthorDesc"
    ];

    public static sortingsTags = [
        "CountAsc",
        "CountDesc",
        "TagAsc",
        "TagDesc"
    ];

    public static sortingsCollection = [
        "DateAddedAsc",
        "DateAddedDesc",
        "DateUpdatedAsc",
        "DateUpdatedDesc",
        "NameAsc",
        "NameDesc"
    ];

    public static sortingDesc: Map<string, boolean> = new Map([
        ["DateAddedAsc", false],
        ["DateAddedDesc", true],
        ["DateUpdatedAsc", false],
        ["DateUpdatedDesc", true],
        ["NameAsc", false],
        ["NameDesc", true],
        ["AuthorAsc", false],
        ["AuthorDesc", true],
        ["CountAsc", false],
        ["CountDesc", true],
        ["TagAsc", false],
        ["TagDesc", true]
    ]);

    public static sortingField: Map<string, string> = new Map([
        ["DateAddedAsc", "createdAt"],
        ["DateAddedDesc", "createdAt"],
        ["DateUpdatedAsc", "updatedAt"],
        ["DateUpdatedDesc", "updatedAt"],
        ["NameAsc", "name"],
        ["NameDesc", "name"],
        ["AuthorAsc", "author"],
        ["AuthorDesc", "author"],
        ["CountAsc", "count"],
        ["CountDesc", "count"],
        ["TagAsc", "tag"],
        ["TagDesc", "tag"]
    ]);
}
