import {ApiContact, ContactMutation} from '../types';
import React, {useState} from 'react';

const initialState: ContactMutation = {
    name: '',
    phone: '',
    email: '',
    photo: '',
};

interface Props {
    onSubmit: (dish: ApiContact) => void;
    existingContact?: ContactMutation;
    isEdit?: boolean;
    isLoading?: boolean;
}

const ContactForm: React.FC<Props> = ({onSubmit, existingContact = initialState, isEdit = false, isLoading = false}) => {
    const [contact, setContact] = useState<ContactMutation>(existingContact);

    const changeContact = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setContact((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;

        onSubmit({
            ...contact,
            phone: parseFloat(contact.phone),
        });
    };

    return (
        <form onSubmit={onFormSubmit}>
            <h4>{isEdit ? 'Edit Contact' : 'Add new Contact'}</h4>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    value={contact.name}
                    onChange={changeContact}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">email</label>
                <textarea
                    name="email"
                    id="email"
                    className="form-control"
                    value={contact.email}
                    onChange={changeContact}
                />
            </div>
            <div className="form-group">
                <label htmlFor="photo">Photo</label>
                <input
                    type="url"
                    name="photo"
                    id="photo"
                    className="form-control"
                    value={contact.photo}
                    onChange={changeContact}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    type="number"
                    name="phone"
                    id="phone"
                    className="form-control"
                    value={contact.phone}
                    onChange={changeContact}
                />
            </div>

            <button type="submit" className="btn btn-primary mt-2" disabled={isLoading}>
                {isEdit ? 'Update' : 'Create'}
            </button>
        </form>
    );
};

export default ContactForm;