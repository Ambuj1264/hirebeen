import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { failureToast, successToast } from "../utils/toast";
import axios from "axios";
const CreateProduct = () => {
  // Validation schema
  const validationSchema = Yup.object({
    productName: Yup.string()
      .min(3, "Product name must be at least 3 characters")
      .required("Product name is required"),
    price: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
    count : Yup.number()
    .positive("Price must be a positive number")
    .required("Price is required"),
    imageUrl: Yup.string()
      .url("Invalid URL format")
      .required("Image URL is required"),
  });

  // Initial values for the form
  const initialValues = {
    productName: "",
    price: "",
    description: "",
    imageUrl: "",
    count: "",
  };

  // Form submission handler
  const handleSubmit = async(values) => {
    
    try {
      const response = await axios.post("https://hire-been.vercel.app/auth/createProduct", {
        name: values.productName,
        price: values.price,
        description: values.description,
        imgUrl: values.imageUrl,
        count: values.count
      },
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Include the token in the headers localStorage.getItem("authToken")
        }
      }
      );

      console.log("loign:", response.data.token);
      const result = response.data;

      if (result) {
        successToast("Product created successful");
       
        window.location.href=("/product");
    
      }
    } catch (error) {
      console.error("Login error:", error);
      failureToast("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Product
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <Field
                  type="text"
                  id="productName"
                  name="productName"
                  className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="productName"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  rows="4"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>


              <div className="mb-6">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image URL
                </label>
                <Field
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="imageUrl"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="count"
                  className="block text-sm font-medium text-gray-700"
                >
                  Count of Product
                </label>
                <Field
                    type="number"
                  id="count"
                  name="count"
                  className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="count"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 font-medium text-white bg-black rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                {isSubmitting ? "Submitting..." : "Create Product"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateProduct;