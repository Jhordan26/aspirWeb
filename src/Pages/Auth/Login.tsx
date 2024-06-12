import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateValue } from "../../context/StateProvider";
import ProviderAuth, { ImageBox } from ".";
import { API_BASE_URL } from '../../config';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginUser = async () => {
    if (email && password) {
      try {
        const response = await toast.promise(
          axios.post(`${API_BASE_URL}/api/login`, {
            email,
            password
          }),
          {
            pending: "Signing in...",
            success: "Signin successful: WELCOME!",
            error: "Error signing in, Please try again🤗",
          }
        );

        if (response.status !== 200) {
          throw new Error("Error signing in");
        }

        const { token, user } = response.data;
        dispatch({
          type: "SET_USER",
          user: user,
        });
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        navigate("/");
      } catch (error:any) {
        toast.error(error.message, { autoClose: 15000 });
      }
    } else {
      toast.warn("Please fill all the fields", { autoClose: 15000 });
    }
  };

  return (
    <section className="w-full h-auto">
      <div className="container md:py-10 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <ImageBox />
          <div className="w-full md:w-[30rem]">
            <form className="p-2">
              <ProviderAuth />
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center text-textColor text-sm font-semibold mx-4 mb-0">
                  OR
                </p>
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  name="email"
                  className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="Email"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  name="password"
                  className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex justify-between items-center mb-6">
                <Link
                  to="/"
                  className="text-orange-600 hover:text-orange-700 focus:text-orange-700 active:text-orange-800 duration-200 transition ease-in-out"
                >
                  Forgot password?
                </Link>
              </div>
              <p
                className="flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out w-full cursor-pointer"
                onClick={loginUser}
              >
                Sign In
              </p>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center text-sm text-textColor font-semibold mx-4 mb-0">
                  Don't have an account?
                </p>
              </div>
              <Link
                to={"/register"}
                className="flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              >
                Sign Up
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
