import React from "react";

const LineProfile = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_831_8659" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.095 7.94201C16.0951 8.47981 15.9892 9.01235 15.7835 9.50923C15.5777 10.0061 15.2761 10.4576 14.8959 10.8379C14.5157 11.2182 14.0643 11.5199 13.5675 11.7258C13.0707 11.9317 12.5382 12.0376 12.0004 12.0377C10.9143 12.0378 9.8727 11.6064 9.10466 10.8385C8.33661 10.0706 7.90506 9.02898 7.90495 7.94285C7.9049 7.40505 8.01077 6.87251 8.21651 6.37563C8.42225 5.87875 8.72384 5.42726 9.10406 5.04694C9.87195 4.27885 10.9135 3.84728 11.9996 3.84717C13.0856 3.84706 14.1273 4.27841 14.8953 5.04635C15.6634 5.81428 16.0949 6.85588 16.095 7.94201ZM12 13.2905C6.10297 13.2905 3.80908 17.0436 3.80908 18.7896C3.80908 20.5348 8.69217 21 12 21C15.3078 21 20.1909 20.5348 20.1909 18.7896C20.1909 17.0436 17.897 13.2905 12 13.2905Z"
        />
      </mask>
      <path
        d="M12.0004 12.0377L12.0006 13.5377L12.0004 12.0377ZM7.90495 7.94285L9.40495 7.94269L7.90495 7.94285ZM9.10406 5.04694L8.04327 3.98642V3.98642L9.10406 5.04694ZM14.595 7.94216C14.5951 8.28299 14.528 8.62048 14.3976 8.93537L17.1694 10.0831C17.4505 9.40422 17.5951 8.67662 17.595 7.94186L14.595 7.94216ZM14.3976 8.93537C14.2672 9.25026 14.0761 9.53638 13.8351 9.7774L15.9567 11.8984C16.4762 11.3788 16.8883 10.762 17.1694 10.0831L14.3976 8.93537ZM13.8351 9.7774C13.5942 10.0184 13.3081 10.2096 12.9933 10.34L14.1417 13.1115C14.8205 12.8303 15.4372 12.4181 15.9567 11.8984L13.8351 9.7774ZM12.9933 10.34C12.6785 10.4705 12.341 10.5377 12.0003 10.5377L12.0006 13.5377C12.7353 13.5376 13.4629 13.3928 14.1417 13.1115L12.9933 10.34ZM12.0003 10.5377C11.312 10.5378 10.652 10.2644 10.1652 9.77777L8.04408 11.8993C9.09345 12.9485 10.5166 13.5378 12.0006 13.5377L12.0003 10.5377ZM10.1652 9.77777C9.67852 9.29112 9.40502 8.63103 9.40495 7.94269L6.40495 7.943C6.4051 9.42693 6.99471 10.85 8.04408 11.8993L10.1652 9.77777ZM9.40495 7.94269C9.40492 7.60187 9.47201 7.26437 9.6024 6.94948L6.83062 5.80177C6.54952 6.48064 6.40488 7.20823 6.40495 7.943L9.40495 7.94269ZM9.6024 6.94948C9.73279 6.63459 9.92391 6.34847 10.1649 6.10746L8.04327 3.98642C7.52378 4.50604 7.11172 5.1229 6.83062 5.80177L9.6024 6.94948ZM10.1649 6.10746C10.6515 5.62071 11.3115 5.34724 11.9997 5.34717L11.9994 2.34717C10.5155 2.34732 9.09243 2.93698 8.04327 3.98642L10.1649 6.10746ZM11.9997 5.34717C12.6879 5.3471 13.348 5.62044 13.8347 6.10709L15.9559 3.98561C14.9065 2.93639 13.4833 2.34702 11.9994 2.34717L11.9997 5.34717ZM13.8347 6.10709C14.3215 6.59373 14.595 7.25383 14.595 7.94216L17.595 7.94186C17.5949 6.45793 17.0053 5.03482 15.9559 3.98561L13.8347 6.10709ZM12 11.7905C5.45634 11.7905 2.30908 16.0444 2.30908 18.7896H5.30908C5.30908 18.0428 6.7496 14.7905 12 14.7905V11.7905ZM2.30908 18.7896C2.30908 20.04 3.20516 20.7911 3.8836 21.1759C4.59565 21.5799 5.48933 21.8399 6.36337 22.0188C8.13867 22.3821 10.2997 22.5 12 22.5V19.5C10.3924 19.5 8.45803 19.3853 6.96484 19.0797C6.20462 18.9241 5.6708 18.7407 5.3639 18.5666C5.02339 18.3734 5.30908 18.4119 5.30908 18.7896H2.30908ZM12 22.5C13.7002 22.5 15.8613 22.3821 17.6366 22.0188C18.5106 21.8399 19.4043 21.5799 20.1164 21.1759C20.7948 20.7911 21.6909 20.04 21.6909 18.7896H18.6909C18.6909 18.4119 18.9766 18.3734 18.6361 18.5666C18.3292 18.7407 17.7954 18.9241 17.0351 19.0797C15.5419 19.3853 13.6075 19.5 12 19.5V22.5ZM21.6909 18.7896C21.6909 16.0444 18.5436 11.7905 12 11.7905V14.7905C17.2504 14.7905 18.6909 18.0428 18.6909 18.7896H21.6909Z"
        fill="#999CA8"
        mask="url(#path-1-inside-1_831_8659)"
      />
    </svg>
  );
};

export default LineProfile;