import { RefObject, useLayoutEffect, useRef } from "react";

function animate(ref: RefObject<HTMLElement>, duration: number, offset: { top: number, left: number }) {
  if(!ref.current!.animate) return;

  ref.current!.animate([
    { transform: `translate(${offset.left}px, ${offset.top}px)` },
    {transform: "translate(0, 0)"}
  ], {
    duration,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)"
  });
}

export function useReorder<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const prev = useRef({ top: 0, left: 0, first: true });

  useLayoutEffect(() => {
    if(!ref.current) return;

    if(prev.current.top === ref.current.offsetTop &&
       prev.current.left === ref.current.offsetLeft) return;

    const previous = prev.current;
    prev.current = {
      left: ref.current.offsetLeft,
      top: ref.current.offsetTop,
      first: false
    }

    if(previous.first) return;

    animate(ref, 500, {
      left: previous.left - ref.current.offsetLeft,
      top: previous.top - ref.current.offsetTop
    });
  });

  return ref;
}

export type Direction = {
  from: string,
  to: string
}

export function useLoad<
  T extends HTMLElement,
  G extends HTMLElement
>([size, opacity]: [Direction, Direction]) {
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

export function useScreenMinHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const controller = new AbortController();

    ref.current!.style.minHeight = `${(window.innerHeight-1)}px`;

    window.addEventListener("resize", () => {
      ref.current!.style.minHeight = `${(window.innerHeight-1)}px`
    }, { signal: controller.signal });

    return () => controller.abort();
  });

  return ref;
}

