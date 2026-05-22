# eBookReact (React + Vite) — Kapsamlı Türkçe Dokümantasyon

> Bu proje, e-kitap (kitap/bölüm) okuma ve içerik üretme odaklı çalışan bir **React + Vite** uygulamasıdır. Uygulama; **landing**, **login**, **signup**, korumalı sayfalar, **dashboard**, **editor** ve kitap görüntüleme gibi modüllere ayrılmıştır.
>
> Backend tarafı ise **Node.js (Express)** ve **MongoDB (Mongoose)** üzerinde kurgulanmıştır. Kimlik doğrulama (auth), veri modelleme (User/Book) ve dosya/dış içerik süreçleri için genişletilebilir bir temel sunar.

---

## İçindekiler
- [Genel Bakış](#genel-bakış)
- [Özellikler](#özellikler)
- [Teknolojiler](#teknolojiler)
- [Kullanılan Mimari Yaklaşımı](#kullanılan-mimari-yaklaşımı)
- [Proje Yapısı](#proje-yapısı)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Kurulum](#kurulum)
- [Çalıştırma](#çalıştırma)
  - [Frontend (Dev)](#frontend-dev)
  - [Frontend (Build/Preview)](#frontend-buildpreview)
  - [Backend (Dev)](#backend-dev)
- [API / Entegrasyon](#api--entegrasyon)
  - [Axios ortak ayarları](#axios-ortak-ayarları)
  - [Endpoint path mantığı](#endpoint-path-mantığı)
  - [Token / Authorization akışı](#token--authorization-akışı)
- [Kimlik Doğrulama Akışı (Önerilen)](#kimlik-doğrulama-akışı-önerilen)
- [Geliştirme İpuçları (Best Practices)](#geliştirme-ipuçları-best-practices)
- [Güvenlik Notları](#güvenlik-notları)
- [Sık Sorulanlar (SSS)](#sık-sorulanlar-sss)
- [Sorun Giderme](#sorun-giderme)

---

## Genel Bakış
Bu repo iki ana parçadan oluşur:
1. **frontend/eBookReact**: React tabanlı kullanıcı arayüzü.
2. **backend**: Express tabanlı API servisi (MongoDB ile veri erişimi).

Amaç:
- Kullanıcıların hesap oluşturup (signup) giriş yapabilmesi (login)
- Giriş yaptıktan sonra bazı sayfaların **korunması**
- Dashboard üzerinden kullanıcıya ait içerikleri yönetebilmesi
- Editor ile kitap/section içeriğini düzenleyebilmesi
- Kitap görüntüleme ekranlarında bölüm bazında içerikleri okuyabilmesi

> Not: Bu README, mevcut proje iskeletini (UI/route düzeni ve entegrasyon noktaları) baz alarak **kapsamlı** bir dokümantasyon sunar. Kodun tamamı değil, modüller için görünen/öngörülen akışlar üzerinden ilerlenir.

---

## Özellikler
- **React Router ile route tabanlı mimari**
- Landing / Login / Signup akışları
- **AuthContext** ve **ProtectedRoute** ile korumalı sayfalar için temel
- Dashboard ve layout bileşenleri
- Kitap listeleme + bölüm sidebar görünümü için bileşen organizasyonu
- Editor sayfası ile içerik oluşturma/düzenleme alanı
- Backend:
  - MongoDB bağlantısı (Mongoose)
  - User modeli (bcrypt ile şifreleme alanı)
  - Dosya/Static path için uploads dizini (server.js içinde)

---

## Teknolojiler
Frontend:
- **React**
- **Vite**
- **React Router DOM**
- **ESLint**
- (Pakette mevcutsa) **TailwindCSS**

Backend:
- **Node.js**
- **Express**
- **Mongoose** (MongoDB)
- **dotenv** (çevresel değişkenler)
- **cors**
- **bcryptjs**

---

## Kullanılan Mimari Yaklaşımı
### Frontend
- `src/pages/` altında sayfalar
- `src/components/` altında ortak bileşenler (UI, layout, kartlar, modals, view vb.)
- `src/context/` altında oturum ve kullanıcı verisi için global durum
- `src/utils/` altında yardımcı fonksiyonlar ve API çağrıları için yapı taşları

### Backend
- `server.js`: Express uygulaması + middleware + statik dosya servisleri + port
- `config/db.js`: MongoDB bağlantısı
- `models/`: Mongoose modelleri (örn. `User.js`)
- `routes/` ve `controller/`: Route bazlı uçtan uca iş akışı (entegrasyon noktaları)

---

## Proje Yapısı
Aşağıdaki yapı, repo klasör adlarını baz alarak açıklanmıştır.

### Frontend
Konum: `frontend/eBookReact/`

- `src/pages/`
  - `LandingPage.jsx`
  - `LoginPage.jsx`
  - `SignupPage.jsx`
  - `DashboardPage.jsx`
  - `EditorPage.jsx`
  - `ViewBookPage.jsx`
  - `ProfilePage.jsx`

- `src/components/layout/`
  - `DashboardLayout.jsx`
  - `Navbar.jsx`
  - `ProfileDropdown.jsx`

- `src/components/cards/`
  - `BookCard.jsx`

- `src/components/modals/`
  - `CreateBookModal.jsx`

- `src/components/ui/` (ortak UI bileşenleri)
  - `Button.jsx`, `InputField.jsx`, `Modal.jsx`, `SelectField.jsx`, `TextareaField.jsx`, vb.

- `src/components/view/`
  - `ViewBooks.jsx`
  - `ViewChapterSidebar.jsx`

- `src/components/auth/`
  - `ProtectedRoute.jsx`

- `src/context/`
  - `AuthContext.jsx`

- `src/utils/`
  - `apiPaths.js`
  - `axiosInstance.js`
  - `data.js`, `helper.js`

### Backend
Konum: `backend/`

- `server.js`
  - Express app oluşturma
  - CORS ayarları
  - JSON body parse
  - `uploads` statik servis
  - Port dinleme

- `config/db.js`
  - MongoDB bağlantısı

- `models/`
  - `User.js` (Mongoose şema + bcryptjs ile şifreleme için temel)

---

## Kurulum
Repo kökünde iki proje olduğu için iki ayrı kurulum gerekir.

### 1) Frontend Kurulumu
```bash
cd frontend/eBookReact
npm install
```

### 2) Backend Kurulumu
```bash
cd backend
npm install
```

---

## Çalıştırma

### Frontend (Dev)
`frontend/eBookReact` dizininde:
```bash
npm run dev
```

- Tarayıcıdan genellikle: `http://localhost:5173`

### Frontend (Build/Preview)
```bash
npm run build
npm run preview
```

### Backend (Dev)
`backend` dizininde:
```bash
node server.js
```

> Alternatif olarak `package.json` içinde tanımlı bir script varsa `npm run dev` kullanılabilir (mevcut repo scriptlerine göre).

---

## API / Entegrasyon
Frontend, backend ile `axios` üzerinden haberleşecek şekilde yapı taşlarını içeriyor:

- `src/utils/axiosInstance.js`: axios için ortak instance (baseURL, interceptors, header ekleme vb.)
- `src/utils/apiPaths.js`: endpoint path’leri için merkezi tanım

> Bu dosyalar üzerinden endpoint isimlerini bir kez yönetmek, kod tekrarını azaltır.

### Axios ortak ayarları
Tipik kullanım örüntüsü:
- `axiosInstance` içine `baseURL` tanımlanır.
- Her istek için gerekiyorsa `Authorization: Bearer <token>` header’ı eklenir.

### Endpoint path mantığı
`apiPaths.js` içinde örnek mantık:
- `auth.login`
- `auth.signup`
- `books.list`
- `books.create`

Bu sayede UI katmanı sadece “hangi path”i çağıracağını bilir, string tekrarları azalır.

### Token / Authorization akışı
Önerilen akış:
1. Kullanıcı login olur.
2. Backend token (ör. JWT) döner.
3. Frontend token’ı saklar (örn. localStorage veya cookie).
4. Sonraki isteklerde token `Authorization` header’a eklenir.
5. `ProtectedRoute` veya `axios interceptor` ile koruma sağlanır.

---

## Kimlik Doğrulama Akışı (Önerilen)
Bu repo zaten `AuthContext` ve `ProtectedRoute` iskeletine sahip görünüyor.

Önerilen akış:
1. **Signup**:
   - Kullanıcı ad, email, şifre girer
   - Backend User oluşturur
   - Şifre bcrypt ile hashlenir (backend modelde bcryptjs bulunuyor)
2. **Login**:
   - Email + şifre ile kullanıcı doğrulanır
   - Doğruysa token üretilir (JWT varsayılır)
3. **Koruma**:
   - `ProtectedRoute` kullanıcı oturumunu kontrol eder
   - Oturum yoksa `/login` sayfasına yönlendirir

---

## Geliştirme İpuçları (Best Practices)
- **Merkezi path yönetimi**: Endpoint stringlerini UI içinde “hardcode” etmeyin; `apiPaths.js` kullanın.
- **Tek axios instance**: Header/tokeni tek noktadan yönetin.
- **Durum yönetimi**: Auth durumunu `AuthContext` içinde toplayın.
- **Hata yönetimi**: Axios catch bloklarında kullanıcıya anlaşılır mesaj gösterin.
- **Environment değişkenleri**:
  - `VITE_*` ile frontend baseURL
  - `MONGO_URI`, `PORT` ile backend ayarları

---

## Güvenlik Notları
- Backend tarafında bcryptjs ile şifre hash’lenmelidir.
- Frontend’e API key koymayın.
- CORS ayarı production’da daraltılmalıdır (şu an geliştirilen projede `origin: "*"` görülebilir).
- Token saklama stratejinizi (localStorage/cookie) risklere göre belirleyin.

---

## Sık Sorulanlar (SSS)
### 1) Frontend ve backend’i aynı anda nasıl çalıştıracağım?
- Terminal 1: `frontend/eBookReact` → `npm run dev`
- Terminal 2: `backend` → `node server.js`

### 2) Frontend backend’i bulamazsa ne yapmalıyım?
- `axiosInstance.js` içindeki `baseURL` değerini kontrol edin.
- Backend çalışıyor mu ve doğru porta dinliyor mu kontrol edin.
- CORS hatası varsa backend’de origin ayarını gözden geçirin.

### 3) ProtectedRoute çalışmıyor gibi görünürse?
- `AuthContext` token/user durumunu doğru yönetiyor mu kontrol edin.
- Login sonrası token saklanıyor mu kontrol edin.

---

## Sorun Giderme
- **MongoDB bağlantı hatası**: `MONGO_URI` çevresel değişkeni doğru mu?
- **Port çakışması**: `PORT` değerini değiştirin.
- **CORS hatası**: `cors` origin ayarlarını düzenleyin.
- **Static uploads**: `backend/uploads` klasörü var mı? ve istenen dosya gerçekten orada mı?

---



