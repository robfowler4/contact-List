import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = props => {
	const { store, actions } = useContext(Context);

	// match is being created from proptypes... params."" is pulling "" from url bar
	// .find high order function locates one item in the store based on comparing id's.. compares id from the store with id from url

	const targetContact = store.contacts.find(contact => {
		return contact.id == props.match.params.id;
	});

	// to update a variable on a given page

	const [contact, setContact] = useState({
		full_name: targetContact.full_name,
		email: targetContact.email,
		phone: targetContact.phone,
		address: targetContact.address,
		id: targetContact.id
	});

	const handleOnChange = e => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};
	// replacing contact values with new values as you type ("..." is how you grab information from an array or object without brackets)

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit Contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							name="full_name"
							onChange={handleOnChange}
							value={contact.full_name}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							name="email"
							type="email"
							className="form-control"
							placeholder="Enter email"
							onChange={handleOnChange}
							value={contact.email}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							name="phone"
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							onChange={handleOnChange}
							value={contact.phone}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							name="address"
							type="text"
							className="form-control"
							placeholder="Enter address"
							onChange={handleOnChange}
							value={contact.address}
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={() => actions.editContact(contact)}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

EditContact.propTypes = {
	match: PropTypes.object,
	contact: PropTypes.object
};
