import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

function SignIn() {
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
        message: ''
    });

    const formValues = (event) => {
        setUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value
        });
    };

    const history = useHistory();
    const signIn = async (event) => {
        event.preventDefault();
        try {
            const body = JSON.stringify({
                email: userDetails.email,
                password: userDetails.password
            });

            const response = await axios.post("/api/signin", body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.match){
                history.push("/home");
            }else {

            }
        }catch (error){
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div>
                    <img className="mx-auto h-12 w-auto"
                         src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="Workflow"/>
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8" action="#" method="POST" onSubmit={signIn}>
                    <input type="hidden" name="remember" value="true"/>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <input aria-label="Email address" name="email" type="email" required
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                   placeholder="Email address" onChange={formValues}/>
                        </div>
                        <div className="-mt-px">
                            <input aria-label="Password" name="password" type="password" required
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                   placeholder="Password" onChange={formValues}/>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember_me" type="checkbox"
                                   className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                            <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm leading-5">
                            <Link to="/forgotpassword"
                                  className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                Forgot your password?
                            </Link>
                        </div>

                        <div className="text-sm leading-5">
                            <Link to="/signup"
                                  className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                Not a member?
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                 fill="currentColor" viewBox="0 0 20 20">
            </svg>
          </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;