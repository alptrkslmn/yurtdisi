# Hüdayi Yurtdışı Web Uygulaması

Modern ve kullanıcı dostu bir arayüze sahip, React tabanlı web uygulaması.

## Özellikler

### Dinamik Tema Sistemi
- **Karanlık/Aydınlık Mod**
  - Otomatik mod geçişi
  - Animasyonlu geçiş efektleri
  - LocalStorage ile tercih saklama

- **Tema Renkleri**
  - 6 farklı tema rengi (Mavi, Yeşil, Kırmızı, Mor, Turuncu, Indigo)
  - Anlık renk değişimi
  - Tüm UI elementlerinde tutarlı renk kullanımı
  - LocalStorage ile renk tercihi saklama

### Modern UI/UX
- **Header Bileşeni**
  - Responsive tasarım
  - Temiz ve minimal arayüz
  - Tutarlı ikon boyutları ve aralıklar
  - Smooth hover efektleri
  - Bildirim sistemi entegrasyonu
  - Kullanıcı profil yönetimi

- **Dropdown Menüler**
  - Animasyonlu açılış/kapanış
  - Click-outside ile otomatik kapanma
  - Modern görünüm ve hissiyat
  - Responsive davranış

### Teknik Özellikler
- **State Yönetimi**
  - Context API kullanımı
  - Özel hooks (useTheme, useAuth, useSidebar)
  - Etkin state yönetimi

- **Performans Optimizasyonu**
  - Lazy loading
  - Memoization
  - Optimize edilmiş render döngüleri

- **Erişilebilirlik**
  - ARIA etiketleri
  - Klavye navigasyonu
  - Screen reader uyumluluğu

## Teknolojiler

- **Frontend Framework**
  - React 18
  - React Router v6

- **Styling**
  - Tailwind CSS
  - CSS Variables
  - PostCSS

- **State Management**
  - React Context API
  - Custom Hooks

- **Internationalization**
  - i18next
  - React-i18next

- **Icons & UI Components**
  - Heroicons
  - Custom Components

## Kurulum

1. Repoyu klonlayın:
\`\`\`bash
git clone [repo-url]
\`\`\`

2. Bağımlılıkları yükleyin:
\`\`\`bash
npm install
\`\`\`

3. Geliştirme sunucusunu başlatın:
\`\`\`bash
npm start
\`\`\`

## Proje Yapısı

\`\`\`
src/
├── components/
│   ├── layout/
│   │   ├── header/
│   │   ├── sidebar/
│   │   └── footer/
│   ├── common/
│   └── pages/
├── contexts/
│   ├── themeContext.jsx
│   ├── authContext.jsx
│   └── sidebarContext.jsx
├── styles/
│   ├── index.css
│   └── theme.css
├── hooks/
├── utils/
├── services/
└── App.jsx
\`\`\`

## Tema Sistemi

### Tema Renkleri
- **Mavi (Varsayılan)**
  - Primary: #3B82F6
  - Hover: #2563EB
  
- **Yeşil**
  - Primary: #22C55E
  - Hover: #16A34A

- **Kırmızı**
  - Primary: #EF4444
  - Hover: #DC2626

- **Mor**
  - Primary: #A855F7
  - Hover: #9333EA

- **Turuncu**
  - Primary: #F97316
  - Hover: #EA580C

- **Indigo**
  - Primary: #6366F1
  - Hover: #4F46E5

### Tema Değiştirme
\`\`\`javascript
// Tema rengi değiştirme
const { setThemeColor } = useTheme();
setThemeColor('blue');

// Karanlık/Aydınlık mod değiştirme
const { toggleDarkMode } = useTheme();
toggleDarkMode();
\`\`\`

## Güvenlik

- JWT tabanlı kimlik doğrulama
- Güvenli rota yönetimi
- XSS koruması
- CSRF koruması

## API Entegrasyonu

- RESTful API desteği
- Axios ile HTTP istekleri
- Error handling
- Loading states

## Responsive Tasarım

- Mobile-first yaklaşım
- Breakpoint sistemi
- Fluid typography
- Adaptive layouts

## Performance

- Code splitting
- Tree shaking
- Asset optimization
- Caching strategies

## Testing

- Jest test framework
- React Testing Library
- E2E tests with Cypress
- Unit & Integration tests

## Geliştirici Kılavuzu

### Yeni Tema Rengi Ekleme
1. \`themeContext.jsx\`'te \`THEME_COLORS\` dizisine yeni renk ekleyin
2. \`theme.css\`'te yeni renk için CSS değişkenlerini tanımlayın
3. \`tailwind.config.js\`'de renk paletini güncelleyin

### Yeni Bileşen Ekleme
1. İlgili klasörde bileşen dosyasını oluşturun
2. Tailwind class'larını kullanarak stillendirin
3. Tema sistemine uyumlu olduğundan emin olun
4. Gerekli prop-types ve JSDoc ekleyin

## Lisans

MIT License - Detaylar için LICENSE dosyasına bakın.
