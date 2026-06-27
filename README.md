# IntelRAYAB — Kurumsal Web Sitesi

**RAYAB YZ REİS BİLİŞİM A.Ş.** markası IntelRAYAB için üretim kalitesinde, çok dilli (TR/EN), tamamen responsive kurumsal web sitesi. Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion ile geliştirilmiş, statik export olarak GitHub Pages'te yayınlanır.

**Canlı:** https://ykoca-code.github.io/IntelRAYAB/

---

## Teknoloji

- **Next.js 14** (App Router, `output: 'export'` ile statik export)
- **TypeScript** + **Tailwind CSS** (tasarım token'ları CSS değişkenleri olarak)
- **Framer Motion** (scroll-reveal, stagger, aurora arkaplan)
- **lucide-react** (ikonlar) + **simple-icons** (entegrasyon/marka logoları)
- **Node 20+** (geliştirme Node 18.18+ ister; CI Node 20 kullanır)

## Kurulum & Çalıştırma

```bash
npm install          # bağımlılıklar
npm run dev          # http://localhost:3000  (otomatik /tr'ye yönlenir)
npm run build        # statik export -> ./out
```

`npm run build` çıktısı `out/` klasörüne yazılır ve doğrudan herhangi bir statik
sunucuda servis edilebilir.

---

## İçeriği Düzenleme

**Tüm metinler** `locales/tr.json` ve `locales/en.json` içindedir; kodda hardcode
metin yoktur. Bir başlığı, hizmeti, danışmanı, sektörü veya CTA'yı değiştirmek için
ilgili JSON anahtarını düzenlemeniz yeterli — her iki dilde de aynı yapıyı koruyun.

- **Hizmetler:** `services.list[]`
- **AI Danışman pozisyonları:** `advisors.list[]` (`featured: true` → "En çok talep edilen" rozeti)
- **Sektörler:** `sectors.list[]`
- **Entegrasyonlar:** `integrations.categories[]` (her öğenin `slug` alanı simple-icons içindir; boşsa isimli çip gösterilir)
- **Güven göstergeleri:** `home.trustIndicators.items[]` — bunlar **düzenlenebilir nitel değerlerdir** (uydurma sayısal metrik yok).

İkon adları `lib/icons.tsx` içindeki haritadan gelir (lucide-react adları). Yeni bir
ikon kullanmak için oraya ekleyin.

## İletişim Bilgisi & Form

- **İletişim bilgileri** `locales/*.json` → `contact.info` altında: `email`, `phone`, `address`.
  - `[DOLDUR]` telefon: `+90 (___) ___ __ __` değerini gerçek numarayla değiştirin.
- **İletişim formu** ([Web3Forms](https://web3forms.com) ile çalışır, ücretsiz):
  1. web3forms.com'dan ücretsiz bir **Access Key** alın.
  2. Anahtarı `components/ContactForm.tsx` içindeki `WEB3FORMS_KEY` sabitine yazın
     **veya** `NEXT_PUBLIC_WEB3FORMS_KEY` ortam değişkeniyle geçin (CI'da repo secret olarak ekleyip workflow'a env verebilirsiniz).
  3. Anahtar girilmezse form otomatik olarak **`mailto:` yedeğine** düşer (kullanıcının e-posta uygulamasını açar).
- **Harita:** `app/[locale]/contact/page.tsx` içinde `[DOLDUR]` işaretli bir alana
  Google Maps `<iframe>` embed'i ekleyebilirsiniz.

## Logolar

### Entegrasyon / teknoloji logoları
`simple-icons` paketinden otomatik gelir. `integrations.categories[].items[].slug`
alanı simple-icons slug'ıdır (örn. `sap`, `googleads`, `powerbi`). Slug boş bırakılırsa
(pakette olmayan markalar: Logo, Netsis, DeepSeek, Hepsiburada vb.) ilk harfli temiz
bir monokrom çip gösterilir — bozuk görsel oluşmaz.

### Referans / müşteri logoları (Hasçevher, EasyCep, Cabir Holding)
`components/ReferenceLogo.tsx` kademeli fallback uygular:

1. `public/logos/<logo>.png` — **gerçek logoyu buraya koyabilirsiniz** (önerilir)
2. [Clearbit Logo API](https://clearbit.com/logo) — resmi alan adından otomatik
3. Zarif monokrom kelime-işareti placeholder (şirket adıyla)

Gerçek logoları eklemek için aşağıdaki dosyaları `public/logos/` içine bırakın:

| Şirket        | Beklenen dosya                  |
| ------------- | ------------------------------- |
| Hasçevher     | `public/logos/hascevher.png`    |
| EasyCep       | `public/logos/easycep.png`      |
| Cabir Holding | `public/logos/cabirholding.png` |

Dosya adı `locales/*.json` → `references.list[].logo` alanıyla eşleşir. `.svg`
kullanmak isterseniz `ReferenceLogo.tsx` içindeki `sources` zincirini güncelleyin.

> **Not:** Müşteri logolarını yayınlarken ilgili şirketlerin gösterim iznine sahip
> olduğunuzdan emin olun.

---

## GitHub Pages'e Yayın

`.github/workflows/deploy-pages.yml` her push'ta otomatik build + deploy yapar:
Next build → `out/` → `actions/upload-pages-artifact` → `actions/deploy-pages`.
`public/.nojekyll` dosyası, GitHub'ın `_next/` klasörünü Jekyll ile işlemesini engeller.

### `NEXT_PUBLIC_BASE_PATH` — iki senaryo

Site URL'sine göre `basePath`/`assetPrefix` ayarlanmalıdır (`next.config.mjs` bu değeri
ortam değişkeninden okur):

| Senaryo                                              | `NEXT_PUBLIC_BASE_PATH` |
| --------------------------------------------------- | ----------------------- |
| **Proje reposu:** `kullanici.github.io/repo-adi`    | `/repo-adi` (örn. `/IntelRAYAB`) |
| **Kullanıcı reposu:** `kullanici.github.io`         | `""` (boş)              |
| **Custom domain:** `intelrayab.com`                 | `""` (boş)              |

- Bu repo proje reposu olduğu için workflow `NEXT_PUBLIC_BASE_PATH: /IntelRAYAB`
  kullanır. Custom domain'e geçerseniz workflow'daki bu satırı `""` yapın, `public/`
  içine `CNAME` dosyası ekleyin ve `app/sitemap.ts` / `app/robots.ts` / `layout`
  içindeki `https://ykoca-code.github.io/IntelRAYAB` adreslerini güncelleyin.

### Repo ayarı (tek seferlik)
GitHub → **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.

### Yerelde production önizleme
```bash
NEXT_PUBLIC_BASE_PATH=/IntelRAYAB npm run build
npx serve out      # not: basePath nedeniyle /IntelRAYAB/tr/ altından servis edin
```

---

## Proje Yapısı

```
app/
  layout.tsx              # kök layout, fontlar (Inter + Space Grotesk), favicon
  page.tsx                # / -> tercih edilen dile yönlendirme
  not-found.tsx           # 404 (TR/EN)
  sitemap.ts, robots.ts   # SEO
  [locale]/
    layout.tsx            # Header/Footer, metadata, JSON-LD, hreflang
    page.tsx              # Anasayfa
    services/ advisors/ sectors/ integrations/
    references/ about/ contact/ privacy/
components/               # Header, Footer, Logo, ui, cards, ContactForm,
                          # IntegrationGrid, ReferenceLogo, AnimatedBackground ...
lib/
  i18n.ts                 # locale yardımcıları, route'lar, basePath, asset()
  icons.tsx               # lucide ikon haritası
locales/
  tr.json, en.json        # TÜM içerik
public/
  favicon.svg, .nojekyll, logos/
```

## Erişilebilirlik & SEO

- Semantik HTML, tüm görsellerde `alt`, klavye ile gezinme, "İçeriğe geç" linki.
- `prefers-reduced-motion` desteklenir (animasyonlar kapatılır).
- Her sayfada `metadata` (title/description), Open Graph + Twitter card,
  `Organization` JSON-LD, `hreflang` (tr/en), `sitemap.xml`, `robots.txt`.

## Tasarım Notları (Profesyonel Varsayımlar)

- **Route slug'ları her iki dilde ortaktır** (`/tr/services`, `/en/services`).
  Bu, dil değiştiricinin aynı sayfada kalmasını ve `generateStaticParams`'ı
  basitleştirir; SEO için `hreflang` alternatifleri eklenmiştir.
- **Apple touch icon** olarak SVG favicon kullanılır. İsterseniz 180×180 bir
  `public/apple-touch-icon.png` ekleyip `app/layout.tsx` içindeki `icons.apple`
  alanını güncelleyin.
- **Güven göstergeleri** kasıtlı olarak niteldir (uydurma istatistik yok).
