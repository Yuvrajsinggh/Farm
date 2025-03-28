import React, { createContext, useState, useContext } from 'react';

const FarmContext = createContext();

export const FarmProvider = ({ children }) => {
  const [farms, setFarms] = useState([
    {
      id: '1',
      name: 'Green Valley Farm',
      location: 'California',
      crop: 'Corn',
      soil: 'Loamy',
    },
  ]);

  const addFarm = (farm) => {
    const newFarm = {
      ...farm,
      id: Date.now().toString(),
    };
    setFarms(prevFarms => [...prevFarms, newFarm]);
  };

  const updateFarm = (updatedFarm) => {
    setFarms(prevFarms =>
      prevFarms.map(farm =>
        farm.id === updatedFarm.id ? updatedFarm : farm
      )
    );
  };

  const deleteFarm = (farmId) => {
    setFarms(prevFarms => prevFarms.filter(farm => farm.id !== farmId));
  };

  return (
    <FarmContext.Provider value={{
      farms,
      setFarms, // Add setFarms to the context value
      addFarm,
      updateFarm,
      deleteFarm
    }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarms = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarms must be used within a FarmProvider');
  }
  return context;
};