'use strict';

const status = document.querySelector('#status');
const daftar = document.querySelector('#daftar-materi');
const tombolMuat = document.querySelector('#muat');
const tombolCobaLagi = document.querySelector('#coba-lagi');

function aturState(state, pesan) {
  status.dataset.state = state;
  status.textContent = pesan;
  tombolCobaLagi.hidden = state !== 'error';
}

async function ambilMateri() {
  // TODO: fetch data/materi.json.
  // TODO: jika response.ok false, throw Error yang informatif.
  // TODO: return hasil response.json().
  const response = await fetch('data/materi.json');

  if(!response.ok) {
    throw new Error('HTTP Error: ${response.status}');
  }

  return response.json();
}

function renderMateri(data) {
  // TODO: kosongkan daftar dan buat kartu dengan createElement.
  daftar.replaceChildren();

  data.forEach(item => {
    const article = document.createElement('article');
    article.classList.add('kartu');

    const h2 = document.createElement('h2');
    h2.textContent = item.judul;

    const p = document.createElement('p');
    p.textContent = `Durasi: ${item.durasi} menit`;
    
    article.append(h2, p);
    daftar.append(article);
  });
}

async function muatData() {
  aturState('loading', 'Memuat data...');
  tombolMuat.disabled = true;
  daftar.replaceChildren();

  try {
    // TODO: await ambilMateri().
    // TODO: bedakan array kosong dan data berisi.
    const data = await ambilMateri();

    if (data.length === 0) {
      aturState('empty', 'Data materi kosong.');
    } else {
      renderMateri(data);
      aturState('succes', 'Berhasil memuat materi.');
    }

  } catch (error) {
    console.error(error);
    aturState('error', 'Gagal: ${error.message}');
    // TODO: tampilkan state error dan pesan yang dapat dipahami.
  } finally {
    // TODO: aktifkan kembali tombol Muat data.
    tombolMuat.disabled = false;
  }
}

tombolMuat.addEventListener('click', muatData);
tombolCobaLagi.addEventListener('click', muatData);