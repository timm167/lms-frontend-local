# Learning Management System

## Purpose
This is the frontend to a Learning Management System built using React.

Most of the technical project detail is in the backend documentation (linked below). This project was significantly more backend heavy so if you're interested in the project details, I recommend reading the backend docs.

This README will provide some details on the component structure, service layer, and decisions with frontend only scope.

## Usage

Recommended setup at https://github.com/timm167/lms-frontend-local/blob/main/USAGE.md

## Backend Documentation

Access at https://github.com/timm167/lms-backend/blob/main/README.md

# Frontend Infrastructure

## Frontend Overview

The project was set up using **Vite** to work with **React** and modern JavaScript. This setup simplified the development process significantly.

### App Context

The application uses **App Context** (React Context) for state management. This allows sharing of global state across components without the need for prop drilling. 

```javascript  
const {page, setPage, setLoggedIn, setAuthStatus} = useAppContext()
```

This makes it easy to manage key states like the current page, authentication status, data, and object information.

### App Component

The **App Component** is the main component that renders the application. It dynamically renders different pages based on the current state (`page`). The component structure is simple and makes use of React fragments to group everything together.

```javascript
    <>
      <Header/>
      <div style={{ paddingTop: '85px', zIndex: 2}}> 
        {(page === 'Playground') && <Playground />}
        {(page === 'Login') && <SignIn />}
        {(page === 'Signup') && <UserCreateForm formTitle='Sign Up' />}
        {(page === 'AddUser') && <UserCreateForm formTitle='Add User' />}
        {(page === 'Home') && <Home />}
        {(page === 'CreateCourse') && <CourseCreateForm />}
        {(page === 'ObjectViewer') && <ObjectViewer />}
        {(page === 'CreateLesson') && <CreateLesson />}
        {(page === 'CreateAssignment') && <CreateAssignment/>}
      </div>
      <Footer/>
    </>
```

### Page State and Authentication

The **page state** is managed using the `setPage` function from the App Context. This allows the app to switch between different views dynamically.

Another key state that matters is the **auth status**, which tells the frontend whether the user is a student, admin, or teacher. This updates the UI dynamically based on the user's role, hopefully avoiding unnecessary calls to unauthorized endpoints.

### Handling Authentication on App Load

When the app first loads, it checks for an authentication token in **localStorage**. If a token is found, the app attempts to verify the user type and set the appropriate state (logged in, user type, etc.).

```javascript
useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setLoggedIn(true);
        setPage('Home');
        try {
          const userType = await getUserType(token);
          setAuthStatus(userType);
        } catch (error) {
          console.error('Error fetching user type:', error);
          setLoggedIn(false);
          setPage('Login');
        }
      } else{
        setPage('Login');
      }
    };
    checkUser();
  }, []);
```

This `useEffect` checks if a token exists in **localStorage**. If the token is found, it verifies the user type and updates the `authStatus` state. If there’s an error or no token is found, it redirects the user to the login page.

## Components Overview

### Header Component

The **Header Component** handles navigation within the app. It provides the ability to switch between the following pages:

- **Home**
- **Playground**
- **Log out** (which redirects the user to the login page)

If the user is logged in, the header will show navigation options such as "Home" or "Playground." If the user is logged out, the header will display a **Sign In** button. After the user logs out, it will switch to a "Login" button.

### Playground Component

The **Playground Component** is a demo feature that is not meant for a production environment. It provides the following functionality:

- Allows the user to quickly switch between different roles.
- Enables quick generation of demo data.
- Allows users to test different functionalities by logging in as various user types (e.g., student, teacher, or admin) and checking what each role can and cannot do.

