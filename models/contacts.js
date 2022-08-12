const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(contact => contact.id === contactId);
  if (!contactById) { return null };
  return contactById;
}

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex(item => item.id === contactId);
  if (index === -1) { return null };
  const [result] = data.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;   
}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

// const path = require('path');
// const fs = require('fs').promises;
// const { nanoid } = require('nanoid');

// const contactsPath = path.resolve('./db/contacts.json');

// async function listContacts() {
//     const data = await fs.readFile(contactsPath, 'utf-8')
//     return JSON.parse(data);   
// }

// async function getContactById(contactId) {
//     const data = await listContacts();
//     const contactById = data.find(contact => contact.id === contactId);
//     if(!contactById){return null}
//     return contactById
// }

// async function removeContact(contactId) {
//     const data = await listContacts();
//     const index = data.findIndex(item => item.id === contactId);
//     if (index === -1) { return null };
//     const [result] = data.splice(index, 1);
//     fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
//     return result;    
// }

// async function addContact({name, email, phone}) {
//     const newContact = { id: nanoid(), name, email, phone };
//     const data = await listContacts();
//     data.push(newContact);
//     await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
//     return newContact;
// }
