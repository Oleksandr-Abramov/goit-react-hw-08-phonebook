// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import * as contactsActions from '../../redux/contacts/contactsActions';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { ContactList } from '../../components/ContactList/ContactList';
import { Filter } from '../../components/Filter/Filter';
import { UserMenu } from 'components/UserMenu/UserMenu';

export const Phonebook = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const symbolsFilter = useSelector(state => state.contacts.filter);

  const handleOnInputFilter = evt => {
    const { value } = evt.target;
    dispatch(contactsActions.findContact(value));
  };

  const normFilter = symbolsFilter.toLowerCase();
  const filteredContacts = normFilter
    ? contacts.filter(item => item.name.toLowerCase().includes(normFilter))
    : null;
  return (
    <div>
      <UserMenu />
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter value={symbolsFilter} onChange={handleOnInputFilter} />
      <ContactList contactsList={filteredContacts || contacts} />
    </div>
  );
};
