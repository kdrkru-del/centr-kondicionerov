# FINAL_NOINDEX_URLS.md

## Неиндексируемые и перенаправляемые URL нового сайта

Все перечисленные сущности исключены из `sitemap.xml` и защищены от создания поискового спама и дублей контента.

---

### 1. Служебные страницы с директивой `robots: noindex, follow`
- `/compare` — внутренняя пользовательская таблица сравнения моделей. Имеет явную мета-директиву:
  ```ts
  robots: { index: false, follow: true }
  ```

### 2. URL с параметрами фильтрации каталога (Canonical на `/catalog`)
Любые комбинации query-параметров каталога ссылаются на единый канонический URL `/catalog`:
- `/catalog?area=under-20` → `canonical: /catalog`
- `/catalog?area=under-25` → `canonical: /catalog`
- `/catalog?price=under-30` → `canonical: /catalog`
- `/catalog?sort=price_asc` → `canonical: /catalog`
- `/catalog?search=legend` → `canonical: /catalog`
- `/catalog?fav=1` → `canonical: /catalog`

### 3. Технические эндпоинты
- `/api/lead` — обработчик заявок (закрыт через `robots.ts`: `disallow: ['/api/']`).

### 4. Консолидированные страницы (301 Permanent Redirect)
- `/vladivostok` → `301` на `/` (устранена внутренняя конкуренция с главной)
- `/katalogh` → `301` на `/catalog`
- `/kontakty` → `301` на `/#contacts`
- `/uslughi` → `301` на `/#installation`
- `/aktsii` → `301` на `/catalog`
- `/o_kompanii` → `301` на `/#warranty`
- `/novosti` → `301` на `/catalog`
- `/mdvprom` → `301` на `/catalog/mdv`
- `/mdv` → `301` на `/catalog/mdv`
- `/amston` → `301` на `/catalog/amston`
- `/dahatsu` → `301` на `/catalog/dahatsu`
- `/hunberg` → `301` на `/catalog/hunberg`
- `/catalog/brand/:brand` → `301` на `/catalog/:brand`
- 4 устаревших слага MDV (`mdv-classic-inverter`, `mdv-aurora-07` и др.) → `301` на `/catalog/mdv`
