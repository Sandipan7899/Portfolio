import { PortfolioData } from '@/types';

// Portfolio data - customize this with your own information
export const portfolioData: PortfolioData = {
    personal: {
        name: 'Your Name',
        title: 'Full Stack Developer',
        description: 'Passionate developer creating modern web applications with clean code and beautiful designs.',
        profileImage: '/images/hero/profile.svg',
        resume: '/resume.pdf',
    },

    projects: [
        {
            id: '1',
            title: 'E-Commerce Platform',
            description: 'A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard.',
            image: '/images/projects/project1.jpg',
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com/yourusername/project1',
        },
        {
            id: '2',
            title: 'Task Management App',
            description: 'Collaborative task management application with real-time updates and team features.',
            image: '/images/projects/project2.jpg',
            technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com/yourusername/project2',
        },
        {
            id: '3',
            title: 'Weather Dashboard',
            description: 'Beautiful weather dashboard with forecasts, maps, and location-based weather data.',
            image: '/images/projects/project3.jpg',
            technologies: ['Vue.js', 'OpenWeather API', 'Chart.js'],
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com/yourusername/project3',
        },
    ],

    skills: [
        {
            category: 'Frontend',
            skills: [
                { name: 'React', icon: '⚛️', level: 5 },
                { name: 'Next.js', icon: '▲', level: 5 },
                { name: 'TypeScript', icon: '📘', level: 4 },
                { name: 'Tailwind CSS', icon: '🎨', level: 5 },
                { name: 'JavaScript', icon: '📜', level: 5 },
                { name: 'HTML/CSS', icon: '🌐', level: 5 },
            ],
        },
        {
            category: 'Backend',
            skills: [
                { name: 'Node.js', icon: '🟢', level: 4 },
                { name: 'Express', icon: '🚂', level: 4 },
                { name: 'MongoDB', icon: '🍃', level: 4 },
                { name: 'PostgreSQL', icon: '🐘', level: 3 },
                { name: 'REST APIs', icon: '🔌', level: 5 },
            ],
        },
        {
            category: 'Tools & Others',
            skills: [
                { name: 'Git', icon: '📦', level: 5 },
                { name: 'Docker', icon: '🐳', level: 3 },
                { name: 'AWS', icon: '☁️', level: 3 },
                { name: 'Figma', icon: '🎨', level: 4 },
                { name: 'VS Code', icon: '💻', level: 5 },
            ],
        },
    ],

    gallery: [
        {
            id: '1',
            src: '/images/gallery/photo1.jpg',
            alt: 'Gallery photo 1',
            thumbnail: '/images/gallery/photo1.jpg',
        },
        {
            id: '2',
            src: '/images/gallery/photo2.jpg',
            alt: 'Gallery photo 2',
            thumbnail: '/images/gallery/photo2.jpg',
        },
        {
            id: '3',
            src: '/images/gallery/photo3.jpg',
            alt: 'Gallery photo 3',
            thumbnail: '/images/gallery/photo3.jpg',
        },
        {
            id: '4',
            src: '/images/gallery/photo4.jpg',
            alt: 'Gallery photo 4',
            thumbnail: '/images/gallery/photo4.jpg',
        },
        {
            id: '5',
            src: '/images/gallery/photo5.jpg',
            alt: 'Gallery photo 5',
            thumbnail: '/images/gallery/photo5.jpg',
        },
        {
            id: '6',
            src: '/images/gallery/photo6.jpg',
            alt: 'Gallery photo 6',
            thumbnail: '/images/gallery/photo6.jpg',
        },
    ],

    contact: {
        email: 'your.email@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        socialLinks: [
            {
                platform: 'GitHub',
                url: 'https://github.com/yourusername',
                icon: 'github',
            },
            {
                platform: 'LinkedIn',
                url: 'https://linkedin.com/in/yourusername',
                icon: 'linkedin',
            },
            {
                platform: 'Twitter',
                url: 'https://twitter.com/yourusername',
                icon: 'twitter',
            },
            {
                platform: 'Instagram',
                url: 'https://instagram.com/yourusername',
                icon: 'instagram',
            },
        ],
    },
};

// CTA Buttons for Hero Section
export const ctaButtons = [
    {
        text: 'View Projects',
        href: '#projects',
        variant: 'primary' as const,
    },
    {
        text: 'Contact Me',
        href: '#contact',
        variant: 'secondary' as const,
    },
];
