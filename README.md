# PARTIE I. Mosala FRONTEND PART

## Section 1. Folder structure

### 1. create client and server folders

### 2. update client base folders

## Section 2. Mosala Landing

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

# PARTIE II. Mosala API

## Section 5. Mosala API

### 17. Backend Folder structure

- create server folder
- add stater folder for Mosala API
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

- connect our app to Mosala database

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
  //console.log(req.user.userId);//from Auth Middleware

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
    user: { userId }, //from Auth Middleware
    params: { id: jobId }, //from params
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

- update job information using userId and jobId

```js
const updateJob = async (req, res) => {
  const {
    body: { company, position }, //from the body
    user: { userId }, //from Auth Middleware
    params: { id: jobId }, //from params
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

- remove a job using userId and jobId

```js
const deleteJob = async (req, res) => {
  const {
    user: { userId }, //from Auth Middleware
    params: { id: jobId }, //from the params
  } = req;

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};
```

- test `deleteJob` controller in Postman

```js
 DELETE http://localhost:xxx/xx/xx/xxx/:id
```

### 38. Duplicate Error, Custom Error, Validation Error, Cast Error

- Validation Errors
- Duplicate (Email)
- Cast Error

```js
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  //Custom Error:
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  //validation Error:
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  //Duplicate Error:
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  //Cast Error:
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
```

## section 9. security and documentation

### 39. Security Info and Packages

- helmet
- cors
- xss-clean
- express-rate-limit

```
$ npm i helmet cors xss-clean express-rate-limit dotenv

```

- npm i [helmet](https://www.npmjs.com/package/helmet) [cors](https://www.npmjs.com/package/cors) [xss-clean](https://www.npmjs.com/package/xss-clean) [express-rate-limit dotenv](https://www.npmjs.com/package/express-rate-limit)

### 40. Export Postman Docs

- use [Swagger UI](https://swagger.io/tools/swagger-ui/) to clone an existing project

### 41. APIMATIC

- export Postman documentation
- use [APIMATIC](https://www.apimatic.io/apidocs/apimatic/) to format Postman documentation

### 42. Render Deployment

### 43. APIMATIC Setup

### 44. Swagger UI Editor

- use [Swagger UI Editor](https://editor.swagger.io/) & paste our open openapi: 3.0.0 we've exported from APIMATIC Setup.
- use [Swagger UI params](https://swagger.io/docs/specification/describing-parameters/) to change the exported params.

- remove the hard coded `/jobs/638ec54143d443d1bc967638:` parameters in [Swagger UI params](https://swagger.io/docs/specification/describing-parameters/) and paste the script below for each parameter

```js
/user/{id}:
    parameters:
      - in: path
        name: id
        schema:
          type: integer
        required: true
        description: The user ID
```

- test `Swagger UI ` API creating a new user and a new job with that user's token

### 45. Add Swagger UI

- create a swagger.yaml file and paste `Swagger UI ` content
- add [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) and [yamljs](https://www.npmjs.com/package/yamljs) to our application (app.js)
- test our API documentation

# PARTIE II. Update Mosala API

## section 9.

### 46. Update User - Setup

- add `updateUser` controller in `Auth.js`

```js
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequest("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};
```

### 47. Password "Gotcha"

- this.modifiedPaths();

```js
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```

### 47. Fake Data - Mockaroo

- use [Mockaroo](https://mockaroo.com/) random generator to add fake data
- create mock-data.json (root)
- provide test user id

### 48. Populate Database

- create populate.js
  populate.js

```js
require("dotenv").config();

const mockData = require("./mock-data.json");

const Job = require("./models/Job");
const connectDB = require("./db/connect");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await Job.create(mockData);
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
```

### 49. Search Functionality - Intro

controllers/jobs.js

```js
const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  // protected route
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  // add stuff based on condition

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  // NO AWAIT

  let result = Job.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};
