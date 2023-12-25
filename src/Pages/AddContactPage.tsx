import React from 'react';
import ContactForm from '../components/ContactForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addContact } from '../thunk/contactThunks';
import {ApiContact} from '../types';
import { useNavigate } from 'react-router-dom';

const AddContactPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoading = useAppSelector((state) => state.contacts.addLoading);

    const handleAddContact = (newContact: ApiContact) => {
        dispatch(addContact(newContact)).then(() => {
            navigate('/');
        });
    };

    return (
        <div>
            <h1>Add New Contact</h1>
            <ContactForm onSubmit={handleAddContact} isLoading={isLoading} />
        </div>
    );
};

export default AddContactPage;