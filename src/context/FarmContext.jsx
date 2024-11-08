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
      id: Date.now().toString(), // Simple way to generate unique IDs
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
    setFarms(farms.filter(farm => farm.id !== farmId));
  };

  return (
    <FarmContext.Provider value={{ farms, addFarm, updateFarm, deleteFarm }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarms = () => useContext(FarmContext);
