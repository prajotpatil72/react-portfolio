import { useEffect, useState } from "react";
import "./FlashScreen.css";

export default function FlashScreen({ 
  name = "MyWebsite",
  duration = 5000,
  onComplete = () => {},
  backgroundColor = "#000000",
  textColor = "#ffffff",
  fontSize = "4xl",
  fontWeight = "bold",
  flowAnimation = false,
  flowSpeed = 200,
  timeBasedExecution = true,
  showUnderline = true,
  underlineColor = "#ffffff",
  animationType = "fade", 
  customStyles = {},
  fontFamily = "sans-serif" 
}) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (timeBasedExecution) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onComplete, timeBasedExecution]);

  useEffect(() => {
    if (flowAnimation) {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= name.length) {
          setDisplayText(name.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          if (!timeBasedExecution) {
            setIsComplete(true);
            onComplete();
          }
        }
      }, flowSpeed);
      return () => clearInterval(interval);
    } else {
      setDisplayText(name);
    }
  }, [name, flowAnimation, flowSpeed, timeBasedExecution, onComplete]);

  const getAnimationClass = () => {
    switch (animationType) {
      case "fade":
        return "animate-fade-in-out";
      case "pulse":
        return "animate-pulse";
      case "bounce":
        return "animate-bounce";
      default:
        return "";
    }
  };

  const getFontSizeClass = () => {
    const sizeMap = {
      "sm": "text-sm",
      "base": "text-base",
      "lg": "text-lg",
      "xl": "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl md:text-6xl",
      "5xl": "text-5xl md:text-7xl",
      "6xl": "text-6xl md:text-8xl",
      "7xl": "text-7xl md:text-9xl",
      "8xl": "text-8xl",
      "9xl": "text-9xl"
    };
    return sizeMap[fontSize] || "text-4xl md:text-6xl";
  };

  const getFontWeightClass = () => {
    const weightMap = {
      "thin": "font-thin",
      "light": "font-light",
      "normal": "font-normal",
      "medium": "font-medium",
      "semibold": "font-semibold",
      "bold": "font-bold",
      "extrabold": "font-extrabold",
      "black": "font-black"
    };
    return weightMap[fontWeight] || "font-bold";
  };

  const containerStyle = {
    backgroundColor,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    ...customStyles
  };

  const textStyle = {
    color: textColor,
    fontFamily: fontFamily
  };

  const underlineStyle = {
    backgroundColor: underlineColor,
  };

  if (isComplete) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={containerStyle}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h1 
          className={`${getFontSizeClass()} ${getFontWeightClass()} ${getAnimationClass()}`}
          style={textStyle}
        >
          {displayText}
          {flowAnimation && <span className="animate-pulse">|</span>}
        </h1>
        {showUnderline && (
          <div 
            className={`mt-4 w-16 h-1 ${getAnimationClass()}`}
            style={underlineStyle}
          />
        )}
      </div>
    </div>
  );
}

