/**
 * ========================================================
 * Expense Tracker App — main.js
 * ========================================================
 * Tulis seluruh kode JavaScript kamu di sini.
 */

// TODO [Basic] Buat variabel array untuk menyimpan semua data transaksi, contoh: let transactions = []

// TODO [Basic] Buat fungsi untuk menghasilkan ID unik secara otomatis, contoh: gunakan +new Date()

/**
 * ========================================================
 * Kriteria 1: Memanipulasi DOM untuk Form dan Daftar Transaksi
 * ========================================================
 */
// TODO [Basic] Ambil elemen kontainer incomeList dan expenseList dari DOM

/**
 * TODO [Basic]:
 * Buat fungsi untuk menampilkan (render) semua transaksi ke layar:
 *  - Kosongkan kontainer terlebih dahulu sebelum mengisi ulang
 *  - Gunakan perulangan, buat setiap elemen kartu dengan document.createElement()
 *  - Pastikan setiap elemen memiliki atribut data-testid yang sesuai (lihat panduan di rubrik)
 *  - Masukkan kartu ke kontainer yang tepat: income → incomeList, expense → expenseList
 */

// TODO [Basic] Tambahkan event listener 'submit' pada form, panggil e.preventDefault() di dalamnya

// TODO [Basic] Di dalam handler submit, ambil nilai input lalu tambahkan sebagai objek transaksi baru ke array

/**
 * TODO [Skilled]:
 * Tambahkan validasi input sebelum menyimpan data:
 *  - Tampilkan alert() dan hentikan proses jika judul kosong
 *  - Tampilkan alert() dan hentikan proses jika nominal kurang dari 1
 */

/**
 * TODO [Advanced]:
 * Setiap kali data transaksi berubah, perbarui Panel Dasbor:
 *  - Hitung total pemasukan, total pengeluaran, dan saldo (pemasukan - pengeluaran)
 *  - Tampilkan hasilnya ke elemen yang sesuai di HTML
 */

/**
 * ========================================================
 * Kriteria 2: Mengelola Penyimpanan Data (Web Storage API)
 * ========================================================
 */
/**
 * TODO [Basic]:
 * Data transaksi disimpan ke localStorage menggunakan JSON.stringify(), dan dimuat kembali saat halaman dibuka menggunakan JSON.parse().
 *  - Tombol "Hapus" berfungsi: transaksi yang dihapus langsung hilang dari layar dan dari localStorage.
 */

/**
 * TODO [Skilled]:
 * Tombol "Edit" berfungsi: saat ditekan, formulir (#transactionForm) secara otomatis terisi dengan data transaksi yang dipilih.
 *  - Pengguna dapat mengubah data lalu menyimpan perubahan.
 *  - Formulir kembali ke mode "Tambah" setelah pembaruan selesai.
 */

/**
 * TODO [Advanced]:
 * Gunakan Custom Event sebagai penghubung antara perubahan data dan pembaruan tampilan:
 *  - Kirim sinyal dengan document.dispatchEvent(new Event('transaction:updated')) setiap kali data berubah
 *  - Pasang satu listener untuk event tersebut yang memanggil fungsi render dan update dasbor
 */


/**
 * ========================================================
 * Kriteria 3: Fitur Interaktif (Pindah Kategori dan Pencarian)
 * ========================================================
 */
/**
 * TODO [Basic]:
 * Tambahkan tombol "Ubah Tipe" pada setiap kartu transaksi:
 *  - Saat diklik, ubah tipe transaksi: 'income' → 'expense' atau 'expense' → 'income'
 *  - Simpan perubahan ke localStorage dan perbarui tampilan
 */


/**
 * TODO [Skilled]:
 * Tambahkan event listener 'input' pada kolom pencarian:
 *  - Filter array transaksi berdasarkan kecocokan kata kunci dengan judul transaksi
 *  - Tampilkan hanya transaksi yang judulnya mengandung kata kunci tersebut
 */

/**
 * TODO [Advanced]:
 * Pastikan fitur pencarian berjalan dengan baik di semua kondisi:
 *  - Saat kolom pencarian dikosongkan, tampilkan kembali seluruh daftar transaksi
 */

let transactions = [];
let editId = null;
const transactionForm = document.getElementById('transactionForm');
const titleInput = document.getElementById('transactionFormTitleInput');
const amountInput = document.getElementById ('transactionFormAmountInput');
const dateInput = document.getElementById('transactionFormDateInput');
const typeSelect = document.getElementById ('transactionFormTypeSelect');
const incomeList = document.getElementById('incomeList');
const expenseList = document.getElementById('expenseList');
const balanceAmount = document.querySelector('.tracker-summary__balance-amount');
const searchForm = document.getElementById('searchTransactionForm');
const searchInput = document.getElementById('searchTransactionFormTitleInput');

function generateId() {
    return +new Date();
    
}
const incomeAmount = document.querySelector('.tracker-summary__stat-amount--income');
const expenseAmount = document.querySelector('.tracker-summary__stat-amount--expense');

