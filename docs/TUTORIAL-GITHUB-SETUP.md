# Tutorial Setup GitHub Actions (Langkah Demi Langkah)

Tutorial ini akan membantu Anda setup CI/CD untuk project `kelas-pekerja` dari awal sampai selesai.

---

## Langkah 0: Revoke Token Lama (PENTING)

Jika Anda sudah pernah share token di chat atau tempat lain:

1. Buka [github.com/settings/tokens](https://github.com/settings/tokens)
2. Cari token yang Anda share tadi (yang dimulai `ghp_foV...`)
3. Klik **Delete** untuk revoke token tersebut
4. Token lama sekarang sudah tidak bisa digunakan

---

## Langkah 1: Pilih Platform Deployment

Pilih salah satu:
- **Vercel** (Rekomendasi untuk Next.js)
- **Netlify** (Alternatif)
- **Keduanya** (Opsional, tapi tidak disarankan)

Untuk tutorial ini, saya akan gunakan **Vercel** sebagai contoh.

---

## Langkah 2: Setup Akun Vercel

### 2.1 Buat Akun Vercel
1. Buka [vercel.com](https://vercel.com)
2. Klik **Sign Up**
3. Pilih **Continue with GitHub**
4. Authorize Vercel untuk akses repository Anda

### 2.2 Import Project ke Vercel
1. Setelah login, klik **Add New** → **Project**
2. Cari repository `wildanferdiansyah06-crypto/kelas-pekerja`
3. Klik **Import**
4. Vercel akan otomatis mendeteksi Next.js
5. Klik **Deploy**

Tunggu beberapa detik, project akan terdeploy. URL akan seperti: `https://kelas-pekerja-xxx.vercel.app`

### 2.3 Dapatkan Vercel Project ID
1. Buka project di Vercel dashboard
2. Klik **Settings** tab
3. Scroll ke bawah, cari **Project ID**
4. Copy ID tersebut (contoh: `prj_abc123xyz`)

---

## Langkah 3: Buat Vercel Token

### 3.1 Buat Personal Access Token di Vercel
1. Di Vercel dashboard, klik avatar Anda di pojok kanan atas
2. Klik **Settings**
3. Di menu kiri, klik **Tokens**
4. Klik **Create Token**
5. Beri nama: `GitHub Actions CI/CD`
6. Scope: Pilih **Full Account** (atau sesuaikan kebutuhan)
7. Klik **Create**
8. **Copy token yang muncul** (hanya muncul sekali!)

Simpan token ini di tempat aman sementara.

### 3.2 Dapatkan Vercel Org ID
1. Di Vercel dashboard, klik **Settings** (untuk akun, bukan project)
2. Di menu kiri, klik **General**
3. Cari **Your Team ID** atau **Organization ID**
4. Copy ID tersebut

---

## Langkah 4: Setup Secrets di GitHub

### 4.1 Buka Repository Settings
1. Buka repository GitHub: `wildanferdiansyah06-crypto/kelas-pekerja`
2. Klik tab **Settings**
3. Di menu kiri, klik **Secrets and variables** → **Actions**
4. Klik tombol **New repository secret**

### 4.2 Tambah Secret: VERCEL_TOKEN
1. **Name**: `VERCEL_TOKEN`
2. **Value**: Paste token Vercel yang Anda buat di Langkah 3.1
3. Klik **Add secret**

### 4.3 Tambah Secret: VERCEL_ORG_ID
1. Klik **New repository secret** lagi
2. **Name**: `VERCEL_ORG_ID`
3. **Value**: Paste Org ID dari Langkah 3.2
4. Klik **Add secret**

### 4.4 Tambah Secret: VERCEL_PROJECT_ID
1. Klik **New repository secret** lagi
2. **Name**: `VERCEL_PROJECT_ID`
3. **Value**: Paste Project ID dari Langkah 2.3
4. Klik **Add secret**

Sekarang Anda punya 3 secrets di GitHub:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

---

## Langkah 5: Push Workflow Files ke GitHub

Pastikan file workflow sudah di-commit dan push:

```bash
git add .github/workflows/
git commit -m "Add GitHub Actions workflows for CI/CD"
git push origin main
```

Jika file sudah ada di repository, Anda bisa skip langkah ini.

---

## Langkah 6: Test CI Workflow

### 6.1 Push ke Branch Main
CI workflow akan berjalan otomatis saat push ke branch `main`.

```bash
git push origin main
```

### 6.2 Cek Status di GitHub
1. Buka repository GitHub
2. Klik tab **Actions**
3. Anda akan melihat workflow yang sedang berjalan
4. Klik workflow untuk melihat detail

### 6.3 Hasil yang Diharapkan
Workflow CI akan menjalankan:
- ✅ Lint (ESLint)
- ✅ Type Check (TypeScript)
- ✅ Build (Next.js build)

Jika semua hijau (✅), berarti CI berhasil!

---

## Langkah 7: Test Deployment Workflow

### 7.1 Trigger Deployment
Deployment akan berjalan otomatis setelah CI berhasil.

Atau trigger manual:
1. Buka tab **Actions** di GitHub
2. Pilih workflow **Deploy to Vercel**
3. Klik **Run workflow**
4. Pilih branch: `main`
5. Klik **Run workflow**

### 7.2 Cek Status
Tunggu beberapa menit, lalu cek:
1. Tab **Actions** di GitHub
2. Status workflow harus ✅ (hijau)
3. Buka Vercel dashboard, project harus terdeploy

---

## Troubleshooting

### Error: "Resource not accessible by integration"
**Penyebab**: Token Vercel tidak punya akses yang cukup
**Solusi**: Buat token baru dengan scope "Full Account"

### Error: "Project not found"
**Penyebab**: VERCEL_PROJECT_ID salah
**Solusi**: Cek ulang Project ID di Vercel dashboard

### Error: Build gagal di GitHub Actions
**Penyebab**: Ada error di kode (linting, type error, atau build error)
**Solusi**: 
1. Cek log di Actions tab
2. Fix error lokal dengan `npm run lint` atau `npm run build`
3. Push ulang

### Workflow tidak muncul di Actions tab
**Penyebab**: File workflow belum di-commit/push
**Solusi**: Pastikan file `.github/workflows/*.yml` sudah di-commit dan push

---

## Checklist Selesai

- [ ] Token lama di-revoke
- [ ] Akun Vercel dibuat
- [ ] Project di-import ke Vercel
- [ ] Vercel Token dibuat
- [ ] Vercel Org ID didapatkan
- [ ] Vercel Project ID didapatkan
- [ ] Secrets ditambah di GitHub (3 secrets)
- [ ] Workflow files di-commit dan push
- [ ] CI workflow berhasil (✅)
- [ ] Deployment workflow berhasil (✅)

---

## Setelah Setup Selesai

Sekarang setiap kali Anda push ke branch `main`:
1. CI akan berjalan otomatis (lint, type-check, build)
2. Jika CI berhasil, deployment ke Vercel akan berjalan otomatis
3. Website akan terupdate tanpa perlu deploy manual

---

## Alternatif: Deploy ke Netlify

Jika ingin menggunakan Netlify bukan Vercel:

1. Buat akun di [netlify.com](https://netlify.com)
2. Import repository ke Netlify
3. Dapatkan **Netlify Auth Token**:
   - User settings → Applications → Personal access tokens → New access token
4. Dapatkan **Netlify Site ID**:
   - Site settings → General → Site details → Site ID
5. Tambah secrets di GitHub:
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_SITE_ID`
6. Disable workflow Vercel (rename jadi `deploy-vercel.yml.disabled`)
7. Enable workflow Netlify (rename jadi `deploy-netlify.yml`)

---

## Butuh Bantuan?

Jika ada error atau stuck di langkah tertentu:
1. Cek log di GitHub Actions tab
2. Share error message untuk bantuan lebih lanjut
3. Pastikan semua secrets sudah ditambah dengan benar
