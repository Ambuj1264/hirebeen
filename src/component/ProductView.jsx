import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";

const ProductView = () => {
  const [product, setProduct] = useState({});
  const { productId } = useParams();

  const navigate = useNavigate();
  const handlerAddtoCart = (productId) => {
    navigate("/addToCart" + "/" + productId);
  };

  const handlerCheckout = (productId) => {
    navigate("/checkout" + "/" + productId);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getProductById/${productId}`);
        const results = response.data;
        console.log("API Response:", results);
        setProduct(results || {});
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [productId]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-full md:w-1/2">
          <img
            src={product?.imgUrl || "https://via.placeholder.com/500"}
            alt={product?.name || "Product Image"}
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:mt-0">
          <h1 className="text-3xl font-bold mb-4 text-center">{product?.name || "Product Name"}</h1>
          <p className="text-gray-700 mb-4 text-center">{product?.description || "No description available."}</p>
          <p className="text-xl font-semibold text-blue-600 mb-6 text-center">
            Price: ₹{product?.price || "N/A"}
          </p>

          <div className="flex gap-4 justify-center">
            <Button type="primary" size="large" className="" onClick={() => handlerAddtoCart(product._id)}>
              Add to Cart
            </Button>
            <Button type="default" size="large" className="" style={{ backgroundColor: "#52c41a", color: "#fff" }} onClick={() => handlerCheckout(product._id)}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;