const app = require("./app")

const login = require("./routes/login");
const signup = require("./routes/signup");
const restaurant = require("./routes/restraurants");
const profile = require("./routes/profile");
const menu = require("./routes/menu");

app.use("/login", login);
app.use("/signup", signup);  
app.use("/restaurants", restaurant);
app.use("/profile", profile);
app.use("/menu", menu);


const port = process.env.PORT || 3002;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;