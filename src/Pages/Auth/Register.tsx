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
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    username: '',
    genero: '',
    dni: '',
    celular: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerUser = async () => {
    const { email, password, first_name, last_name, username, genero, dni, celular } = formData;
    if (email && password && first_name && last_name && username && genero) {
        try {
            const response = await toast.promise(
                axios.post(`${API_BASE_URL}/api/register`, {
                    email, password, first_name, last_name, username, genero, dni, celular
                }),
                {
                    pending: "Creating Account...",
                    success: "Signup successful: WELCOME!",
                    error: "Error Creating account, Please try again🤗",
                }
            );

            if (response.status !== 201) {
                throw new Error("Error creating account");
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
                  name="first_name"
                  className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="First Name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  name="last_name"
                  className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  name="username"
                  className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="Username"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <select
                  name="genero"
                  className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  value={formData.genero}
                  onChange={handleChange}
                >
                  <option value="">Seleccione su género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="No prefiero decirlo">No prefiero decirlo</option>
                </select>
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  name="dni"
                  className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="DNI"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  name="celular"
                  className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="Celular"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  name="email"
                  className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  name="password"
                  className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-between items-center mb-6"></div>
              <p
                className="flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out w-full cursor-pointer"
                onClick={registerUser}
              >
                Sign Up
              </p>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center text-sm text-textColor font-semibold mx-4 mb-0">
                  Already have an account?
                </p>
              </div>
              <Link
                to={"/login"}
                className="flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              >
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
