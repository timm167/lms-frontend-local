import { expect, test, vi } from 'vitest';
import '@testing-library/jest-dom'; 
import { render, screen } from '@testing-library/react';
import App from '../App';
import { AppProvider, useAppContext } from '../AppContext'; 

// Partially mock the AppContext module
vi.mock('../AppContext', async () => {
  const actual = await vi.importActual('../AppContext'); 
  return {
    ...actual,
    useAppContext: vi.fn(), 
  };
});

test('renders login page by default', () => {
  useAppContext.mockReturnValue({
    page: 'login',
    setPage: vi.fn(),
    loggedIn: false,
    setLoggedIn: vi.fn(),
    authStatus: 'unauthorized',
    setAuthStatus: vi.fn(),
  });

  const { getByText } = render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  expect(getByText(/Login/i)).toBeInTheDocument(); 
});

test('renders Playground when page is Playground', () => {
  useAppContext.mockReturnValue({
    page: 'Playground',
    setPage: vi.fn(),
    loggedIn: false,
    setLoggedIn: vi.fn(),
    authStatus: 'unauthorized',
    setAuthStatus: vi.fn(),
    tableView: 'grid', 
  });

  const { getByText } = render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  expect(getByText(/Playground/i)).toBeInTheDocument();
});

test('renders Signup page when page is Signup', () => {
    useAppContext.mockReturnValue({
        page: 'Signup',
        setPage: vi.fn(),
        loggedIn: false,
        setLoggedIn: vi.fn(),
        authStatus: 'unauthorized',
        setAuthStatus: vi.fn(),
        tableView: 'grid',
    });
    
    render(
        <AppProvider>
        <App />
        </AppProvider>
    );
    
    expect(screen.getAllByText(/Sign Up/i)).length > 1; // Check that there's at least one
})


test('renders AddUser page for admins', () => {
  useAppContext.mockReturnValue({
    page: 'AddUser',
    setPage: vi.fn(),
    loggedIn: true,
    setLoggedIn: vi.fn(),
    authStatus: 'admin', // Admin role
    setAuthStatus: vi.fn(),
    tableView: 'grid',
  });

  render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  expect(screen.getAllByText(/Add User/i)).length > 1; // Check that there's at least one
});


test('renders CreateCourse for admins', () => {
  useAppContext.mockReturnValue({
    page: 'CreateCourse',
    setPage: vi.fn(),
    loggedIn: true,
    setLoggedIn: vi.fn(),
    authStatus: 'admin', 
    setAuthStatus: vi.fn(),
    tableView: 'grid',
  });

  render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  const createCourseElements = screen.getAllByText(/Create Course/i);
  expect(createCourseElements.length).toBeGreaterThan(1); // Check that there's at least one
});

test('renders CreateCourse for teachers', () => {
  useAppContext.mockReturnValue({
    page: 'CreateCourse',
    setPage: vi.fn(),
    loggedIn: true,
    setLoggedIn: vi.fn(),
    authStatus: 'teacher', 
    setAuthStatus: vi.fn(),
    tableView: 'grid',
  });

  render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  const createCourseElements = screen.getAllByText(/Create Course/i);
  expect(createCourseElements.length).toBeGreaterThan(1); // Check that there's at least one
});


test('renders CreateAssignment for admins and teachers', () => {
  useAppContext.mockReturnValue({
    page: 'CreateAssignment',
    setPage: vi.fn(),
    loggedIn: true,
    setLoggedIn: vi.fn(),
    authStatus: 'admin', // Admin role
    setAuthStatus: vi.fn(),
    tableView: 'grid',
  });

  render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  const createAssignmentElements = screen.getAllByText(/Create Assignment/i);
  expect(createAssignmentElements.length).toBeGreaterThan(1); // Check that there's at least one
});

test('Custom home screen for students', () => {
    useAppContext.mockReturnValue({
        page: 'Home',
        setPage: vi.fn(),
        loggedIn: true,
        setLoggedIn: vi.fn(),
        authStatus: 'student', 
        setAuthStatus: vi.fn(),
        tableView: 'grid',
        setSwitchTable: vi.fn(),
    });
    
    render(
        <AppProvider>
        <App />
        </AppProvider>
    );
    
    expect(screen.queryByText(/Add Course/i)).toBeNull(); // Check that there's no Add Course button
})

