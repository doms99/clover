import * as React from "react";

function Cancel(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 262 262" {...props}>
      <path d="M237 262c-6.4 0-12.8-2.4-17.7-7.3l-212-212c-9.8-9.8-9.8-25.6 0-35.4 9.8-9.8 25.6-9.8 35.4 0l212 212c9.8 9.8 9.8 25.6 0 35.4-4.9 4.9-11.3 7.3-17.7 7.3z" />
      <path d="M25 262c-6.4 0-12.8-2.4-17.7-7.3-9.8-9.8-9.8-25.6 0-35.4l212-212c9.8-9.8 25.6-9.8 35.4 0 9.8 9.8 9.8 25.6 0 35.4l-212 212c-4.9 4.9-11.3 7.3-17.7 7.3z" />
    </svg>
  );
}

export default React.memo(Cancel);
