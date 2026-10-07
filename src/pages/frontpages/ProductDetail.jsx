import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useCart } from "../../utils/CartContext";

export default function ProductDetail() {
  const { id } = useParams();

  const location = useLocation();

  // Mengambil data menu dari halaman sebelumnya
  const p = location.state?.p;

  // Mengambil fungsi cart dari CartContext
  const { addToCart } = useCart();

  // State rating dan ulasan
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  // =========================
  // TAMBAH PESANAN
  // =========================
  const handleAddToCart = () => {
  alert("TOMBOL BERHASIL DIKLIK");
};

  // =========================
  // KIRIM ULASAN
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    // Jika rating atau ulasan kosong
    if (!rating || !review.trim()) {
      return;
    }

    const newReview = {
      id: Date.now(),
      rating: rating,
      review: review,
    };

    setReviews([...reviews, newReview]);

    // Kosongkan form
    setRating(0);
    setReview("");
  };

  // =========================
  // JIKA MENU TIDAK DITEMUKAN
  // =========================
  if (!p) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">
          Menu tidak ditemukan
        </h1>

        <p className="text-gray-600">
          Data menu tidak tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* ========================= */}
      {/* DETAIL MENU */}
      {/* ========================= */}

      <div className="grid md:grid-cols-2 gap-8 mb-8">

        {/* ========================= */}
        {/* GAMBAR MENU */}
        {/* ========================= */}

        <div className="border rounded-xl overflow-hidden shadow-sm">
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-80 object-cover"
          />
        </div>

        {/* ========================= */}
        {/* INFORMASI MENU */}
        {/* ========================= */}

        <div className="border rounded-xl p-6 shadow-sm">

          {/* Kategori */}
          <p className="text-sm text-gray-500 mb-2">
            {p.category_name}
          </p>

          {/* Nama menu */}
          <h1 className="text-3xl font-bold mb-3">
            {p.name}
          </h1>

          {/* Rating */}
          <p className="text-yellow-500 mb-3">
            ⭐ {p.rating}
          </p>

          {/* Harga */}
          <p className="text-2xl font-bold text-blue-600 mb-3">
            Rp {p.price.toLocaleString("id-ID")}
          </p>

          {/* Stok */}
          <p className="text-gray-600 mb-6">
            Stok tersedia: {p.stock}
          </p>

          {/* ========================= */}
          {/* TOMBOL TAMBAH PESANAN */}
          {/* ========================= */}

          <button
            type="button"
            onClick={handleAddToCart}
            className="relative z-10 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition cursor-pointer"
          >
            Tambah Pesanan
          </button>

        </div>
      </div>


      {/* ========================= */}
      {/* BAGIAN ULASAN */}
      {/* ========================= */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* ========================= */}
        {/* DAFTAR ULASAN */}
        {/* ========================= */}

        <section>

          <h2 className="text-2xl font-bold mb-4">
            Ulasan Pelanggan
          </h2>

          {/* Conditional Rendering */}
          {reviews.length === 0 ? (
            <p className="text-gray-500">
              Belum ada ulasan.
            </p>
          ) : (
            <div className="space-y-4">

              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="border rounded-lg p-4"
                >

                  {/* Rating */}
                  <div className="mb-2 text-yellow-500">
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </div>

                  {/* Isi ulasan */}
                  <p>
                    {r.review}
                  </p>

                </div>
              ))}

            </div>
          )}

        </section>


        {/* ========================= */}
        {/* FORM ULASAN */}
        {/* ========================= */}

        <section className="border rounded-xl p-5 shadow-sm">

          <h2 className="text-xl font-bold mb-4">
            Beri Ulasan
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Rating */}
            <label className="block font-medium mb-2">
              Rating
            </label>

            <div className="flex gap-2 mb-4">

              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl cursor-pointer ${
                    star <= rating
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}

            </div>


            {/* Ulasan */}
            <label className="block font-medium mb-2">
              Ulasan
            </label>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4"
              rows="4"
              placeholder="Tulis pengalaman kamu..."
            />


            {/* Tombol kirim */}
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Kirim Ulasan
            </button>

          </form>

        </section>

      </div>

    </div>
  );
}