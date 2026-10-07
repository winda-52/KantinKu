import { useState } from "react";
import { useCart } from "../../utils/CartContext";

export default function Checkout() {
  const { cart } = useCart();

  const [nama, setNama] = useState("");
  const [meja, setMeja] = useState("");
  const [catatan, setCatatan] = useState("");

  const total = cart.reduce(
    (jumlah, item) => jumlah + item.price * item.qty,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Pesanan atas nama ${nama} berhasil dikonfirmasi!`);
  };

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">
          Konfirmasi Pesanan
        </h1>
        <p className="text-gray-600">
          Belum ada makanan yang dipilih.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Konfirmasi Pesanan
      </h1>

      <div className="border rounded-lg p-4 mb-6">
        <h2 className="font-semibold mb-3">Pesanan Kamu</h2>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between mb-2"
          >
            <span>
              {item.name} x {item.qty}
            </span>

            <span>
              Rp {(item.price * item.qty).toLocaleString()}
            </span>
          </div>
        ))}

        <hr className="my-3" />

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>Rp {total.toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">
            Nama Pemesan
          </label>

          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukkan nama"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Nomor Meja
          </label>

          <input
            type="number"
            value={meja}
            onChange={(e) => setMeja(e.target.value)}
            placeholder="Contoh: 5"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Catatan
          </label>

          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            placeholder="Contoh: Tidak pedas"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Konfirmasi Pesanan
        </button>
      </form>
    </div>
  );
}