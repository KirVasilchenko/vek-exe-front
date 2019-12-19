export default class Translator {
  constructor() {
    this.init();
  }

  init() {
    this.lang = languages[0];
    for (const language of languages) {
      if (navigator.languages.includes(language)) {
        this.lang = language;
        break;
      }
    }
  }

  translate(code) {
    return translations[this.lang][code] || translations[this.lang]['error.unknown'];
  }
}

const languages = ['ru', 'en'];

const translations = {
  ru: {
    'error.network': 'Ошибка сети. Проверьте подключение',
    'error.unknown': 'Неизвестная ошибка',
    'error.message_send': 'Не удалось отправить сообщение',
    'error.validation.value': 'Нельзя использовать такое значение',
    'error.validation.min_size': 'Минимальный размер должен быть больше',
    'error.validation.max_size': 'Максимальный размер должен быть меньше',
    'error.validation.stop_list': 'Используются слова из запрещенного списка слов',
  },
  en: {
    'error.network': 'Network error',
    'error.unknown': 'Unknown error',
    'error.message_send': 'Can\'t send message',
    'error.validation.value': 'You may kindly wish to choose another value',
    'error.validation.min_size': 'We are strongly encourage you to use more symbols',
    'error.validation.max_size': 'You can take as a hint our humble advice to use a little bit less symbols',
    'error.validation.stop_list': 'We hope we can inspire you to use more positive statements',
  }
};