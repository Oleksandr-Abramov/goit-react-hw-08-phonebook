// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux/es/exports';
// import * as contactsActions from '../redux/contactsActions';
// import { ContactForm } from './ContactForm/ContactForm';
// import { ContactList } from './ContactList/ContactList';
// import { Filter } from './Filter/Filter';
// import { fetchContacts } from '../redux/contactsOperations';
import { Home } from 'pages/Home/Home';
import { Login } from 'pages/Login/Login';
import { NotFound } from 'pages/NotFound/NotFound';
// import { Phonebook } from 'pages/Phonebook/Phonebook';
import { Register } from 'pages/Register/Register';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Routes, Route } from 'react-router-dom';
import { refreshCurrentUser } from 'redux/auth/authOperations';
import { lazy, Suspense } from 'react';
import s from './App.module.css';
import { PrivateRoute } from './PrivateRoute';

// const Home = lazy(() => import('../pages/Home/Home'));
// const Login = lazy(() => import('../pages/Login/Login'));
const Phonebook = lazy(() => import('../pages/Phonebook'));
// const Register = lazy(() => import('../pages/Register/Register'));
// const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

export const App = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.auth.isLogged);
  // const symbolsFilter = useSelector(state => state.contacts.filter);

  // const isFirstRender = useRef(true);

  useEffect(() => {
    dispatch(refreshCurrentUser());
  }, [dispatch]);

  // const handleOnInputFilter = evt => {
  //   const { value } = evt.target;
  //   dispatch(contactsActions.findContact(value));
  // };

  // const normFilter = symbolsFilter.toLowerCase();
  // const filteredContacts = normFilter
  //   ? contacts.filter(item => item.name.toLowerCase().includes(normFilter))
  //   : null;
  return (
    <div className={s.container}>
      {!isLogged && (
        <nav>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              s.link + (isActive ? ' ' + s.active : '')
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              s.link + (isActive ? ' ' + s.active : '')
            }
          >
            Register
          </NavLink>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/phonebook"
          element={
            <Suspense fallback={<p>Loading ...</p>}>
              <PrivateRoute>
                <Phonebook />
              </PrivateRoute>
            </Suspense>
          }
        />
        {/* <PrivateRoute>
          <Phonebook />
        </PrivateRoute> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    // <div>
    //   <h1>Phonebook</h1>
    //   <ContactForm />

    //   <h2>Contacts</h2>
    //   <Filter value={symbolsFilter} onChange={handleOnInputFilter} />
    //   <ContactList contactsList={filteredContacts || contacts} />
    // </div>
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
