import { createAsyncThunk } from '@reduxjs/toolkit';
import { addContacts, deleteContacts, getContacts } from 'service/apiService';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await getContacts();
      return contacts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addNewContact = createAsyncThunk(
  'contacts/addNewContact',
  async (dataContact, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await addContacts(dataContact);
      // if (resp.status !== 201) {
      //   throw new Error("Can't add contact. Server error.");
      // }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const { id } = await deleteContacts(contactId);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
