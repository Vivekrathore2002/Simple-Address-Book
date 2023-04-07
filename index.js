const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const mobileInput = document.getElementById('mobile');
const nameSearchInput = document.getElementById('name-search');
const mobileSearchInput = document.getElementById('mobile-search');
const contactsList = document.getElementById('contacts-list');

let contacts = [];

function addContact(event) {
	event.preventDefault();
	const name = nameInput.value;
	const mobile = mobileInput.value;

	// Check for duplicate mobile numbers
	if (contacts.some(contact => contact.mobile === mobile)) {
		alert('Mobile number already exists.');
		return;
	}

	// Add contact to list and clear form
	contacts.push({ name, mobile });
	nameInput.value = '';
	mobileInput.value = '';
	displayContacts();
}

function displayContacts() {
	// Clear contacts list
	contactsList.innerHTML = '';

	// Sort contacts by name
	const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));

	// Filter contacts by name and mobile number
	const nameFilter = nameSearchInput.value.trim().toLowerCase();
	const mobileFilter = mobileSearchInput.value.trim().toLowerCase();
	const filteredContacts = sortedContacts.filter(contact => {
		const nameMatch = contact.name.toLowerCase().includes(nameFilter);
		const mobileMatch = contact.mobile.toLowerCase().includes(mobileFilter);
		return nameMatch && mobileMatch;
	});

	// Add filtered contacts to list
	filteredContacts.forEach(contact => {
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>${contact.name}</td>
			<td>${contact.mobile}</td>
			<td>
				<button onclick="editContact('${contact.mobile}')">Edit</button>
				<button onclick="deleteContact('${contact.mobile}')">Delete</button>
			</td>
		`;
		contactsList.appendChild(row);
	});
}

function editContact(mobile) {
	// Find contact by mobile number
	const contact = contacts.find(contact => contact.mobile === mobile);
	if (!contact) return;

	// Set form values and remove contact from list
	nameInput.value = contact.name;
	mobileInput.value = contact.mobile;
	contacts = contacts.filter(contact => contact.mobile !== mobile);
	displayContacts();
}

function deleteContact(mobile) {
	// Remove contact from list
	contacts = contacts.filter(contact => contact.mobile !== mobile);
	displayContacts();
}

// Add event listeners
contactForm.addEventListener('submit', addContact);
nameSearchInput.addEventListener('input', displayContacts);
mobileSearchInput.addEventListener('input', displayContacts);

// Display initial contacts
displayContacts();
