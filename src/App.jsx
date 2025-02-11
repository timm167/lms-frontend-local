import React,{ useEffect } from 'react'
import './App.css'
import SignIn from '@forms/Login'
import UserCreateForm from '@forms/UserCreateForm'
import Playground from '@components/Navigation/Playground'
import { useAppContext } from './AppContext'
import CourseCreateForm from '@forms/CourseCreateForm'
import getUserType  from '@get/getUserType'
import ObjectViewer from './Components/ObjectViews/ObjectViewer'
import Header from './Components/Navigation/Header'
import Home from './Components/Pages/Home'
import Footer from './Components/Navigation/Footer'
import CreateLesson from '@forms/CreateLessonForm';
import CreateAssignment from '@forms/CreateAssignmentForm';

function App() {
  const {page, setPage, setLoggedIn, setAuthStatus} = useAppContext()

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

  return (
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
  )
}

export default App
