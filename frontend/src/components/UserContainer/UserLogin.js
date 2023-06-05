import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';

const LoginForm = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [data, setData] = useState(null);
  const [userFound, setUserFound] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem('loginName');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/users?name=${name}`
      );
      if (response.ok) {
        const responseData = await response.json();
        if (
          responseData &&
          responseData.length > 0 &&
          responseData[0].name === name
        ) {
          setData(responseData);
          setUserFound(true);
          onLogin(responseData);
          localStorage.setItem('loginName', name);
        } else {
          setUserFound(false);
        }
      } else {
        setUserFound(false);
        throw new Error('User not found');
      }
    } catch (error) {
      setUserFound(false);
      console.error(
        'Error: no mathcing user details found in database :',
        error
      );
    }
  };

  const handleChange = e => {
    setName(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' value={name} onChange={handleChange} />
        <button type='submit'>Login</button>
      </form>

      {/* <p>{JSON.stringify(data)}</p> */}

      {userFound ? (
        data && data[0] && <UserDetails data={data} />
      ) : (
        <div>Error: no matching user details found in database</div>
      )}
    </>
  );
};

export default LoginForm;
