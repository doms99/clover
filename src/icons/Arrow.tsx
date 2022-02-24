import * as React from "react";

function Arrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 130 216" {...props}>
      <path
        clipRule="evenodd"
        fill="none"
        strokeWidth={40}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        d="M110 20l-90 90 86 86"
      />
    </svg>
  );
}

export default React.memo(Arrow);
