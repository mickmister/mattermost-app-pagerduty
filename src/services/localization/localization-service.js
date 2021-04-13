const englishTranslations = require('../../i18n/en.json');

class LocalizationService {
    locale = '';

    constructor(locale) {
        this.locale = locale;
    }

    t(key, defaultValue) {
        const dict = this.getTranslationDictionary(this.locale);

        if (dict[key]) {
            return dict[key];
        }

        this.log(`Missing ${this.locale} translation for ${key}`);
        return defaultValue;
    }

    getTranslationDictionary(locale) {
        return englishTranslations;
    }

    log(message) {
        console.log(message);
    }
}

module.exports = LocalizationService;
