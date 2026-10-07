import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();

  return (
    <div
      key={p.id}
      className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
    >
      {/* Gambar menu */}
      <img
        src={p.img}
        alt={p.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        {/* Nama menu */}
        <h2 className="text-xl font-semibold mb-1">
          {p.name}
        </h2>

        {/* Kategori */}
        <p className="text-sm text-gray-500 mb-2">
          {p.category_name}
        </p>

        {/* Rating */}
        <p className="text-sm mb-2">
          ⭐ {p.rating}
        </p>

        {/* Harga */}
        <p className="text-lg font-bold text-blue-600">
          Rp {p.price.toLocaleString("id-ID")}
        </p>

        {/* Lihat detail */}
        <Link
          to={`/product/${p.slug}`}
          state={{ p }}
          className="text-blue-600 hover:underline mt-3 block"
        >
          Lihat Detail
        </Link>

        {/* Tambah pesanan */}
        <button
          onClick={() => addToCart(p)}
          className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Tambah Pesanan
        </button>
      </div>
    </div>
  );
}