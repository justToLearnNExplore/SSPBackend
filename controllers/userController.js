const Users = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

exports.signup = async (req, res) => {
  if(req.body.googleAccessToken){
    axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers:{
        "Authorization": `Bearer ${req.body.googleAccessToken}`
      }
    }).then( async response =>{
      const firstName = response.data.given_name;
      const lastName = response.data.family_name;
      const email = response.data.email;
      const picture = response.data.picture;

      const alreadyUserExist = await Users.findOne({email})

      if(alreadyUserExist){
        return res.status(400).json({ success: false, error: 'User with this emailId already exists!' });
      }

      const result = await Users.create({
        firstName,
        lastName, 
        email, 
        profilePicture : picture});

      const token = jwt.sign({
        email: result.email,
        id: result._id
      }, process.env.JWT_SECRET, {expiresIn:'1h'})

     

      res.status(200).json({result, token})     

    }).catch(error => {
      
      res.status(400).json({ result: false, error: 'An error occurred while signin with google' });
    })
  }else{
    const {name, email, password, phone} = req.body;
    try {
      if (name === "" || email === "" || password === "" || phone === "" && password.length >= 4) 
        return res.status(400).json({message: "Invalid field!"})
      const alreadyUserExist = await Users.findOne({email})

      if(alreadyUserExist){
        return res.status(400).json({ success: false, error: 'User with this emailId already exists!' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const result = await Users.create({
        name,
        email,
        password: hashedPassword,
        phone,
      });
  
      const token = jwt.sign({
        email: result.email,
        id: result._id
      }, process.env.JWT_SECRET, {expiresIn:'1h'})

      

      res.status(200).json({ result, token });  
    } catch (error) {
      
      res.status(500).json({ result: false, error: 'An error occurred while signup'});
    }
  }
}

exports.login = async (req, res) => {

  if(req.body.googleAccessToken){
      axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers:{
          "Authorization": `Bearer ${req.body.googleAccessToken}`
        }
      }).then( async response =>{
        const email = response.data.email;
        const alreadyUserExist = await Users.findOne({email})

        if(!alreadyUserExist){
           return res.status(400).json({ success: false, error: 'User does not exist!' });
        }

        const token = jwt.sign({
          email: alreadyUserExist.email,
          id: alreadyUserExist._id
        }, process.env.JWT_SECRET, {expiresIn:'1h'})
  
       
        res.status(200).json({ result: alreadyUserExist, token });
      })
  }else{
    const {email, password} = req.body;
    if (email === "" || password === "") 
      return res.status(400).json({message: "Invalid field!"});
    try {
        const alreadyUserExist = await Users.findOne({email})

        if(!alreadyUserExist){
           return res.status(400).json({ result: false, error: 'User does not exist!' });
        }
  
      const validPass = await bcrypt.compare(password, alreadyUserExist.password);
      if (!validPass) {
        return res.status(400).json({ result: false, error: 'Invalid Credentials!' });
      }
  
      const token = jwt.sign({
        email: alreadyUserExist.email,
        id: alreadyUserExist._id
      }, process.env.JWT_SECRET, {expiresIn:'1h'})

      
      
      res.status(200).json({ result: alreadyUserExist, token }); // Returning user information
    } catch (error) {
    
      res.status(500).json({ result: false, error: 'An error occurred while login!' });
    }
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Users.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};