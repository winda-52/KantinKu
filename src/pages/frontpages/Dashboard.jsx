import ProductCard from "../../components/ProductCard";
import { products } from "../../utils/data";

export default function Dashboard() {
  return (
    <div>
      {/* Bagian pembuka */}
      <div className="bg-blue-50 rounded-xl p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Selamat Datang di KantinKu 🍽️
        </h1>

        <p className="text-gray-600">
          Pesan makanan dan minuman favoritmu dengan mudah.
        </p>
      </div>

      {/* Judul menu */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold">
          Menu Kantin
        </h2>

        <p className="text-gray-600">
          Pilih menu yang kamu inginkan
        </p>
      </div>

      {/* Daftar menu */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((item) => (
          // p adalah props untuk mengirim data menu ke ProductCard
          <ProductCard p={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}