```

### 50. Search Input, Status and JobType, Sort, Pagination

### 51. Check For Test User in Auth Middleware

- Make Test User Read-Only
  middleware/authentication.js

```js
const payload = jwt.verify(token, process.env.JWT_SECRET);
const testUser = payload.userId === "638eacb06e5d329442841e8c";
req.user = { userId: payload.userId, testUser };
```

### 55. Restrict CRUD to Test User

create testingUser in middleware
middleware/testUser

```js
const { BadRequestError } = require("../errors");

const testUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Test User. Read Only!");
  }
  next();
};

module.exports = testUser;
```

- add to auth routes (updateUser)

```js
const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const testUser = require("../middleware/testUser");
const { register, login, updateUser } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.patch("/updateUser", authenticateUser, testUser, updateUser);

module.exports = router;
```

- add to job routes (createJob, updateJob, deleteJob)
  routes/jobs.js

```js
const express = require("express");

const router = express.Router();
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  showStats,
} = require("../controllers/jobs");
const testUser = require("../middleware/testUser");

router.route("/").post(testUser, createJob).get(getAllJobs);
router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(getJob)
  .delete(testUser, deleteJob)
  .patch(testUser, updateJob);

module.exports = router;
```

### 52. API Limiter

routes/auth.js

```js
const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const testUser = require("../middleware/testUser");
const { register, login, updateUser } = require("../controllers/auth");

const rateLimiter = require("express-rate-limit");
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    msg: "Too many requests from this IP, please try again after 15 minutes",
  },
});

router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
router.patch("/updateUser", authenticateUser, testUser, updateUser);

module.exports = router;
```

app.js

```js
app.set("trust proxy", 1);

app.use(express.static(path.resolve(__dirname, "./client/build")));
```

### 53. Stats Intro

### 54. ShowStats Controller

Setup Stats Route
controllers/jobs

```js
const showStats = (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ defaultStats: {}, monthlyApplications: [] });
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  showStats,
};
```

routes/jobs.js

```js
const express = require("express");

const router = express.Router();
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  showStats,
} = require("../controllers/jobs");

router.route("/").post(createJob).get(getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
```

### 55. Setup Status Aggregation Pipeline

- install [moment](https://www.npmjs.com/package/moment)

const mongoose = require('mongoose');
const moment = require('moment');

controllers/jobs

```js
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  //Refactor Status Data
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  //Setup Monthly Applications Aggregation Pipeline
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  //Refactor Monthly Applications Data
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
```

### 56. Deployment to Render

# PARTIE III. Back to Mosala FRONTEND PART

# Section 10. Axios

### 57. Axios CustomFetch Instance

- utils/axios.js

```js
import axios from "axios";
const customFetch = axios.create({ baseURL: "http://..." });

export default customFetch;
```

### 58. Testing Register - HTTP(AJAX) Request

- install [axios](https://www.npmjs.com/package/axios)

- userSlice.js

```js
import customFetch from "../../utils/axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/testingRegister", user);
      console.log(resp);
    } catch (error) {
      console.log(error.response);
    }
  }
);
```

### 59. Register User - HTTP(AJAX) Request

userSlice.js

```js
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/register', user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)
   extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      toast.success(`Hello There ${user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    }
  }
```

Extra Reducers "Builder Callback" Notation

```js
extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`User Updated!`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error('There was an error..');
      });
  },
```

### 60. Login User - HTTP(AJAX) Request

userSlice.js

```js
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/login', user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }

   extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      toast.success(`Welcome Back ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    }
  }

);

```

### 61. Local Storage

utils/localStorage.js

```js
export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};
```

invoke getUserFromLocalStorage when app loads (set it equal to user)

```js
const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};


[registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello There ${user.name}`);
    },

[loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome Back ${user.name}`);
    },

