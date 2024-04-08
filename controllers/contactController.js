import Contact from '../models/Contact.js';
import mongoose from 'mongoose';
import contactService from '../services/contactService.js';

const createContact = async (req,res) => {
    const { name, address, email, phone } = req.body;

    try {
        
        const result = await contactService.createContact(name, address, email, phone, req.user._id );

        return res.status(201).json(result);
    } catch (err) {
        console.error('Error creating contact:', err);
        return res.status(500).json({ error: 'Internal server error'});
    }
};

const getmyContacts = async (req, res) => {
    try {
        const myContacts = await contactService.getmyContacts(req.user._id);
        return res.status(200).json(myContacts);
    } catch (err) {
        console.error('Error fetching user contacts:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const updateContact = async (req,res) => {
    const { id, ...updatedData } = req.body;
    
    try {
        const updatedContact = await contactService.updateContact(req.user._id, id, updatedData); 

        res.status(200).json(updatedContact);
       
    } catch (err) {
        console.error('Error updating contact:',err);
        res.status(500).json({ error: err.message });
    }
};

const deleteContact = async (req,res) => {
    const { id } = req.params;

    try {
        const { deletedContact, myContacts } = await contactService.deleteContact(req.user._id, id);

        res.status(200).json({ deletedContact, myContacts });
    } catch (err) {
        console.error('Error deleting contact:', err );
        res.status(500).json({ error: err.message });
    }
};

const getContactById = async (req, res) => {
    const { id } = req.params;

    try {
        const contact = await contactService.getContactById(id);

        res.status(200).json(contact);
    } catch (err) {
        console.error('Error fetching contact:', err);
        res.status(500).json({ error: err.message });
    }
};

export default {
    createContact,
    getmyContacts,
    updateContact,
    deleteContact,
    getContactById
};
    