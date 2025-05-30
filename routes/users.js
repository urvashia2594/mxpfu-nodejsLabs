const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
 const email = req.params.email;
 const user = users.filter(user => user.email == email);
  res.send(user);
});


// POST request: Create a new user
router.post("/",(req,res)=>{
    //Static
//   const newUSer = {
//         firstName: "Urvashi",
//         lastName: "Dhake",
//         email:"urvitest@gamil.com",
//         DOB:"21-03-1989",
//   }

// From request Query param
newUSer = {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email:req.query.email,
    DOB:req.query.DOB,
}
  users.push(newUSer);
  res.send(`New User Added: ${req.query.firstName}`+ JSON.stringify(users));
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;

  const findUser = users.filter(user => user.email == email);

  if(findUser.length > 0)
  {
        let updateUser = findUser[0];

        const dob = req.query.DOB;
        const lastName = req.query.lastName;
        if(dob)
        {
            updateUser.dob = dob;
        }
        if(lastName)
        {
            updateUser.lastName = lastName;
        }

  }
  req.send("Updated Successfully "+ JSON.stringify(users));
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

module.exports=router;
