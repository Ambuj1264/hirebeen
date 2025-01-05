import { useParams } from "react-router-dom";

const AddToCartPage = () => {
    const productId = useParams();
console.log(productId, "-========product id")
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <p className="text-gray-600">You can manage your cart items here.</p>
     
    </div>
  );
};

export default AddToCartPage;