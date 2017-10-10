import {LibraryConfig} from '../interfaces/library-config.interface';
import {Injectable, Optional} from '@angular/core';
import {CookieService} from 'ngx-cookie';

@Injectable()
export class TranslationsService {

    /**
     * The current selected language.
     * @type {string}
     */
    private language: string;

    /**
     * The dictionary containing the translations.
     * @type {object}
     */
    private dictionary = {};

    /**
     * Default constructor.
     *
     * @param {CookieService} cookies The cookies service.
     * @param {LibraryConfig} config The library config data.
     */
    public constructor(private cookies: CookieService, @Optional() private config: LibraryConfig) {
        // Validate the config.
        if (!config) {
            throw new Error('The forRoot method was not called properly.');
        }

        // Retrieve the languages from the config.
        this.dictionary = config.languages;

        // Check if the languages are all correct and if the application is in development mode.
        if (!this.valid()) {
            console.warn('LANGUAGE_EXCEPTION: The language files have been compared ' +
                'and they have not passed the validation.');
        }

        // Retrieve the current language.
        const language = this.cookies.get('APP_TRANSLATION');

        // Verify the language.
        const verifiedLanguage = this.verify(language);

        // Use the verified language.
        this.use(verifiedLanguage);
    }

    /**
     * Set the current language to a new value.
     *
     * @param {string} language The new language.
     */
    public use(language: string): void {
        if (!this.dictionary.hasOwnProperty(language)) {
            return;
        }

        this.language = language;
        this.cookies.put('APP_TRANSLATION', this.language);
    }

    /**
     * Translates a key.
     *
     * @param {string} key The key to translate.
     *
     * @returns {string} The translated key.
     */
    public instant(key: string): string {
        return this.translate(key);
    }

    /**
     * Verifies if the language was supported.
     *
     * @param {string} language The supplied language.
     *
     * @returns {string} The validated language.
     */
    private verify(language: string): string {
        // Check if the language exists.
        const hasProperty = language ? this.dictionary.hasOwnProperty(language) : false;

        if (language !== null && typeof language === 'object' && hasProperty) {
            return language;
        }

        // Fetch the browser language.
        let browserLanguage = navigator.language;

        // Check if the browsers language is supported in the system.
        if (!this.dictionary.hasOwnProperty(browserLanguage)) {
            browserLanguage = Object.keys(this.dictionary)[0] || 'en';
        }

        // If the browser language was not supported put one in the cookie.
        this.cookies.put('APP_TRANSLATION', browserLanguage);

        // Return the browser language.
        return browserLanguage;
    }

    /**
     * Translates a key to the current language equivalent.
     *
     * @param {string} key The key to translate.
     *
     * @returns {string} The translated key.
     */
    private translate(key: string): string {
        // Validate if the language does exist in the dictionary, else throw an error.
        if (!this.dictionary.hasOwnProperty(this.language)) {
            return key;
        }

        // Retrieve the current language dictionary object.
        const dictionary: object = this.dictionary[this.language];

        // Check if the dictionary contains the key then return the translated value.
        if (dictionary && dictionary.hasOwnProperty(key)) {
            return dictionary[key];
        }

        // Warn the user that current key was not found.
        console.warn(
            `LANGUAGE_EXCEPTION: The translation-key {"${key}": ""} was not found`
        );

        // Return the original key.
        return key;
    }

    /**
     * @returns {boolean} The validity of the dictionary files.
     */
    private valid(): boolean {
        const array: string[][] = [];

        // Loop through each dictionary file.
        Object.keys(this.dictionary).forEach((languageKey) => {
            const language: object = this.dictionary[languageKey];

            if (!language) {
                return;
            }

            // Retrieve the keys.
            const data = this.getKeys(language);

            // Add the data to the array.
            array.push(data);
        });

        const first = array[0] || [];

        // Compare all arrays.
        return array.every((element) => this.compare(first, element));
    }

    /**
     * Retrieve the keys of an object in a string array format.
     *
     * @param {object} object The object containing the data.
     * @param {string} id The current identifier for the data.
     *
     * @returns {string[]} A string array containing the keys.
     */
    private getKeys(object: object, id: string = null): string[] {
        const result: string[] = [];

        Object.keys(object).forEach((key) => {
            const item = object[key];

            if (typeof item === 'object') {
                result.push(...this.getKeys(item, id ? (id + '.' + key) : key));
            } else {
                result.push(id ? (id + '.' + key) : key);
            }
        });

        return result;
    }

    /**
     * Compares two string arrays.
     *
     * @param {string[]} first The first string array.
     * @param {string[]} second The second string array.
     *
     * @returns {boolean} True if the arrays are equal, else false.
     */
    private compare(first: string[], second: string[]): boolean {
        if (first === second) {
            return true;
        }

        if (first === null || second === null) {
            return false;
        }

        if (first.length !== second.length) {
            return false;
        }

        for (let index = 0; index < first.length; ++index) {
            if (first[index] !== second[index]) {
                return false;
            }
        }

        return true;
    }

}
