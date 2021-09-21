import { useState } from 'react';

export const ContactForm = ({ newContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const contact = {
      name,
      number,
    };
    if (number === '') {
      alert('phone number is required');
      return;
    }
    newContact(contact);
    setName('');
    setNumber('');
  };

  const onChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        console.log('smt error');
        break;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          value={name}
          required
          onChange={onChange}
        />
        Phone number
        <input
          type="tel"
          placeholder="Enter phone number"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          value={number}
          onChange={onChange}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};
