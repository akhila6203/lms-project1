import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import login from "../assets/photos/login.jpg";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();

if (!validate()) return;

  if (isAdminEmail(email)) {
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "Admin", email, role: "admin" })
    );
  } else {
    const name = email.split("@")[0].replace(/[._-]+/g, " ");
    localStorage.setItem(
    "user",
    JSON.stringify({
      name: name.replace(/\b\w/g, (char) => char.toUpperCase()) || "User",
      email,
      role: "user",
    })
  );
  }

  localStorage.removeItem("user_profile");
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect");
  navigate(redirect || "/dashboard"); // ✅ return to requested page if present
};

const validate = () => {
  let newErrors = {};

  // EMAIL
  if (!email) {
    newErrors.email = "Email is required";
  } else if (email !== email.toLowerCase()) {
    newErrors.email = "Only lowercase allowed";
  } else if (!email.endsWith("@gmail.com")) {
    newErrors.email = "Must be a gmail.com email";
  }

  // PASSWORD
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!password) {
    newErrors.password = "Password is required";
  } else if (!passwordRegex.test(password)) {
    newErrors.password =
      "Min 8 chars, 1 uppercase, 1 lowercase, 1 number & 1 special char";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const isAdminEmail = (candidateEmail) => {
  const normalized = candidateEmail.trim().toLowerCase();
  const adminUsers = JSON.parse(localStorage.getItem("admin_users") || "[]");
  const importedList = adminUsers.map((u) =>
    typeof u === "string" ? u.toLowerCase() : String(u?.email || "").toLowerCase()
  );
  return normalized === "admin@gmail.com" || importedList.includes(normalized);
};

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">

      {/* 🔥 LEFT SIDE IMAGE */}
      {/* <div className="w-[1100px] relative overflow-hidden"> */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">

        {/* IMAGE (shifted right for cross effect) */}
        <img
          src={login}
          // className="w-[120%] h-full object-cover translate-x-[1%]"
          className="w-full h-full object-cover"
        />

        {/* 🔥 GRADIENT OVERLAY (REFERENCE STYLE) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 via-green-500/50 to-blue-400/40"></div>

        {/* 🔥 TEXT */}
        <div className="absolute top-[56%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-20">
  <div className="max-w-md text-center">

    <h1 className="text-2xl xl:text-4xl font-bold leading-snug drop-shadow-xl">
      Learning today <br /> leading tomorrow.
    </h1>

    <p className="text-sm mt-4 opacity-95 drop-shadow-md">
      “Small steps today, big success tomorrow.”
    </p>

  </div>
</div>

      </div>

      {/* 🔥 RIGHT SIDE FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center sm:px-6 py-20 px-6">

        <div className="w-full max-w-sm sm:max-w-md">

          <h2 className="text-2xl font-semibold text-center mb-2">
            Sign In
          </h2>

          <p className="text-center text-gray-400 text-sm mb-4 sm:mb-6">
            Sign in with your assigned email and password
          </p>

          <form onSubmit={handleLogin}>

           <label className="text-sm text-gray-600">User Name</label>

            <div className="flex items-center bg-gray-200 rounded-full px-3 mt-1 mb-1">
              <FaEnvelope className="text-gray-400 text-sm mr-2" />

              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full bg-transparent outline-none text-sm sm:text-base py-2.5
                  ${errors.email 
                    ? "border border-red-500 bg-red-50 focus:ring-red-400"
                    : "bg-gray-200 focus:ring-blue-400"
                  }`}
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-xs mb-2">{errors.email}</p>
            )}

            {/* PASSWORD */}
            <label className="text-sm text-gray-600">Password</label>
              <div className="flex items-center bg-gray-200 rounded-full px-3 mt-1 mb-1">
                <FaLock className="text-gray-400 text-sm mr-2" />

                <input
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  className={`w-full bg-transparent outline-none text-sm sm:text-base py-2.5
                    ${errors.password 
                      ? "border border-red-500 bg-red-50 focus:ring-red-400"
                      : "bg-gray-200 focus:ring-blue-400"
                    }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mb-2">{errors.password}</p>
              )}
            {/* FORGOT */}
            <p className="text-xs text-right text-green-500 mb-4 cursor-pointer">
              Forgot password?
            </p>

            {/* LOGIN BUTTON */}
            <button className="w-full py-2 sm:py-2.5 text-sm sm:text-base rounded-full text-white font-medium bg-gradient-to-r from-blue-500 to-green-500 hover:scale-105 transition shadow-lg">
              Login
            </button>

          </form>

          <p className="mt-4 text-center text-xs text-gray-500">
            Google sign-in is disabled for this admin panel.
          </p>

        </div>
      </div>
    </div>
  );
}

