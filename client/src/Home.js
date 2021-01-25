import React from "react";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('/api/home').then((response) => {
            setTodos(response.data.todo);
        })
    }, []);

    const handleDelete = async (todo) => {
        await axios.post("/api/Delete", todo, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        setTodos(todos.filter(item => item._id !== todo._id));
    }

    const allTodos = todos.length > 0 && todos.map((todo) => {
        return (
            /*<li key={todo._id}>
                <div>
                    <p>Text: {todo.title}</p>
                    <Link to={{pathname: "/Edit", state: {_id: todo._id, title: todo.title}}}>Edit</Link>
                    <button onClick={() => {
                        handleDelete(todo)
                    }}>Delete
                    </button>
                </div>
            </li>*/
            <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                                Jane Cooper
                            </div>
                            <div className="text-sm text-gray-500">
                                jane.cooper@example.com
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{todo.title}</div>
                    <div className="text-sm text-gray-500">(todo description)</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Active
                                            </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800">
                                                Urgent
                                            </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={{
                        pathname: '/Edit',
                        state: {_id: todo._id, title: todo.title}
                    }}>Edit</Link>
                </td>
                <td>
                    <button onClick={() => {
                        handleDelete(todo)
                    }}>Delete
                    </button>
                </td>
            </tr>
        );
    });

    /*axios.get('/api/home').then((response) => {
        console.log(response.data);
    })*/

    return (
        <div>
            <Navbar/>
            {/*<ul>{allTodos}</ul>*/}
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {allTodos}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;