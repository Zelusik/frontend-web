import React from "react";

const SelectedRadio = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke="#8F95B2" stroke-width="1.4" />
      <circle cx="12" cy="12" r="5" fill="#8F95B2" />
    </svg>
  );
};

const DefaultRadio = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke="#8F95B2" stroke-width="1.4" />
      <circle cx="12" cy="12" r="5" fill="white" />
    </svg>
  );
};
export { SelectedRadio, DefaultRadio };
