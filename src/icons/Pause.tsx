import * as React from "react";

function Pause(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 334 511" {...props}>
      <path d="M60 511c-33.1 0-60-26.9-60-60V60C0 26.9 26.9 0 60 0s60 26.9 60 60v391c0 33.1-26.9 60-60 60zM274 511c-33.1 0-60-26.9-60-60V60c0-33.1 26.9-60 60-60s60 26.9 60 60v391c0 33.1-26.9 60-60 60z" />
    </svg>
  );
}

export default React.memo(Pause);
