import {L10nConfig, L10nLoader} from 'angular-l10n';

import {i18nAsset} from './i18n';

export const locales = {
	"en": {language: 'en-GB', currency: 'GBP', timeZone: 'Europe/London'},
	"de": {language: 'de-DE', currency: 'EUR', timeZone: 'Europe/Berlin'}
};

export const l10nConfig: L10nConfig = {
	format: 'language-region',
	providers: [{name: 'app', asset: i18nAsset}],
	cache: true,
	keySeparator: '.',
	defaultLocale: locales.en,
	schema: [
		{
			locale: locales.en,
			dir: 'ltr',
			text: 'England'
		},
		{
			locale: locales.de,
			dir: 'ltr',
			text: 'Germany'
		}
	]
};

export function initL10n(l10nLoader: L10nLoader): () => Promise<void> {
	return () => l10nLoader.init();
}
