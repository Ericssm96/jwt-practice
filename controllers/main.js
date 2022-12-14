require("dotenv");
const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const {username, password} = req.body;
  // console.log({username, password});

  if(!username || !password){
    throw new CustomAPIError('Please provide email and password', 400);
  }

  const id = new Date().getDate();
  const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '7d'});

  res.status(200).json({msg: "user created", token});
}

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")){
    throw new CustomAPIError("Invalid credentials to access this route", 401);
  }

  const token = authHeader.split(' ')[1];

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {username} = decoded;
    const luckyNumber = Math.floor(Math.random()*100);
    res.status(200).json({msg: `Hello, ${username}`, secret: `Since you're authorized, here is your lucky number: ${luckyNumber}.` })
  } catch (err) {
    throw new CustomAPIError('Credentials not authorized to access this route', 401);
  }
}

module.exports = {
  login, dashboard
}