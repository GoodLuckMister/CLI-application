const fs = require('fs').promises
const path = require('path')

const contactsPath = path.format({
  dir: 'db',
  base: 'contacts.json'
})

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`)
  }
}

function getContactById(contactId) {
  return listContacts().then(r => r.filter(el => el.id === contactId))
}

function removeContact(contactId) {
  return listContacts().then(r => r.filter(el => el.id !== contactId))
}

async function addContact(name, email, phone) {
  const id = Math.random()
  const contact = { id: id, name: name, email: email, phone: phone }
  const contacts = await listContacts()
  const data = JSON.stringify([...contacts, contact], null, 2)
  await fs.writeFile(contactsPath, data, (error) => {
    if (error) throw error
    console.log('saved')
  })
}
module.exports = {
  listContacts, getContactById, removeContact, addContact
}
