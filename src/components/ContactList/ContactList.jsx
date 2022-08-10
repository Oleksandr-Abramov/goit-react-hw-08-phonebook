import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteContact,
  fetchContacts,
} from 'redux/contacts/contactsOperations';
import s from './ContactList.module.css';

export const ContactList = ({ contactsList }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    contactsList.length !== 0 && (
      <ul className={s.list}>
        {contactsList.map(({ name, number, id }) => (
          <li key={id} className={s.item}>
            {name}: {number}
            <button
              type="button"
              onClick={() => {
                handleDelete(id);
              }}
              className={s.button}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    )
  );
};

ContactList.propTypes = {
  contactsList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.string,
    })
  ),
};
