const express = require("express");
const mongoConnnection = require("./db");
require("dotenv").config(); //to use process.env variables
const cors = require("cors"); //middleware library to allow cross origin requests (requests from different origins)

const loginRoutes = require("../src/routes/authRoutes"); // we have set up route in that folder and exported it.
const expensesRoutes = require("../src/routes/expensesRoutes"); // we have set up route in that folder and exported it.

//This line creates an Express application instance by calling the express() function.
//This app object will be used to configure routes, middleware, and other functionalities for the web server.
const app = express();

// Middleware to parse JSON bodies => we can skip JSON.parse
app.use(express.json());

// Middleware to enable CORS
app.use(
  cors({
    origin: "*", // Allow requests from all origins
    methods: ["GET", "POST"], // Allow only these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
  })
);

mongoConnnection(); //function to connect to mongo db.

//app.use is used to configure middlewares - <req - do something (middleware) -res>
app.use((req, res, next) => {
  console.log(
    "A new request => method" + req.method + "=> on path => " + req.path
  );
  next();
}); //for every request this middleware will run

//now we are configuring that routes in that file here, whenever any req comes it checks here
app.use("/user", loginRoutes);
app.use("/expense", expensesRoutes);

// Middleware to parse URL-encoded bodies
//URL-encoded bodies means when a form is submitted it replaces some things with special characters eg space with +
app.use(express.urlencoded({ extended: true }));

//common middleware (higherlevel) to handle any errors while making db operations

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

//running server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + process.env.PORT);
});
