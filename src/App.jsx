import React,{ useEffect } from 'react'
import './App.css'
import SignIn from '@forms/Login'
import UserCreateForm from '@forms/UserCreateForm'
import Playground from '@components/Navigation/Playground'
import { useAppContext } from './AppContext'
import CourseCreateForm from '@forms/CourseCreateForm'
import  getUserType  from '@get/getUserType'
import ObjectViewer from './Components/ObjectViews/ObjectViewer'
import Header from './Components/Navigation/Header'
import Home from './Components/Pages/Home'
import Admin from './Components/Pages/Admin'

function App() {
  const {page, setPage, setLoggedIn, setAuthStatus} = useAppContext()

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      console.log("Token: ", token);
      if (token) {
        setLoggedIn(true);
        setPage('Home');
        try {
          const userType = await getUserType(token);
          console.log("User type: ", userType);
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


        // Tidy code base front and back end
        // Build a simple header to navigate between pages
        // Make a simple home page to browse courses.
        // Design all my elements
  return (
    <>
      <Header/>
      <div style={{ paddingTop: '85px' }}> 
        {(page === 'Playground') && <Playground />}
        {(page === 'Login') && <SignIn />}
        {(page === 'Signup') && <UserCreateForm formTitle='Sign Up' />}
        {(page === 'AddUser') && <UserCreateForm formTitle='Add User' />}
        {(page === 'Home') && <Home />}
        {(page === 'CreateCourse') && <CourseCreateForm />}
        {(page === 'ObjectViewer') && <ObjectViewer />}
        {(page === 'Admin') && <Admin />}
      </div>
    </>
  )
}

export default App