function renderTransaksi(data) {
    incomeList.innerHTML = '';
    expenseList.innerHTML = '';
    data.forEach((transaction) => {
        const card = document.createElement('div');
        card.setAttribute('data-testid', 'transactionItem');
        const title = document.createElement('h3');
        title.setAttribute('data-testid', 'transactionItemTitle');
        title.textContent = transaction.title;
        const amount = document.createElement('p');
        amount.setAttribute('data-testid', 'transactionItemAmount');
        amount.textContent = `Nominal: Rp${transaction.amount}`;

        const date = document.createElement('p');
        date.setAttribute('data-testid', 'transactionItemDate');
        date.textContent = `Tanggal: ${transaction.date}`;

        const type = document.createElement('p');
        type.setAttribute('data-testid', 'transactionItemType');
        type.textContent=`Tipe: ${transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}`;
        
        const btnWrapper = document.createElement('div');
        

        const editBtn = document.createElement('button');
        editBtn.setAttribute('data-testid', 'transactionItemEditButton');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', ()=> setEditMode(transaction));
        editBtn.classList.add('edito');




        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('data-testid', 'transactionItemDeleteButton');
        deleteBtn.textContent='Hapus';
        deleteBtn.classList.add('hapuso');
            deleteBtn.addEventListener('click', () =>{
                transactions = transactions.filter(t=> t.id !==transaction.id);
                renderTransaksi(transactions);
                updateSummary();
                saveFromStorage();
                document.dispatchEvent(new Event('transaction:update'));

                
                
                
            });
        
            const toggleBtn = document.createElement('button');
            toggleBtn.setAttribute('data-testid', 'transactionItemEditTypeButton');
            toggleBtn.textContent = 'Ubah Tipe';
            toggleBtn.classList.add('ubaho');
            toggleBtn.addEventListener('click', ()=> setToggleButtonType(transaction.id));

            btnWrapper.appendChild(editBtn);
            btnWrapper.appendChild(deleteBtn);
            btnWrapper.appendChild(toggleBtn);

            card.appendChild(title);
            card.appendChild(amount);
            card.appendChild(date);
            card.appendChild(type);
            card.appendChild(btnWrapper);



        if (transaction.type === 'income'){
            incomeList.appendChild(card);

        }else{
            expenseList.appendChild(card);
        }
    });
    
}
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const amount = parseInt(amountInput.value);
    const date = dateInput.value;
    const type =typeSelect.value;
    if (title === '') {
    alert('Duh judul kamu masih kosong tuh!');
    return;
}
if (amount <1) {
    alert('Nominal nggak boleh 0 kawan!');
    return;
}
if (editId !==null) {
    transactions = transactions.map((t ) =>{
        if (t.id === editId) {
            return {...t,title, amount, date, type};

        }return t ;

    });
    editId = null;

}else{
    const newTransaksi = {
        id: generateId(), title,amount, date,type,
    };
    transactions.push(newTransaksi);
}
    renderTransaksi(transactions);
    updateSummary();
    saveFromStorage();
    document.dispatchEvent(new Event('transaction:update'));
    transactionForm.reset();
});
function updateSummary() {
    const totalIncome = transactions
    .filter ((t) => t.type === 'income')
    .reduce ((total, t) => total + t.amount, 0);
    const totalExpense = transactions
    .filter ((t) => t.type === 'expense')
    .reduce ((total, t) => total + t.amount, 0 );
    
    const balance = totalIncome - totalExpense;
    balanceAmount.textContent = 'Rp' + balance.toLocaleString('id-ID');
    incomeAmount.textContent = 'Rp' + totalIncome.toLocaleString('id-ID');
    expenseAmount.textContent = 'Rp' + totalExpense.toLocaleString('id-ID');

}
function saveFromStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));

    
}
function localToStorage() {
    const data = localStorage.getItem('transactions');
    if (data) {
        transactions = JSON.parse(data);
        renderTransaksi(transactions);
        updateSummary();
        
    }
}
function setEditMode(transaction) {
    editId = transaction.id;
    titleInput.value = transaction.title;
    amountInput.value = transaction.amount;
    dateInput.value = transaction.date;
    typeSelect.value = transaction.type;
}
localToStorage();
document.addEventListener('transaction:update' , ()=>{
    renderTransaksi(transactions);
    updateSummary();

});
function setToggleButtonType(id) {
    transactions = transactions.map((transaction) =>{


        if (transaction.id ===id) {
        const myType = transaction.type ==='income' ? 'expense':'income';

            return{...transaction,type:myType};
    }
    return transaction;
    });
    renderTransaksi(transactions);
    updateSummary();
    saveFromStorage();
    document.dispatchEvent(new Event('transaction:update'));
    
};

function handleEvent(event) {
    if (event.type === 'submit'){


    }
    
}
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const kunciSwargo = searchInput.value.toLowerCase().trim();
    if (kunciSwargo ==='') {
        renderTransaksi(transactions);
        return;
    }
    const filtere = transactions.filter(item =>
        item.title.toLowerCase().includes(kunciSwargo)
    );
    renderTransaksi(filtere);
});
searchInput.addEventListener('input',function () {
    if (searchInput.value ==='') {
        renderTransaksi(transactions);
        
    }
});