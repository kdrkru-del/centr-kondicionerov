# SOURCE_CLAIMS_AUDIT.md

## Аудит коммерческих формулировок и данных в соответствии со старым сайтом

**Основной источник фактов:** Действующий сайт компании `https://xn----dtbfccranzcdhectkw3ek.xn--p1ai/`  
**Дата аудита:** 18 сентября 2026 г.  
**Исследованные страницы:**
- Главная (`/`)
- MDV (`/mdv`)
- AMSTON (`/amston`)
- HUNBERG (`/hunberg`)
- DAHATSU (`/dahatsu`)

---

### Таблица коммерческих формулировок и статусов

| Формулировка / Данные | URL источника | Где находится в источнике | Статус | Где используется на новом сайте |
|---|---|---|---|---|
| «Гарантия до 4-х лет» / «Гарантия до 4 лет» | `/`, `/amston`, `/dahatsu` | Шапка, промо-блоки, карточки хитов | **CONFIRMED_ON_OLD_SITE** | `TrustStrip`, `Hero`, `company.ts`, `WarrantySection` |
| «Выезд в день обращения» | `/` | Верхняя плашка УТП (h3) | **CONFIRMED_ON_OLD_SITE** | `HowItWorks`, `TrustStrip`, `WarrantySection` |
| «Работаем без выходных» | `/` | Верхняя плашка УТП | **CONFIRMED_ON_OLD_SITE** | `company.ts`, `TrustStrip`, `Header`, `Footer` |
| «Оплата после выполнения» | `/` | Верхняя плашка УТП | **CONFIRMED_ON_OLD_SITE** | `company.ts`, `TrustStrip`, `Hero`, `LeadFormSection` |
| «Любая форма оплаты» | `/` | Верхняя плашка УТП | **CONFIRMED_ON_OLD_SITE** | `FaqSection`, `LeadFormSection` |
| «Владивосток, Уссурийск и Артём» | `/` | Title, H1, описание | **CONFIRMED_ON_OLD_SITE** | `company.ts`, `Header`, `Hero`, `Footer` |
| Телефон: `+7-4232-761-161` | `/`, все страницы | Header (ссылка `tel:+7-4232-761-161`) | **CONFIRMED_ON_OLD_SITE** | `company.ts` (`primary`), `Header`, `Footer` |
| WhatsApp: `+79147061161` (`https://wa.me/79147061161`) | Все страницы | Соц. иконка / ссылки WhatsApp | **CONFIRMED_ON_OLD_SITE** | `company.ts`, `LeadFormSection`, `MobileBottomBar` |
| Telegram: `+79147061161` (`https://t.me/+79147061161`) | Все страницы | Соц. иконка / ссылки Telegram | **CONFIRMED_ON_OLD_SITE** | `company.ts`, `LeadFormSection` |
| Email: `centrkondicionerov@gmail.com` | Все страницы | Шапка / подвал сайта | **CONFIRMED_ON_OLD_SITE** | `company.ts`, `Footer`, `LeadFormSection` |
| «Почему мы устанавливаем только свои кондиционеры?» | `/` | Заголовок H2 секции ответственности | **CONFIRMED_ON_OLD_SITE** | `WarrantySection.tsx` |
| «Установим за 2-4 часа (без пыли и повреждений)» | `/` | Блок «Как мы работаем», Шаг 3 | **CONFIRMED_ON_OLD_SITE** | `FaqSection.tsx` |
| «Назовем точную цену «под ключ» (кондиционер + монтаж)» | `/` | Блок «Как мы работаем», Шаг 2 | **CONFIRMED_ON_OLD_SITE** | `HowItWorks.tsx`, `LeadFormSection` |
| «Мы являемся сертифицированными дилерами» | `/` | Блок партнерства брендов | **CONFIRMED_ON_OLD_SITE** | `BrandsSection.tsx` |
| Описание «надежная»: «получаете надежную систему без риска...» | `/`, `/dahatsu` | Текст блока монтажа и описание Dahatsu Legend | **CONFIRMED_ON_OLD_SITE** | `WarrantySection`, `dahatsu-legend` описание |
| Хит продаж: Amston Reykjavik ASH-07 (32 900 ₽ с монтажом) | `/`, `/amston` | Карточка хита продаж на главной | **CONFIRMED_ON_OLD_SITE** | `PopularProducts`, `products.ts` |
| Хит продаж: Dahatsu Legend 07 (33 000 ₽ / 48 000 ₽ с монтажом) | `/`, `/dahatsu` | Карточка хита продаж на главной | **CONFIRMED_ON_OLD_SITE** | `PopularProducts`, `PricingTransparency`, `products.ts` |
| «Без скрытых доплат» / «Без скрытых платежей» | — | Ни на одной странице старого сайта фраза не встречается | **NOT_FOUND** | Нейтрализовано: «Понятное отображение стоимости» |
| «Базовая установка» / «Базовый монтаж» | — | Термин отсутствует (на старом сайте используется просто «монтаж» и «установка») | **NOT_FOUND** | Используется: «с установкой» / «с монтажом» |
| «Перезвоним в течение 10 минут» | — | В формах старого сайта только поля Имя, Email, Телефон, кнопка «Отправить» | **NOT_FOUND** | Нейтрализовано: «Мы свяжемся с вами по указанному номеру» |
| Часы работы: «8:00 – 21:00» | — | На старом сайте написано только «Работаем без выходных» | **NOT_FOUND** | Оставлено подтверждённое «Без выходных» |
| Политика конфиденциальности / согласие | — | Ссылки и текст политики на старом сайте отсутствуют | **NOT_FOUND** | Зафиксировано требование разработать до релиза |
