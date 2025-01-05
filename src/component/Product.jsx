import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Producth = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handlerAddtoCart = (productId) => {
    navigate("/addToCart" + "/" + productId);
  };

  const handlerCheckout = (productId) => {
    navigate("/checkout" + "/" + productId);
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 2 seconds delay

    return () => clearTimeout(timer); // Cleanup timer when component unmounts
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get("http://localhost:3000/getAllProduct");
        console.log(result.data);
        setProducts(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Product Listing</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 animate-pulse h-64 rounded-lg"
              />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <a href= {`/product/${product._id}`}>
              <img
                src={product.imgUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              </a>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 text-sm mt-2">
                  {product.description}
                </p>
                <p className="text-xl font-bold mt-4">&#8377; {product.price}</p>
             
                <div className="flex gap-4 mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={() => handlerAddtoCart(product._id)} // Fixed id
                  >
                    Add to Cart
                  </button>

                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    onClick={() => handlerCheckout(product._id)} // Fixed id
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Producth;