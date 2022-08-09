import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { findContact } from './contactsActions';
import {
  addNewContact,
  deleteContact,
  fetchContacts,
} from './contactsOperations';

export const items = createReducer([], {
  [fetchContacts.fulfilled]: (_, { payload }) => payload,
  [addNewContact.fulfilled]: (state, { payload }) => {
    state.push(payload);
  },
  [deleteContact.fulfilled]: (state, { payload }) =>
    state.filter(item => item.id !== payload),
});

export const filter = createReducer('', {
  [findContact]: (_, { payload }) => payload,
});

export const contactsReducer = combineReducers({
  items,
  filter,
});
