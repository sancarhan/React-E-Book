# eBookReact (React + Vite)

Bu proje, e-kitap (book) okuma/oluşturma akışlarına yönelik bir **React** uygulamasıdır. Uygulama; **landing**, **login**, **signup**, korumalı rotalar, **dashboard**, **editor** ve **kitap görüntüleme** ekranları gibi parçalarla genişletilmeye uygundur.

> Not: README; mevcut kod iskeletine (placeholder sayfalar/bileşenler) göre “uygulanabilir” ve “genişletilebilir” olacak şekilde kapsamlı hazırlanmıştır. Backend ile ilgili uç noktalar/kimlik doğrulama detayları, projedeki `utils` dosyaları üzerinden ileride netleştirilecek şekilde dokümante edilmiştir.

---

## İçindekiler
- [Öne Çıkanlar](#önek-çıkanlar)
- [Teknolojiler](#teknolojiler)
- [Özellikler ve Uygulama Akışı](#özellikler-ve-uygulama-akışı)
- [Ön Koşullar](#ön-koşullar)
- [Kurulum](#kurulum)
- [Geliştirme Sunucusu (Dev)](#geliştirme-sunucusu-dev)
- [Build & Preview](#build--preview)
- [Lint](#lint)
- [Proje Yapısı](#proje-yapısı)
- [API/Backend Entegrasyonu](#apibackend-entegrasyonu)
- [Sık Sorulanlar (SSS)](#sık-sorulanlar-sss)

---

## Öne Çıkanlar
- **React 19** + **React Router** ile sayfa/route tabanlı mimari
- **Vite** ile hızlı geliştirme ve production build
- **TailwindCSS** (Utility-first) ile UI geliştirme için temel altyapı
- **ESLint** ile kod kalitesi

---

## Teknolojiler
- **React**: v19.2.x
- **React Router DOM**: v7.x
- **Vite**: v8.x
- **TailwindCSS**: v4.x (paket: `tailwindcss` ve `@tailwindcss/vite`)
- **ESLint**: v10.x

---

## Özellikler ve Uygulama Akışı
Uygulama router üzerinden aşağıdaki rotaları içerir:

- **`/`** → `LandingPage`
- **`/login`** → `LoginPage`
- **`/signup`** → `SignupPage`

Ayrıca projede iskelet olarak şu modüller yer alır (bileşen sayfaları/klasörler):

### 1) Auth (Kimlik Doğrulama) Katmanı
- `src/components/auth/ProtectedRoute.jsx`
  - Korunan sayfalar için “oturum var mı?” kontrolünü yapmak üzere tasarlanmıştır.

- `src/context/AuthContext.jsx`
  - Uygulama genelinde kullanıcı oturum bilgisini (token, user bilgisi vb.) yönetmek için hazırlanmıştır.

> Geliştirme önerisi: `AuthContext` içinde:
> - `user`, `token`
> - `login()`, `logout()` fonksiyonları
> - otomatik token ekleme / session kontrolü
> gibi fonksiyonlar netleştirilebilir.

### 2) Landing / Login / Signup
- `src/pages/LandingPage.jsx`
- `src/pages/LoginPage.jsx`
- `src/pages/SignupPage.jsx`

Bu sayfalar; gerçek form doğrulama, backend API çağrıları ve yönlendirme davranışları eklenerek tamamlanabilir.

### 3) Dashboard
- `src/pages/DashboardPage.jsx`
- `src/components/layout/DashboardLayout.jsx`
- `src/components/layout/Navbar.jsx`
- `src/components/layout/ProfileDropdown.jsx`

Dashboard; kullanıcıya ait kitaplar, son oluşturulan içerikler veya yönetim ekranları için genişletilebilir.

### 4) Kitap Görüntüleme
- `src/pages/ViewBookPage.jsx`
- `src/components/view/ViewBooks.jsx`
- `src/components/view/ViewChapterSidebar.jsx`
- `src/components/cards/BookCard.jsx`

Bu alan; seçilen kitabın içeriğini ve bölüm (chapter) listesini görüntülemeye yönelik tasarlanmıştır.

### 5) Editör
- `src/pages/EditorPage.jsx`

Editor; e-kitap içeriğini oluşturma/düzenleme akışları için genişletilir.

---

## Ön Koşullar
- **Node.js** (genellikle 18+ tavsiye edilir)
- **npm** (veya alternatif paket yöneticisi)

---

## Kurulum
```bash
cd frontend/eBookReact
npm install
```

---

## Geliştirme Sunucusu (Dev)
```bash
npm run dev
```

- Varsayılan olarak Vite geliştirme sunucusu başlatılır.
- Tarayıcıdan genellikle `http://localhost:5173` adresinden erişilir.

---

## Build & Preview
### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

- Production build’inizi lokalde test etmek için kullanılır.

---

## Lint
```bash
npm run lint
```

---

## Proje Yapısı
Klasör mantığı (mevcut repo yapısına göre):

- `src/pages/`
  - Uygulama sayfaları: `LandingPage`, `LoginPage`, `SignupPage`, `DashboardPage`, `EditorPage`, `ViewBookPage`, `ProfilePage`

- `src/components/`
  - `auth/`: `ProtectedRoute` gibi kimlik doğrulama destekleri
  - `layout/`: genel sayfa yerleşimleri (navbar, dashboard layout vb.)
  - `cards/`: `BookCard`
  - `modals/`: `CreateBookModal`
  - `ui/`: ortak UI bileşenleri (`Button`, `InputField`, `Modal`, `SelectField`, `TextareaField`)
  - `view/`: kitap görüntüleme bileşenleri (`ViewBooks`, `ViewChapterSidebar`)

- `src/context/`
  - `AuthContext.jsx`: kullanıcı/oturum durumu yönetimi için

- `src/utils/`
  - `apiPaths.js`: backend endpoint path’leri
  - `axiosInstance.js`: axios için ortak instance (baseURL, interceptors vb.)
  - `data.js`, `helper.js`: yardımcı fonksiyonlar ve/veya demo veri

---

## API/Backend Entegrasyonu
Bu uygulama; backend ile haberleşmek için yardımcı dosyalar içeriyor:

- `src/utils/apiPaths.js`
- `src/utils/axiosInstance.js`

### Tipik entegrasyon yaklaşımı
1. `axiosInstance.js` içine backend base URL tanımlanır.
2. `apiPaths.js` içine endpoint’ler (örn. `/auth/login`, `/books`, `/chapters`) eklenir.
3. Login/Signup sayfalarında form submit ile ilgili endpoint çağrılır.
4. Token alınır ve `AuthContext` veya axios interceptor üzerinden kullanılır.
5. `ProtectedRoute` içinde oturum kontrolü yapılır.

> İpucu: Ortak bir token ekleme sistemi için axios interceptor kullanmak kod tekrarını azaltır.

---

## Sık Sorulanlar (SSS)
### 1) Neden mevcut sayfalar `div` içinde sadece metin dönüyor?
Bu repo şu an UI iskeleti/altyapı doğrulaması gibi çalışır durumda görünüyor. Gerçek işlevler (formlar, API çağrıları, state yönetimi) ilgili sayfa/bileşenlere eklendikçe README’nin “Akışlar” bölümleri daha da netleşir.

### 2) Backend’i nasıl bağlamalıyım?
- `src/utils/axiosInstance.js` ve `src/utils/apiPaths.js` üzerinden backend endpoint’lerini tanımlayın.
- Ardından `LoginPage`, `SignupPage`, `DashboardPage`, `EditorPage` gibi sayfalarda ilgili çağrıları entegre edin.

---

## Lisans
Bu proje için bir lisans dosyası eklenmemişse, varsayılan olarak tüm haklar saklı kabul edilebilir. (İsterseniz `LICENSE` dosyası ekleyebilirsiniz.)


