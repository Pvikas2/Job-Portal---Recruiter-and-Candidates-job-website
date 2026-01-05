// import { useState } from "react";
// import API from "../../services/api";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "candidate",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await API.post("/auth/register", formData);
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
//       <form
//         onSubmit={handleSubmit}
//         className="glass animate-fadeScale p-8 rounded-2xl shadow-2xl w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//           Create HireFlow Account
//         </h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
//           onChange={handleChange}
//           required
//         />

//         <select
//           name="role"
//           className="w-full p-3 mb-5 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
//           onChange={handleChange}
//         >
//           <option value="candidate">Candidate</option>
//           <option value="recruiter">Recruiter</option>
//         </select>

//         <button className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:scale-[1.02] hover:bg-indigo-700 transition-all font-semibold">
//           Register
//         </button>

//         <p className="text-center text-sm mt-5 text-gray-600">
//           Already have an account?{" "}
//           <span
//             className="text-indigo-600 font-medium cursor-pointer hover:underline"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;


import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card fade-scale" onSubmit={handleSubmit}>
        <h2>Create HireFlow Account</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <select name="role" onChange={handleChange}>
          <option value="candidate">Candidate</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button type="submit">Register</button>

        <p className="switch-text">
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