test('Custom home screen for teachers', () => {
    useAppContext.mockReturnValue({
        page: 'Home',
        setPage: vi.fn(),
        loggedIn: true,
        setLoggedIn: vi.fn(),
        authStatus: 'teacher', 
        setAuthStatus: vi.fn(),
        tableView: 'grid',
        setSwitchTable: vi.fn(),
    });
    
    render(
        <AppProvider>
        <App />
        </AppProvider>
    );
    
    const homeElements = screen.getAllByText(/Add Course/i);
    expect(homeElements.length).toBe(1) // Check that there's at least one
})

test('Custom home screen for admins', () => {
    useAppContext.mockReturnValue({
        page: 'Home',
        setPage: vi.fn(),
        loggedIn: true,
        setLoggedIn: vi.fn(),
        authStatus: 'admin', 
        setAuthStatus: vi.fn(),
        tableView: 'grid',
        setSwitchTable: vi.fn(),
    });
    
    render(
        <AppProvider>
        <App />
        </AppProvider>
    );
    
    const homeElements = screen.getAllByText(/Users/i);
    expect(homeElements.length).toBeGreaterThan(0); // Check that there's at least one
})

test('Course view', () => {
    useAppContext.mockReturnValue({
        page: 'ObjectViewer',
        setPage: vi.fn(),
        loggedIn: true,
        setLoggedIn: vi.fn(),
        authStatus: 'admin', 
        setAuthStatus: vi.fn(),
        tableView: 'grid',
        setSwitchTable: vi.fn(),
        viewType: 'courses',
        setLastViewObject: vi.fn(), 
        viewObject: {
            "id": 280,
            "title": "Math",
            "description": "Fundamentals of mathematics",
            "teacher": {
                "user_id": 1311,
                "full_name": "Brent Henry"
            },
            "students": [
                {
                    "user_id": 1303,
                    "full_name": "Student User"
                },
            ],
            "lessons": [
                {
                    "id": 782,
                    "title": "Geometry"
                },
            ],
            "assignments": [
                {
                    "id": 782,
                    "title": "Midterm Project"
                },
            ]
        }
    });
    
    render(
        <AppProvider>
        <App />
        </AppProvider>
    );
    
    expect(screen.getAllByText(/Fundamentals of mathematics/i)).length > 0 // Check that the title is displayed
});

test('Lessons view', () => {
    useAppContext.mockReturnValue({
        page: 'ObjectViewer',
        setPage: vi.fn(),
        loggedIn: true,
        setLoggedIn: vi.fn(),
        authStatus: 'admin', 
        setAuthStatus: vi.fn(),
        tableView: 'grid',
        setSwitchTable: vi.fn(),
        viewType: 'lessons',
        viewObject: {
            "id": 782,
            "title": "Geometry",
            "content": "This is a lesson on Geometry in the Math course.",
            "video_url": "https://example.com/math_geometry"
        }
    });
    
    render(
        <AppProvider>
        <App />
        </AppProvider>
    );
    
    expect(screen.getByText(/on Geometry/i)).toBeInTheDocument(); // Check that the title is displayed
})

test('Assignments view', () => {
    useAppContext.mockReturnValue({
        page: 'ObjectViewer',
        setPage: vi.fn(),
        loggedIn: true,
        setLoggedIn: vi.fn(),
        authStatus: 'admin', 
        setAuthStatus: vi.fn(),
        tableView: 'grid',
        setSwitchTable: vi.fn(),
        viewType: 'assignments',
        viewObject: {
            "id": 782,
            "title": "Midterm Project",
            "description": "Midterm Project for the Math course.",
            "due_date": "2025-01-26T00:00:00Z",
            "max_score": 100,
            "pass_score": 50
        }
    });
    
    render(
        <AppProvider>
        <App />
        </AppProvider>
    );
    
    expect(screen.getByText(/Midterm Project for/i)).toBeInTheDocument(); 
});