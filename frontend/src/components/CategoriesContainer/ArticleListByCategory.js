import React, { useState, useEffect } from 'react';
import ArticleService from '../../services/ArticleService';
import UserService from '../../services/UserService';
import '../../App.css';

const ArticleListByCategory = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await ArticleService.findByCategory(category);
        if (response.status === 200) {
          const articles = response.data;
          const articlePromises = articles.map(async article => {
            const userResponse = await UserService.get(article.createdBy);
            if (userResponse.status === 200) {
              const user = userResponse.data;
              article.createdByName = user.name;
            }
            return article;
          });
          const updatedArticles = await Promise.all(articlePromises);
          setArticles(updatedArticles);
        } else {
          throw new Error(`Failed to fetch ${category} articles`);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    fetchArticles();
  }, [category]);

  const formatDate = date => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div
      className='category-background'
      style={{
        backgroundImage: `url(https://source.unsplash.com/random/?${category}&sig=111)`,
      }}
    >
      <h2>{category} articles: </h2>
      {articles.length === 0 ? (
        <p>No {category} articles available</p>
      ) : (
        <ul>
          {articles
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(article => (
              <div className='article-card' key={article.id}>
                <h1>{article.title}</h1>
                <p>Author's Field: {article.department}</p>
                <p>Full Story: {article.full}</p>
                <p>Popularity: {article.numberOfReads}</p>
                <p>Created By: {article.createdByName}</p>
                <p>Published: {formatDate(article.createdAt)}</p>
              </div>
            ))}
        </ul>
      )}
      <h2>end:</h2>
    </div>
  );
};

export default ArticleListByCategory;
