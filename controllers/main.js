const login = async (req, res) => {
  res.send("Fake Login/Register/Signup Route");
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random()*100);
  res.status(200).json({msg: "Hello, John Doe", secret: `Since you're authorized, here is your lucky number: ${luckyNumber}.` })
}

module.exports = {
  login, dashboard
}