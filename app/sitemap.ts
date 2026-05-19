import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://getwaawy.com',
            lastModified: new Date('2026-03-03'),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://getwaawy.com/blog',
            lastModified: new Date('2026-03-03'),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://getwaawy.com/blog/why-hris-makes-employees-feel-like-numbers',
            lastModified: new Date('2026-03-03'),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://getwaawy.com/blog/complete-hr-stack-for-startups',
            lastModified: new Date('2026-03-03'),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://getwaawy.com/blog/gusto-vs-rippling-comparison',
            lastModified: new Date('2026-03-03'),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://getwaawy.com/blog/remote-employee-onboarding-guide',
            lastModified: new Date('2026-03-03'),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];
}
