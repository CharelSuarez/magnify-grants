import { derived, writable } from "svelte/store";
import { translations } from "./translations";
import { browser } from '$app/environment';

const storedLocale = browser ? localStorage.getItem("locale") || "en" : "en";
export const locale = writable(storedLocale);
locale.subscribe((value) => {
	if (browser) {
		return localStorage.setItem("locale", value)
	}
});

export const locales = Object.keys(translations);

const translate = (locale: string, key: string | number, vars: {[x: string]: string}) => {
	// Let's throw some errors if we're trying to use keys/locales that don't exist.
	// We could improve this by using Typescript and/or fallback values.
	if (!key) throw new Error("no key provided to $t()");
	if (!locale) throw new Error(`no translation for key "${key}"`);

	// Grab the translation from the translations object.
	let text = translations[locale][key];
	if (!text && locale !== "en") {
		text = translations["en"][key];
		if (text) {
			console.warn(`No translation found for ${locale}.${key}, using default en.`);
		}
	}

	if (!text) {
		console.warn(`No translation found for ${locale}.${key}, using error string.`);
		return key.toString();
	}

	// Replace any passed in variables in the translation string.
	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, "g");
		text = text.replace(regex, vars[k]);
	});

	return text;
}

export const t = derived(locale, ($locale) => (key: string | number, vars = {}) =>
	translate($locale, key, vars));
