import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ContactForm from './ContactForm';
import { ApiContact, ContactMutation } from '../types';

interface ContactModalProps {
    isOpen: boolean;
    contact: ApiContact;
    onClose: () => void;
    onEdit: (editedContact: ContactMutation) => void;
    onDelete: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, contact, onClose, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleEditSubmit = async (editedContact: ContactMutation) => {
        await onEdit(editedContact);
        setIsEditing(false);
    };

    return (
        <Modal show={isOpen} onHide={onClose} aria-labelledby="contact-modal-label">
            <Modal.Header closeButton>
                <Modal.Title id="contact-modal-label">{contact.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Email: {contact.email}</p>
                <p>Phone: {contact.phone}</p>
                <img src={contact.photo} alt={`Photo of ${contact.name}`} />
            </Modal.Body>
            <Modal.Footer>
                {!isEditing ? (
                    <>
                        <Button variant="primary" onClick={handleEditClick}>
                            Edit
                        </Button>
                        <Button variant="danger" onClick={onDelete}>
                            Delete
                        </Button>
                    </>
                ) : (
                    <>
                        <ContactForm
                            onSubmit={handleEditSubmit}
                            existingContact={{
                                name: contact.name,
                                email: contact.email,
                                phone: contact.phone,
                                photo: contact.photo,
                            }}
                        />
                        <Button variant="secondary" onClick={handleCancelEdit}>
                            Cancel Edit
                        </Button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ContactModal;