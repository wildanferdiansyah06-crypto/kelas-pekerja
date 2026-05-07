# Panduan Setup Proyek - Kelas Pekerja

## Dependensi yang Diperlukan

### 1. Node.js & npm
Proyek Anda membutuhkan Node.js (versi 18 atau lebih tinggi) dan npm.

#### Untuk sistem berbasis Ubuntu/Debian:
```bash
# Update indeks paket
sudo apt update

# Install Node.js dan npm
sudo apt install nodejs npm

# Atau install Node.js 18+ menggunakan repository NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Untuk sistem berbasis Fedora/RHEL:
```bash
# Install Node.js dan npm
sudo dnf install nodejs npm

# Atau menggunakan NodeSource
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install -y nodejs
```

#### Untuk Arch Linux:
```bash
sudo pacman -S nodejs npm
```

### 2. Git
```bash
# Ubuntu/Debian
sudo apt install git

# Fedora/RHEL
sudo dnf install git

# Arch Linux
sudo pacman -S git
```

### 3. Alat Tambahan
```bash
# Ubuntu/Debian
sudo apt install curl wget build-essential

# Fedora/RHEL
sudo dnf install curl wget gcc gcc-c++ make

# Arch Linux
sudo pacman -S curl wget base-devel
```

## Langkah Setup Proyek

### 1. Verifikasi Instalasi
```bash
node --version  # Harusnya 18.x atau lebih tinggi
npm --version   # Harusnya 9.x atau lebih tinggi
git --version
```

### 2. Install Dependensi Proyek
```bash
cd /home/iamwildan/Documents/kelas-pekerja
npm install
```

### 3. Setup Environment
```bash
# Copy template environment
cp .env.example .env

# Edit file .env dengan konfigurasi Anda
nano .env  # atau gunakan editor pilihan Anda
```

### 4. Test Proses Build
```bash
npm run build
```

### 5. Test Server Development
```bash
npm run dev
```

### 6. Konfigurasi Git (jika diperlukan)
```bash
git config --global user.name "Nama Anda"
git config --global user.email "email@contoh.com"
```

## Dependensi Spesifik Proyek

Proyek Anda mencakup:
- **Next.js 15** - Framework React
- **React 18** - Library UI
- **TypeScript** - Type safety
- **TailwindCSS** - Framework CSS
- **Sanity** - Headless CMS
- **Supabase** - Layanan backend
- **NextAuth** - Autentikasi
- **Playwright** - Testing E2E
- **Jest** - Unit testing

## Masalah Umum & Solusi

### Masalah: Permission denied
```bash
# Perbaiki permission npm
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Masalah: Versi Node.js terlalu lama
```bash
# Install n (Node version manager)
sudo npm install -g n
sudo n stable
```

### Masalah: Git belum dikonfigurasi
```bash
git config --global user.name "Nama Anda"
git config --global user.email "email@contoh.com"
```

### Masalah: Build gagal karena dependensi hilang
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Testing Setelah Setup

### 1. Test Build
```bash
npm run build
```

### 2. Test Development
```bash
npm run dev
```

### 3. Jalankan Tests
```bash
npm test
npm run test:e2e
```

### 4. Test Git Push
```bash
git status
git add .
git commit -m "Test commit setelah migrasi distro"
git push origin main
```

## Perintah Troubleshooting

### Cek info sistem
```bash
uname -a
cat /etc/os-release
```

### Cek versi yang terinstall
```bash
node --version
npm --version
git --version
```

### Cek konfigurasi npm
```bash
npm config list
```

### Cek dependensi proyek
```bash
npm ls --depth=0
```

## Langkah Selanjutnya

1. Install dependensi yang diperlukan sesuai distro Anda
2. Verifikasi instalasi
3. Setup environment variables Anda
4. Test proses build
5. Test fungsi git
6. Jalankan server development

Jika Anda mengalami masalah selama setup, silakan periksa pesan error dan rujuk ke bagian troubleshooting di atas.
