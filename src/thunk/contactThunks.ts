import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { Contact, ApiContact } from '../types';
import { AppDispatch } from '../app/store';
import { setContacts } from '../slice/contactSlice.ts';

export const fetchContacts = createAsyncThunk<Contact[], undefined, { dispatch: AppDispatch }>(
    'contact/fetchAll',
    async (_, thunkAPI) => {
        try {
            const contactsResponse = await axiosApi.get<Record<string, Contact> | null>('/contacts.json');
            const contacts = contactsResponse.data;

            let newContacts: Contact[] = [];

            if (contacts) {
                newContacts = Object.keys(contacts).map(key => ({
                    ...contacts[key],
                    id: key,
                }));
            }

            thunkAPI.dispatch(setContacts(newContacts));

            return newContacts;
        } catch (error) {
            console.error('Error fetching contacts:', error);
            return [];
        }
    }
);

export const addContact = createAsyncThunk<Contact[], ApiContact, { dispatch: AppDispatch }>(
    'contacts/add',
    async (newContact, thunkAPI) => {
        try {
            await axiosApi.post('/contacts.json', newContact);

            const updatedContactsResponse = await axiosApi.get<Record<string, Contact>>('/contacts.json');
            const updatedContacts = Object.keys(updatedContactsResponse.data).map(key => ({
                ...updatedContactsResponse.data[key],
                id: key,
            }));

            thunkAPI.dispatch(setContacts(updatedContacts));

            return updatedContacts;
        } catch (error) {
            console.error('Error adding contact:', error);
            return thunkAPI.getState().contacts.contacts;
        }
    }
);

export const deleteContact = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
    'contacts/delete',
    async (contactId, thunkAPI) => {
        try {
            await axiosApi.delete(`/contacts/${contactId}.json`);

            const updatedContactsResponse = await axiosApi.get<Record<string, Contact>>('/contacts.json');
            const updatedContacts = Object.keys(updatedContactsResponse.data).map(key => ({
                ...updatedContactsResponse.data[key],
                id: key,
            }));

            thunkAPI.dispatch(setContacts(updatedContacts));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    }
);

export const editContact = createAsyncThunk<Contact[], { id: string; updatedContact: ApiContact }, { dispatch: AppDispatch }>(
    'contacts/edit',
    async ({ id, updatedContact }, thunkAPI) => {
        try {
            await axiosApi.put(`/contacts/${id}.json`, updatedContact);

            const updatedContactsResponse = await axiosApi.get<Record<string, Contact>>('/contacts.json');
            const updatedContacts = Object.keys(updatedContactsResponse.data).map(key => ({
                ...updatedContactsResponse.data[key],
                id: key,
            }));

            thunkAPI.dispatch(setContacts(updatedContacts));

            return updatedContacts;
        } catch (error) {
            console.error('Error editing contact:', error);
            return thunkAPI.getState().contacts.contacts;
        }
    }
);
