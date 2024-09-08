import {ImportSource} from "../enums/import-source.enum";

export class UrlMatcher {

    private static mapper: Map<RegExp, ImportSource> = new Map([
        [/(https?:\/\/)?(www\.)?cults3d.com\/\w{2}\/[\w-]+\/\w{3,}\/([\w-]+)/i, ImportSource.Cults3D],
        [/(https?:\/\/)?(www\.)?myminifactory.com\/object\/.+-(\d+)/i, ImportSource.MyMiniFactory],
        [/(https?:\/\/)?(www\.)?sketchfab.com\/3d-models\/.+-([abcdef\d]+)/i, ImportSource.Sketchfab],
        [/(https?:\/\/)?(www\.)?thingiverse\.com\/thing:(\d+)(\/.+)?/i, ImportSource.Thingiverse],
    ]);

    public static match(url: string): { importSource: ImportSource; id: string } {

        let result: { importSource: ImportSource; id: string } = null;
        this.mapper.forEach((is, regex) => {
            const match = url.match(regex);

            if (match != null) {
                result = {importSource: is, id: match[3]};
            }
        });

        return result;
    }

    public static availableMatchers(): ImportSource[] {
        return Array.from(this.mapper.values());
    }
}
