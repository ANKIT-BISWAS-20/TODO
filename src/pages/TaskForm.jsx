import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/fontawesome-free-solid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TaskForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const formattedDueDate = new Date();
    const formattedDueDateString = formattedDueDate.toISOString().split('T')[0];
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        dueDate: `${formattedDueDateString}`
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id !== 'new') {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
                    const formattedDueDate = new Date(response.data.data.todo.deadline);
                    const formattedDueDateString = formattedDueDate.toISOString().split('T')[0];
                    setFormData({
                        title: response.data.data.todo.title,
                        description: response.data.data.todo.description,
                        status: response.data.data.todo.status,
                        dueDate: formattedDueDateString
                    });
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, {
                title: formData.title,
                description: formData.description,
                status: formData.status,
                deadline: formData.dueDate
            });
            if (response.status === 201) {
                navigate('/');
            }
            else {
                alert('Failed to add task');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
                title: formData.title,
                description: formData.description,
                status: formData.status,
                deadline: formData.dueDate
            });
            if (response.status === 200) {
                navigate('/');
            }
            else {
                alert('Failed to update task');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className='w-full h-screen bg-slate-800 flex justify-center items-center '>
                {id === 'new' && (<form className='bg-slate-50 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 sm:w-6/12 w-10/12' onSubmit={handleSubmit}>
                    <label className='block text-gray-700 text-xl font-bold mb-4 text-center' htmlFor='title'>
                        Add Task
                    </label>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>
                            Title
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-200'
                            id='title'
                            name='title'
                            type='text'
                            placeholder='Enter title'
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
                            Description
                        </label>
                        <textarea
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none bg-slate-200'
                            id='description'
                            name='description'
                            placeholder='Enter description'
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='status'>
                            Status
                        </label>
                        <select
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-200'
                            id='status'
                            name='status'
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value='pending' className='text-yellow-600'>Pending</option>
                            <option value='in-progress' className='text-blue-600'>In-Progress</option>
                            <option value='complete' className='text-green-600'>Completed</option>
                        </select>
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='dueDate'>
                            Due Date
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-200'
                            id='dueDate'
                            name='dueDate'
                            type='date'
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex items-center justify-center'>
                        <button
                            className='bg-lime-600 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline '
                            type='submit'
                        >
                            <FontAwesomeIcon icon={faPlus} /> Add Task
                        </button>
                    </div>
                </form>)}
                {id !== 'new' && (<form className='bg-slate-50 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 sm:w-6/12 w-10/12' onSubmit={handleUpdate}>
                    <label className='block text-gray-700 text-xl font-bold mb-4 text-center' htmlFor='title'>
                        Edit Task
                    </label>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>
                            Title
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-200'
                            id='title'
                            name='title'
                            type='text'
                            placeholder='Enter title'
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
                            Description
                        </label>
                        <textarea
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none bg-slate-200'
                            id='description'
                            name='description'
                            placeholder='Enter description'
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='status'>
                            Status
                        </label>
                        <select
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-200'
                            id='status'
                            name='status'
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value='pending' className='text-yellow-600'>Pending</option>
                            <option value='in-progress' className='text-blue-600'>In-Progress</option>
                            <option value='complete' className='text-green-600'>Completed</option>
                        </select>
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='dueDate'>
                            Due Date
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-200'
                            id='dueDate'
                            name='dueDate'
                            type='date'
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex items-center justify-center'>
                        <button
                            className='bg-lime-600 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline '
                            type='submit'
                        >
                            <FontAwesomeIcon icon={faEdit} /> Edit Task
                        </button>
                    </div>
                </form>)}

            </div>
        </>
    );
}

export default TaskForm;
