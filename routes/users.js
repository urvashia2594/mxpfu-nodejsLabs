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
  res.send(JSON.stringify({users},null,4));
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

        users = users.filter(user => user.email != email);
        users.push(updateUser);
        res.send(users);


  }
  else
  {
    res.send("USer not found");
  }
  
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;

  users = users.filter(user => user.email != email);

  res.send("User is deleted");
});

router.get("/lastName/:lastName", (req, res) => {
    // Extract the lastName parameter from the request URL
    const lastName = req.params.lastName;
    // Filter the users array to find users whose lastName matches the extracted lastName parameter
    let filtered_lastname = users.filter((user) => user.lastName === lastName);
    // Send the filtered_lastname array as the response to the client
    res.send(filtered_lastname);
});

// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
    let [dd, mm, yyyy] = strDate.split('-');
    return new Date(yyyy + "/" + mm + "/" + dd);
  }
  
  // Define a route handler for GET requests to the "/sort" endpoint
  router.get("/sort", (req, res) => {
    // Sort the users array by DOB in ascending order
    let sorted_users = users.sort(function(a, b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
        return d1 - d2;
    });
    // Send the sorted_users array as the response to the client
    res.send(sorted_users);
  });

module.exports=router;
