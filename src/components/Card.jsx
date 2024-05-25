
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/fontawesome-free-solid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Card({ id, title, description, status, deadline }) {
    const navigate = useNavigate();
    const newDeadline = new Date(deadline);
    const formattedDeadline = newDeadline.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const currentDate = new Date();

    const gotoEdit = () => {
        navigate(`/Task-Form/${id}`);
    }

    const gotoDelete = async() => {
        try{
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
            if(response.status === 200){
                navigate('/');
            }
            else{
                console.error('Error deleting data: ', response);
            }
        }catch(error){
            console.error('Error deleting data: ', error);
        }
    }

    return (
        <div key={id} className='grid grid-cols-12 text-center my-12 gap-4'>
            <div className="bg-lime-100 cursor-pointer rounded-lg shadow-xl col-start-3 col-span-8 min-h-36 p-4">
                <h2 className="text-lg font-bold mb-2 text-gray-800">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="flex items-center mb-2">
                    <span className="text-lg text-gray-500">ID:</span>
                    <span className="text-lg font-semibold ml-1">{id}</span>
                </div>
                <div className="flex items-center mb-2">
                    <span className="text-lg text-gray-500">Status:</span>
                    {status === 'complete' && <span className="text-lg font-semibold ml-1 text-green-600">Completed</span>}
                    {status === 'in-progress' && newDeadline > currentDate && <span className="text-lg font-semibold ml-1 text-blue-600">In-Progress</span>}
                    {status === 'pending' && newDeadline > currentDate && <span className="text-lg font-semibold ml-1 text-yellow-600">Pending</span>}
                    {status !== 'complete' && newDeadline < currentDate && <span className="text-slgfont-semibold ml-1 text-red-600">Missed</span>}
                </div>
                <div className="flex items-center">
                    <span className="text-lg text-gray-500">Due Date:</span>
                    <span className="text-lg font-semibold ml-1">{formattedDeadline}</span>
                </div>
                
                <div className="mt-4 flex justify-between sm:justify-end">
                    <button className="mr-2 bg-lime-600 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded" onClick={gotoEdit} >
                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                        Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={gotoDelete} >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
