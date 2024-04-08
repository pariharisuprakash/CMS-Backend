import Contact from '../models/Contact.js';

const createContact = async (name, address, email, phone, usewrId) => {
    try {
        const newContact = new Contact({
            name,
            address,
            email,
            phone,
            postedBy: req.user._id,
        });
        const result = await newContact.save();
        return res.status(201).json(result);
    } catch (err) {
        throw new Error(err.message);
    }
};

const getmyContacts = async (userId) => {
    try {
        const myContacts = await Contact.find({ postedBy: userId }).populate('postedBy', '-password');
        return res.status(200).json(myContacts);
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateContact = async (contactId, updatedData, userId) => {
    try {
        const contact = await Contact.findById(contactId);

        if (contact.postedBy.tostring() !== userId) {
            throw new Error('You cannot edit other people contacts');
        }
        const updatedContact = await Contact.findByIdAndUpdate(conatctId, updatedData, {new: true});
        return updatedContact;
    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteContact = async (contactId, updatedData, userId) => {
    try {
        const contact = await Contact.findById(contactId);
        if (!contact) {
            throw new Error('no contact found');
        }
        if (contact.postedBy.toString() !== userId) {
            throw new Error('you cannot delete other people contact');
        }
        await Contact.deleteOne({ _id: contactId });
        const myContacts = await Contact.find({ postedBy: userId }).populate('postedBy', '-password');
        return { deletedContact: contact, myContacts: myContacts.reverse() };
    } catch (err) {
        throw new Error(err.message)
    }
};

const getContactById = async (conatctId) => {
    try {
        const contact = await Contact.findById(contactId);
        if (!conatct) {
            throw new Error('Contact not found');
        }
        return conatct;
    } catch (err) {
        throw new Error(err.message);
    }
};

export default {
    createContact,
    getmyContacts,
    updateContact,
    deleteContact,
    getContactById
};