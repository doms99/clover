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

// export function useTransition<T extends HTMLElement>(click: { x: number, y: number }) {
//   const ref = useRef<T>(null);
//   const [props, animate] = useSpring(() => ({ transform: "translate(0) scale(0)" }));

//   useLayoutEffect(() => {
//     if(!ref.current) return;

//     animate.start({
//       from: {
//         transfrom: `translate(${click.x - ref.current.offsetLeft}px, ${click.y - ref.current.offsetTop}px) scale(0)`,
//       },
//       to: { transform: "translate(0) scale(1)" }
//     });
//   });

//   function onExit(callback: () => void) {
//     if(!ref.current) {
//       callback();
//       return;
//     }

//     animate.start({
//       from: { transform: "translate(0)", scale: 1 },
//       to: {
//         transfrom: `translate(${click.x - ref.current.offsetLeft}px, ${click.y - ref.current.offsetTop}px)`,
//         scale: 0
//       },
//       config: {
//         precision: 1
//       },
//       onRest: callback
//     });
//   }

//   return [ref, props, onExit] as const;
// }

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

