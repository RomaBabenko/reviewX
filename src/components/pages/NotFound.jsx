import React from "react";
import "../../assets/styles/scss/_all.scss";
import { translate } from "../../translations/TranslationUtils";

const NotFound = () => {
  const language = localStorage.getItem("language") || "en";

  return (
    <div className="notFound-сontainer">
      <h1 className="notFound-title">{translate(language, "notFound")} </h1>
    </div>
  );
};

export default NotFound;
