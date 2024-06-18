import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="skeleton product"
    speed={2}
    width={425}
    height={390}
    backgroundColor="#e4e4e4"
    foregroundColor="#cccccc"
    {...props}
  >
    <rect x="40" y="40" rx="10" ry="10" width="350" height="210" />
    <rect x="40" y="285" rx="10" ry="10" width="350" height="20" />
    <rect x="40" y="320" rx="10" ry="10" width="350" height="50" />
  </ContentLoader>
);

export default Skeleton;
