import React, { useState, useEffect } from "react";
import { getProductReviews } from "../../services/api";
import "../../assets/styles/scss/_all.scss";
import activeStar from "../../assets/images/starActive.png";
import nonActiveStar from "../../assets/images/starNonActive.png";
import { translate } from "../../translations/TranslationUtils";

function Review({ id_product }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const [language] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getProductReviews();
        const filteredReviews = data.filter(
          (review) => review.id_product === id_product
        );
        setReviews(filteredReviews);
      } catch (error) {
        setError("Произошла ошибка при получении отзывов.");
        console.error("Ошибка при получении отзывов:", error);
      }
    };

    fetchReviews();
  }, [id_product]);

  const renderStars = (rate) => {
    const totalStars = 5;
    const activeStars = Array(rate).fill(activeStar);
    const nonActiveStars = Array(totalStars - rate).fill(nonActiveStar);
    return (
      <div className="starsContainer">
        {activeStars.map((star, index) => (
          <img
            key={`active-${index}`}
            src={star}
            alt="Active Star"
            className="star"
          />
        ))}
        {nonActiveStars.map((star, index) => (
          <img
            key={`nonActive-${index}`}
            src={star}
            alt="Non-Active Star"
            className="star"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="reviewListContainer">
      {error ? (
        <p className="errorStyle">{error}</p>
      ) : (
        <>
          {reviews.length === 0 ? (
            <p className="noReviewsMessage">
              {isAuthenticated
                ? translate(language, "noReviewsAuth")
                : reviews.length !== 0
                ? translate(language, "noAuth")
                : translate(language, "noReviews")}
            </p>
          ) : (
            <ul className="reviewList">
              {!isAuthenticated && (
                <div className="noAuthMessage">
                  {translate(language, "noAuth")}
                </div>
              )}

              {reviews.map((review) => (
                <li className="reviewItem" key={review.id}>
                  <h2 className="reviewUsername">
                    {review.created_by.username}
                  </h2>
                  <p className="reviewText">{review.text}</p>
                  <div className="reviewRating">{renderStars(review.rate)}</div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default Review;
