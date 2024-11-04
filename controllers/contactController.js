const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const contactModel = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private 
const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contact);
});

//@desc Creat new contacts
//@route POST /api/contacts
//@access private 
const creatContact = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All feilds are mandatory!!!");
  }

  const contact = await Contact.create({
    name, email, phone, user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//@desc Get all contacts
//@route GET /api/contacts/:id
//@access private 
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("No Contact Found");
  }

  res.status(200).json(contact);
});


//@desc Update contacts
//@route PUT /api/contacts/:id
//@access private 
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("No Contact Found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Udes don't have permission to update other user contact");

  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }

  );
  res.status(200).json(updatedContact);
});

//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access private 
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("No Contact Found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Udes don't have permission to delete other user contact");

  }

  await Contact.findByIdAndDelete(req.params.id);

  res.status(200).json(contact);
});

module.exports = { getContacts, creatContact, getContact, updateContact, deleteContact }