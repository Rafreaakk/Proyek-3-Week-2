'use strict';

// 1. Tangkap Elemen DOM
const tombolTema = document.querySelector('#btn-tema');
const tombolDetail = document.querySelector('#btn-detail');
const panelDetail = document.querySelector('#panel-detail');

const namaProfil = document.querySelector('#nama-profil');
const bioProfil = document.querySelector('#bio-profil');

const statusElement = document.querySelector('#status');
const tombolCobaLagi = document.querySelector('#btn-coba-lagi');

const formSkill = document.querySelector('#form-skill');
const inputSkill = document.querySelector('#input-skill');
const pesanError = document.querySelector('#error-skill');
const daftarSkillElement = document.querySelector('#daftar-skill');

// 2. Variabel State Global
let daftarSkill = [];

// 3. Fungsi Render Keterampilan ke Layar
function renderKeterampilan(data) {
  daftarSkillElement.replaceChildren(); // Cegah duplikasi saat render ulang

  if (data.length === 0) {
    statusElement.textContent = 'Belum ada keterampilan.';
    statusElement.style.color = '#dc2626'; // Merah
    return;
  }

  statusElement.textContent = 'Data keterampilan berhasil dimuat.';
  statusElement.style.color = '#059669'; // Hijau

  data.forEach((skill) => {
    const item = document.createElement('article');
    item.className = 'skill-item';

    const nama = document.createElement('span');
    nama.textContent = skill.nama;

    const tombolHapus = document.createElement('button');
    tombolHapus.type = 'button';
    tombolHapus.textContent = 'Hapus';
    
    // Logika hapus data
    tombolHapus.addEventListener('click', () => {
      daftarSkill = daftarSkill.filter((s) => s.id !== skill.id);
      renderKeterampilan(daftarSkill);
    });

    item.append(nama, tombolHapus);
    daftarSkillElement.append(item);
  });
}

// 4. Fungsi Fetch API Asynchronous
async function muatProfil() {
  statusElement.textContent = 'Memuat profil...';
  statusElement.style.color = '#2563eb'; // Biru
  tombolCobaLagi.classList.add('hidden');

  try {
    const response = await fetch('data/profile.json');
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const profil = await response.json();
    
    namaProfil.textContent = profil.nama;
    bioProfil.textContent = profil.bio;
    
    daftarSkill = profil.keterampilan;
    renderKeterampilan(daftarSkill);

  } catch (error) {
    console.error('Error fetching data:', error);
    statusElement.textContent = 'Gagal memuat profil.';
    statusElement.style.color = '#dc2626';
    tombolCobaLagi.classList.remove('hidden');
  }
}

tombolDetail.addEventListener('click', () => {
  const isExpanded = tombolDetail.getAttribute('aria-expanded') === 'true';
  tombolDetail.setAttribute('aria-expanded', String(!isExpanded));
  panelDetail.classList.toggle('hidden');
});


tombolTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

formSkill.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputBaru = inputSkill.value.trim();

  if (inputBaru.length === 0) {
    pesanError.textContent = 'Keterampilan tidak boleh kosong!';
    inputSkill.setAttribute('aria-invalid', 'true');
    inputSkill.focus();
    return;
  }

  pesanError.textContent = '';
  inputSkill.setAttribute('aria-invalid', 'false');
  
  daftarSkill.push({ id: Date.now(), nama: inputBaru });
  formSkill.reset();
  renderKeterampilan(daftarSkill);
});


tombolCobaLagi.addEventListener('click', muatProfil);

muatProfil();