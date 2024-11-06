import React from 'react';
import StackNavigator from './navigation/Navigation';
import { AuthProvider } from './context/Authcontext';
import { LanguageProvider } from './context/LanguageContext';
const App = () => {
  return (
    <AuthProvider>
      <LanguageProvider>

        <StackNavigator />
      </LanguageProvider>
    </AuthProvider>

  )
};

export default App;
