// components/Input.jsx
import React from 'react';

const Input = ({ label, type, name, value, onChange }) => (
  <div className="mb-6">
    <label className="block text-secondary text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="shadow-neon appearance-none border rounded w-full py-2 px-3 text-primary bg-background leading-tight focus:outline-none focus:shadow-outline transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    />
  </div>
);

export default Input;
