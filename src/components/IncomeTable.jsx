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

  return (
    <div className="card flex-2/3 rounded-box border-base-300 border overflow-x-auto gap-2 p-5">
      <label className="label font-semibold justify-center mb-2">Tabel Data Pemasukan & Pengeluaran</label>
      <div className="badge badge-secondary w-full font-semibold p-4">
        <h1>Total Balance: {formatCurrency(getTotalBalance())}</h1>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
        <table className="table table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Tipe</th>
              <th>Deskripsi</th>
              <th>Nominal</th>
              <th>Bukti</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} className="hover:bg-base-300">
                <th>{index + 1}</th>
                <td>
                  <span className={`badge ${transaction.type === 'Pemasukan' ? 'badge-success' : 'badge-error'}`}>
                    {transaction.type}
                  </span>
                </td>
                <td>{transaction.description}</td>
                <td className={transaction.type === 'Pemasukan' ? 'text-success' : 'text-error'}>
                  {transaction.type === 'Pemasukan' ? '+' : '-'}{formatCurrency(transaction.amount)}
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
