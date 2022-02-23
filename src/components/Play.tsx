import React from "react";

function Play(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 456.3 509" {...props}>
      <path d="M427 305.3L88 501c-39.1 22.6-88-5.6-88-50.8V58.8C0 13.6 48.9-14.6 88 7.9l339 195.7c39.1 22.6 39.1 79.1 0 101.7z" />
    </svg>
  );
}

export default React.memo(Play);
