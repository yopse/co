const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
require("./config/mongoose");
const path = require("path");
const Contact = require("./models/contact");
const views_Path = path.join(__dirname, "./views");
const assets_Path = path.join(__dirname, "./assets");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", views_Path);

app.use(express.static(assets_Path));

// const contact_list = [
//   {
//     name: "Robert",
//     phone: "9894993933",
//   },

//   {
//     name: "Gret",
//     phone: "8788838933",
//   },

//   {
//     name: "paul",
//     phone: "8390490404",
//   },
//   {
//     name: "rens",
//     phone: "9002909090",
//   },
// ];

app.get("/", async (req, res) => {
  try {
    const contactList = await Contact.find();

    contactLList = contactList;

    res.render("home", {
      title: "My Contact List",
      contactlist: contactLList,
    });
  } catch (error) {
    res.send(error);
  }
});

app.post("/create-contact", async (req, res) => {
  try {
    const name = req.body.name;
    const phone = req.body.phone;

    const updateContact = new Contact({
      name: name,
      phone: phone,
    });

    const updatedContact = await updateContact.save();

    res.status(201).redirect("/");
  } catch (error) {
    res.status(400).send(error);
  }

  //   contact_list.push({
  //     name: name,
  //     phone: phone,
  //   });
});

app.get("/delete-contact", async (req, res) => {
 

  try {
    const id = req.query.id;

    const deleltedContact = await Contact.findByIdAndDelete({ _id: id });

    res.redirect("/");
  } catch (error) {
    res.status(400).send(error);
  }

  //   const contactIndex = contact_list.findIndex(
  //     (contact) => contact.phone === phone
  //   );

  //   contact_list.splice(contactIndex, 1);

  
});

app.get("/about", (req, res) => {
  res.send("About us");
});

app.listen(port, (err) => {
  if (err) {
    console.log("couldn't connect sorry");
  } else {
    console.log(`listening at ${port}`);
  }
});
