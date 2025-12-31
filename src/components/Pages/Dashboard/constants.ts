export interface Skill {
  id: number;
  title: string;
  icon: string;
  progress: number;
  color: string;
}

export interface Child {
  id: number;
  name: string;
  avatar: string;
  skills: Skill[];
}

export interface CalendarDay {
  day: string;
  date: number;
}

export interface Event {
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  image: string;
  countdown: string;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  image: string;
  ageRange: string;
  lessons: number;
  tags: string[];
}

export interface PublishedContent {
  title: string;
  description: string;
  image: string;
  publishedDate: string;
}

// Children with their individual skill progress
export const CHILDREN_DATA: Child[] = [
  {
    id: 1,
    name: "Nia",
    avatar: "/child-avatar-nia.png",
    skills: [
      {
        id: 1,
        title: "Emotional Intelligence",
        icon: "/emotional-intelligence-icon.svg",
        progress: 65,
        color: "#E91E8C",
      },
      {
        id: 2,
        title: "Social Skills",
        icon: "/social-skills-icons.svg",
        progress: 75,
        color: "#722CFF",
      },
      {
        id: 3,
        title: "Digital Literacy",
        icon: "/digital-litracy.svg",
        progress: 45,
        color: "#4A9EFF",
      },
      {
        id: 4,
        title: "Financial Literacy",
        icon: "/financial-literacy-icon.svg",
        progress: 55,
        color: "#5CB85C",
      },
      {
        id: 5,
        title: "Entrepreneurial Mindset",
        icon: "/entrepreneurial-mindset-icons.svg",
        progress: 60,
        color: "#FFB800",
      },
    ],
  },
  {
    id: 2,
    name: "John",
    avatar: "/child-avatar-john.png",
    skills: [
      {
        id: 1,
        title: "Emotional Intelligence",
        icon: "/emotional-intelligence-icon.svg",
        progress: 70,
        color: "#E91E8C",
      },
      {
        id: 2,
        title: "Social Skills",
        icon: "/social-skills-icons.svg",
        progress: 80,
        color: "#722CFF",
      },
      {
        id: 3,
        title: "Digital Literacy",
        icon: "/digital-litracy.svg",
        progress: 50,
        color: "#4A9EFF",
      },
      {
        id: 4,
        title: "Financial Literacy",
        icon: "/financial-literacy-icon.svg",
        progress: 60,
        color: "#5CB85C",
      },
      {
        id: 5,
        title: "Entrepreneurial Mindset",
        icon: "/entrepreneurial-mindset-icons.svg",
        progress: 65,
        color: "#FFB800",
      },
    ],
  },
  {
    id: 3,
    name: "Eil",
    avatar: "/child-avatar-eil.png",
    skills: [
      {
        id: 1,
        title: "Emotional Intelligence",
        icon: "/emotional-intelligence-icon.svg",
        progress: 55,
        color: "#E91E8C",
      },
      {
        id: 2,
        title: "Social Skills",
        icon: "/social-skills-icons.svg",
        progress: 65,
        color: "#722CFF",
      },
      {
        id: 3,
        title: "Digital Literacy",
        icon: "/digital-litracy.svg",
        progress: 40,
        color: "#4A9EFF",
      },
      {
        id: 4,
        title: "Financial Literacy",
        icon: "/financial-literacy-icon.svg",
        progress: 50,
        color: "#5CB85C",
      },
      {
        id: 5,
        title: "Entrepreneurial Mindset",
        icon: "/entrepreneurial-mindset-icons.svg",
        progress: 55,
        color: "#FFB800",
      },
    ],
  },
];

export const ADMIN_CATEGORY = (data: any) => [
  {
    id: 1,
    title: "Total Lessons",
    value: data?.totalLessons,
    icon: "/BrandLogo.svg",
    color: "#4caf50",
  },
  {
    id: 2,
    title: "Total Modules",
    value: data?.totalModules,
    icon: "/BrandLogo.svg",
    color: "#2196f3",
  },
  {
    id: 3,
    title: "Total Parents",
    value: data?.totalParents,
    icon: "/icons/parent-icon.svg",
    color: "#ff9800",
  },
  {
    id: 4,
    title: "Total children",
    value: data?.totalChildren,
    icon: "/icons/children-icon.svg",
    color: "#722CFF",
  },
];

// Calendar days for event widget
export const CALENDAR_DAYS: CalendarDay[] = [
  { day: "Sun", date: 21 },
  { day: "Mon", date: 15 },
  { day: "Tue", date: 16 },
  { day: "Wed", date: 17 },
  { day: "Thu", date: 18 },
  { day: "Fri", date: 19 },
  { day: "Sat", date: 20 },
];

// Upcoming event data
// Upcoming event data
export const UPCOMING_EVENT: Event = {
  title: "Raising Problem Solvers, not Perfectionists",
  type: "Workshop",
  date: "Fri | 14 Nov, 2025",
  time: "02:00 am - 03:00 am (+5:30GMT)",
  location: "Online",
  image: "https://skillsome-prod-assets.s3.ap-southeast-1.amazonaws.com/event/1762784941539-event",
  countdown: "00:00:00",
};

