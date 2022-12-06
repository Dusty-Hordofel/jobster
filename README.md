## Section 1. Folder structure

### 1. create client and server folders

### 2. update client base folders

## Section 2. Jobster Landing

### 3 Landing Page

### 4. Styled Components - Basics

- [Styled Components](https://styled-components.com/docs/basics#installation)

```sh
$ npm install --save styled-components
$ npm install react-router-dom

```

```js
import styled from "styled-components";

const El = styled.el`
  // styles go here
`;
```

- import styled-components to `<Landing/>`

### 5. Style Landing Page

## Section 3. Error Page

### 6. Setup Pages

- create ` <Error/>` ` <Register/>` `<Dasboard/>` pages
- export ` <Error/>` ` <Register/>` `<Dasboard/>` `<Landing/>` from index.js to `<App/>`

### 7. React Router - Setup

- add ` <Error/>` ` <Register/>` `<Dasboard/>` Routes

### 8. Error Page

## Section 4. Register Page

### 9. Register Page - Setup

- add initial state to ` <Register/>`
- add useState value and create handleChange and onSubmit functions.
- update ` <Register/>` content and style it using styled-components.

### 10. FormRow Component

- create ` <FormRow/>` in <b>components</b> to handle the input Registration.
- setup one for email and password in ` <Register/>`
- hint "type,name,value"

```js
const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};
```

- import ` <FormRow/>` to ` <Register/>`

### 11. Toggle Member

- create toggleMember() in ` <Register/>` to handle ` <FormRow/>` showned!

```js
const toggleMember = () => {
  setValues({ ...values, isMember: !values.isMember });
};
```

- add a conditional rendering for form title and name input fields

```js
{
  /* control h3 */
}
<h3>{values.isMember ? "Login" : "Register"}</h3>;
{
  /* toggle name */
}
{
  !values.isMember && (
    <FormRow
      type="text"
      name="name"
      value={values.name}
      handleChange={handleChange}
    />
  );
}
```

- add a conditional rendering for form title and toggle btn

```js
{
  /* right after submit btn */
}
{
  /* toggle btn */
}
<p>
  {values.isMember ? " Not a member yet?" : "Already a member?"}
  <button type="button" onClick={toggleMember} className="member-btn">
    {values.isMember ? "Register" : "Login"}
  </button>
</p>;
```

### 12. Handle Change and Empty Values

[Dynamic Object Keys](https://www.youtube.com/watch?v=_qxCYtWm0tw)

- update handleChange and onSubmit to handle empty values

```js
const handleChange = (e) => {
  // console.log(e.target);
  const name = e.target.name;
  const value = e.target.value;

  console.log(`${name} :${value}`);
  setValues({ ...values, [name]: value });
};

const onSubmit = (e) => {
  e.preventDefault();
  // console.log(e.target);
  const { name, email, password, isMember } = values;
  if (!email || !password || (!isMember && !name)) {
    // check the name if isMember is false (!isMember && !name)
    console.log("Please Fill Out All Fields");
    return;
  }
};
```

### 13. React Toastify

[React Toastify](https://www.npmjs.com/package/react-toastify)

```sh
$ npm install --save react-toastify
```

App.js

```js
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

return </Routes>
 <ToastContainer />
 <BrowserRouter>
```

Register.js

```js
import { toast } from "react-toastify";

if (!email || !password || (!isMember && !name)) {
  // check the name if isMember is false (!isMember && !name)
  toast.error("Please Fill Out All Fields");
  return;
}
```

- modifications
- <ToastContainer  position="top-center"/>

index.css

```css
.Toastify__toast {
  text-transform: capitalize;
}
```

### 14. User Slice - Setup

- features/user/userSlice.js,job/jobSlice.js & /allJobs/allJobSlice.js

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  user: null,
};

const userSlice = createSlice({ name: "user", initialState });

export default userSlice.reducer;
```

- create store.js

```js
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
```

- index.js

```js
import { store } from "./store";
import { Provider } from "react-redux";

root.render(
  <Provider store={store}>
    <App tab="home" />
  </Provider>
);
```

```sh
$ npm install @reduxjs/toolkit react-redux
```

### 15. Register and Login Placeholders

- userSlice.js

```js
// communicate with our backend
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    console.log(`Register User: ${user}`);
  }
);
// communicate with our backend
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    console.log(`Login User: ${user}`);
  }
);
```

- Register.js

```js
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);
};

