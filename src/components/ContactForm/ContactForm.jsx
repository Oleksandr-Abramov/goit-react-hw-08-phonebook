import s from './ContactForm.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewContact } from 'redux/contacts/contactsOperations';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeForm = evt => {
    const { value, name } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleOnSubmitForm = evt => {
    evt.preventDefault();
    const dataForm = {
      name,
      number,
    };

    contacts.find(
      ({ name }) => name.toLowerCase() === dataForm.name.toLowerCase()
    )
      ? alert(`${dataForm.name} is already in contacts.`)
      : dispatch(addNewContact(dataForm));
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleOnSubmitForm} className={s.form}>
      <div>
        <label>
          <p>Name</p>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChangeForm}
            className={s.textbox}
          />
        </label>
      </div>
      <div>
        <label>
          <p>Number</p>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChangeForm}
            className={s.textbox}
          />
        </label>
      </div>
      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
};
