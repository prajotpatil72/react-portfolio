import React from 'react';
import { useInView } from 'react-intersection-observer';
import './AnimatedFlexbox.css';

const AnimatedFlexbox = ({ imageSrc, imageAlt, contentItems, imagePosition = 'left' }) => {
  
  const { ref: leftColumnRef, inView: isLeftVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: rightColumnRef, inView: isRightVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (imagePosition === 'right') {
    return (
      <div className="animated-container">
        
        {}
        <div 
          ref={leftColumnRef} 
          className={`animated-column left ${isLeftVisible ? 'is-visible' : ''}`}
        >
          {contentItems.map((item, index) => (
            <div className="text-box" key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        {}
        <div 
          ref={rightColumnRef} 
          className={`animated-column right ${isRightVisible ? 'is-visible' : ''}`}
        >
          <img src={imageSrc} alt={imageAlt} />
        </div>

      </div>
    );
  }

  
  return (
    <div className="animated-container">

      {}
      <div 
        ref={leftColumnRef} 
        className={`animated-column left ${isLeftVisible ? 'is-visible' : ''}`}
      >
        <img src={imageSrc} alt={imageAlt} />
      </div>

      {}
      <div 
        ref={rightColumnRef} 
        className={`animated-column right ${isRightVisible ? 'is-visible' : ''}`}
      >
        {contentItems.map((item, index) => (
          <div className="text-box" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default AnimatedFlexbox;