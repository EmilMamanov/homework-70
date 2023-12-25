import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './App';
import AddContactPage from './Pages/AddContactPage';

const RoutesComponent: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/add" element={<AddContactPage />} />
        </Routes>
    );
};

export default RoutesComponent;
