import { useState } from "react";

function TransactionTable({ transactions, onEditTransaction, onDeleteTransaction, getTotalBalance }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const openImageInNewTab = (imageUrl) => {
    if (!imageUrl) return;
    
    if (imageUrl.startsWith('data:image/')) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(`
          <html>
            <head>
              <title>Bukti Transaksi</title>
              <style>
                body {
                  margin: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background-color: #1e1e1e;
                }
                img {
                  max-width: 95%;
                  max-height: 95%;
                  object-fit: contain;
                }
              </style>
            </head>
            <body>
              <img src="${imageUrl}" alt="Bukti Transaksi" />
            </body>
          </html>
        `);
        newTab.document.close();
      }
    } else {
      window.open(imageUrl, '_blank');
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="card flex-2/3 rounded-box border-base-300 border overflow-x-auto gap-2 p-5">
      <label className="label font-semibold justify-center mb-2">Tabel Data Pemasukan & Pengeluaran</label>
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
        <div className="badge badge-secondary font-semibold p-4">
          <h1>Total Balance: {formatCurrency(getTotalBalance())}</h1>
        </div>
        <div className="form-control w-full sm:w-64">
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-base-content/70">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Cari deskripsi atau tipe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
        <table className="table table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Tanggal</th>
              <th>Deskripsi</th>
              <th>Nominal</th>
              <th>Bukti</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transactions
              .filter(transaction =>
                transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                transaction.type.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((transaction, index) => (
              <tr key={transaction.id} className="hover:bg-base-300">
                <th>{index + 1}</th>
                <td>
                  <span className="text-sm font-semibold">
                    {transaction.created_at}
                  </span>
                </td>
                <td>{transaction.description}</td>
                <td>
                  <span className={`text-sm font-semibold ${transaction.type === 'Pemasukan' ? 'text-success' : 'text-error'}`}>
                    {transaction.type === 'Pemasukan' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </span>
                </td>
                <td>
                    {transaction.photo_url ? (
                    <img 
                        src={transaction.photo_url} 
                        alt="Bukti" 
                        className="w-12 h-12 object-cover rounded cursor-pointer"
                        onClick={() => openImageInNewTab(transaction.photo_url)}
                        title="Klik untuk melihat gambar penuh"
                    />
                    ) : (
                    <span className="text-base-content/50">-</span>
                    )}
                </td>
                <td>
                    <button 
                        className="btn btn-sm btn-error" 
                        onClick={() => {
                        if(window.confirm("Yakin ingin menghapus transaksi ini?")) {
                            onDeleteTransaction(transaction.id);
                        }
                        }}
                    >
                        Hapus
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
