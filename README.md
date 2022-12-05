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

### 17. Axios CustomFetch Instance

- utils/axios.js

```js
import axios from "axios";
const customFetch = axios.create({ baseURL: "http://" });

export default customFetch;
```

### 18.

### 19. Testing Register - HTTP(AJAX) Request

### 20. Register User - HTTP(AJAX) Request

### 21. Login User - HTTP(AJAX) Request

### 22. Local Storage

### 23. Programmatically Navigate To Dashboard

### 24.

### 25.

### 26.

### 27.

### 28.

### 29.

### 30.

### 31.

### 32.

### 33.

### 34.

### 35.

### 36.

### 37.

### 38.

### 39.

### 40.

### 41.

### 42.

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
