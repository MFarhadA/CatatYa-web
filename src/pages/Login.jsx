import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './../supabaseClient';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // ambil user dari tabel users
    const { data, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single(); // hanya ambil satu user

    if (fetchError || !data) {
      setError('Username tidak ditemukan');
      return;
    }

    if (data.password_hash !== password) {
      setError('Password salah');
      return;
    }

    // simpan user ke localStorage
    localStorage.setItem('user', JSON.stringify({ id: data.id, username: data.username }));
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-4xl font-black mb-10">CatatYa</h1>

      <form onSubmit={handleLogin} className="card max-w-md rounded-box border-base-300 border overflow-x-auto gap-2 p-5 w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        
        <input
          type="text"
          placeholder="Masukkan username"
          className="input input-bordered w-full mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="relative w-full mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password"
            className="input input-bordered w-full pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              // Ikon mata terbuka
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            ) : (
              // Ikon mata tertutup
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17.94 17.94A10.95 10.95 0 0 1 12 20C5 20 1 12 1 12a21.9 21.9 0 0 1 5.06-6.94M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                <path d="M1 1l22 22"/>
              </svg>
            )}
          </button>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
        {error && (
          <div role="alert" className="alert alert-error mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </form>

      <label className="flex cursor-pointer gap-2 mt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path
            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <input type="checkbox" value="sunset" className="toggle theme-controller" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
    </div>
  );
}