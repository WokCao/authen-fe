// src/components/Home.tsx
import React from 'react';

export interface info {
    id: number,
    email: string
}

export const Home: React.FC<info> = ({ id, email }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 space-y-4 bg-white rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-semibold text-blue-600">Welcome to Our Site, {email}</h1>
        <p className="text-gray-700">
          This is a simple homepage. Feel free to explore the registration and login options.
        </p>
        <p className="text-gray-500">Enjoy your experience!</p>
        <p>Id: {id}</p>
      </div>
    </div>
  );
};