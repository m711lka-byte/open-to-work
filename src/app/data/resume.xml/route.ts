import { resumeData } from '@/lib/data';
import { NextResponse } from 'next/server';

const escapeXml = (unsafe: string) => {
    if (!unsafe) return '';
    return unsafe.toString().replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};

export async function GET() {
  const { basics, work, education, skills, projects, meta } = resumeData;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<resume>\n`;
  xml += `  <basics>\n`;
  xml += `    <name>${escapeXml(basics.name)}</name>\n`;
  xml += `    <label>${escapeXml(basics.label)}</label>\n`;
  xml += `    <image>${escapeXml(basics.image)}</image>\n`;
  xml += `    <email>${escapeXml(basics.email)}</email>\n`;
  xml += `    <phone>${escapeXml(basics.phone)}</phone>\n`;
  xml += `    <url>${escapeXml(basics.url)}</url>\n`;
  xml += `    <summary>${escapeXml(basics.summary)}</summary>\n`;
  xml += `    <location>\n`;
  xml += `      <address>${escapeXml(basics.location.address)}</address>\n`;
  xml += `      <postalCode>${escapeXml(basics.location.postalCode)}</postalCode>\n`;
  xml += `      <city>${escapeXml(basics.location.city)}</city>\n`;
  xml += `      <countryCode>${escapeXml(basics.location.countryCode)}</countryCode>\n`;
  xml += `      <region>${escapeXml(basics.location.region)}</region>\n`;
  xml += `    </location>\n`;
  basics.profiles.forEach(profile => {
    xml += `    <profile>\n`;
    xml += `      <network>${escapeXml(profile.network)}</network>\n`;
    xml += `      <username>${escapeXml(profile.username)}</username>\n`;
    xml += `      <url>${escapeXml(profile.url)}</url>\n`;
    xml += `    </profile>\n`;
  });
  xml += `  </basics>\n`;

  xml += `  <workExperience>\n`;
  work.forEach(job => {
    xml += `    <job>\n`;
    xml += `      <name>${escapeXml(job.name)}</name>\n`;
    xml += `      <position>${escapeXml(job.position)}</position>\n`;
    xml += `      <startDate>${escapeXml(job.startDate)}</startDate>\n`;
    xml += `      <endDate>${escapeXml(job.endDate)}</endDate>\n`;
    xml += `      <summary>${escapeXml(job.summary)}</summary>\n`;
    xml += `    </job>\n`;
  });
  xml += `  </workExperience>\n`;

  xml += `  <education>\n`;
  education.forEach(edu => {
    xml += `    <school>\n`;
    xml += `      <institution>${escapeXml(edu.institution)}</institution>\n`;
    xml += `      <area>${escapeXml(edu.area)}</area>\n`;
    xml += `      <studyType>${escapeXml(edu.studyType)}</studyType>\n`;
    xml += `      <startDate>${escapeXml(edu.startDate)}</startDate>\n`;
    xml += `      <endDate>${escapeXml(edu.endDate)}</endDate>\n`;
    xml += `    </school>\n`;
  });
  xml += `  </education>\n`;

  xml += `  <skills>\n`;
  skills.forEach(skillGroup => {
    xml += `    <skillGroup name="${escapeXml(skillGroup.name)}">\n`;
    skillGroup.keywords.forEach(keyword => {
      xml += `      <keyword>${escapeXml(keyword)}</keyword>\n`;
    });
    xml += `    </skillGroup>\n`;
  });
  xml += `  </skills>\n`;
  
  xml += `  <projects>\n`;
  projects.forEach(project => {
    xml += `    <project>\n`;
    xml += `      <name>${escapeXml(project.name)}</name>\n`;
    xml += `      <summary>${escapeXml(project.summary)}</summary>\n`;
    xml += `      <url>${escapeXml(project.url)}</url>\n`;
    xml += `    </project>\n`;
  });
  xml += `  </projects>\n`;

  xml += `  <meta>\n`;
  xml += `    <status>\n`;
  xml += `      <openToWork>${meta.status.openToWork}</openToWork>\n`;
  xml += `      <availability>${escapeXml(meta.status.availability)}</availability>\n`;
  meta.status.preferredRoles.forEach(role => {
      xml += `      <preferredRole>${escapeXml(role)}</preferredRole>\n`;
  });
  xml += `      <remotePreference>${escapeXml(meta.status.remotePreference)}</remotePreference>\n`;
  xml += `    </status>\n`;
  xml += `  </meta>\n`;

  xml += `</resume>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