```

### 62. Programmatically Navigate To Dashboard

Register.js

```js
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
};
```

# Section 11: Dashboard Setup

### 63. Setup Dashboard Pages

- remove Dashboard.js
- create Dashboard Folder
- create Stats, Profile, AddJob, AllJobs, SharedLayout,
- create index.js and setup import/export

App.js

```js
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}
```

### 64. Complete SharedLayout

- create Navbar, SmallSidebar, BigSidebar in components
- import Wrappers from assets/wrappers
- simple return
- import/export
- SharedLayout.js;
- [react icons]()

```js
import { Outlet } from "react-router-dom";
import { Navbar, SmallSidebar, BigSidebar } from "../../components";
import Wrapper from "../../assets/wrappers/SharedLayout";

const SharedLayout = () => {
  return (
    <>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  );
};

export default SharedLayout;
```

### 65. Navbar Structure

Navbar.js;

```js
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => console.log("toggle sidebar")}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => console.log("toggle logout dropdown")}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className="dropdown show-dropdown">
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                console.log("logout user");
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
```

### 66. Toggle Sidebar

userSlice.js

```js
const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },

export const { toggleSidebar } = userSlice.actions;
```

Navbar.js

```js
import { toggleSidebar } from "../features/user/userSlice";

const toggle = () => {
  dispatch(toggleSidebar());
};

<button type="button" className="toggle-btn" onClick={toggle}>
  <FaAlignLeft />
</button>;
```

### 67. Toggle Logout Dropdown

Navbar.js

```js
const [showLogout, setShowLogout] = useState(false)

<div className='btn-container'>
  <button className='btn' onClick={() => setShowLogout(!showLogout)}>
    <FaUserCircle />
      {user.name}
    <FaCaretDown />
  </button>
  <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
    <button onClick={() => console.log('logout user')} className='dropdown-btn'>
      logout
    </button>
  </div>
</div>
```

### 68. Logout Functionality

userSlice.js

```js
reducers: {
logoutUser: (state) => {
state.user = null;
state.isSidebarOpen = false;
removeUserFromLocalStorage();
},
toggleSidebar: (state) => {
state.isSidebarOpen = !state.isSidebarOpen;
},
},

export const { logoutUser, toggleSidebar } = userSlice.actions;
```

Navbar.js

```js
import { toggleSidebar, logoutUser } from "../features/user/userSlice";

<div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
  <button
    type="button"
    className="dropdown-btn"
    onClick={() => {
      dispatch(logoutUser());
    }}
  >
    logout
  </button>
</div>;
```

### 69. Protected Route

pages/ProtectedRoute.js

```js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
```

App.js

```js
<Route
  path="/"
  element={
    <ProtectedRoute>
      <SharedLayout />
    </ProtectedRoute>
  }
>
  ...
</Route>
```

### 70. Small Sidebar - Setup

SmallSidebar.js;

```js
import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";

export const SmallSidebar = () => {
  return (
    <Wrapper>
      <div className="sidebar-container show-sidebar">
        <div className="content">
          <button className="close-btn" onClick={() => console.log("toggle")}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">nav links</div>
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
```

### 71. Small Sidebar - Toggle

SmallSidebar.js;

```js
import { toggleSidebar } from '../features/user/userSlice';


const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleSidebar());
  };

