import {L10nConfig, L10nLoader} from "angular-l10n";

export const locales = {
    "en-GB": {language: "en-GB", currency: "GBP", timeZone: "Europe/London"},
    "de-DE": {language: "de-DE", currency: "EUR", timeZone: "Europe/Berlin"}
};

export const langCodes = {
    "en-GB": {iana: "en"},
    "de-DE": {iana: "de"}
};

export const l10nConfig: L10nConfig = {
    format: "language-region",
    providers: [
        {name: "app", asset: "./assets/locales/", options: {version: "1.0.0"}},
    ],
    cache: true,
    keySeparator: ".",
    defaultLocale: locales["en-GB"],
    schema: [
        {
            locale: locales["en-GB"],
            dir: "ltr",
            text: "England"
        },
        {
            locale: locales["de-DE"],
            dir: "ltr",
            text: "Germany"
        }
    ]
};

export function initL10n(l10nLoader: L10nLoader): () => Promise<void> {
    return () => l10nLoader.init();
}
