import React from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

function Navbar() {
    const history = useHistory();
    return (
        <div>
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <p className="px-3 py-2 rounded-md text-lg font-medium text-gray-300 ">Your ToDo
                                        list:</p>
                                    <Link to={'/createToDo'}
                                          className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:text-white hover:bg-gray-700">Create
                                        ToDo</Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button onClick={async () => {
                                await axios.post("/api/LogOut", {
                                    headers: {
                                        'Content-Type': 'application/json',
                                    }
                                });
                                history.push("/");
                            }} className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:text-white hover:bg-gray-700">Sign
                                out</button>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;