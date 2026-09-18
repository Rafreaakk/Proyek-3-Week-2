'use strict';

const dataPortofolio = [
  { id: 1, judul: 'Company Profile', kategori: 'web', deskripsi: 'Website responsif untuk perusahaan.' },
  { id: 2, judul: 'Logo UMKM', kategori: 'desain', deskripsi: 'Desain identitas visual.' },
  { id: 3, judul: 'Sistem Kasir', kategori: 'web', deskripsi: 'Aplikasi pencatatan stok dan kasir.' }
];

const btnMenu = document.querySelector('#btn-menu');
const navLinks = document.querySelector('#nav-links');
const btnTema = document.querySelector('#btn-tema');
const containerKarya = document.querySelector('#portofolio-container');
const filterKategori = document.querySelector('#filter-kategori');
const statusKarya = document.querySelector('#status-karya');
const faqBtns = document.querySelectorAll('.faq-btn');
const formKontak = document.querySelector('#form-kontak');
const btnTop = document.querySelector('#btn-top');

function renderKarya(data) {
  containerKarya.replaceChildren(); // Mencegah duplikasi saat dirender ulang
  
  if (data.length === 0) {
    statusKarya.textContent = 'Tidak ada layanan pada kategori ini.';
    return;
  }
  statusKarya.textContent = '';
  
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    
    const judul = document.createElement('h3');
    judul.textContent = item.judul;
    
    const teks = document.createElement('p');
    teks.textContent = item.deskripsi;
    
    card.append(judul, teks);
    containerKarya.append(card);
  });
}

filterKategori.addEventListener('change', (e) => {
  const kategori = e.target.value;
  if (kategori === 'semua') {
    renderKarya(dataPortofolio);
  } else {
    const terfilter = dataPortofolio.filter(item => item.kategori === kategori);
    renderKarya(terfilter);
  }
});

btnMenu.addEventListener('click', () => {
  const isExpanded = btnMenu.getAttribute('aria-expanded') === 'true';
  btnMenu.setAttribute('aria-expanded', !isExpanded);
  navLinks.classList.toggle('hidden');
});


btnTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

faqBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    
    document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.add('hidden'));
    document.querySelectorAll('.faq-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
    
    if (!isExpanded) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.remove('hidden');
    }
  });
});


formKontak.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputNama = document.querySelector('#nama');
  const inputPesan = document.querySelector('#pesan');
  const errorNama = document.querySelector('#error-nama');
  const errorPesan = document.querySelector('#error-pesan');
  const statusForm = document.querySelector('#status-form');
  
  let isValid = true;

  if (inputNama.value.trim().length < 3) {
    errorNama.textContent = 'Nama minimal 3 karakter.';
    inputNama.setAttribute('aria-invalid', 'true');
    isValid = false;
  } else {
    errorNama.textContent = '';
    inputNama.setAttribute('aria-invalid', 'false');
  }

  if (inputPesan.value.trim() === '') {
    errorPesan.textContent = 'Pesan wajib diisi.';
    inputPesan.setAttribute('aria-invalid', 'true');
    isValid = false;
  } else {
    errorPesan.textContent = '';
    inputPesan.setAttribute('aria-invalid', 'false');
  }

  if (isValid) {
    statusForm.textContent = 'Pesan berhasil dikirim!';
    statusForm.style.color = 'green';
    formKontak.reset();
  } else {
    statusForm.textContent = 'Periksa kembali isian Anda.';
    statusForm.style.color = 'red';
  }
});


btnTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

renderKarya(dataPortofolio);