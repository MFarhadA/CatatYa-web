import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Upload, X } from 'lucide-react'

function App() {
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Pemasukan', description: 'Gaji Bulanan', amount: 5000000, photo: null },
    { id: 2, type: 'Pengeluaran', description: 'Belanja Groceries', amount: 250000, photo: null },
    { id: 3, type: 'Pengeluaran', description: 'Bensin Motor', amount: 50000, photo: null },
    { id: 4, type: 'Pemasukan', description: 'Freelance Project', amount: 1500000, photo: null },
  ]);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    alert('Logout berhasil!');
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleSubmit = () => {
    if (!selectedType || !description || !amount) {
      alert('Mohon lengkapi semua field yang diperlukan!');
      return;
    }

    const newTransaction = {
      id: transactions.length + 1,
      type: selectedType,
      description: description,
      amount: parseFloat(amount),
      photo: photoPreview
    };

    setTransactions([...transactions, newTransaction]);
    
    // Reset form
    setSelectedType('');
    setDescription('');
    setAmount('');
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';

  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

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
        <a className="btn btn-ghost text-xl">CatatYa</a>
      </div>
      <div className="navbar-end gap-4">
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" className="theme-controller" value="sunset" />

          {/* sun icon */}
          <svg
            className="swap-off h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
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
      <div className="card flex-1/3 rounded-box border-base-300 border overflow-x-auto gap-2 p-5">
        <label className="label mb-2">Input Data Pemasukan / Pengeluaran</label>
        <div className="join">
          <input 
            className={`join-item btn flex-1 ${selectedType === 'Pemasukan' ? 'btn-active' : ''}`}
            type="radio" 
            name="type" 
            aria-label="Pemasukan" 
            checked={selectedType === 'Pemasukan'}
            onChange={() => setSelectedType('Pemasukan')}
          />
          <input 
            className={`join-item btn flex-1 ${selectedType === 'Pengeluaran' ? 'btn-active' : ''}`}
            type="radio" 
            name="type" 
            aria-label="Pengeluaran" 
            checked={selectedType === 'Pengeluaran'}
            onChange={() => setSelectedType('Pengeluaran')}
          />
        </div>
        <label className="label">Deskripsi</label>
        <input 
          type="text" 
          className="input w-full" 
          required 
          placeholder="Masukkan deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Input nominal */}
        <label className="label">Nominal</label>
        <label className="input w-full">
          <span className="label">Rp. </span>
          <input 
            type="number" 
            required 
            placeholder="Masukkan nominal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        {/* Photo Upload Section */}
        <label className="label">Foto Bukti (Opsional)</label>
        <div className="flex gap-2">
          <button 
            className="btn btn-outline btn-sm flex-1"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4" />
            Galeri
          </button>
          <button 
            className="btn btn-outline btn-sm flex-1"
            onClick={() => cameraInputRef.current?.click()}
          >
            <Camera className="w-4 h-4" />
            Kamera
          </button>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef}
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
        <input 
          type="file" 
          ref={cameraInputRef}
          accept="image/*"
          capture="environment"
          onChange={handlePhotoUpload}
          className="hidden"
        />

        {/* Photo Preview */}
        {photoPreview && (
          <div className="relative">
            <img 
              src={photoPreview} 
              alt="Preview" 
              className="w-full h-32 object-cover rounded-lg border"
            />
            <button 
              onClick={removePhoto}
              className="btn btn-circle btn-sm btn-error absolute -top-2 -right-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <button className="btn btn-primary mt-2" onClick={handleSubmit}>Simpan</button>
      </div>

      <div className="card flex-2/3 rounded-box border-base-300 border overflow-x-auto gap-2 p-5">
        <label className="label mb-2">Tabel Data Pemasukan & Pengeluaran</label>
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
                  {transaction.photo ? (
                    <img 
                      src={transaction.photo} 
                      alt="Bukti" 
                      className="w-12 h-12 object-cover rounded cursor-pointer"
                      onClick={() => window.open(transaction.photo, '_blank')}
                    />
                  ) : (
                    <span className="text-base-content/50">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default App