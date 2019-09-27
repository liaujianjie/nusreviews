import React from "react";

import "./style.css";

export const Content = () => {
  return (
    <div className="Content_row">
      <div className="Content_column">
        <img
          src="https://marketingland.com/wp-content/ml-loads/2016/04/ss-rating-review-stars-800x450.jpg"
          className="Content_img-responsive"
        />
        <div className="Content_text-column">
          <p>
            Feel good and leave a legacy by contributing ratings and reviews of
            modules you have taken! You will help many future generations of
            students.
          </p>
        </div>
      </div>

      <div className="Content_column">
        <img
          src="https://interface-online.org.uk/sites/default/files/field/image/Students.jpg"
          className="Content_img-responsive"
        />
        <div className="Content_text-column">
          <p>
            Use NUSReviews to search for really awesome modules that you will
            not regret! We have many reviews from former students to give you an
            informed choice when choosing modules.
          </p>
        </div>
      </div>
    </div>
  );
};