const onSubmit = (e) => {
  e.preventDefault();
  // console.log(e.target);
  const { name, email, password, isMember } = values;
  if (!email || !password || (!isMember && !name)) {
    // check the name if isMember is false (!isMember && !name)
    toast.error("Please Fill Out All Fields");
    return;
  }
  if (isMember) {
    dispatch(loginUser({ email, password }));
    return;
  }
  dispatch(RegisterUser({ name, email, password }));
};
```

### 16. HTTP Methods

- GET - get ressources from the server
- POST - submit ressource to the server
- PUT/PATCH - modify ressource on the server
- DELETE - delete ressource from the server

```js
//GET
axios.get(url, options);
//POST
axios.post(url, ressource, options);
//PATCH
axios.patch(url, ressource, options);
//DELETE
axios.delete(url, options);
```

<!-- ### 17. Axios CustomFetch Instance

- utils/axios.js

```js
import axios from "axios";
const customFetch = axios.create({ baseURL: "http://" });

export default customFetch;
``` -->

<!-- ### 19. Testing Register - HTTP(AJAX) Request

### 20. Register User - HTTP(AJAX) Request

### 21. Login User - HTTP(AJAX) Request

### 22. Local Storage

### 23. Programmatically Navigate To Dashboard -->

# PARTIE II. Jobster API

## Section 5. Jobster API

### 17. Backend Folder structure

- create server folder
- add stater folder for Jobster API
- install dependencies

```bash
npm install
npm install <package>@latest
```

- create .env and add provide below values

```bash
MONGO_URI=
JWT_SECRET=
JWT_LIFETIME=
```

- start the project

```js
npm start
```

- you should see "Server is listening ...." text

### 18. set auth and job controllers

### 19. create routes

- create auth and job routes
- import auth and job to app.js

### 20. Database Connection

- connect our app to jobster database

### 21. User Schema

### 22. Create User - Basic Setup

### 23. Error Checking - Controller Example

### 24. Hash User Password

- use bcryptjs to hash user password

### 25. Mongoose Middleware

### 26. Generate Token - Controller

### 27. Generate Token - Instance Method

### 28. JWT_SECRET and JWT_LIFETIME

- use all keys generator to generate a JWT_SECRET
  [all keys generator](https://allkeysgenerator.com/)

- add JWT_LIFETIME & JWT_SECRET in .env variable

## section 7. Login API

### 29. Login Controller Setup & Compare Password

### 30. Auth Middleware - Setup & Testing

- create Auth Middleware and add test it in our Job routes

```js
const User = require("../models/User");
const jwt = require("jsonwebtoken"); //to verify the token
const { UnauthenticatedError } = require("../errors"); //handle errors
const { request } = require("express");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization; //
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  } //check if authorization header has the required value

  const token = authHeader.split(" ")[1]; //retrieve the token value in authHeader witch is after the "Bearer"

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); //verify the token value

    // attach the user to the job routes
    const testUser = payload.userId === "638e13e5d5b81bfa972cc35c";

    // const user = User.findById(payload.id).select("-password");//look for the user int the database
    // request.user = user;

    req.user = { userId: payload.userId, testUser }; //get the id from the token make us sure there is a user logged in alcontrary of to get id from the database.

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
```

## section 8. Job API

### 31. Job Model

- create a job model using Mongoose

```js
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
```

### 32. Create Job Route

- try to create a new job in Postman using our job model

```sh
{
    "company":"Google",
    "position":"intern",
    "status":"pending",
    "createdBy":"638e13e5d5b81bfa972cc35c",//we don't need to add that , it's automatically added to the document
    "jobType":"full-time",
    "jobLocation":"Congo"
}
```

- update our job createJob controller

```js
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const mongoose = require("mongoose");

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; // it's located in req.body, console.log(req.body) to get information
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });

  // res.json(req.body);//test created job
  // res.json(req.user);//test user token
};
```

### 33.Get All Jobs

- get only the job associated to the user

```js
const getAllJobs = async (req, res, next) => {
  //console.log(req.user.userId);

  try {
    //get all job associated to the userId
    const jobs = await Job.find({ createdBy: req.user.userId }).sort(
      "createdAt"
    );

    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
  } catch (error) {
    console.log("🚀 ~ file: jobs.js:14 ~ getAllJobs ~ error", error);
  }
};
```

- test `getAllJobs` controller in Postman

```js
 GET http://localhost:xxx/xx/xx/xxx
```

### 34. Set Token Dynamically in Postman

- todo later

### 35. Get Single Job

- get a single job using userId and jobId parameter

```js
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
```

- test `getJob` controller in Postman

```js
 GET http://localhost:xxx/xx/xx/xxx/:id
```

### 36. Update Job

```js
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
```

- test `updateJob` controller in Postman

```js
 PATCH http://localhost:xxx/xx/xx/xxx/:id
```

### 37. Remove Job

### 38. Duplicate Error

### 39. Custom Error

### 40. Validation Error

### 41. Cast Error

### 42. Security Info and Packages

### 43.

### 44.

### 45.

### 46.

### 47.

### 48.

### 49.

### 50.

```

```
