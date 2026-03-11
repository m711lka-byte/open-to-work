import { MetadataRoute } from 'next';
import { resumeData } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = resumeData.basics.url || 'http://localhost:3000'; // Fallback for local dev

  const staticPages = [
    '/',
    '/resume',
    '/open-to-work',
  ];

  const dataFiles = [
    '/data/resume.json',
    '/data/resume.xml',
    '/data/resume.rdf',
    '/datasets/profile.json',
    '/datasets/skills.json',
    '/datasets/resume.json',
  ];

  const pageEntries = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  const dataEntries = dataFiles.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));


  return [...pageEntries, ...dataEntries];
}