return (
  <div className={isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
    <div className='content'>
        <button type='button' className='close-btn' onClick={toggle}>
          <FaTimes />
        </button>

);
```

### 72. Links Data

create utils/links.js

```js
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "all jobs",
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "add job",
    path: "add-job",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;
```

### 73. Small Sidebar - Nav Links

SmallSidebar.js

```js
import { NavLink } from "react-router-dom";

return (
  <div className="nav-links">
    {links.map((link) => {
      const { text, path, id, icon } = link;

      return (
        <NavLink
          to={path}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          key={id}
          onClick={toggle}
        >
          <span className="icon">{icon}</span>
          {text}
        </NavLink>
      );
    })}
  </div>
);
```

### 74. NavLinks Component

```js
import { NavLink } from "react-router-dom";
import links from "../utils/links";

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
```

SmallSidebar.js

```js
import NavLinks from './NavLinks'

return <NavLinks toggleSidebar={toggleSidebar}>
```

### 75. Big Sidebar

```js
import NavLinks from "./NavLinks";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useSelector } from "react-redux";

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
```

# Section 12: Profile

### 76. Profile Page - Setup

Profile.js

```js
import { useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

const [userData,setUserData] = useState({
  name:user?.name ||''
  email:user?.email ||''
  lastName:user?.lastName ||''
  location:user?.location ||''
})

  const handleSubmit = (e) => {
    e.preventDefault();
        const { name, email, lastName, location } = userData;

    if (!name || !email || !lastName || !location) {
      toast.error('Please Fill Out All Fields');
      return;
    }
  };
const handleChange = (e) =>{
  const name = e.target.name
  const value = e.target.value
  setUserData({...userData,[name]:value})
}
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>

        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type='email'
            name='email'
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='location'
            value={userData.location}
            handleChange={handleChange}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
```

### 77. Update User

- Update USER
- PATCH /auth/updateUser
- { email:'john@gmail.com', name:'john', lastName:'smith', location:'my location' }
- authorization header : 'Bearer token'
- sends back the user object with token
- userSlice.js

```js
export const updateUser = createAsyncThunk(
'user/updateUser',
async (user, thunkAPI) => {
try {
const resp = await customFetch.patch('/auth/updateUser', user, {
headers: {
authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
},
});
return resp.data;
} catch (error) {
console.log(error.response);
return thunkAPI.rejectWithValue(error.response.data.msg);
}
}
);
// extra reducers
[updateUser.pending]: (state) => {
state.isLoading = true;
},
[updateUser.fulfilled]: (state, { payload }) => {
const { user } = payload;
state.isLoading = false;
state.user = user;

      addUserToLocalStorage(user);
      toast.success('User Updated');
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

```

Profile.js

```js
import { updateUser } from "../../features/user/userSlice";

const handleSubmit = (e) => {
  e.preventDefault();
  const { name, email, lastName, location } = userData;

  if (!name || !email || !lastName || !location) {
    toast.error("Please Fill Out All Fields");
    return;
  }
  dispatch(updateUser({ name, email, lastName, location }));
};
```

### 78. Authentication Error

userSlice.js

```js
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.patch('/auth/updateUser', user, {
        headers: {
          // authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          authorization: `Bearer `,
        },
      });

      return resp.data;
    } catch (error) {
      // console.log(error.response);
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// logoutUser
logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      toast.success('Logout Successful!');
      removeUserFromLocalStorage();
    },

```

### 79. Refactor User Slice

features/user/userThunk.js

```js
import customFetch from "../../utils/axios";

import { logoutUser } from "./userSlice";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return resp.data;
  } catch (error) {
    // console.log(error.response);
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
```

userSlice.js

```js
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from "./userThunk";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPI);
  }
);
```

# Section 13: Job Page

### 80. Job Slice

features/job/jobSlice.js

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
});

export default jobSlice.reducer;
```

store.js

```js
import jobSlice from "./features/job/jobSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
  },
});
```

### 81. Structure

```js
AddJob.js;

import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error("Please Fill Out All Fields");
      return;
    }
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>

        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status */}

          {/* job type */}

          {/* btn container */}
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => console.log("clear values")}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
```

### 82. FormRow Select

```js
// job status

return (
  <div className="form-row">
    <label htmlFor="status" className="form-label">
      status
    </label>
    <select
      name="status"
      value={status}
      onChange={handleJobInput}
      className="form-select"
    >
      {statusOptions.map((itemValue, index) => {
        return (
          <option key={index} value={itemValue}>
            {itemValue}
          </option>
        );
      })}
    </select>
  </div>
);
```

FormRowSelect.js

```js
const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        id={name}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
```

AddJob.js

