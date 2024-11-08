import React from 'react';
import StackNavigator from './navigation/Navigation';
import { AuthProvider } from './context/Authcontext';
import { LanguageProvider } from './context/LanguageContext';
import { FarmProvider } from './context/FarmContext';
const App = () => {
  return (
    <AuthProvider>
      <FarmProvider>
        <LanguageProvider>

          <StackNavigator />
        </LanguageProvider>
      </FarmProvider>
    </AuthProvider>

  );
};

export default App;
