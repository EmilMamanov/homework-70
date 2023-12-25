import React, { useState } from 'react';
import ContactModal from './ContactModal';
import { Contact as ContactType } from '../types';
import '../App.css';
import { editContact, deleteContact } from '../thunk/contactThunks.ts';
interface ContactCardProps {
    contact: ContactType;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="contact-card" onClick={handleOpenModal}>
                <h2>{contact.name}</h2>
                <p>Email: {contact.email}</p>
                <p>Phone: {contact.phone}</p>
                <img src={contact.photo} alt={`Photo of ${contact.name}`} />
            </div>
            <ContactModal
                isOpen={isModalOpen}
                contact={contact}
                onClose={handleCloseModal}
                onEdit={async (editedContact) => {
                    await dispatch(editContact({ id: contact.id, updatedContact: editedContact }));
                    handleCloseModal();
                }}
                onDelete={() => {
                    dispatch(deleteContact(contact.id));
                    handleCloseModal();
                }}
            />
        </>
    );
};

export default ContactCard;
