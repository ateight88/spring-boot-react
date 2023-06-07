import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllArticles = () => {
  const [articleDetails, setArticleDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

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

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      {/* <p>{JSON.stringify(articleDetails[0])}</p> */}
      {articleDetails.length === 0 ? (
        <p>No articles available</p>
      ) : (
        <>
          <div
            className='category-background'
            style={{
              // backgroundImage: `url(https://source.unsplash.com/random/?news&sig=111)`,
              backgroundImage: `url(https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80)`,
            }}
          >
            <div className='all-articles-container'>
              <h2 className='all-articles-title'>HeadLine</h2>
              <ul>
                {articleDetails
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 1)
                  .map(article =>
                    article.published ? (
                      <div className='all-articles-card' key={article.id}>
                        <li>
                          <h3>{article.title}</h3>
                          <p>{article.summary}</p>
                          <p>Author's Field: {article.department}</p>
                          <p>Published At: {formatDate(article.createdAt)}</p>
                          <p>Popularity: {article.numberOfReads}</p>
                          <Link to={'/articles/' + article.id}>
                            Read More...
                          </Link>
                        </li>
                      </div>
                    ) : null
                  )}
              </ul>
            </div>

            <div className='all-articles-container'>
              <h2 className='all-articles-title'>Most Recent Articles</h2>
              <ul>
                {articleDetails
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(1, 5)
                  .map(article =>
                    article.published ? (
                      <div className='all-articles-card' key={article.id}>
                        <li>
                          <h3>{article.title}</h3>
                          <p>{article.summary}</p>
                          {/* <p>{article.full}</p> */}
                          <p>Author's Field: {article.department}</p>
                          <p>Published At: {formatDate(article.createdAt)}</p>
                          <p>Popularity: {article.numberOfReads}</p>
                          <Link to={'/articles/' + article.id}>
                            Read More...
                          </Link>
                        </li>
                      </div>
                    ) : null
                  )}
              </ul>
            </div>

            <div className='all-articles-container'>
              <h2 className='all-articles-title'>Most Read Articles</h2>
              <ul>
                {articleDetails
                  .sort((a, b) => b.numberOfReads - a.numberOfReads)
                  .slice(
                    (currentPage - 1) * articlesPerPage,
                    currentPage * articlesPerPage
                  )
                  .map(article =>
                    article.published ? (
                      <div className='all-articles-card' key={article.id}>
                        <li>
                          <h3>{article.title}</h3>
                          <p>{article.summary}</p>
                          <p>Author's Field: {article.department}</p>
                          <p>Published At: {formatDate(article.createdAt)}</p>
                          <p>Popularity: {article.numberOfReads}</p>
                          <Link to={'/articles/' + article.id}>
                            Read More...
                          </Link>
                        </li>
                      </div>
                    ) : null
                  )}
              </ul>
              <div className='pagination-container'>
                <div className='pagination'>
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <h3 className='pagination'>{`Page: ${currentPage}`}</h3>
                  <button
                    onClick={handleNextPage}
                    disabled={
                      currentPage ===
                      Math.ceil(articleDetails.length / articlesPerPage)
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* <div className='all-articles-container'>
              <h2>Most Read Articles</h2>
              <ul>
                {articleDetails
                  .sort((a, b) => b.numberOfReads - a.numberOfReads)
                  // .slice(0, 5)
                  .map(article =>
                    article.published ? (
                      <div className='all-articles-card' key={article.id}>
                        <li>
                          <h3>{article.title}</h3>
                          <p>{article.summary}</p>
                          <p>Author's Field: {article.department}</p>
                          <p>Published At: {formatDate(article.createdAt)}</p>
                          <p>Popularity: {article.numberOfReads}</p>
                          <Link to={'/articles/' + article.id}>
                            Read More...
                          </Link>
                        </li>
                      </div>
                    ) : null
                  )}
              </ul>
            </div> */}
            <h2>end:</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default AllArticles;
