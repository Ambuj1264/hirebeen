import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { failureToast, successToast } from "../utils/toast";

const RegistrationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Initial values for the form
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Form submission handler
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
  
      const response = await axios.post(`https://hire-been.vercel.app/createUser`, ({
        "name": values.name,
        "email": values.email,
        "password": values.password
      }));      
      console.log("Registration successful:", response.data);
      const result = response.data;
      if(result.message==="User already exists"){   
        failureToast("User already exists");
        return
      }
      // Handle success (e.g., redirect to login page or show success message)
      if(result){   
        successToast("User created Successfully");
      }
      // Handle success (e.g., redirect to login page or show success message)
    } catch (error) {
      console.error("Registration error:", error);
      failureToast("Something went wrong");
      // Handle error (e.g., show error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

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
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 font-medium text-white bg-black rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Registering...
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="flex items-center justify-center space-x-2">
          <p className="text-gray-600">Already have an account?</p>
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
