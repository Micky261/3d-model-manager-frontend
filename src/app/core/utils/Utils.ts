export class Utils {
    /**
     * Show number of bytes as 10-based human-readable file size
     * @param inByte Number of bytes to make readable
     * @param decimalPlaces Number of decimal places to show
     *
     * If more complex calculations needed: https://github.com/tsmx/human-readable
     */
    public static humanReadableSize(inByte: number, decimalPlaces: number = 1): string {
        const units = ["b", "kb", "mb", "gb", "tb"];
        let u = 0;
        const r = 10 ** decimalPlaces;

        while (Math.round(Math.abs(inByte) * r) / r >= 1000 && u < units.length - 1) {
            inByte /= 1000;
            ++u;
        }

        return inByte.toFixed(decimalPlaces) + " " + units[u];
    }
}
