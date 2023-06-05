import React, { useState } from 'react';
import UserDataService from '../../services/UserService';

const AddUser = () => {
  const initialUserState = {
    name: '',
    department: '',
    articles: [],
  };
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    var data = {
      name: user.name,
      department: user.department,
      articles: user.articles,
    };

    UserDataService.create(data)
      .then(response => {
        setUser({
          name: response.data.name,
          department: response.data.department,
          articles: response.data.articles,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className='submit-form'>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className='btn btn-success' onClick={newUser}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              className='form-control'
              id='name'
              required
              value={user.name}
              onChange={handleInputChange}
              name='name'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='department'>Department</label>
            <input
              type='text'
              className='form-control'
              id='department'
              required
              value={user.department}
              onChange={handleInputChange}
              name='department'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='users'>Articles</label>
            <input
              type='text'
              className='form-control'
              id='users'
              required
              value={user.articles}
              onChange={handleInputChange}
              name='users'
            />
          </div>

          <button onClick={saveUser} className='btn btn-success'>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
