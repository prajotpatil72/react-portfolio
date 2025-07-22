import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';

const styles = `
  /* Flash Screen Animations */
  @keyframes fade-in-out {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
  .animate-fade-in-out {
    animation: fade-in-out 2.5s ease-in-out infinite;
  }

  /* Animated Flexbox Animations */
  .animated-container {
    display: flex;
    gap: 2rem;
    margin: 4rem 1rem;
    padding: 1rem;
    align-items: center;
    overflow-x: hidden; /* Prevents horizontal scrollbars */
  }

  .animated-column {
    flex: 1;
    opacity: 0;
    transition: opacity 1s ease-out, transform 0.8s ease-out;
  }

  .animated-column.left {
    transform: translateX(-100px);
  }

  .animated-column.right {
    transform: translateX(100px);
  }

  .animated-column.is-visible {
    opacity: 1;
    transform: translateX(0);
  }

  .animated-column img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .text-box {
    background-color: #ffffff;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    border-left: 4px solid #4f46e5;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .text-box:last-child {
    margin-bottom: 0;
  }

  .text-box h3 {
    margin-top: 0;
    color: #1f2937;
  }

  /* FIX: Added rule for the description paragraph */
  .text-box p {
    color: #4b5563; /* Sets a static dark gray color */
    margin-bottom: 1rem;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .animated-container {
      flex-direction: column;
    }
    .animated-column.left, .animated-column.right {
      transform: translateY(50px); /* Animate from bottom on mobile */
    }
    .animated-column.is-visible {
      transform: translateY(0);
    }
  }
`;

// --- Reusable Components ---

const FlashScreen = ({ name ="PrajotPatil", onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);
  const duration = 3000; // 3 seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      onComplete();
    }, duration);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-gray-900">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white animate-fade-in-out">
          {name}
        </h1>
        <div className="mt-4 w-20 h-1 bg-indigo-500 animate-fade-in-out" />
      </div>
    </div>
  );
};

const AnimatedFlexbox = ({ project, imagePosition = 'left' }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const imageColumn = (
    <div key="image" className={`animated-column ${imagePosition} ${inView ? 'is-visible' : ''}`}>
      <img src={project.imageUrl} alt={project.title} />
    </div>
  );

  const textColumn = (
    <div key="text" className={`animated-column ${imagePosition === 'left' ? 'right' : 'left'} ${inView ? 'is-visible' : ''}`}>
      <div className="text-box">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        {/* FIX: Removed conflicting Tailwind classes from the paragraph */}
        <p>{project.description}</p>
        <div className="flex items-center space-x-4">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
            <Github size={24} />
          </a>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
            <ExternalLink size={24} />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={ref} className="animated-container">
      {imagePosition === 'left' ? [imageColumn, textColumn] : [textColumn, imageColumn]}
    </div>
  );
};


// --- Main App Component ---

export default function App() {
  const [loading, setLoading] = useState(true);

  // --- Your Project Data ---
 const projects = [
   {
    title: "AstroSpect: Redshift using CNNs",
    description: "Trained a lightweight CNN on 400K galaxy images for photometric redshift estimation. Achieved MAE of 0.0304 (R² = 0.9041) with 99.88% within error bounds. Preserved redshift distribution to reduce bias (0.00029) and outliers (0.12%).",
    imageUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    githubUrl: "https://github.com/prajotpatil72/Photo_Z_Estimation",
    liveUrl: "https://github.com/prajotpatil72/Photo_Z_Estimation"
  },
    {
      title: "Text-Verse: Interacting with PDFs",
      description: "Built a PDF-based conversational AI using Python and LangChain. Implemented semantic chunking and FAISS vector indexing, and enabled real-time query resolution over PDF content using Retrieval-Augmented Generation (RAG).",
      imageUrl: "https://s.smallpdf.com/static/cms/f/102628/600x519/c9bd5f3c54/word-to-pdf-conversion.svg",
      githubUrl: "https://github.com/prajotpatil72/TextVerse",
      liveUrl: "https://github.com/prajotpatil72/TextVerse",
    },
    {
      title: "WAP-GPT: A GPT-like Language Model",
      description: "Developed a GPT-like language model trainable on any UTF-8 encoded text, utilizing a character-level tokenizer and Transformer architecture. Implemented batching, self-attention mechanisms, and cross-entropy loss for optimization.",
      imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
      githubUrl: "https://github.com/prajotpatil72/WAP-GPT",
      liveUrl: "https://github.com/prajotpatil72/WAP-GPT",
    },
    {
  "title": "Custom React Component Library",
  "description": "Created a custom library with two such components, an **Animated Flexbox** and a **Flashscreen**, which I then utilised in my personal portfolio website. The Animated Flexbox provides dynamic, responsive layouts, while the Flashscreen is perfect for engaging loading or splash screens. ⚛️",
  "imageUrl": "https://miro.medium.com/v2/resize:fit:1400/1*x0d41ns8PTQZz4a3VbMrBg.png",
  "githubUrl": "https://github.com/prajotpatil72/flashifyREACT",
  "liveUrl": "https://github.com/prajotpatil72/flashifyREACT"
},
  ];

  return (
    <>
      <style>{styles}</style>
      
      {loading ? (
        <FlashScreen name="Prajot Patil" onComplete={() => setLoading(false)} />
      ) : (
        <div className="bg-gray-50 font-sans">
          <header className="text-center py-16 px-4">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-2">Welcome to My Portfolio</h1>
            <p className="text-xl text-gray-500">I build things for the web. Scroll down to see my work.</p>
          </header>

          <main className="container mx-auto px-4">
            {projects.map((project, index) => (
              <AnimatedFlexbox 
                key={index} 
                project={project}
                // Alternate image position for every other project
                imagePosition={index % 2 === 0 ? 'left' : 'right'} 
              />
            ))}
          </main>

        </div>
      )}
    </>
  );
}
