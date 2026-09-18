'use strict';

const peserta = [
  { id: 1, nama: 'Alya', prodi: 'Teknik Informatika' },
  { id: 2, nama: 'Bima', prodi: 'Sistem Informasi' },
];

const form = document.querySelector('#form-peserta');
const namaInput = document.querySelector('#nama');
const prodiInput = document.querySelector('#prodi');
const filterInput = document.querySelector('#filter-prodi');
const daftar = document.querySelector('#daftar-peserta');
const status = document.querySelector('#status');
const errorNama = document.querySelector('#error-nama');
const errorProdi = document.querySelector('#error-prodi');

function validasiPeserta(calon) {
  // TODO: return object { valid, errorNama, errorProdi }.
  const namaBersih = calon.nama.trim();
  let errorNama = '';
  let errorProdi = '';

  if (namaBersih.length < 3) {
    errorNama = 'Nama minimal 3 karakter.'
  }
  if(!calon.prodi) {
    errorProdi = 'Program studi wajib dipilih!'
  }

  return {
    valid: !errorNama && !errorProdi,
    errorNama,
    errorProdi
  };
}

function buatKartuPeserta(item) {
  // TODO: buat article, h2, dan p dengan createElement.
  // Isi teks dengan textContent, lalu return article.
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  const p = document.createElement('p');

  article.classList.add('kartu');
  h2.textContent = item.nama;
  p.textContent = item.prodi;

  article.append(h2, p);
  return article;
}

function renderPeserta(data) {
  // TODO: kosongkan daftar, tangani data kosong, lalu append kartu.
  daftar.replaceChildren();

  if (data.length === 0) {
    status.textContent = 'Tidak ada peserta';
    return;
  }

  status.textContent = '';
  data.forEach(item => { 
    daftar.append(buatKartuPeserta(item));
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const calon = {
    nama: namaInput.value,
    prodi: prodiInput.value
  };

  const hasilValidasi = validasiPeserta(calon);

  // Atur pesan error dan aria-invalid sesuai hasil validasi
  errorNama.textContent = hasilValidasi.errorNama;
  namaInput.setAttribute('aria-invalid', Boolean(hasilValidasi.errorNama));

  errorProdi.textContent = hasilValidasi.errorProdi;
  prodiInput.setAttribute('aria-invalid', Boolean(hasilValidasi.errorProdi));

  // Jika lolos validasi, masukkan ke array
  if (hasilValidasi.valid) {
    peserta.push({
      id: Date.now(), // Menggunakan Date.now() untuk ID unik
      nama: calon.nama.trim(),
      prodi: calon.prodi
    });
    form.reset();
    renderPeserta(peserta);
  }
});

filterInput.addEventListener('change', (event) => {
  const pilihan = event.target.value;
  
  if (pilihan === 'semua') {
    renderPeserta(peserta);
  } else {
    // Array asli tidak ditimpa, kita buat array saringan baru
    const hasilFilter = peserta.filter(p => p.prodi === pilihan);
    renderPeserta(hasilFilter);
  }
});

// Panggilan pertama saat halaman dimuat
renderPeserta(peserta);