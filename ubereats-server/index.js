const app = require("./app")

const login = require("./routes/login");
const signup = require("./routes/signup");

app.use("/login", login);
app.use("/signup", signup);  

const port = process.env.PORT || 3002;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;