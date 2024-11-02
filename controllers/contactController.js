const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const contactModel = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public 
const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find();
  res.status(200).json(contact);
});

//@desc Creat new contacts
//@route POST /api/contacts
//@access public 
const creatContact = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All feilds are mandatory!!!");
  }

  const contact = await Contact.create({
    name, email, phone,
  });
  res.status(201).json(contact);
});

//@desc Get all contacts
//@route GET /api/contacts/:id
//@access public 
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
//@access public 
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("No Contact Found");
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
//@access public 
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("No Contact Found");
  }

  await Contact.remove();
  res.status(200).json(contact);
});

module.exports = { getContacts, creatContact, getContact, updateContact, deleteContact }