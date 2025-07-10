import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-row gap-2 p-4">
      <fieldset class="flex flex-col gap-2bg-base-200 border-base-300 rounded-box border p-4 gap-2 mb-2">
        <div className="join join-vertical lg:join-horizontal">
          <input className="join-item btn" type="radio" name="type" aria-label="Pemasukan" />
          <input className="join-item btn" type="radio" name="type" aria-label="Pengeluaran" />
        </div>
        <label class="label">Deskripsi</label>
        <input type="text" class="input" placeholder="Masukkan deskripsi" />

        <label class="label">Nominal</label>
        <label className="input">
          <span className="label">Rp. </span>
          <input type="text" placeholder="URL" />
        </label>
        <button className="btn mt-2" type="submit" value="Simpan">Simpan</button>
      </fieldset>

      <div className="card rounded-box gap-2bg-base-200 border-base-300 border overflow-x-auto">
        <table className="table">
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
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default App
