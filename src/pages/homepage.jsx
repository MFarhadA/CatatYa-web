// src/pages/Home/Home.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from './../components/InputForm';
import IncomeTable from './../components/IncomeTable';
import { supabase } from './../supabaseClient'; // pastikan path ini sesuai

function Home() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  // Ambil data transaksi dari Supabase berdasarkan user_id yang login
  const fetchTransactions = async () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      navigate('/login');
      return;
    }

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Tambah transaksi ke Supabase
  const addTransaction = async (newTransaction) => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      alert('User tidak ditemukan, silakan login ulang.');
      navigate('/login');
      return;
    }

    let photoUrl = null;

    if (newTransaction.photo) {
      const file = newTransaction.photo;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('transaction-photos') // nama bucket
        .upload(filePath, file);

      if (uploadError) {
        console.error("UPLOAD ERROR", uploadError);
        alert("Gagal upload gambar: " + uploadError.message);
        return;
      }

      // Ambil public URL
      const { data: publicUrlData } = supabase.storage
        .from('transaction-photos')
        .getPublicUrl(filePath);

      photoUrl = publicUrlData?.publicUrl || null;
    }

    const { error } = await supabase
      .from('transactions')
      .insert([{
        user_id: user.id,
        type: newTransaction.type,
        description: newTransaction.description,
        amount: newTransaction.amount,
        created_at: newTransaction.created_at,
        photo_url: photoUrl,
      }]);

    if (error) {
      alert("Gagal menambahkan transaksi.");
      console.error(error);
    } else {
      fetchTransactions(); // reload data setelah insert
    }
  };


  // Hapus transaksi di Supabase
  const deleteTransaction = async (id) => {
    try {
      // 1. Ambil transaksi dulu
      const { data: transactionData, error: fetchError } = await supabase
        .from('transactions')
        .select('photo_url')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // 2. Hapus file dari storage jika ada photo_url
      if (transactionData?.photo_url) {
        // Ambil path relatif dari photo_url
        const urlParts = transactionData.photo_url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const filePath = `public/${fileName}`; // sesuai path saat upload

        const { error: deleteFileError } = await supabase.storage
          .from('transaction-photos')
          .remove([filePath]);

        if (deleteFileError) {
          console.error("Gagal menghapus file gambar:", deleteFileError.message);
          // Kamu bisa lanjut atau batalkan tergantung kebutuhan
        }
      }

      // 3. Hapus dari tabel transaksi
      const { error: deleteTransactionError } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (deleteTransactionError) throw deleteTransactionError;

      // 4. Update state lokal
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error.message);
    }
  };

  // Hitung saldo total
  const getTotalBalance = () => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === 'Pemasukan' 
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0);
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl font-black">CatatYa</a>
        </div>
        <div className="navbar-end gap-4">
            <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value="forest" />
            <svg
              className="swap-off h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-on h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          <a className="btn btn-secondary" onClick={handleLogout}>Keluar</a>
        </div>
      </div>
        
      <div className="flex flex-col lg:flex-row gap-2 p-4">
        <InputForm onAddTransaction={addTransaction} />
        <IncomeTable
          transactions={transactions}
          onDeleteTransaction={deleteTransaction}
          getTotalBalance={getTotalBalance}
        />
      </div>
    </>
  );
}

export default Home;