// src/store/rentalStore.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/rentals"
    : `${import.meta.env.VITE_API_URL}/api/rentals`;
const RentalContext = createContext();

export const RentalProvider = ({ children }) => {
  const [rentals, setRentals] = useState([]);

  // Fetch rentals from the database
  const fetchRentals = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setRentals(data.rentals || data); // Handle both response formats
      } else {
        console.error('Failed to fetch rentals');
      }
    } catch (error) {
      console.error('Error fetching rentals:', error);
    }
  };

  useEffect(() => {
    fetchRentals(); // Fetch rentals when the app loads
  }, []);

  return (
    <RentalContext.Provider value={{ rentals, fetchRentals }}>
      {children}
    </RentalContext.Provider>
  );
};

export const useRentalStore = () => {
  return useContext(RentalContext);
};