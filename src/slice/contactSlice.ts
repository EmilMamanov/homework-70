import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../types';
import {fetchContacts, deleteContact, addContact} from '../thunk/contactThunks';
import {RootState} from '../app/store.ts'

interface ContactsState {
    contacts: Contact[];
    fetchLoading: boolean;
    deleteLoading: false | string;
    addLoading: boolean;
}

const initialState: ContactsState = {
    contacts: [],
    fetchLoading: false,
    deleteLoading: false,
    addLoading: false,
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, action: PayloadAction<Contact[]>) => {
            state.contacts = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContacts.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchContacts.fulfilled, (state, { payload: contacts }) => {
            state.fetchLoading = false;
            state.contacts = contacts;
        });
        builder.addCase(fetchContacts.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(deleteContact.pending, (state, { meta }) => {
            state.deleteLoading = meta.arg;
        });
        builder.addCase(deleteContact.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteContact.rejected, (state) => {
            state.deleteLoading = false;
            state.fetchLoading = false;
        });
        builder.addCase(addContact.pending, (state) => {
            state.addLoading = true;
        });
        builder.addCase(addContact.fulfilled, (state, { payload: updatedContacts }) => {
            state.addLoading = false;
            state.contacts = updatedContacts;
        });
        builder.addCase(addContact.rejected, (state) => {
            state.addLoading = false;
        });
    },
});

export const { setContacts } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectFetchContactsLoading = (state: RootState) => state.contacts.fetchLoading;
export const selectDeleteContactsLoading = (state: RootState) => state.contacts.deleteLoading;
