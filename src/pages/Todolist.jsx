import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/fontawesome-free-solid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar';
import Card from '../components/Card';

function TodoList() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
                setTodos(response.data.data.todos);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, [todos]);



    const addTask = () => {
        navigate(`/Task-Form/new`);
    };

    return (
        <>
            <Navbar />
            <div className='w-full h-screen bg-slate-800 grid text-center '>
                <div className='flex-row flex-wrap overflow-y-auto justify-center pb-12'>
                    <h1 className='mt-12 font-bold text-white text-3xl'>To-Do List</h1>
                    {todos.map((todo) => (
                        <Card
                            key={todo.id}
                            title={todo.title}
                            description={todo.description}
                            status={todo.status}
                            deadline={todo.deadline}
                            id={todo.id}
                        />
                    ))}
                </div>
            </div>
            <div className="fixed bottom-4 right-8 md:right-3 lg:right-8">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded hidden md:block" onClick={addTask}>
                    <FontAwesomeIcon icon={faPlus} /> Add Task
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 h-12 w-12 rounded-full md:hidden block" onClick={addTask}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </>
    );
}

export default TodoList;
