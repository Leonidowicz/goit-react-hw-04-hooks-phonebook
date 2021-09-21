import { useState, useEffect } from 'react';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';
import { ContactForm } from './Components/ContactForm';
import { Filter } from './Components/Filter';
import { ContactList } from './Components/ContactList';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
export const App = () => {
  const [contacts, setContacts] = useState(() => {
    if (
      !localStorage.getItem('contacts') ||
      localStorage.getItem('contacts') === '[]'
    ) {
      localStorage.setItem('contacts', JSON.stringify(initialState));
    }
    return JSON.parse(localStorage.getItem('contacts'));
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const newContact = ({ name, number }) => {
    const contact = { name, number, id: uuidv4() };

    const foundContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    foundContact
      ? alert(`${name} is already in contacts`)
      : setContacts([...contacts, contact]);
  };

  const onChange = ({ target }) => {
    setFilter(target.value);
  };

  const handleDelete = ({ target }) => {
    const id = target.id.split(':')[1];
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App-header">
      <h1>Phonebook</h1>
      <ContactForm newContact={newContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={onChange} />
      <ContactList
        filteredContacts={filteredContacts}
        handleDelete={handleDelete}
      />
    </div>
  );
};
