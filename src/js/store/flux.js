const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: []
		},
		actions: {
			loadData: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/rob_fowler")
					.then(response => response.json())
					.then(myContacts => setStore({ contacts: myContacts }))
					.catch(error => console.log("error", error));
			},
			addContact: contact => {
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						agenda_slug: "rob_fowler",
						full_name: contact.full_name,
						email: contact.email,
						phone: contact.phone,
						address: contact.address
					})
				})
					.then(res => res.json())
					.then(() => getActions().loadData());
			},
			deleteContact: id => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "DELETE"
				})
					.then(res => res.json())
					.then(() => getActions().loadData());
			},
			editContact: contact => {
				fetch(`https://assets.breatheco.de/apis/fake/contact/${contact.id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						agenda_slug: "rob_fowler",
						full_name: contact.full_name,
						email: contact.email,
						phone: contact.phone,
						address: contact.address
					})
				})
					.then(res => res.json())
					.then(() => getActions().loadData());
			}
		}
	};
};

export default getState;
