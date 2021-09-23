const app = require("./app")

const login = require("./routes/login");
const signup = require("./routes/signup");
const restaurant = require("./routes/restraurants");

app.use("/login", login);
app.use("/signup", signup);  
app.use("/restaurants", restaurant);

const port = process.env.PORT || 3002;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;