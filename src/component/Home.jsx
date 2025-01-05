import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SkeletonLoader } from '../utils/skelton';
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetch from API)
    const timer = setTimeout(() => {
      setProducts([
        { id: 1, name: 'Smartphone', price: '$499', img: 'https://images.unsplash.com/photo-1600087626120-062700394a01?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', dataAos : "fade-right" },
        { id: 2, name: 'Laptop', price: '$899', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', dataAos : "fade-bottom" },
        { id: 3, name: 'Headphones', price: '$199', img: 'https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', dataAos : "fade-left" },
      ]);
      setLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4" data-aos="fade-up">Welcome to My Shop</h1>
      <p className="text-lg md:text-2xl mb-6">Your one-stop shop for all your needs</p>
      <Link to="/product">
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
          Start Shopping
          <span className="ml-2">
       
        
          </span>
        </button>
      </Link>
      <div className="featured-products p-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border p-4 rounded-md shadow-md bg-white text-black" data-aos={product.dataAos}>
                <img src={product.img} alt={product.name} className="w-full mb-4 rounded-md" />
                <h3 className="text-xl font-bold mb-4">{product.name}</h3>
                {/* <p className="text-lg">{product.price}</p> */}
                <a  className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition " href="/product">
                  Buy Now
               </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



export default Home;