import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // cegah reload halaman
    // validasi sama seperti sebelumnya
    const validUsername = 'admin';
    const validPassword = '12345';

    if (username === validUsername && password === validPassword) {
      localStorage.setItem('token', 'mock_token');
      navigate('/');
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-4xl font-bold mb-10">CatatYa</h1>

      <form onSubmit={handleLogin} className="card max-w-md rounded-box border-base-300 border overflow-x-auto gap-2 p-5 w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        
        <input
          type="text"
          placeholder="Masukkan username"
          className="input input-bordered w-full mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Masukkan password"
          className="input input-bordered w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>

      {error && (
        <div role="alert" className="alert alert-error mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
