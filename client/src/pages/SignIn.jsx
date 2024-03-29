import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);  
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <h1 className="text-3xl text-center mb-6 font-bold">Sign In Page</h1>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 rounded-lg text-white">
              Allianz
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            quisquam optio maxime nesciunt, modi quos distinctio, ea vitae fugit
            doloribus nam. Nobis modi neque doloribus, sapiente optio animi
            culpa iusto!
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Label value="Your password" />
              <TextInput
                type={showPassword ? "text" : "password"}
                placeholder="********"
                id="password"
                onChange={handleChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-9 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-9 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-xs sm:text-lg">
            <span className="text-sm">
              Dont have an account?
              <Link
                to="/sign-up"
                className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
              >
                Register
              </Link>
            </span>
            <span className="text-sm">
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out"
              >
                Forgot password?
              </Link>
            </span>
          </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <div className="flex items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