![Screenshot 2025-02-11 at 17 08 51](https://github.com/user-attachments/assets/fae9db25-ee17-415b-a99c-9051de04c0e3)

If I try to access user table as a student... 

![Screenshot 2025-02-11 at 17 09 59](https://github.com/user-attachments/assets/e527f141-4696-412d-9ce9-3f899691810f)

The Playground component is designed for testing the app's functionality quickly without going through the full process of creating and managing data.

### Home Component

The **Home Component** dynamically changes its content based on the user’s authentication status.

#### **Admin View**  
  ![Screenshot 2025-02-11 at 17 06 13](https://github.com/user-attachments/assets/60c85335-28fc-4066-a298-5f56cf4523c7)


#### **Teacher View**  
  ![Screenshot 2025-02-11 at 17 06 54](https://github.com/user-attachments/assets/9726d9ea-649f-43fd-bee1-0f4d3df4e160)


#### **Student View**  
  ![Screenshot 2025-02-11 at 17 07 24](https://github.com/user-attachments/assets/0e95340c-66bd-4e03-9a15-4a9a50e52003)


### Login and Signup Components

The **Login** and **Signup Components** are forms that send data to the backend for authentication and account creation.

## Table Components

Tables are rendered within the **Home Component** but exist as separate components. They display data from the backend, depending on the user's authentication status.  

### List of Table Components  

- **Admins Table**  
- **Base Table**  
- **Browse Courses Table**  
- **Courses Table**  
- **Enrollments Table**  
- **Students Table**  
- **Teachers Table**  
- **Users Table**  

### Base Table Structure  

All tables operate using a **Base Table Component**, which defines the table design and some core functionality. This base table is built using **React Table**. 

For example, the **Courses Table** takes data from an API call (triggered by buttons on the home screen) and populates a predefined set of columns. The columns and data are passed to the **Base Table**, which then handles rendering.  

```javascript
const CoursesTable = ({ data}) => {
    const { setTableData, tableView } = useAppContext();

    const handleDelete = async (course_id) => {
        await performCourseManagerAction({action: 'delete_course', course_id: course_id})
        const newTableData = await getLists('courses',tableView);
        setTableData(newTableData);
    }
    
    const columns = useMemo(
        () => [
            {
                Header: 'Course ID',
                accessor: 'id',
            },
            {
                Header: 'Course Name',
                accessor: 'title',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Teacher',
                accessor: 'teacher',
                filter: teacherInCourseFilter,
                Cell: ({ row }) => {
                    const teacher = row.original.teacher;
                    return teacher ? teacher.full_name : 'No teacher assigned';
                },
            },
            {
                Header: 'Students',
                accessor: 'students',
                filter: listContainsNameFilter,
                Cell: ({ row }) => (
                    <ExpandableList data={row.original.students} label="Students" itemKey="user_id" itemLabel="full_name" />
                ),
            },
            {
                Header: 'Lessons',
                accessor: 'lessons',
                filter: listContainsLessonFilter,
                Cell: ({ row }) => (
                    <ExpandableList data={row.original.lessons} label="Lessons" itemKey="lesson_id" itemLabel="title" />
                ),
            },
            {
                Header: 'Assignments',
                accessor: 'assignments',
                filter: listContainsAssignmentFilter,
                Cell: ({ row }) => (
                    <ExpandableList data={row.original.assignments} label="Assignments" itemKey="assignment_id" itemLabel="title" />
                ),
            },
            {
                Header: 'Delete Course',
                Filter: false,
                Cell: ({ row }) => (
                    <button onClick={() => handleDelete(row.original.id)}>Delete</button>
                )
            }
        ],
        [handleDelete, tableView]
    );
    if (tableView === 'browse') {
        return (
            <BrowseCourses data={data} />
        );
    }

    return <BaseTable data={data} columns={columns} rowType='courses'/>
};

```

The reason for this structure is flexibility: different data types require different column layouts, so separating the base table from specific implementations allows for easier customization.  

A lot of data handling and configuration, such as how data should be passed and structured, is managed in **state**.  

### Expandable Lists  

Some tables include expandable list columns, allowing users to reveal more details within a row. This handles nested data such as the students enrolled in a course.  

![Screenshot 2025-02-11 at 17 26 32](https://github.com/user-attachments/assets/28822468-e246-4b0e-b7a3-1671961d0d1b)

### Filters  

The application uses **custom filters** to allow users to filter data within specific table columns. 

```javascript
const courseFilter = (rows, id, filterValue) => {
    return rows.filter(row => {
        const course = row.original.course;
        const courseTitle = course ? course.title.toLowerCase() : '';
        return courseTitle.includes(filterValue.toLowerCase());
    });
};
```

![Screenshot 2025-02-11 at 17 32 25](https://github.com/user-attachments/assets/ab5e2d71-67e7-48b7-9796-046ff9ac7c72)

### Functionality  

Functionality like enroll, delete course, and others are added to the relevant tables.

![Screenshot 2025-02-11 at 17 27 31](https://github.com/user-attachments/assets/0f760525-de62-49ea-ae77-fa225478fec3)

After clicking enroll the database updates and the ui fetches the new data and automatically renders the users enrollments.

![Screenshot 2025-02-11 at 17 28 18](https://github.com/user-attachments/assets/0b2c348c-0f61-4580-8abe-5d41ab74c691)


### Row Click Behavior  

In the **Courses Table** and **Enrollments Table**, clicking a row triggers two actions:  

1. **Sets the page** to `ObjectViewer` using `setPage` from **App Context**.  
2. **Sets the selected object** in **App Context**, allowing the app to display detailed information about the selected item.
<img width="1234" alt="Screenshot 2025-02-11 at 18 08 57" src="https://github.com/user-attachments/assets/69c758ad-3857-46b7-9d46-9eb38c3f393a" />

## Object Views

There are three viewTypes currently as a user view has not been implemented. 

``` javascript
export default function ObjectViewer() {
    const { viewType } = useAppContext();
    if (viewType === 'courses') {
        return <CourseView />;
    }
    if (viewType === 'lessons') {
        return <LessonView />;
    }
    if (viewType === 'assignments') {
        return <AssignmentView />;
    }
}
```

### Course View

Course view takes the data stored in viewObject state (stored after api call) and displays it in a tabular format.

The view is customized with functionality depending on which user type is looking. For admins with full access:

### Info

![Screenshot 2025-02-11 at 17 36 26](https://github.com/user-attachments/assets/fdf8412a-dc9b-4929-9ea2-fe515107e060)

### Lessons
<img width="460" alt="Screenshot 2025-02-11 at 17 47 42" src="https://github.com/user-attachments/assets/dd86fe53-4629-480a-9c82-15a12c1e94f1" />

### Assignments

<img width="461" alt="Screenshot 2025-02-11 at 17 47 57" src="https://github.com/user-attachments/assets/a424ad9e-e550-4e19-bccb-1b80618f19f6" />

### Students
<img width="481" alt="Screenshot 2025-02-11 at 17 48 21" src="https://github.com/user-attachments/assets/afc37296-ae2a-475a-93da-7feaeb73f858" />

### Assignment and Lesson views

These appear very similarly to the course view except specifically render the data for the lesson/assignment i.e.

These are not supposed to be usable. Just added for flavor.

<img width="805" alt="Screenshot 2025-02-11 at 17 53 17" src="https://github.com/user-attachments/assets/a9ab9411-aba8-4c9d-9af4-bd265b407de4" />

---
## Service Layer  

The service layer is located in the `services` folder and contains three subfolders for different types of API calls.

#### Accounts  

- **Handle Login**: When the login form is submitted, this function checks the database. If the username and password are valid, it returns a token and stores it in local storage.  
- **Handle Logout**: This function does not make an API call but simply removes the token from local storage and resets the page to the login screen.  
- **Handle Signup**: This function submits user data to the server to create an account. If successful, it stores the token in local storage and logs the user in automatically. If the user already exists, they are logged in instead.  

#### Actions  

The actions folder contains two files:  

- **Course Manager Actions**: Handles `POST` requests for various course-related actions.  
- **Delete User**: Handles `DELETE` requests and is only accessible to admins. The UI is updated separately using `GET` requests.  

##### Course Manager Actions  

This file manages multiple actions related to courses, lessons, assignments, and enrollments. It exclusively handles `POST` requests and only returns whether the action was successful or not. The UI updates separately using `GET` requests. If an action fails, the UI should reflect this accordingly.  

The available actions are:  

```javascript 
  const availableActions =  [  
  'create_course',  
  'delete_course',  
  'add_lesson',  
  'delete_lesson',  
  'add_assignment',  
  'delete_assignment',  
  'enroll_student',  
  'unenroll_student',  
  'add_teacher',  
  'remove_teacher'  
  ];
```

To avoid unnecessary API calls, this function checks whether the action being requested is included in `availableActions` before proceeding. 

#### Get Requests  

There are three types of `GET` requests in the service layer:  

- **Get Lists**: Retrieves data for tables.  
- **Get Objects**: Fetches detailed data for a specific object when a row is clicked.  
- **Get User Type**: Determines the user's authentication status when logging in or when the app first renders to ensure the correct state is set.  

These `GET` requests ensure that the frontend always displays the most up-to-date data from the backend.  

### Design  

The design of the application is standardized using Material UI (MUI). This ensures a consistent look and feel across all components. The application follows MUI’s default design principles, with minimal custom CSS.  

- The color scheme is simple and clean.  
- The UI is designed for **desktop use**. While it may function on mobile devices, it is not optimized for them.  
- Most components are built using MUI’s pre-designed elements, ensuring a responsive and accessible interface.  

### Testing  

The frontend testing is handled using JSdom, Vitest and React Testing Library. The tests ensure that components render correctly and that pages display as expected for different user types.  

The test files are located in the `src/__tests__` folder, with the main test file being `app.test.jsx`.  

#### Running Tests  

1. Open a terminal in the project root directory.  
2. Ensure dependencies are installed by running:  
   `npm install`  
3. Run all tests using:  
   `npm test`  


## Technical Stack

- **Frontend:**
  - 🟨 JavaScript
  - ⚛️ React
  - ⚡ Vite
  - 🎨 Material UI
  - 📦 NPM (Node Package Manager)
  - 🛠️ React Testing Library + Vitest + JSDOM
  - 📡 GH-pages for deployment


- **Backend:**
  - 🐍 Python
  - 🚀 Django
  - 🎯 Django REST Framework (DRF)
  - 📜 Swagger UI
  - 🗄️ SQLite
  - 🔒 Django REST Authtoken
  - 🛠️ Django TestCase
  - 📡 Render for Deployment
  - 🤖 Uptime Robot for uptime
