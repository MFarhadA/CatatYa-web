import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
    <div className="flex flex-row gap-2 p-4">
      <div className="card rounded-box gap-2bg-base-200 border-base-300 border overflow-x-auto gap-2">
        <label className="label mb-2">Input Data Pemasukan / Pengeluaran</label>
        <div className="join join-vertical lg:join-horizontal">
          <input className="join-item btn" type="radio" name="type" aria-label="Pemasukan" />
          <input className="join-item btn" type="radio" name="type" aria-label="Pengeluaran" />
        </div>
        <label class="label">Deskripsi</label>
        <input type="text" class="input" placeholder="Masukkan deskripsi" />

        <label className="label">Nominal</label>
        <label className="input">
          <span className="label">Rp. </span>
          <input type="text" placeholder="URL" />
        </label>
        <button className="btn btn-primary mt-2" type="submit" value="Simpan">Simpan</button>
      </div>

      <div className="card rounded-box gap-2bg-base-200 border-base-300 border overflow-x-auto gap-2">
        <label className="label mb-2">Tabel Data Pemasukan & Pengeluaran</label>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
          <table className="table table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Tipe</th>
              <th>Deskripsi</th>
              <th>Pengeluaran</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="hover:bg-base-300">
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr className="hover:bg-base-300">
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr className="hover:bg-base-300">
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
            {/* row 4 */}
            <tr className="hover:bg-base-300">
              <th>4</th>
              <td>Marjy Ferencz</td>
              <td>Office Assistant I</td>
              <td>Red</td>
            </tr>
            {/* row 5 */}
            <tr className="hover:bg-base-300">
              <th>5</th>
              <td>Yancy Tear</td>
              <td>Community Outreach Specialist</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default App