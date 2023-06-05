import React, { useState, useEffect } from 'react';

const ArticlesByAuthor = ({ data }) => {
  const [articleDetails, setArticleDetails] = useState([]);
  const authorName = data[0].name;

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const userId = data[0].id;
        const response = await fetch(
          `http://localhost:8080/api/users/${userId}/articles`
        );
        if (response.ok) {
          const articleData = await response.json();
          articleData.length > 0
            ? setArticleDetails(articleData)
            : console.log('No acritlces');
        } else {
          throw new Error('Failed to fetch article details');
        }
      } catch (error) {}
    };

    fetchArticleDetails();
    setArticleDetails('');
  }, [data]);

  return (
    <div>
      <h2>Articles</h2>
      {articleDetails.length === 0 ? (
        <p>No articles available</p>
      ) : (
        <ul>
          {articleDetails.map(article => (
            <li key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <p>{article.full}</p>
              <p>Author: {authorName}</p>
              <p>Published At: {article.createdAt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticlesByAuthor;
