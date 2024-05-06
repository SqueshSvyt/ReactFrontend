import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './assets/css/App.css';
import Header from './components/Header'
import HomePage from "./components/HomePage";
import Footer  from "./components/Footer";
import AuthForm from "./components/AuthForm";
import RegisterForm from "./components/RegisterForm";
import { AuthProvider } from './contexts/AuthContext';
import Admin_Panel from "./components/Admin_Panel";
import AboutUs from "./components/AboutUs";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import PlaylistContainer from "./components/PlaylistContainer";

function App() {
  return (
      <Router>
          <AuthProvider>
              <div className="App">
                  <Header />
                  <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/login" element={<AuthForm />} /> {/* Add a route for the login page */}
                      <Route path='/register' element={<RegisterForm />}/>
                      {/* eslint-disable-next-line react/jsx-pascal-case */}
                      <Route path='/admin' element={<Admin_Panel />}/>
                      <Route path='/about_us' element={<AboutUs />}/>
                      <Route path='/profile' element={<Profile />}/>
                      <Route path='/edit_profile' element={<EditProfile />} />
                      <Route path='/userplaylist' element={<PlaylistContainer />}/>
                  </Routes>
                  <Footer />
              </div>
          </AuthProvider>
      </Router>
  );
}

export default App;
