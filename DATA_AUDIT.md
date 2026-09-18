# Аудит достоверности данных сайта «Центр Кондиционеров»

Документ фиксирует результаты сверки всех характеристик, цен, коммерческих условий и метаданных сайта с первоисточником: официальным сайтом компании [`кондиционеры-владивосток.рф`](https://xn----dtbfccranzcdhectkw3ek.xn--p1ai/) и его разделами `/mdv`, `/amston`, `/hunberg`, `/dahatsu`.

---

## 1. Классификация статусов верификации
- **CONFIRMED**: Данные строго подтверждены текстом или каталогом исходного сайта.
- **SERIES_LEVEL**: Данные относятся ко всей серии/линейке в целом (например, общий диапазон площадей или базовая цена серии), но не заявлены для конкретной модели индивидуально.
- **UNKNOWN**: Данные отсутствуют в первоисточнике; в коде присвоено значение `null`, в интерфейсе отображается заглушка («Уточняйте у менеджера» / «По запросу»).
- **REMOVED_UNVERIFIED**: Неподтверждённые, додуманные или маркетинговые заявления, удалённые из кодовой базы проекта в рамках аудита.

---

## 2. Сводная таблица аудита по товарам и сущностям

| Товар / Объект | Поле | Значение | Источник | Статус |
|---|---|---|---|---|
| **Компания** | Гарантия компании | до 4-х лет | Главная страница | **CONFIRMED** |
| **Компания** | Гарантия на оборудование | 5 лет | Исходный код / ТЗ | **REMOVED_UNVERIFIED** |
| **Компания** | Гарантия на монтаж | 3 года | Исходный код / ТЗ | **REMOVED_UNVERIFIED** |
| **Компания** | Статус монтажников | Сертифицированные | Исходный код / ТЗ | **REMOVED_UNVERIFIED** |
| **Компания** | Бесплатный замер | Замер и консультация бесплатно | Исходный код / ТЗ | **REMOVED_UNVERIFIED** |
| **Компания** | Юридический/фактический адрес | ул. Снеговая, д. 18б | Исходный код / ТЗ | **REMOVED_UNVERIFIED** (null) |
| **Компания** | Часы работы | 08:00 – 21:00 | Исходный код / ТЗ | **REMOVED_UNVERIFIED** |
| **Компания** | Режим работы | Без выходных | Главная страница | **CONFIRMED** |
| **Компания** | Телефон | +7 (423) 205-56-62 | Главная страница | **CONFIRMED** |
| **Компания** | Второстепенный телефон | +7 (984) 195-56-62 | Главная страница | **CONFIRMED** |
| **Компания** | Города обслуживания | Владивосток, Артём, Уссурийск | Главная страница | **CONFIRMED** |
| **Компания** | Рейтинг Schema.org | 5.0 (127 отзывов) | Исходный код / ТЗ | **REMOVED_UNVERIFIED** (удален) |
| **Компания** | Блок «Отзывы клиентов» | 3 выдуманных отзыва | Исходный код / ТЗ | **REMOVED_UNVERIFIED** (скрыт) |
| **Компания** | Блок «Наши работы» | Стоковые фотографии | Исходный код / ТЗ | **REMOVED_UNVERIFIED** (скрыт) |
| **Компания** | Базовая цена монтажа | 14 500 – 15 000 ₽ | Исходный код / ТЗ | **REMOVED_UNVERIFIED** (null) |
| **Компания** | Калькулятор допработ | 3000, 2500, 2000 ₽ | Исходный код / ТЗ | **REMOVED_UNVERIFIED** («По расчету специалиста») |
| **Города** | Адреса во Владивостоке, Артёме, Уссурийске | Локальные филиалы/склады | Исходный код / ТЗ | **REMOVED_UNVERIFIED** (null) |
| **MDV (Бренд)** | Описание бренда | Бытовые сплит-системы настенного типа | /mdv | **CONFIRMED** |
| **MDV (Бренд)** | Завод-изготовитель | Завод Midea | Исходный код / ТЗ | **REMOVED_UNVERIFIED** |
| **MDV Aurora Inverter** | Тип компрессора | Inverter | /mdv | **CONFIRMED** |
| **MDV Aurora Inverter** | Площадь помещения | null (серия 20–105 м²) | /mdv | **SERIES_LEVEL** |
| **MDV Aurora Inverter** | Цена оборудования | null | /mdv (не указана) | **UNKNOWN** |
| **MDV Aurora Inverter** | Цена с установкой | null | /mdv (не указана) | **UNKNOWN** |
| **MDV Aurora Inverter** | Уровень шума, мощность | null | Исходный код / ТЗ | **REMOVED_UNVERIFIED** (null) |
| **MDV Aurora On-Off** | Тип компрессора | On-Off | /mdv | **CONFIRMED** |
| **MDV Aurora On-Off** | Площадь помещения | null (серия 20–105 м²) | /mdv | **SERIES_LEVEL** |
| **MDV Aurora On-Off** | Цена оборудования | null | /mdv (не указана) | **UNKNOWN** |
| **MDV Aurora On-Off** | Цена с установкой | null | /mdv (не указана) | **UNKNOWN** |
| **MDV Forest On-Off** | Тип компрессора | On-Off | /mdv | **CONFIRMED** |
| **MDV Forest On-Off** | Площадь помещения | null (серия 20–35 м²) | /mdv | **SERIES_LEVEL** |
| **MDV Forest On-Off** | Цена оборудования | null | /mdv (не указана) | **UNKNOWN** |
| **MDV Forest On-Off** | Цена с установкой | null | /mdv (не указана) | **UNKNOWN** |
| **MDV Infini Inverter** | Тип компрессора | Inverter | /mdv | **CONFIRMED** |
| **MDV Infini Inverter** | Площадь помещения | null (серия 25–70 м²) | /mdv | **SERIES_LEVEL** |
| **MDV Infini Inverter** | Цена оборудования | null | /mdv (не указана) | **UNKNOWN** |
| **MDV Infini Inverter** | Цена с установкой | null | /mdv (не указана) | **UNKNOWN** |
| **AMSTON (Бренд)** | Описание бренда | Сплит-системы серии Reykjavik | /amston | **CONFIRMED** |
| **AMSTON (Бренд)** | Завод-изготовитель | Завод AUX | Исходный код / ТЗ | **REMOVED_UNVERIFIED** |
| **AMSTON Reykjavik** | Диапазон площадей серии | 20–70 м² | /amston | **SERIES_LEVEL** |
| **AMSTON Reykjavik** | Базовая цена серии | от 18 000 ₽ | /amston | **SERIES_LEVEL** |
| **AMSTON Reykjavik** | Тип компрессора | On-Off | /amston | **CONFIRMED** |
| **AMSTON ASH-07** | Цена оборудования | null | /amston (отдельно не указана) | **UNKNOWN** |
| **AMSTON ASH-07** | Цена с установкой | 32 900 ₽ | /amston, Главная | **CONFIRMED** |
| **AMSTON ASH-07** | Бейдж | ХИТ ПРОДАЖ | Главная («Хит продаж!») | **CONFIRMED** |
| **AMSTON ASH-07** | Площадь помещения | null (серия 20–70 м²) | /amston | **SERIES_LEVEL** |
| **AMSTON ASH-09** | Цена оборудования | null (ранее ошибочно 18 000 ₽) | Исходный код / ТЗ | **REMOVED_UNVERIFIED** (null) |
| **AMSTON ASH-09** | Цена с установкой | null | /amston | **UNKNOWN** |
| **AMSTON ASH-09** | Площадь помещения | null (серия 20–70 м²) | /amston | **SERIES_LEVEL** |
| **AMSTON ASH-12** | Цена оборудования | null (ранее ошибочно 18 000 ₽) | Исходный код / ТЗ | **REMOVED_UNVERIFIED** (null) |
| **AMSTON ASH-12** | Цена с установкой | null | /amston | **UNKNOWN** |
| **AMSTON ASH-12** | Площадь помещения | null (серия 20–70 м²) | /amston | **SERIES_LEVEL** |
| **AMSTON ASH-18** | Цена оборудования | null (ранее ошибочно 18 000 ₽) | Исходный код / ТЗ | **REMOVED_UNVERIFIED** (null) |
| **AMSTON ASH-18** | Цена с установкой | null | /amston | **UNKNOWN** |
| **AMSTON ASH-18** | Площадь помещения | null (серия 20–70 м²) | /amston | **SERIES_LEVEL** |
| **AMSTON ASH-24** | Цена оборудования | null (ранее ошибочно 18 000 ₽) | Исходный код / ТЗ | **REMOVED_UNVERIFIED** (null) |
| **AMSTON ASH-24** | Цена с установкой | null | /amston | **UNKNOWN** |
| **AMSTON ASH-24** | Площадь помещения | null (серия 20–70 м²) | /amston | **SERIES_LEVEL** |
| **DAHATSU (Бренд)** | Описание серии | Серия Legend Inverter | /dahatsu | **CONFIRMED** |
| **DAHATSU (Бренд)** | Компрессор | Японский компрессор / GMCC Toshiba | Исходный код / ТЗ | **REMOVED_UNVERIFIED** |
| **DAHATSU Legend 07** | Площадь помещения | 20 м² | /dahatsu | **CONFIRMED** |
| **DAHATSU Legend 07** | Цена оборудования | 33 000 ₽ | /dahatsu | **CONFIRMED** |
| **DAHATSU Legend 07** | Цена с установкой | 48 000 ₽ | /dahatsu, Главная | **CONFIRMED** |
| **DAHATSU Legend 07** | Тип компрессора | Inverter | /dahatsu | **CONFIRMED** |
| **DAHATSU Legend 07** | Бейдж | ХИТ ПРОДАЖ, INVERTER | Главная («Хит продаж!») | **CONFIRMED** |
| **DAHATSU Legend 09** | Площадь помещения | 25 м² | /dahatsu | **CONFIRMED** |
| **DAHATSU Legend 09** | Цена оборудования | 35 000 ₽ | /dahatsu | **CONFIRMED** |
| **DAHATSU Legend 09** | Цена с установкой | null | /dahatsu (не указана) | **UNKNOWN** |
| **DAHATSU Legend 09** | Тип компрессора | Inverter | /dahatsu | **CONFIRMED** |
| **DAHATSU Legend 12** | Площадь помещения | 35 м² | /dahatsu | **CONFIRMED** |
| **DAHATSU Legend 12** | Цена оборудования | 42 000 ₽ | /dahatsu | **CONFIRMED** |
| **DAHATSU Legend 12** | Цена с установкой | null | /dahatsu (не указана) | **UNKNOWN** |
| **DAHATSU Legend 12** | Тип компрессора | Inverter | /dahatsu | **CONFIRMED** |
| **HUNBERG (Бренд)** | Описание бренда | Сплит-системы для дома и офиса | /hunberg | **CONFIRMED** |
| **HUNBERG AC-07NB** | Площадь помещения | null (серия 25–70 м²) | /hunberg | **SERIES_LEVEL** |
| **HUNBERG AC-07NB** | Цена оборудования | от 29 000 ₽ | /hunberg | **CONFIRMED** |
| **HUNBERG AC-07NB** | Цена с установкой | null | /hunberg (не указана) | **UNKNOWN** |
| **Все модели каталога (13 товаров)** | Индивидуальная гарантия (`product.warranty`) | null | На страницах брендов и карточек конкретный срок не указан | **CONFIRMED** (`null`) |
| **HUNBERG AC-07NB** | Тип компрессора | On-Off | /hunberg | **CONFIRMED** |

---

## 3. Архитектурные и SEO-исправления

1. **Канонические маршруты брендов:**
   - `/catalog/mdv`
   - `/catalog/amston`
   - `/catalog/dahatsu`
   - `/catalog/hunberg`
   Устранена дублирующая иерархия `/catalog/brand/[brand]`. Все внутренние ссылки в футере, sitemap.xml, блоках брендов и каталоге обновлены на канонические `/catalog/:brand`.

2. **301 Permanent Redirects в `next.config.ts`:**
   - `/mdv` → `/catalog/mdv` (301)
   - `/amston` → `/catalog/amston` (301)
   - `/dahatsu` → `/catalog/dahatsu` (301)
   - `/hunberg` → `/catalog/hunberg` (301)
   - `/catalog/brand/:brand` → `/catalog/:brand` (301)
   - `/catalog/mdv-classic-inverter` → `/catalog/mdv` (301)
   - `/catalog/mdv-infini-nordic-heat-pump-09` → `/catalog/mdv` (301)
   - `/catalog/mdv-aurora-07` → `/catalog/mdv` (301)
   - `/catalog/mdv-infini-uv-pro` → `/catalog/mdv` (301)

3. **Гарантийные условия и отображение в интерфейсе:**
   - **Общая корпоративная гарантия:** «Гарантия до 4 лет. Конкретный срок зависит от выбранного оборудования. Уточните условия при заказе.»
   - **Индивидуальная гарантия модели:** у всех 13 товаров `warranty = null`. Строка «Заводская гарантия» в карточках и спецификациях скрыта и не рендерится.
   - **Микроразметка Schema.org:** индивидуальные свойства гарантии не добавляются в JSON-LD.
