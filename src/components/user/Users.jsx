import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../utils/ApiFunctions';
import { Row, Col } from 'react-bootstrap';
import { FaTrashAlt, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
            setIsLoading(false);
            console.log(users);
        } catch (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            setSuccessMessage(`User with ID ${userId} has been deleted.`);
            fetchUsers();
        } catch (error) {
            setErrorMessage(error.message);
        }

        setTimeout(() => {
            setSuccessMessage('');
            setErrorMessage('');
        }, 3000);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const calculateTotalPages = () => Math.ceil(users.length / usersPerPage);

    return (
        <>
            {isLoading ? (
                <p>Loading users...</p>
            ) : (
                <section className="container mt-5 mb-5">
                    {successMessage && <p className="alert alert-success">{successMessage}</p>}
                    {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                    <div className="d-flex justify-content-between mb-3">
                        <h2>Manage Users</h2>
                    </div>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr key={user.id} className="text-center">
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td className="gap-2">
                                        <Link to={`/user-details/${user.email}`}>
                                            <span className="btn btn-info btn-sm">
                                                <FaEye /> View
                                            </span>
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(user.email)}
                                        >
                                            <FaTrashAlt /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center mt-3">
                        <button
                            className="btn btn-secondary mx-1"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <button
                            className="btn btn-secondary mx-1"
                            disabled={currentPage === calculateTotalPages()}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </section>
            )}
        </>
    );
};

export default Users;
