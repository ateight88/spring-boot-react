import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddArticle from './components/ArticleContainer/AddArticle';
import Article from './components/ArticleContainer/Article';
import ArticlesList from './components/ArticleContainer/ArticlesList';

import AddUser from './components/UserContainer/AddUser';
import User from './components/UserContainer/User';
import UsersList from './components/UserContainer/UsersList';

import UserLogin from './components/UserContainer/UserLogin';
import UserDetails from './components/UserContainer/UserDetails';
import AllArticles from './components/ArticleContainer/AllArticles';

import AuthContext from './auth/AuthContext';

import Sports from './components/CategoriesContainer/Sports';
import Lifestyle from './components/CategoriesContainer/LifeStyle';
import Politics from './components/CategoriesContainer/Politics';
import CurrentAffairs from './components/CategoriesContainer/CurrentAffairs';

const App = () => {
  const [userDetails, setUserDetails] = useState(null);

  const handleLogin = data => {
    setUserDetails(data);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserDetails(null);
  };

  const isAuthenticated = userDetails !== null;

  return (
    <AuthContext.Provider
      value={{ userDetails, handleLogin, handleLogout, isAuthenticated }}
    >
      <div>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <a href='/all-articles' className='navbar-brand'>
            S-G-N-N
          </a>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={'/current-affairs'} className='nav-link'>
                CurrentAffairs
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/politics'} className='nav-link'>
                Politics
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/sports'} className='nav-link'>
                Sports
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/lifestyle'} className='nav-link'>
                LifeStyle
              </Link>
            </li>
          </div>
          {!isAuthenticated && (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item '>
                <Link to={'/user-login'} className='nav-link'>
                  UserLogin
                </Link>
              </li>
            </div>
          )}

          {isAuthenticated && (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/user-details'} className='nav-link'>
                  UserDetails
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/add-article'} className='nav-link'>
                  Add Article
                </Link>
              </li>
              {userDetails[0]?.name === 'Admin' && (
                <>
                  <li className='nav-item'>
                    <Link to={'/articles'} className='nav-link'>
                      Articles
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to={'/users'} className='nav-link'>
                      Users
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to={'/add-user'} className='nav-link'>
                      Add User
                    </Link>
                  </li>
                </>
              )}
              <li className='nav-item'>
                <Link to={''} className='nav-link login-name-disabled' disabled>
                  Welcome back {userDetails[0]?.name}
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={'/all-articles'}
                  className='nav-link'
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className='container mt-3'>
          <Routes>
            <Route
              path='/user-login'
              element={<UserLogin onLogin={handleLogin} />}
            />
            <Route path='/articles' element={<ArticlesList />} />
            <Route
              path='/all-articles'
              element={<AllArticles data={userDetails} />}
            />
            <Route
              path='/user-details'
              element={<UserDetails data={userDetails} />}
            />
            <Route
              path='/add-article'
              element={
                <AddArticle
                  data={userDetails}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path='/articles/:id'
              element={
                <Article isAuthenticated={isAuthenticated} data={userDetails} />
              }
            />
            <Route
              path='/users'
              element={<UsersList isAuthenticated={isAuthenticated} />}
            />
            <Route path='/add-user' element={<AddUser />} />
            <Route path='/users/:id' element={<User />} />

            <Route path='/sports' element={<Sports />} />
            <Route path='/politics' element={<Politics />} />
            <Route path='/lifestyle' element={<Lifestyle />} />
            <Route path='/current-affairs' element={<CurrentAffairs />} />
          </Routes>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
