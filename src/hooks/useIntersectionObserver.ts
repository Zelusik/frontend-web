import { RefObject, useEffect } from "react";

function useIntersectionObserver(
  target: RefObject<Element>,
  handleIntersect: () => void,
  enabled = true,
  { root = null, threshold = 0.1, rootMargin = "0px" }
) {
  useEffect(() => {
    // 동작중이 아니라면 실행x
    if (!enabled) return;

    const options = {
      root,
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver((entries) => {
      entries[0].isIntersecting && handleIntersect();
    }, options);

    const el = target.current;

    // 감지 대상이 존재하지 않는다면 감지x
    if (!el) return;

    observer.observe(target.current);

    return () => observer.unobserve(el);
  }, [target, handleIntersect, root, threshold, rootMargin, enabled]);
}

export default useIntersectionObserver;
