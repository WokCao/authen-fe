import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface IFormInput {
  email: string;
  password: string;
}

export const Register: React.FC = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post<{ message: string }>('http://localhost:3000/auth/register', data);
      alert(response.data.message);
    } catch (error: any) {
      if (error.response) {
        const { message, statusCode }: { message: string, statusCode: number } = error.response.data;

        if (statusCode === 409 && message === "Email already exists") {
          setError("email", { type: "manual", message: message });
        } else {
          setError("password", { type: "manual", message: message });
        }
      } else {
        alert('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Register</h2>
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
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters long' },
                maxLength: { value: 30, message: 'Password must be at most 30 characters long' }
              })}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Register
          </button>
        </form>

        <Link to={'/login'}>
          <p className='mt-16 rounded-lg border w-fit p-2 hover:bg-lime-400'>Login</p>
        </Link>
      </div>
    </div>
  );
};
