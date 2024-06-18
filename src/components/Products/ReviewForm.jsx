import React, { useState } from "react";
import { postReview } from "../../services/api";
import "../../assets/styles/scss/_all.scss";
import starNonActive from "../../assets/images/starNonActive.png";
import starActive from "../../assets/images/starActive.png";
import { translate } from "../../translations/TranslationUtils";

function ReviewForm({ id_product }) {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(1);
  const [error, setError] = useState(null);
  const [language] = useState(
    localStorage.getItem("language") || "en"
  );

  const handleStarClick = (newRate) => {
    setRate(newRate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      id: Date.now(),
      text,
      rate,
      id_product,
      created_by: {
        id_user: 1,
        username: localStorage.getItem("username"),
      },
    };

    try {
      await postReview(newReview);
      setText("");
      setRate(1);
      setError(null);
    } catch (err) {
      setError("Произошла ошибка при отправке отзыва. Попробуйте позже.");
      console.error("Ошибка при отправке отзыва:", err);
    }
  };

  return (
    <div className="reviewFormContainer">
      {error && <p className="errorStyle">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            className="textareaStyle"
            placeholder={translate(language, "placeholderReview")}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="starRating">
          {[1, 2, 3, 4, 5].map((star) => (
            <img
              key={star}
              src={star <= rate ? starActive : starNonActive}
              alt={`${star} star`}
              className="star"
              onClick={() => handleStarClick(star)}
            />
          ))}
        </div>
        <button className="buttonStyle" type="submit">
          {translate(language, "addReview")}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
