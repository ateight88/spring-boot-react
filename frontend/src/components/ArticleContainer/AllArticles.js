import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllArticles = () => {
  const [articleDetails, setArticleDetails] = useState([]);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/articles`);
        if (response.ok) {
          const articleData = await response.json();
          console.log(articleData);
          articleData.length > 0
            ? setArticleDetails(articleData)
            : console.log('No acritlces');
        } else {
          throw new Error('Failed to fetch article details');
        }
      } catch (error) {}
    };

    setArticleDetails('');
    fetchArticleDetails();
  }, []);

  const formatDate = date => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2>Articles</h2>
      {/* <p>{JSON.stringify(articleDetails[0])}</p> */}
      {articleDetails.length === 0 ? (
        <p>No articles available</p>
      ) : (
        <>
          <div className='all-articles-container'>
            <ul>
              {articleDetails
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                // .sort((a, b) => b.numberOfReads - a.numberOfReads)
                .slice(0, 5)
                .map(article =>
                  !article.published ? (
                    <div className='all-articles-card'>
                      <li key={article.id}>
                        <h3>{article.title}</h3>
                        <p>{article.summary}</p>
                        {/* <p>{article.full}</p> */}
                        <p>Author's Field: {article.department}</p>
                        <p>Published At: {formatDate(article.createdAt)}</p>
                        <p>Popularity: {article.numberOfReads}</p>
                        <Link to={'/articles/' + article.id}>Read More...</Link>
                      </li>
                    </div>
                  ) : null
                )}
            </ul>
          </div>

          <h2>Top 10 Most Read Articles</h2>
          <div className='all-articles-container'>
            <ul>
              {articleDetails
                // .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .sort((a, b) => b.numberOfReads - a.numberOfReads)
                .slice(0, 10)
                .map(article =>
                  !article.published ? (
                    <div className='all-articles-card'>
                      <li key={article.id}>
                        <h3>{article.title}</h3>
                        <p>{article.summary}</p>
                        <p>Author's Field: {article.department}</p>
                        <p>Published At: {formatDate(article.createdAt)}</p>
                        <p>Popularity: {article.numberOfReads}</p>
                        <Link to={'/articles/' + article.id}>Read More...</Link>
                      </li>
                    </div>
                  ) : null
                )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default AllArticles;