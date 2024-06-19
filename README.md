# Kazi-ems (employee management system)

- Project Video Demo - https://youtu.be/ym46gCxnvi8 

- Hosting URL: https://kazi-ems.web.app 

## Project setup

- Clone the Repository - https://github.com/dennisnderitu254/kazi-ems 

- run `npm install`

- run `npm run dev`

### Login as Admin

- `For Testing Purposes`

```
email: dknderitu@gmail.com
password: 1234
```

## Source Code Breakdown

### Dashboard

[index.js](src/pages/dashboard/index.tsx)

##### Imports:

- It imports necessary functionalities from React (`useState`, `useEffect`, `useContext`) for component state and data fetching.
- It imports context (`AuthContext`) likely containing user information.
- It imports functions for interacting with the database (`getDepartments`, `getTasks`, etc.) likely from a separate `db.js` file.
- It imports `toast` for displaying notifications.
- It imports `axios` for making HTTP requests (potentially for adding tasks).


#### State Management:

* It uses `useState` to manage various states within the component:
  - `activeTab`: Tracks the currently active tab (tasks, departments, or employees).
  - `selectedTask`: Stores information about the currently selected task (if any).
  - `employees`: An array containing employee data.
  - `departments`: An array containing department data.
  - `tasks`: An array containing task data.

#### Data Fetching:

* The `useEffect` hook fetches initial data on component mount:
  - It retrieves user data, departments, and tasks using functions from `db.js` and sets the corresponding state variables.


#### Event Handlers:

* Several functions handle user interactions with the UI:
  - `handleAddDepartment`: Creates a new department on form submission.
  - `handleAssignDepart`: Assigns a department to a selected user.
  - `handleAssignTask`: Assigns a selected task to a chosen employee.
  - `handleAddTask`: Creates a new task using axios and adds it to the task list. Data is   likely being sent to a mock API endpoint (https://jsonplaceholder.typicode.com/posts).
  - `handleTaskUpdate`: Updates the title of a selected task.
  - `handleAssignRole`: Updates the role of an employee.


#### Rendering:

* The component renders a main section with a dashboard layout.
  - It displays the user name and a signout button based on user context.
  - It renders tabs for tasks, departments, and employees, allowing users to switch between views.
  - The content section conditionally renders based on the active tab:
    - Tasks tab:
      - Shows a form to add tasks if the user is a manager or admin.
      - Displays a list of tasks with options to edit, assign, complete, or delete them.
    - Departments tab:
      - Shows a form to add departments if the user is a manager or admin.
      - Displays a table listing departments and their associated employee count.
    - Employees tab:
        - Displays a table listing employees with their details (email, role, department).
        - Allows assigning roles and departments to employees (except for the current user if their role is user).

### Home

[index.tsx](src/pages/home/index.tsx)

#### Imports

- It imports necessary functionalities from React (`useState`, `useEffect`, `useContext`).
- It imports `toast` for displaying notifications.
- It imports `axios` for making HTTP requests (potentially for signup).
- It imports functions for user authentication (`signIn`, `saveUser`) likely from a separate `db.js` file.
- It imports `AuthContext` likely containing user information and authentication state.
- It imports `useNavigate` for programmatic navigation.

#### Component Definition:

- This code defines a functional React component named `Home`.

#### State Management:

- It uses `useState` to manage states within the component:
    - `authType`: Tracks the current authentication mode (signin or signup).

#### Context and Navigation:

- It uses `useContext` to access user data and set user information (`setUser`) from the `AuthContext`.
- It uses `useNavigate` to redirect users after successful login.

#### Effect Hook:

The `useEffect` hook checks for a logged-in user and redirects them to the dashboard if found.


#### Event Handler:

- The `handleAuth` function handles form submissions for signin and signup:
  - It prevents default form behavior.
  - Sets a loading state (`authenticating`) using the context.
  - If `authType` is signin:
    - It retrieves email and password from form fields.
    - It calls `signIn` (likely from `db.js`) to attempt user sign in.
    - On successful sign in, it sets the user context and redirects to the dashboard.
    - On error, it displays an error message using toast.
  - If `authType` is signup:
    - It retrieves email, name, password, and confirm password from form fields.
    - It checks if passwords match.
    - On matching passwords, it uses `axios` to send a post request (likely to a mock API endpoint `https://jsonplaceholder.typicode.com/users`) with signup data.
    - On successful signup, it saves user data using `saveUser` (likely from `db.js`) and displays a success message.
    - It redirects to the signin form after successful signup.
    - On any error, it displays an error message using toast.

#### Rendering:

- The component renders a main section with a home layout.
- It displays a title and description welcoming users to Kazi HQ.
- It conditionally renders a signin or signup form based on the `authType` state:
  - Signin form prompts for email and password.
  - Signup form prompts for name, email, password, and confirm password.
- It displays a message with a link to switch between signin and signup based on the `authType`.
- It renders a submit button with the appropriate label (Signin/Signup).

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
