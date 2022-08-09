import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import * as contactsActions from '../redux/contactsActions';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { fetchContacts } from '../redux/contactsOperations';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const symbolsFilter = useSelector(state => state.contacts.filter);

  // const isFirstRender = useRef(true);

  useEffect(() => {
    // if (!isFirstRender.current) {
    dispatch(fetchContacts());
    // } else {
    //   isFirstRender.current = false;
    // }
  }, [dispatch]);

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
      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter value={symbolsFilter} onChange={handleOnInputFilter} />
      <ContactList contactsList={filteredContacts || contacts} />
    </div>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const localData = JSON.parse(localStorage.getItem(CONTACTS_KEY));
//     if (localData) {
//       this.setState({ contacts: localData });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     const { contacts } = this.state;
//     if (contacts.length !== prevState.contacts.length) {
//       localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
//     }
//   }

//   handleSubmit = dataForm => {
//     this.state.contacts.find(
//       ({ name }) => name.toLowerCase() === dataForm.name.toLowerCase()
//     )
//       ? alert(`${dataForm.name} is already in contacts.`)
//       : this.setState(prevState => ({
//           contacts: [...prevState.contacts, dataForm],
//         }));
//   };

//   handleOnInputFilter = evt => {
//     const { value, name } = evt.target;
//     this.setState({ [name]: value });
//   };

//   onDelete = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(item => item.id !== id),
//     }));
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const normFilter = filter.toLowerCase();
//     const filteredContacts = contacts.filter(item =>
//       item.name.toLowerCase().includes(normFilter)
//     );

//     return (
//       <div>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.handleSubmit} />

//         <h2>Contacts</h2>
//         <Filter value={filter} onChange={this.handleOnInputFilter} />
//         <ContactList
//           contactsList={filteredContacts || contacts}
//           onDelete={this.onDelete}
//         />
//       </div>
//     );
//   }
// }
