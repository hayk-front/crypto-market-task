import { useEffect, RefObject } from "react";

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

const useIntersectionObserver = <T extends HTMLElement>(
  elementRef: RefObject<T | null>,
  callback: () => void,
  options: IntersectionObserverOptions = {}
): void => {
  useEffect(() => {
    const node = elementRef?.current;

    if (!node || !callback) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          callback();
        }
      },
      {
        threshold: options.threshold || 0.5,
        rootMargin: options.rootMargin || "0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, callback, options.threshold, options.rootMargin]);
};

export default useIntersectionObserver;
