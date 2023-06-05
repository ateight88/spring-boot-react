import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArticleDataService from '../../services/ArticleService';
import UserService from '../../services/UserService';
import '../../App.css';

const Article = ({ isAuthenticated }) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const storedName = localStorage.getItem('loginName');
  const initialArticleState = {
    id: null,
    title: '',
    summary: '',
    full: '',
    published: false,
    numberOfReads: null,
    createdBy: id,
  };
  const [currentArticle, setCurrentArticle] = useState(initialArticleState);
  const [message, setMessage] = useState('');
  console.log(currentArticle.numberOfReads);

  useEffect(() => {
    updateArticle(); // Call the updateArticle
  }, [currentArticle.numberOfReads]);

  const incrementReadCounter = () => {
    setCurrentArticle(prevState => {
      const updatedArticle = {
        ...prevState,
        numberOfReads: prevState.numberOfReads + 1,
      };
      updateArticle(updatedArticle);
      return updatedArticle;
    });
  };

  // const getArticle = id => {
  //   ArticleDataService.get(id)
  //     .then(response => {
  //       setCurrentArticle(response.data);
  //       incrementReadCounter();
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const getArticle = async id => {
    try {
      const response = await ArticleDataService.get(id);
      if (response.status === 200) {
        const article = response.data;
        const userResponse = await UserService.get(article.createdBy);
        if (userResponse.status === 200) {
          const user = userResponse.data;
          article.createdByName = user.name;
        }
        setCurrentArticle(article);
        incrementReadCounter();
        console.log(article);
      } else {
        throw new Error('Failed to fetch article details');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) getArticle(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentArticle({ ...currentArticle, [name]: value });
  };

  const updatePublished = status => {
    const data = {
      title: currentArticle.title,
      summary: currentArticle.summary,
      full: currentArticle.full,
      published: status,
      numberOfReads: currentArticle.numberOfReads,
    };

    ArticleDataService.update(currentArticle.id, data)
      .then(response => {
        setCurrentArticle({ ...currentArticle, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateArticle = () => {
    ArticleDataService.update(currentArticle.id, currentArticle)
      .then(response => {
        console.log(response.data);
        setMessage('The article was updated successfully!');
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const deleteArticle = () => {
  //   ArticleDataService.remove(currentArticle.id)
  //     .then(response => {
  //       console.log(response.data);
  //       setMessage('The article was deleted successfully!');
  //       // navigate('/articles');
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const deleteArticle = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this article? Please note that this action cannot be undone.'
    );

    if (confirmDelete) {
      ArticleDataService.remove(currentArticle.id)
        .then(response => {
          console.log(response.data);
          setMessage('The article was deleted successfully!');
          navigate('/user-details');
          window.location.reload();
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      {currentArticle ? (
        <div>
          <h4>Article</h4>
          {/* <p>{JSON.stringify(currentArticle)}</p> */}

          <div className='article-card'>
            <h1>{currentArticle.title}</h1>
            <p>Author's Field: {currentArticle.department}</p>
            <p>Full Story: {currentArticle.full}</p>
            <p>Author: {currentArticle.createdByName}</p>
            <p>Popularity: {currentArticle.numberOfReads}</p>
          </div>

          {isAuthenticated && (
            <>
              <div className='article-card'>
                <form>
                  <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input
                      type='text'
                      className='form-control'
                      id='title'
                      name='title'
                      value={currentArticle.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='summary'>Summary</label>
                    <input
                      type='text'
                      className='form-control'
                      id='summary'
                      name='summary'
                      value={currentArticle.summary}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='full'>Full Text</label>
                    <textarea
                      type='textarea'
                      className='form-control'
                      id='full'
                      name='full'
                      value={currentArticle.full}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className='form-group'>
                    <label>
                      <strong>Author:</strong>
                    </label>
                    {storedName}
                  </div>
                  <div className='form-group'>
                    <label>
                      <strong>Status:</strong>
                    </label>
                    {currentArticle.published ? 'Published' : 'Pending'}
                  </div>
                  <div className='form-group'>
                    <label>
                      <strong>Number of Reads:</strong>
                    </label>
                    {currentArticle.numberOfReads}
                  </div>
                </form>
                {currentArticle.published ? (
                  <button
                    className='badge badge-primary mr-2'
                    onClick={() => updatePublished(false)}
                  >
                    UnPublish
                  </button>
                ) : (
                  <button
                    className='badge badge-primary mr-2'
                    onClick={() => updatePublished(true)}
                  >
                    Publish
                  </button>
                )}
                <button
                  className='badge badge-danger mr-2'
                  onClick={deleteArticle}
                >
                  Delete
                </button>
                <button
                  type='submit'
                  className='badge badge-success'
                  onClick={updateArticle}
                >
                  Update
                </button>
                <p>{message}</p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Article...</p>
        </div>
      )}
    </div>
  );
};

export default Article;
