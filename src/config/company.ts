export const COMPANY_CONFIG = {
  name: 'Центр Кондиционеров',
  legalName: 'Общество с ограниченной ответственностью «Окна-Центр»',
  shortLegalName: 'ООО «Окна-Центр»',
  inn: '2543168553',
  kpp: '254301001',
  ogrn: '1222500021963',
  okpo: '74392794',
  director: 'Кошовенко Данил Сергеевич',
  legalAddress: '690048, Приморский край, г. Владивосток, ул. Ильичёва, дом 29, офис 8',
  phones: {
    primary: {
      raw: '+74232761161',
      formatted: '+7 (4232) 76-11-61',
      tel: 'tel:+74232761161',
    },
    mobile: {
      raw: '+79147061161',
      formatted: '+7 (914) 706-11-61',
      tel: 'tel:+79147061161',
    },
  },
  messengers: {
    whatsapp: 'https://wa.me/79147061161',
    telegram: 'https://t.me/+79147061161',
  },
  email: 'centrkondicionerov@gmail.com',
  workingHours: {
    days: 'Без выходных',
    hours: null,
    full: 'Работаем без выходных',
  },
  cities: [
    { name: 'Владивосток', slug: 'vladivostok', isDefault: true },
    { name: 'Артём', slug: 'artem', isDefault: false },
    { name: 'Уссурийск', slug: 'ussuriysk', isDefault: false },
  ],
  citiesListText: 'Владивосток, Артём, Уссурийск',
  warrantyText: 'Гарантия до 4 лет',
  paymentTerms: 'Оплата после выполнения работ',
} as const;
