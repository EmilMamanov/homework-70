import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchContacts } from './thunk/contactThunks.ts';
import './App.css';
import { Link } from 'react-router-dom';
import ContactCard from './components/ContactCard';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector((state) => state.contacts.contacts);

    useEffect(() => {
        dispatch(fetchContacts());
        console.log('Contacts:', contacts);
    }, [dispatch]);

    return (
        <div>
            <h1>Contacts</h1>
            <Link to="/add">Add new contact</Link>

            <div className="contact-list">
                {contacts ? (
                    contacts.map((contact) => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))
                ) : (
                    <p>Loading contacts...</p>
                )}
            </div>
        </div>
    );
};

export default App;