
import { resumeData } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, Linkedin, Globe, Mail, Phone, MapPin } from 'lucide-react';

const socialIcons: { [key: string]: React.ReactNode } = {
  LinkedIn: <Linkedin />,
  GitHub: <Github />,
  Portfolio: <Globe />,
};

export default function HomePage() {
  const { basics } = resumeData;

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row items-start gap-8">
        <Image
          src={basics.image}
          alt={basics.name}
          width={128}
          height={128}
          className="rounded-full aspect-square object-cover border-4 border-card"
          data-ai-hint="professional headshot"
        />
        <div className="flex-1">
          <h1 className="text-5xl font-headline font-bold">{basics.name}</h1>
          <h2 className="text-2xl font-light text-primary mt-1">{basics.label}</h2>
          <p className="text-muted-foreground mt-4 max-w-prose">
            {basics.summary}
          </p>
          <div className="flex items-center gap-2 mt-4 text-muted-foreground text-sm">
            <MapPin size={16} />
            <span>{basics.location.city}, {basics.location.region}</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>الكفاءات الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {resumeData.skills.map((skillGroup) => (
              <div key={skillGroup.name}>
                <h3 className="font-semibold mb-3">{skillGroup.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="text-sm">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>للتواصل والروابط</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <a href={`mailto:${basics.email}`} className="flex items-center gap-3 group">
              <Mail className="text-muted-foreground" />
              <span className="group-hover:text-primary transition-colors">{basics.email}</span>
            </a>
            <div className="flex items-center gap-3">
              <Phone className="text-muted-foreground" />
              <span>{basics.phone}</span>
            </div>
            <div className="space-y-2 pt-4">
              {basics.profiles.map((profile) => (
                <Button key={profile.network} variant="outline" asChild className="w-full justify-start">
                  <Link href={profile.url} target="_blank" rel="noopener noreferrer">
                    {socialIcons[profile.network]}
                    <span>{profile.network}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