```js
  /* job status */
<FormRowSelect
  name='status'
  value={status}
  handleChange={handleJobInput}
  list={statusOptions}
/>

<FormRowSelect
  name='jobType'
  labelText='job type'
  value={jobType}
  handleChange={handleJobInput}
  list={jobTypeOptions}
/>
```

### 83. HandleChange Reducer

jobSlice.js

```js
    // reducers
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },

export const { handleChange } = jobSlice.actions;
```

AddJob.js

```js
import { handleChange } from "../../features/job/jobSlice";

const handleJobInput = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  dispatch(handleChange({ name, value }));
};
```

### 84. ClearValues Reducer

```js
    // reducers
    clearValues: () => {
      return {
        ...initialState
      };
      return initialState
    },

export const { handleChange, clearValues } = jobSlice.actions;

```

AddJob.js

```js
import { clearValues, handleChange } from "../../features/job/jobSlice";

return (
  <button
    type="button"
    className="btn btn-block clear-btn"
    onClick={() => dispatch(clearValues())}
  >
    clear
  </button>
);
```

### 85. Create Job Request

- POST /jobs
- { position:'position', company:'company', jobLocation:'location', jobType:'full-time', status:'pending' }
- authorization header : 'Bearer token'
- sends back the job object

```js
export const createJob = createAsyncThunk(
'job/createJob',
async (job, thunkAPI) => {
try {
const resp = await customFetch.post('/jobs', job, {
headers: {
authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
},
});
thunkAPI.dispatch(clearValues());
return resp.data;
} catch (error) {
// basic setup
return thunkAPI.rejectWithValue(error.response.data.msg);
// logout user
if (error.response.status === 401) {
thunkAPI.dispatch(logoutUser());
return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
}
return thunkAPI.rejectWithValue(error.response.data.msg);
}
}
);

// extra reducers

extraReducers: {
[createJob.pending]: (state) => {
state.isLoading = true;
},
[createJob.fulfilled]: (state, action) => {
state.isLoading = false;
toast.success('Job Created');
},
[createJob.rejected]: (state, { payload }) => {
state.isLoading = false;
toast.error(payload);
},
}
```

AddJob.js

```js
import {
  clearValues,
  handleChange,
  createJob,
} from "../../features/job/jobSlice";

const handleSubmit = (e) => {
  e.preventDefault();

  if (!position || !company || !jobLocation) {
    toast.error("Please Fill Out All Fields");
    return;
  }

  dispatch(createJob({ position, company, jobLocation, jobType, status }));
};
```

### 86. User Location

AddJob.js

```js
const { user } = useSelector((store) => store.user);

useEffect(() => {
  // eventually will check for isEditing
  if (!isEditing) {
    dispatch(handleChange({ name: "jobLocation", value: user.location }));
  }
}, []);
```

jobSlice.js

```js
// reducers
clearValues: () => {
  return {
    ...initialState,
    jobLocation: getUserFromLocalStorage()?.location || "",
  };
};
```

### 87. Logout Message

userSlice.js

```js
logoutUser: (state,{payload}) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if(payload){
        toast.success(payload)
      }
    },
```

Navbar.js

```js
<button
  type="button"
  className="dropdown-btn"
  onClick={() => dispatch(logoutUser("Logging out..."))}
>
  {" "}
  logout >{" "}
</button>
```

# Section 14: All Job

### 88. AllJobs Slice - Setup

features/allJobs/allJobsSlice.js

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
});

export default allJobsSlice.reducer;
```

store.js

```js
import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/user/userSlice";
import jobSlice from "./features/job/jobSlice";
import allJobsSlice from "./features/allJobs/allJobsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
});
```

### 89. AllJobs Page Structure

- create
- components/SearchContainer.js
- components/JobsContainer.js
- components/Job.js
- import/export

AllJobs.js

```js
import { JobsContainer, SearchContainer } from "../../components";

const AllJobs = () => {
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};

export default AllJobs;
```

### 90. Container Setup

```js
import { useEffect } from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useSelector, useDispatch } from "react-redux";

