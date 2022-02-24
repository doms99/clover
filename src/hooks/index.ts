import { useSpring } from "@react-spring/web";
import { useLayoutEffect, useRef } from "react";

export function useReorder<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const prev = useRef({ top: 0, left: 0, first: true });
  const [props, animate] = useSpring(() => ({ x: 0, y: 0 }));

  useLayoutEffect(() => {
    if(!ref.current) return;

    if(prev.current.top === ref.current.offsetTop &&
       prev.current.left === ref.current.offsetLeft) return;

    if(!prev.current.first) {
      animate.start({
        from: {
          x: prev.current.left - ref.current.offsetLeft,
          y: prev.current.top - ref.current.offsetTop
        },
        to: { x: 0, y: 0 }
      });
    }
    prev.current = {
      left: ref.current.offsetLeft,
      top: ref.current.offsetTop,
      first: false
    }
  });

  return [ref, props] as const;
}

export type Direction = {
  from: string,
  to: string
}

export function
useLoad<T extends HTMLElement, G extends HTMLElement>([size, opacity]: [Direction, Direction]) {
  const sizeRef = useRef<T>(null);
  const opacityRef = useRef<G>(null);

  useLayoutEffect(() => {
    if(sizeRef.current) sizeRef.current.classList.add(size.from)
    if(opacityRef.current) opacityRef.current.classList.add(opacity.from);

    window.requestAnimationFrame(() => {
      if(sizeRef.current) sizeRef.current.classList.add(size.to)
      if(opacityRef.current) opacityRef.current.classList.add(opacity.to);
    })
  });

  return [sizeRef, opacityRef] as const;
}

export function useScreenMinHeight<T extends HTMLElement>(ref: React.RefObject<T>) {
  useLayoutEffect(() => {
    const controller = new AbortController();

    ref.current!.style.minHeight = `${(window.innerHeight-1)}px`;

    window.addEventListener("resize", () => {
      ref.current!.style.minHeight = `${(window.innerHeight-1)}px`
    }, { signal: controller.signal });

    return () => controller.abort();
  });
}

