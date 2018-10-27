import { useEffect } from "react";

export default function useRaf(callback) {
  let rafId = null;
  function tick() {
    rafId = requestAnimationFrame(tick);
    callback();
  }

  useEffect(() => {
    tick();

    return () => {
      cancelAnimationFrame(rafId);
    };
  });
}
