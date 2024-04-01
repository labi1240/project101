"use client"
import React, { useState } from "react";
import axios from "axios";
import { Input, Label } from "@/components/ui"; // Adjust imports as necessary
import { cn } from "@/utils/cn";
import toast, { Toaster } from 'react-hot-toast';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

const MySignupForm = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", email: "", password: "", form: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // Optionally clear errors on change
    setErrors({ ...errors, [name]: "", form: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ username: "", email: "", password: "", form: "" }); // Reset errors

    toast.promise(
      axios.post("/api/users/signup", user),
      {
        loading: 'Signing up...',
        success: (data) => {
          console.log("Signup success", data.data);
          return 'Signup successful!'; // Customize success message
        },
        error: (error) => {
          console.error("Signup failed", error.response?.data || error.message);
          if (error.response?.data?.errors) {
            // Assuming the server returns errors in a structured way
            error.response.data.errors.forEach((err: { param: string; msg: string }) => {
              setErrors((prevErrors) => ({ ...prevErrors, [err.param]: err.msg }));
            });
          } else {
            // General error (e.g., network issue, server down)
            return error.response?.data?.message || "An unexpected error occurred. Please try again.";
          }
        },
      }
    ).finally(() => setLoading(false));
  };

  return (
    <div>
      {/* Form and fields here */}
      <button disabled={loading} onClick={handleSubmit}>{loading ? "Signing Up..." : "Sign Up"}</button>
      <Toaster />
    </div>
  );
};

export default MySignupForm;

// You may need to adjust CSS classes or component imports based on your project structure
