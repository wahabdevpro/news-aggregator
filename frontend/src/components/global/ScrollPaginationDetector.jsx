import React, { useEffect, useRef } from 'react';


/**
 * ScrollPaginationDetector component detects when the user has scrolled to the end of the content
 * and triggers a pagination function.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Function} props.onPagination - The function to call when the end of the content is reached.
 *
 * @example
 * <ScrollPaginationDetector onPagination={handlePagination} />
 */
  const ScrollPaginationDetector = (props) => {
    const observerRef = useRef(null);

    // Function to handle the intersection (scroll to end detection)
    const handleIntersection = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && typeof props.onPagination === 'function') {
        props.onPagination(); // Call the pagination function when reaching the end
      }
    };

    useEffect(() => {
      const observer = new IntersectionObserver(handleIntersection, {
        root: null, // Observe within the viewport
        rootMargin: '0px',
        threshold: 1.0, // Trigger when 100% of the element is visible
      });

      if (observerRef.current) {
        observer.observe(observerRef.current);
      }

      return () => {
        if (observerRef.current) {
          observer.unobserve(observerRef.current);
        }
      };
    }, [props.onPagination]);

    return (
      <>
        {/* This div will trigger the pagination when visible */}
        <div ref={observerRef} style={{ height: '1px', backgroundColor: 'transparent' }} />

      </>
    );
  };



export default ScrollPaginationDetector;