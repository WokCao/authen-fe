import axios from 'axios';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

interface ILoginFormInput {
    email: string;
    password: string;
}

interface authenticatedProps {
    setIsAuthenticated: any;
    valid: boolean
  }

export const Login: React.FC<authenticatedProps> = ({ setIsAuthenticated, valid }) => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<ILoginFormInput>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', data);

            // Check if login was successful
            if (response.data.statusCode === 200) {
                localStorage.setItem('authToken', response.data.access_token);
                setIsAuthenticated(true);
                navigate('/');
            }
        } catch (error: any) {
            if (error.response) {
                const { message, statusCode }: { message: string, statusCode: number } = error.response.data;

                if (statusCode === 401 && message === "Email doesn\'t exist") {
                    setError("email", { type: "manual", message: message });
                } else {
                    setError("password", { type: "manual", message: message });
                }
            } else {
                alert('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
                {!valid ? (<p className='text-center text-red-600'>Token has expired</p>) : ('')}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                        Login
                    </button>
                </form>

                <Link to={'/register'}>
                    <p className='mt-16 rounded-lg border w-fit p-2 hover:bg-lime-400'>Create an account?</p>
                </Link>
            </div>
        </div>
    );
};