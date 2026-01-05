// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "./authSlice";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error } = useSelector((state) => state.auth);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await dispatch(login(formData));
//     if (result.meta.requestStatus === "fulfilled") {
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
//       <form
//         onSubmit={handleSubmit}
//         className="glass animate-fadeScale p-8 rounded-2xl shadow-2xl w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//           Login to HireFlow
//         </h2>

//         {error && (
//           <p className="text-red-500 text-sm mb-4 text-center animate-pulse">
//             {error}
//           </p>
//         )}

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full p-3 mb-5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
//           onChange={handleChange}
//           required
//         />

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-blue-600 text-white p-3 rounded-lg hover:scale-[1.02] hover:bg-blue-700 transition-all font-semibold"
//         >
//           {isLoading ? "Logging in..." : "Login"}
//         </button>

//         <p className="text-center text-sm mt-5 text-gray-600">
//           Don’t have an account?{" "}
//           <span
//             className="text-blue-600 font-medium cursor-pointer hover:underline"
//             onClick={() => navigate("/register")}
//           >
//             Register
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-page login-bg">
      <form className="auth-card fade-scale" onSubmit={handleSubmit}>
        <h2>Login to HireFlow</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          autoComplete="none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="switch-text">
          Don’t have an account?
          <span onClick={() => navigate("/register")}> Register</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
