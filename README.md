# Hudayi Yurtdışı Muhasebe Uygulaması

Electron.js ile geliştirilmiş, çok platformlu bir muhasebe uygulaması.

## Özellikler

- Çoklu platform desteği (macOS ve Windows)
- Gerçek zamanlı döviz kuru hesaplamaları
- Gelir ve gider takibi
- Kullanıcı rolleri (Admin ve Standart kullanıcı)
- Detaylı raporlama ve grafikler
- Platform özel özellikler (macOS menü çubuğu, Windows sistem tepsisi)

## Gereksinimler

- Node.js (>= 14.0.0)
- npm veya yarn

## Kurulum

1. Projeyi klonlayın:
\`\`\`bash
git clone https://github.com/yourusername/hudayi-yurtdisi.git
cd hudayi-yurtdisi
\`\`\`

2. Bağımlılıkları yükleyin:
\`\`\`bash
npm install
# veya
yarn install
\`\`\`

3. Geliştirme modunda çalıştırın:
\`\`\`bash
npm run dev
# veya
yarn dev
\`\`\`

4. Uygulamayı paketleyin:
\`\`\`bash
npm run build
# veya
yarn build
\`\`\`

## Kullanım

### Demo Hesapları

- Admin: admin/admin
- Kullanıcı: user/user

### Özellikler

1. Dashboard
   - Gelir/gider özeti
   - Döviz kurları
   - Son işlemler

2. İşlemler
   - Yeni işlem ekleme
   - İşlem geçmişi görüntüleme
   - İşlem düzenleme/silme

3. Raporlar
   - Dönemsel raporlar
   - Grafik görünümleri
   - Döviz bazlı raporlar

4. Ayarlar (Sadece Admin)
   - Kullanıcı yönetimi
   - Sistem ayarları
   - Yedekleme/geri yükleme

## Geliştirme

### Proje Yapısı

\`\`\`
hudayi-yurtdisi/
├── src/
│   ├── components/     # Yeniden kullanılabilir bileşenler
│   ├── pages/         # Sayfa bileşenleri
│   ├── utils/         # Yardımcı fonksiyonlar
│   ├── services/      # API servisleri
│   └── styles/        # CSS dosyaları
├── assets/           # Statik dosyalar
├── dist/            # Derlenen dosyalar
└── public/          # Statik web dosyaları
\`\`\`

### Teknolojiler

- Electron.js
- React
- TailwindCSS
- Chart.js
- SQLite (Yerel veritabanı)
- Electron Store (Ayarlar için)

## Lisans

MIT

## İletişim

- Website: [your-website.com](https://your-website.com)
- Email: your.email@example.com
