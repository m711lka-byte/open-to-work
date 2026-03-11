'use client';

import { resumeData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function ResumePage() {
  const { basics, work, education, projects, skills } = resumeData;

  const handlePrint = () => {
    window.print();
  };

  const socialIcons: { [key: string]: React.ReactNode } = {
    LinkedIn: <Linkedin size={16} />,
    GitHub: <Github size={16} />,
    Portfolio: <Globe size={16} />,
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto bg-card p-4 sm:p-8 rounded-lg shadow-lg print:shadow-none print:p-0 print:bg-transparent">
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start gap-4 print-hidden">
        <div>
          <h1 className="text-4xl font-headline font-bold">السيرة الذاتية</h1>
          <p className="text-muted-foreground mt-2">
            هذه نسخة قابلة للطباعة من سيرتك الذاتية ومتوافقة مع أنظمة تتبع المتقدمين (ATS).
          </p>
        </div>
        <Button onClick={handlePrint} className="print-hidden mt-4 sm:mt-0">
          <Download className="ml-2"/>
          تحميل كملف PDF
        </Button>
      </header>

      {/* Resume Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-headline font-bold text-center sm:text-right">{basics.name}</h1>
        <h2 className="text-xl font-light text-primary text-center sm:text-right">{basics.label}</h2>
        <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-sm text-muted-foreground">
           <a href={`mailto:${basics.email}`} className="flex items-center gap-2 hover:text-primary">
              <Mail size={16} />
              <span>{basics.email}</span>
            </a>
            <a href={`tel:${basics.phone}`} className="flex items-center gap-2 hover:text-primary">
              <Phone size={16} />
              <span>{basics.phone}</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{basics.location.city}, {basics.location.countryCode}</span>
            </div>
            {basics.profiles.map((profile) => (
               <a key={profile.network} href={profile.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                  {socialIcons[profile.network]}
                  <span>{profile.username}</span>
                </a>
            ))}
        </div>
      </div>
      
      <section id="summary">
        <h2 className="text-2xl font-headline font-bold mb-4 border-b pb-2">الملخص الاحترافي</h2>
        <p className="text-muted-foreground">{basics.summary}</p>
      </section>

      <section id="skills">
        <h2 className="text-2xl font-headline font-bold mb-4 border-b pb-2">المهارات</h2>
         <div className="space-y-4">
            {skills.map((skillGroup) => (
              <div key={skillGroup.name}>
                <h3 className="font-semibold mb-2">{skillGroup.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="text-sm">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
      </section>

      <section id="experience">
        <h2 className="text-2xl font-headline font-bold mb-6 border-b pb-2">الخبرة المهنية</h2>
        <div className="space-y-6 relative before:absolute before:inset-0 before:mr-5 before:h-full before:w-0.5 before:bg-border before:translate-x-px md:before:-translate-x-px print:before:hidden">
          {work.map((job, index) => (
            <div key={index} className="pr-12 relative print:pr-0">
               <div className="absolute -right-1.5 top-1 h-3 w-3 rounded-full bg-primary border-2 border-background print:hidden" />
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{job.position}</h3>
                    <p className="font-medium text-primary">{job.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground text-left whitespace-nowrap">
                    {new Date(job.startDate).getFullYear()} - {job.endDate === 'Present' ? 'الحالي' : new Date(job.endDate).getFullYear()}
                  </p>
                </div>
                <p className="text-muted-foreground mt-2">{job.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="education">
        <h2 className="text-2xl font-headline font-bold mb-6 border-b pb-2">التعليم</h2>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index}>
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{edu.institution}</h3>
                    <p className="font-medium text-primary">{edu.studyType}</p>
                  </div>
                   <p className="text-sm text-muted-foreground text-left whitespace-nowrap">
                    {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                  </p>
                </div>
                <p className="text-muted-foreground">{edu.area}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects">
        <h2 className="text-2xl font-headline font-bold mb-6 border-b pb-2">المشاريع</h2>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                 <Button variant="link" size="sm" asChild className="print-hidden">
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    عرض المشروع <ExternalLink className="mr-2"/>
                  </a>
                </Button>
              </div>
              <p className="text-muted-foreground">{project.summary}</p>
              <p className="text-xs text-blue-500 hidden print:block">{project.url}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
