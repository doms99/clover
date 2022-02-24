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

export function useLoadAndDispose<T extends HTMLElement>() {
  const [props, animate] = useSpring(() => ({ transform: "translate(-50%, -50%) scale(0)" }));
  const opacityRef = useRef<T>(null);

  useLayoutEffect(() => {
    animate.start({
      transform: "translate(-50%, -50%) scale(1)",
      config: {
        mass: 0.3,
        tension: 250
      }
    });

    if(!opacityRef.current) return;

    opacityRef.current.classList.add("before:opacity-60");
  });

  function onExit(callback: () => void) {
    animate.start({
      transform: "translate(-50%, -50%) scale(0)",
      config: {
        precision: 0.1,
        mass: 0.3,
        tension: 250
      },
      onRest: callback
    });


    if(!opacityRef.current) return;

    opacityRef.current.classList.add("before:opacity-0");
  }

  return [props, onExit, opacityRef] as const;
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

