import React, { useState, useEffect } from 'react';
import ArticleService from '../../services/ArticleService';
import UserService from '../../services/UserService';
import '../../App.css';

const ArticleListByCategory = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

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

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
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
            .slice(
              (currentPage - 1) * articlesPerPage,
              currentPage * articlesPerPage
            )
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
      <div className='pagination'>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <h3 className='pagination'>{`Page: ${currentPage}`}</h3>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(articles.length / articlesPerPage)
          }
        >
          Next
        </button>
      </div>
      <h2>end:</h2>
    </div>
  );
};

export default ArticleListByCategory;
