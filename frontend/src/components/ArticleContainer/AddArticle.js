import React, { useState } from 'react';
import ArticleDataService from '../../services/ArticleService';

const AddArticle = ({ data, isAuthenticated }) => {
  const { id } = data[0];
  const initialArticleState = {
    title: '',
    summary: '',
    full: '',
    createdBy: '',
  };
  const [article, setArticle] = useState(initialArticleState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
  };

  const saveArticle = () => {
    var data = {
      title: article.title,
      summary: article.summary,
      full: article.full,
      createdBy: id,
    };

    ArticleDataService.create(data)
      .then(response => {
        setArticle({
          title: response.data.title,
          summary: response.data.summary,
          full: response.data.full,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newArticle = () => {
    setArticle(initialArticleState);
    setSubmitted(false);
  };

  return (
    <div className='submit-form'>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className='btn btn-success' onClick={newArticle}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              className='form-control'
              id='title'
              required
              value={article.title}
              onChange={handleInputChange}
              name='title'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='summary'>Summary</label>
            <input
              type='text'
              className='form-control'
              id='summary'
              required
              value={article.summary}
              onChange={handleInputChange}
              name='summary'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='full'>Full</label>
            <input
              type='text'
              className='form-control'
              id='full'
              required
              value={article.full}
              onChange={handleInputChange}
              name='full'
            />
          </div>

          <button onClick={saveArticle} className='btn btn-success'>
            Submit
          </button>
          {isAuthenticated && <p>Logged In</p>}
        </div>
      )}
    </div>
  );
};

export default AddArticle;
