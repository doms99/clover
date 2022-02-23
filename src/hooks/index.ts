import { useSpring } from "@react-spring/web";
import { useLayoutEffect, useRef } from "react";

export function useReorder<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const prev = useRef({ top: 0, left: 0 });
  const [props, animate] = useSpring(() => ({ x:0 , y: 0 }));

  useLayoutEffect(() => {
    if(!ref.current) return;

    if(prev.current.top === ref.current.offsetTop &&
       prev.current.left === ref.current.offsetLeft) return;

    animate.start({
      from: {
        x: prev.current.left - ref.current.offsetLeft,
        y: prev.current.top - ref.current.offsetTop
      },
      to: { x: 0, y: 0 }
    });
    prev.current = {
      left: ref.current.offsetLeft,
      top: ref.current.offsetTop
    }
  });

  return [ref, props] as const;
}