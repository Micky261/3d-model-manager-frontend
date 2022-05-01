export class Sorting {
    // TODO: Use an enum
    public static default = "DateAddedAsc";

    public static sortings = [
        "DateAddedAsc",
        "DateAddedDesc",
        "DateUpdatedAsc",
        "DateUpdatedDesc",
        "NameAsc",
        "NameDesc",
        "AuthorAsc",
        "AuthorDesc"
    ];

    public static sortingDesc: Map<string, boolean> = new Map([
        ["DateAddedAsc", false],
        ["DateAddedDesc", true],
        ["DateUpdatedAsc", false],
        ["DateUpdatedDesc", true],
        ["NameAsc", false],
        ["NameDesc", true],
        ["AuthorAsc", false],
        ["AuthorDesc", true]
    ]);

    public static sortingField: Map<string, string> = new Map([
        ["DateAddedAsc", "created_at"],
        ["DateAddedDesc", "created_at"],
        ["DateUpdatedAsc", "updated_at"],
        ["DateUpdatedDesc", "updated_at"],
        ["NameAsc", "name"],
        ["NameDesc", "name"],
        ["AuthorAsc", "author"],
        ["AuthorDesc", "author"]
    ]);
}
