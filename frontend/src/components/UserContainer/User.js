import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserDataService from '../../services/UserService';

const User = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialUserState = {
    id: null,
    name: '',
    department: '',
    articles: [],
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState('');

  const getUser = id => {
    UserDataService.get(id)
      .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getUser(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateAuthor = status => {
    var data = {
      id: currentUser.id,
      name: currentUser.name,
      department: currentUser.department,
      articles: currentUser.articles,
    };

    UserDataService.update(currentUser.id, data)
      .then(response => {
        setCurrentUser({ ...currentUser, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateUser = () => {
    UserDataService.update(currentUser.id, currentUser)
      .then(response => {
        console.log(response.data);
        setMessage('The user was updated successfully!');
        setTimeout(() => setMessage(''), 1000);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    UserDataService.remove(currentUser.id)
      .then(response => {
        console.log(response.data);
        navigate('/users');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div className='edit-form'>
          <h4>User</h4>
          <form>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={currentUser.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='department'>Department</label>
              <input
                type='text'
                className='form-control'
                id='department'
                name='department'
                value={currentUser.department}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label>
                <strong>Status:</strong>
              </label>
              {currentUser.department ? 'Assigned' : 'Pending'}
            </div>
          </form>

          {currentUser.department ? (
            <button
              className='badge badge-primary mr-2'
              onClick={() => updateAuthor(false)}
            >
              UnAuthor
            </button>
          ) : (
            <button
              className='badge badge-primary mr-2'
              onClick={() => updateAuthor(true)}
            >
              Author
            </button>
          )}

          <button className='badge badge-danger mr-2' onClick={deleteUser}>
            Delete
          </button>

          <button
            type='submit'
            className='badge badge-success'
            onClick={updateUser}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default User;
