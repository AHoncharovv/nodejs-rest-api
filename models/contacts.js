const fs = require('fs/promises');
const path = require('path');
const {uid} = require('uid');

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

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

const addContact = async ({name, email, phone}) => {
  const newContact = { id: uid(), name, email, phone };
    const data = await listContacts();
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
}

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) { return null };
  contacts[index] = { id: contactId, name, email, phone };
  await updateContacts(contacts);
  return contacts[index];
 }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}