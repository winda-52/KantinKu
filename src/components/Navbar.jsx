import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";
import { useAuth } from "../utils/AuthContext";

export default function Navbar() {
  // Mengambil totalQty dari context UseCart
  const { totalQty } = useCart();
  const { user } = useAuth();
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="font-bold text-xl">
        KantinKu
      </Link>
      {/* Menu Navigasi */}
      <div className="flex gap-6">
        {/* Dashboard Links */}
        <Link to="/" className="hover:text-gray-200">
          Dashboard
        </Link>
        <Link to="/cart" className="hover:text-gray-200">
          Pesanan
          {/* Menampilkan totalQty jika ada item di keranjang */}
          {totalQty > 0 && (
            <span className=" bg-red-500 text-xs px-2 rounded-full">
              {totalQty}
            </span>
          )}
        </Link>
        <Link to="/checkout" className="hover:text-gray-200">
          Checkout
        </Link>
        
       {user ? <Link to="/logout">Logout</Link>
       : <Link to="/login">Login</Link>
       }


      </div>
    </nav>
  );
}
