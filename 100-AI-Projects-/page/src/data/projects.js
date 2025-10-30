export const projects = (t) => [
    {
        id: 1,
        title: "Tradux",
        description: t.projects.cards.tradux.description,
        category: t.categories.nlp,
        techStack: ["JavaScript", "Node.js", "Cloudflare Workers AI"],
        status: t.status.completed,
        difficulty: t.difficulty.intermediate,
        demoUrl: "/tradux",
        githubUrl: "https://github.com/JojoDeveloper01/Tradux",
        image: "/shots/tradux_shot.png",
        completedDate: "2025-09-9"
    },
    /*  {
         id: 2,
         title: "AI Music Generator",
         description: "Generate original music compositions using RNN and LSTM networks trained on classical music datasets.",
         category: "Generative AI",
         techStack: ["Python", "TensorFlow", "MIDI", "Music21"],
         status: "In Progress",
         difficulty: "Advanced",
         demoUrl: "#",
         githubUrl: "#",
         image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
         completedDate: null
     }, */
    /* {
        id: 3,
        title: "Face Recognition System",
        description: "Real-time face detection and recognition system using OpenCV and deep learning models.",
        category: "Computer Vision",
        techStack: ["Python", "OpenCV", "Dlib", "Face Recognition"],
        status: "Completed",
        difficulty: "Advanced",
        demoUrl: "#",
        githubUrl: "#",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
        completedDate: "2024-03-05"
    }, */
    /*  {
         id: 4,
         title: "AI Content Generator",
         description: "Component that generate blog posts, articles, and marketing copy using Gemini with custom fine-tuning.",
         category: "Natural Language Processing",
         techStack: ["Python", "OpenAI API", "Flask", "React"],
         status: "In Progress",
         difficulty: "Intermediate",
         demoUrl: "#",
         githubUrl: "#",
         image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop",
         completedDate: null
     }, */
    /*  {
         id: 5,
         title: "Voice Assistant Clone",
         description: "Custom voice assistant with speech recognition, natural language understanding, and text-to-speech.",
         category: "Natural Language Processing",
         techStack: ["Python", "SpeechRecognition", "pyttsx3", "spaCy"],
         status: "Completed",
         difficulty: "Intermediate",
         demoUrl: "#",
         githubUrl: "#",
         image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=250&fit=crop",
         completedDate: "2024-04-10"
     } */
    /*   {
        id: 10,
        title: "Autonomous Drone Navigation",
        description: "Computer vision-based autonomous drone navigation system using reinforcement learning.",
        category: "Robotics",
        techStack: ["Python", "OpenCV", "ROS", "PyTorch"],
        status: "Planning",
        difficulty: "Expert",
        demoUrl: "#",
        githubUrl: "#",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=250&fit=crop",
        completedDate: null
      }, */
];

export const categories = (t) => [
    t.categories.all,
    t.categories.nlp,
    t.categories.computerVision,
    t.categories.machineLearning,
    t.categories.generativeAI,
    t.categories.dataScience,
    t.categories.developersTools,
    t.categories.robotics,
    t.categories.finance
];

export const techStacks = [
    "Python", "JavaScript", "Vue.js", "React", "Node.js", "TensorFlow",
    "PyTorch", "OpenAI API", "Hugging Face", "OpenCV", "Scikit-learn",
    "FastAPI", "Flask", "Streamlit", "Docker", "AWS", "GitHub API"
];