const JobsContainer = () => {
  const { jobs, isLoading } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
```

Loading.js

```js
const Loading = ({ center }) => {
  return <div className={center ? "loading loading-center" : "loading"}></div>;
};

export default Loading;
```

JobsContainer.js

```js
import Loading from "./Loading";

if (isLoading) {
  return <Loading center />;
}
```

### 91. GetAllJobs Request

- GET /jobs
- authorization header : 'Bearer token'
- returns {jobs:[],totalJobs:number, numOfPages:number }

allJobsSlice.js

```js
export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  async (_, thunkAPI) => {
    let url = `/jobs`;

    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// extra reducers

extraReducers: {
[getAllJobs.pending]: (state) => {
state.isLoading = true;
},
[getAllJobs.fulfilled]: (state, { payload }) => {
state.isLoading = false;
state.jobs = payload.jobs;
},
[getAllJobs.rejected]: (state, { payload }) => {
state.isLoading = false;
toast.error(payload);
},
}
```

JobsContainer.js

```js
import { getAllJobs } from "../features/allJobs/allJobsSlice";

useEffect(() => {
  dispatch(getAllJobs());
}, []);
```

### 92. Job Component Structure

Job.js

```js
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { useDispatch } from "react-redux";

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <h4>more content</h4>
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => {
                console.log("edit job");
              }}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => {
                console.log("delete  job");
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
```

### 93. Job Info Component

components/JobInfo.js

```js
import Wrapper from "../assets/wrappers/JobInfo";

const JobInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
```

Job.js

```js
const date = createdAt


<div className='content-center'>
  <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
  <JobInfo icon={<FaCalendarAlt />} text={date} />
  <JobInfo icon={<FaBriefcase />} text={jobType} />
  <div className={`status ${status}`}>{status}</div>
</div>

```

### 94. Moment.js

[moment.js](https://momentjs.com/)

```js
npm install moment
```

Job.js

```js
const date = moment(createdAt).format("MMM Do, YYYY");
```

### 95. Toggle Loading

```js
reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
}
export const {
  showLoading,
  hideLoading,
} = allJobsSlice.actions;
```

# section 15: handle Job

### 96. Delete Job Request

- DELETE /jobs/jobId
- authorization header : 'Bearer token'
  jobSlice.js

```js
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const resp = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(getAllJobs());
      return resp.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
```

Job.js

```js
<button
  type="button"
  className="btn delete-btn"
  onClick={() => {
    dispatch(deleteJob(_id));
  }}
>
  Delete
</button>
```

### 97. Set Edit Job

jobSlice.js

```js
reducers:{

  setEditJob: (state, { payload }) => {
    return { ...state, isEditing: true, ...payload };
    },
  }

  export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
```

Job.js

```js
import { setEditJob, deleteJob } from "../features/job/jobSlice";

<Link
  to="/add-job"
  className="btn edit-btn"
  onClick={() => {
    dispatch(
      setEditJob({
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      })
    );
  }}
>
  Edit
</Link>;
```

AddJob.js

```js
useEffect(() => {
  if (!isEditing) {
    dispatch(handleChange({ name: "jobLocation", value: user.location }));
  }
}, []);
```

### 98. Edit Job Request

- PATCH /jobs/jobId
- { position:'position', company:'company', jobLocation:'location', jobType:'full-time', status:'pending' }
- authorization header : 'Bearer token'
- sends back the updated job object
  jobSlice.js

```js
export const editJob = createAsyncThunk(
'job/editJob',
async ({ jobId, job }, thunkAPI) => {
try {
const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
headers: {
authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
},
});
thunkAPI.dispatch(clearValues());
return resp.data;
} catch (error) {
return thunkAPI.rejectWithValue(error.response.data.msg);
}
}
);

