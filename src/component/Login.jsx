import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import axios from "axios";
import { failureToast, successToast } from "../utils/toast";
// import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  // const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Initial values for the form
  const initialValues = {
    email: "",
    password: "",
  };

  // Form submission handler
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    try {
      const response = await axios.post("https://hire-been.vercel.app/loginUser", {
        email: values.email,
        password: values.password,
      });

      console.log("loign:", response.data.token);
      const result = response.data;

      if (result) {
        successToast("Login successful");
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("userData", JSON.stringify(result.user));
        window.location.href=("/product");
    
      }
    } catch (error) {
      console.error("Login error:", error);
      failureToast("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => handleFormSubmit(values, setSubmitting)}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 font-medium text-white bg-black rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <div>
          <p className="text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/registration" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;