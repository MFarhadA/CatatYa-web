import { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';

function InputForm({ onAddTransaction }) {
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [amountFormatted, setAmountFormatted] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const formatNumberWithDots = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, '').replace(/\D/g, '');
    setAmount(rawValue);
    setAmountFormatted(formatNumberWithDots(rawValue));
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
    if (!selectedType || !description || !amount || !createdAt) {
      alert('Mohon lengkapi semua field yang diperlukan!');
      return;
    }

    const newTransaction = {
      type: selectedType,
      description: description,
      amount: parseFloat(amount),
      created_at: createdAt,
      photo: photo
    };

    onAddTransaction(newTransaction);
    
    // Reset form
    setSelectedType('');
    setDescription('');
    setAmount('');
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="card flex-1/3 rounded-box border-base-300 border overflow-x-auto gap-2 p-5">
      <label className="label font-semibold justify-center mb-2">Input Data Pemasukan / Pengeluaran</label>
      <div className="join">
        <input 
          className={`join-item btn flex-1 ${selectedType === 'Pemasukan' ? 'btn-success btn-active' : ''}`}
          type="radio" 
          name="type" 
          aria-label="Pemasukan"
          checked={selectedType === 'Pemasukan'}
          onChange={() => setSelectedType('Pemasukan')}
        />
        <input 
          className={`join-item btn flex-1 ${selectedType === 'Pengeluaran' ? 'btn-error btn-active' : ''}`}
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
      <label className="input w-full items-center gap-2">
        <span className="text-sm">Rp.</span>
        <input 
          type="text"
          inputMode="numeric"
          placeholder="Masukkan nominal"
          value={amountFormatted}
          onChange={handleAmountChange}
          className="w-full bg-transparent outline-none"
          required
        />
      </label>

      {/* Date Input Section */}
      <label className="label">Tanggal</label>
      <input
        type="date"
        required 
        className="input"
        value={createdAt}
        onChange={(e) => setCreatedAt(e.target.value)}
      />

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
  );
}

export default InputForm;
