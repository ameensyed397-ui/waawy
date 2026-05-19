import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/dashboard/',
                '/api/',
                '/admin/',
                '/onboarding/',
                '/employees/',
                '/compliance/',
                '/invite/',
                '/sign-in/',
                '/sign-up/',
                '/_next/',
            ],
        },
        sitemap: 'https://getwaawy.com/sitemap.xml',
    };
}
