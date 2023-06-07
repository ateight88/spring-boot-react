import React, { useState, useEffect } from 'react';
import UserDataService from '../../services/UserService';
import { Link } from 'react-router-dom';

const UsersList = ({ isAuthenticated }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveUsers = () => {
    UserDataService.getAll()
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUsers();
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const removeAllUsers = () => {
    UserDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    UserDataService.findByName(searchName)
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className='list row'>
      <div className='col-md-8'>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by title'
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <h4>Users List</h4>

        <ul className='list-group'>
          {users &&
            users.map((user, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user.name}
              </li>
            ))}
        </ul>

        <button className='m-3 btn btn-sm btn-danger' onClick={removeAllUsers}>
          Remove All
        </button>
      </div>
      <div className='col-md-6'>
        {currentUser ? (
          <div>
            <h4>User</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{' '}
              {currentUser.name}
            </div>
            <div>
              <label>
                <strong>Department:</strong>
              </label>{' '}
              {currentUser.department}
            </div>
            <div>
              <label>
                <strong>Articles:</strong>
              </label>{' '}
              {currentUser.articles.length}
            </div>

            <Link
              to={'/users/' + currentUser.id}
              className='badge badge-warning'
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
