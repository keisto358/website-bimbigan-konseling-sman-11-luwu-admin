// Fungsi untuk halaman form siswa
function halamanSiswa() {
    const form = document.getElementById('konsultasiForm');
    const pesan = document.getElementById('pesan');

    if (!form) return; // Jika form tidak ada, hentikan

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nama = document.getElementById('nama').value;
        const kelas = document.getElementById('kelas').value;
        const masalah = document.getElementById('masalah').value;

        let dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];

        dataSiswa.push({ nama, kelas, masalah });

        localStorage.setItem('dataSiswa', JSON.stringify(dataSiswa));

        form.reset();

        pesan.textContent = "Konsultasi berhasil dikirim!";
        pesan.style.color = "green";

        setTimeout(() => { pesan.textContent = ""; }, 3000);
    });
}

// Fungsi untuk halaman admin
function halamanAdmin() {
    const tabelBody = document.querySelector('#tabelSiswa tbody');
    const hapusBtn = document.getElementById('hapusData');

    if (!tabelBody) return; // Jika tabel tidak ada, hentikan

    function tampilkanData() {
        tabelBody.innerHTML = '';
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];

        if(dataSiswa.length === 0){
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="4" style="text-align:center;">Belum ada data siswa</td>`;
            tabelBody.appendChild(row);
        } else {
            dataSiswa.forEach((siswa, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${siswa.nama}</td>
                    <td>${siswa.kelas}</td>
                    <td>${siswa.masalah}</td>
                `;
                tabelBody.appendChild(row);
            });
        }
    }

    tampilkanData();

    hapusBtn.addEventListener('click', () => {
        if(confirm("Apakah yakin ingin menghapus semua data siswa?")) {
            localStorage.removeItem('dataSiswa');
            tampilkanData();
        }
    });
}

// Pengecekan halaman
document.addEventListener('DOMContentLoaded', () => {
    halamanSiswa();
    halamanAdmin();
});
