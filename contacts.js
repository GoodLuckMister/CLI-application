const fs = require('fs')
const path = require('path')

const contactsPath = path.format({
  dir: 'db',
  base: 'contacts.json'
})

const db = fs.readFileSync(`${contactsPath}`)

const contacts = JSON.parse(db)

function listContacts() {
  return contacts
}

function getContactById(contactId) {
  return contacts.filter((el) => el.id === contactId)
}

function removeContact(contactId) {
  // ...твой код
}

// function addContact(name, email, phone) {
//   // ...твой код
// }
module.exports = {
  listContacts,
  getContactById,
  removeContact
}
