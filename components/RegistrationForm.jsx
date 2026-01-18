"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postUser } from "@/actions/authActions";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const form = e.target;

      const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        password: form.password.value,
        image: form.image.value,
        role: "user",
      };

      const result = await postUser(formData);
      
      if (result.success) {
        toast.success(result.message);
        form.reset();
        // Auto login after registration
        setTimeout(() => {
          signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: true,
            callbackUrl: "/gear",
          });
        }, 1500);
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      const errorMessage = err.message || "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2 border border-[#334155] bg-[#0F172A] text-[#F8FAFC] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] disabled:bg-[#334155] disabled:opacity-50 transition-all duration-300";

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="max-w-lg space-y-6 bg-[#1E293B] p-8 rounded-lg">
        {/* Error Display */}
        {error && (
          <div className="rounded-md bg-red-900/30 p-4 border border-red-800">
            <h3 className="text-sm font-medium text-red-300">{error}</h3>
          </div>
        )}

        {/* Name */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-[#94A3B8]">Full Name <span className="text-red-400">*</span></label>
          <input
            type="text"
            name="name"
            placeholder="Enter your official name"
            required
            disabled={loading}
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-[#94A3B8]">Email <span className="text-red-400">*</span></label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            disabled={loading}
            className={inputClass}
          />
        </div>

        {/* Contact No + Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-[#94A3B8]">Phone Number <span className="text-red-400">*</span></label>
            <input
              type="tel"
              name="phone"
              placeholder="+1 (555) 000-0000"
              required
              disabled={loading}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-[#94A3B8]">Password <span className="text-red-400">*</span></label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              disabled={loading}
              className={inputClass}
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-[#94A3B8]">Profile Image URL</label>
          <input
            type="url"
            name="image"
            placeholder="https://example.com/image.jpg"
            disabled={loading}
            className={inputClass}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#334155]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#1E293B] text-[#94A3B8]">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={() => signIn('google', { callbackUrl: '/gear' })}
          className="w-full flex justify-center items-center bg-[#334155] hover:bg-[#475569] text-[#F8FAFC] py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? "Signing up..." : "Sign up with Google"}
        </button>
      </form>
    </>
  );
};

export default RegisterForm;