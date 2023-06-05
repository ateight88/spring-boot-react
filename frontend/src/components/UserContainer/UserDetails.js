import React from 'react';
import { Link } from 'react-router-dom';

const UserDetails = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No user data available</div>;
  }

  const { id, name, department, articles, createdAt, modifiedAt } = data[0];

  const formatDate = date => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className='user-details-container'>
        <form className='user-details-form'>
          {/* <div>
            <label htmlFor='id'>ID:</label>
            <input type='text' id='id' defaultValue={id} disabled={true} />
          </div> */}
          <div>
            <label htmlFor='name'>Name:</label>
            <input type='text' id='name' defaultValue={name} />
          </div>
          <div>
            <label htmlFor='department'>Department:</label>
            <input type='text' id='department' defaultValue={department} />
          </div>
          <Link to={'/users/' + id}>Edit User</Link>

          {/* <div>
            <label htmlFor='articles'>Articles:</label>
            <input
              type='text'
              id='articles'
              defaultValue={articles.length}
              disabled={true}
            />
          </div> */}
          <div>
            <label htmlFor='createdAt'>Created At:</label>
            <input
              type='text'
              id='createdAt'
              defaultValue={formatDate(createdAt)}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor='modifiedAt'>Modified At:</label>
            <input
              type='text'
              id='modifiedAt'
              value={formatDate(modifiedAt)}
              disabled={true}
            />
          </div>
        </form>
        <div className='user-details-articles'>
          <h4>Articles</h4>
          {articles.length === 0 ? (
            <p>No articles available</p>
          ) : (
            <ul>
              {articles.map((article, idx) => (
                <li key={idx}>
                  <h5>{article}</h5>
                  <p>Published At: {article.createdAt}</p>
                  <Link to={'/articles/' + article}>Read More...</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* <ArticlesByAuthor data={data} /> */}
      {/* <div >
        <h2>Articles</h2>
        {articles.length === 0 ? (
          <p>No articles available</p>
        ) : (
          <ul>
            {articles.map((article, idx) => (
              <li key={idx}>
                <h3>{article}</h3>
                <p>Published At: {article.createdAt}</p>
                <Link to={'/articles/' + article}>Read More...</Link>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </>
  );
};

export default UserDetails;
