const fs = require('fs').promises
const path = require('path')
const crypto = require('crypto')

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

async function getContactById(contactId) {
  try {
    const data = await listContacts()
    const array = await data.filter(el => el.id === Number(contactId))
    return array
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`)
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts()
    const data = JSON.stringify(contacts.filter(el => el.id !== Number(contactId)), null, 2)
    return await fs.writeFile(contactsPath, data, (error) => {
      if (error) throw error
    })
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`)
  }
}

async function addContact(name, email, phone) {
  try {
    const id = crypto.randomInt(0, 1000000)
    const contact = { id, name, email, phone }
    const contacts = await listContacts()
    const data = JSON.stringify([...contacts, contact], null, 2)
    return await fs.writeFile(contactsPath, data, (error) => {
      if (error) throw error
    })
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`)
  }
}

module.exports = {
  listContacts, getContactById, removeContact, addContact
}