// Continue learning modules
// Continue learning modules
export const CONTINUE_LEARNING_MODULES: Module[] = [
  {
    id: 1,
    title: "How to Recognize and Name Emotions",
    description:
      "Learn how to help your child identify basic and complex emotions in everyday life.",
    image:
      "https://skillsome-prod-assets.s3.ap-southeast-1.amazonaws.com/module/1762588422496-module",
    ageRange: "",
    lessons: 25,
    tags: [],
  },
  {
    id: 2,
    title: "Helping Your Child Understand Their Feelings",
    description: "Teach your child how to make sense of what they feel and why it matters.",
    image:
      "https://skillsome-prod-assets.s3.ap-southeast-1.amazonaws.com/module/1762588642661-module",
    ageRange: "",
    lessons: 25,
    tags: [],
  },
  {
    id: 3,
    title: "Managing Emotions in a Healthy Way",
    description: "Guide your child to express anger, sadness, and excitement in positive ways.",
    image:
      "https://skillsome-prod-assets.s3.ap-southeast-1.amazonaws.com/module/1762588741827-module",
    ageRange: "",
    lessons: 25,
    tags: [],
  },
  {
    id: 4,
    title: "Building a Strong Emotional Vocabulary",
    description: "Introduce simple and powerful words that help your child express how they feel.",
    image:
      "https://skillsome-prod-assets.s3.ap-southeast-1.amazonaws.com/module/1762588827276-module",
    ageRange: "",
    lessons: 25,
    tags: [],
  },
  {
    id: 5,
    title: "Teaching Empathy Through Everyday Moments",
    description: "Show your child how to notice, care about, and respond to others’ emotions.",
    image:
      "https://skillsome-prod-assets.s3.ap-southeast-1.amazonaws.com/module/1762588897474-module",
    ageRange: "",
    lessons: 25,
    tags: [],
  },
];

// Newly published content
export const NEWLY_PUBLISHED_CONTENT: PublishedContent = {
  title: "What if it’s Bullying? A Parent Guide for ages",
  description:
    "Bullying doesn’t always look obvious and many parents feel unsure how to respond. This free guide helps you recognize emotional, social, and digital bullying, and gives you practical ways to respond at every age. You’ll find clear tips and phrases, grouped by age, for supporting kids who are being hurt, hurting others, or witnessing harm. What’s inside: 15+ tools backed by research Age-based guidance for ages 3–18 Conversation starters, digital boundaries, and repair tools Focus on home, school, and online behavior Built on Skillsome’s five learning pillars, with a focus on Emotional Intelligence, Social Skills, and Digital Literacy. ",
  image:
    "https://skillsome-prod-assets.s3.ap-southeast-1.amazonaws.com/others/1762787650979-What_if_it___s_Bullying_.png",
  publishedDate: "10 Nov, 2025 | Mon",
};
// Suggested modules
// Suggested modules
export const SUGGESTED_MODULES: Module[] = [
  {
    id: 1,
    title: "How to Recognize and Name Emotions",
    description:
      "Learn how to help your child identify basic and complex emotions in everyday life.",
    image:
      "https://skillsome-prod-assets.s3.ap-southeast-1.amazonaws.com/module/1762588422496-module",
    ageRange: "",
    lessons: 25,
    tags: [],
  },
  {
    id: 2,
    title: "Helping Your Child Understand Their Feelings",
    description: "Teach your child how to make sense of what they feel and why it matters.",
    image:
      "https://skillsome-prod-assets.s3.ap-southeast-1.amazonaws.com/module/1762588642661-module",
    ageRange: "",
    lessons: 25,
    tags: [],
  },
  {
    id: 3,
    title: "Managing Emotions in a Healthy Way",
    description: "Guide your child to express anger, sadness, and excitement in positive ways.",
    image:
      "https://skillsome-prod-assets.s3.ap-southeast-1.amazonaws.com/module/1762588741827-module",
    ageRange: "",
    lessons: 25,
    tags: [],
  },
  {
    id: 4,
    title: "Building a Strong Emotional Vocabulary",
    description: "Introduce simple and powerful words that help your child express how they feel.",
    image:
      "https://skillsome-prod-assets.s3.ap-southeast-1.amazonaws.com/module/1762588827276-module",
    ageRange: "",
    lessons: 25,
    tags: [],
  },
  {
    id: 5,
    title: "Teaching Empathy Through Everyday Moments",
    description: "Show your child how to notice, care about, and respond to others’ emotions.",
    image:
      "https://skillsome-prod-assets.s3.ap-southeast-1.amazonaws.com/module/1762588897474-module",
    ageRange: "",
    lessons: 25,
    tags: [],
  },
  {
    id: 6,
    title: "How to Teach Kids to Start and Maintain Conversations",
    description: 'Summary/Brief Overview/Module description "Lorem ipsum dolor sit amet, co...',
    image:
      "https://skillsome-prod-assets.s3.ap-southeast-1.amazonaws.com/module/1762588998827-module",
    ageRange: "",
    lessons: 25,
    tags: [],
  },
];