extraReducers:{
[editJob.pending]: (state) => {
state.isLoading = true;
},
[editJob.fulfilled]: (state) => {
state.isLoading = false;
toast.success('Job Modified...');
},
[editJob.rejected]: (state, { payload }) => {
state.isLoading = false;
toast.error(payload);
},
}
```

AddJob.js

```js
import {
  clearValues,
  handleChange,
  createJob,
  editJob,
} from "../../features/job/jobSlice";

if (isEditing) {
  dispatch(
    editJob({
      jobId: editJobId,
      job: {
        position,
        company,
        jobLocation,
        jobType,
        status,
      },
    })
  );
  return;
}
```

# section 16: Refactor Application

### 99. Job Thunk

- features/job/jobThunk.js

```js
import customFetch from "../../utils/axios";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { clearValues } from "./jobSlice";

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(getAllJobs());
    return resp.data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
```

jobSlice.js

```js
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

export const createJob = createAsyncThunk("job/createJob", createJobThunk);

export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk);

export const editJob = createAsyncThunk("job/editJob", editJobThunk);
```

### 100. Authorization Header - File Approach

jobThunk.js

```js
const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  };
};
```

```js
export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", job, authHeader(thunkAPI));
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
```

### 101. Authorization Header - Utils Approach

create utils/authHeader.js

```js
const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  };
};

export default authHeader;
```

jobThunk.js

```js
import authHeader from "../../utils/authHeader";
```

### 102. Authorization Header - Axios Interceptors Approach

utils/axios.js

```js
import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

customFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();
    if (user) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
      // in the latest version "common" returns undefined
      // config.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customFetch;
```

- remove auth header

### 103. Test User

- email : testUser@test.com
- password : secret
- read only!
- dummy data

Register.js

```js
<button
  type="button"
  className="btn btn-block btn-hipster"
  disabled={isLoading}
  onClick={() => {
    dispatch(loginUser({ email: "testUser@test.com", password: "secret" }));
  }}
>
  {isLoading ? "loading..." : "demo"}
</button>
```

# section 17: Stats Pages

### 104. ShowStats Request

- GET /jobs/stats

- authorization header : 'Bearer token'

- returns { defaultStats:{pending:24,interview:27,declined:24}, monthlyApplications:[{date:"Nov 2021",count:5},{date:"Dec 2021",count:4} ] }

- last six months

allJobsSlice.js

```js
export const showStats = createAsyncThunk(
  'allJobs/showStats',
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get('/jobs/stats');
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// extraReducers

    [showStats.pending]: (state) => {
      state.isLoading = true;
    },
    [showStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

```

### 105. Stats Page Structure

create
components/StatsContainer.js
components/ChartsContainer.js
import/export
Stats.js

```js
import { useEffect } from "react";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../features/allJobs/allJobsSlice";
const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
```

### 106. Stats Container

- create components/StatItem.js
  StatsContainer.js

```js
import StatItem from "./StatItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import { useSelector } from "react-redux";
const StatsContainer = () => {
  const { stats } = useSelector((store) => store.allJobs);
  const defaultStats = [
    {
      title: "pending applications",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
```

### 107. Stat Item

StatItem.js

```js
import Wrapper from "../assets/wrappers/StatItem";

const StatItem = ({ count, title, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
```

### 108. Charts Container

- create
- components/AreaChart.js
- components/BarChart.js
- ChartsContainer.js

```js
import React, { useState } from "react";

import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useSelector } from "react-redux";
const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
```

### 109. Charts Complete

- install [Recharts](https://recharts.org/en-US/guide)

AreaChart.js

```js
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#1e3a8a" fill="#3b82f6" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
```

BarChart.js

```js
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
```

### 110.

### 111.

### 112.

### 113.

### 114.

### 115.

### 116.

### 117.

### 118.

### 119.

### 120.

### 121.

### 122.

### 123.

### 124.

### 125.

### 126.

### 127.

### 128.

### 129.

### 130.

### 131.

### 132.

### 133.

### 134.

```

```

```

```
