import { resumeData } from '@/lib/data';
import { NextResponse } from 'next/server';

const escapeXml = (unsafe: string | undefined | null): string => {
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
    const { basics, work, education, skills, projects } = resumeData;
    const personURI = basics.url || `https://example.com/profile#me`;

    let rdf = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    rdf += `<rdf:RDF
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
    xmlns:foaf="http://xmlns.com/foaf/0.1/"
    xmlns:schema="https://schema.org/">\n\n`;

    rdf += `  <rdf:Description rdf:about="${escapeXml(personURI)}">\n`;
    rdf += `    <rdf:type rdf:resource="http://schema.org/Person"/>\n`;
    rdf += `    <rdf:type rdf:resource="http://xmlns.com/foaf/0.1/Person"/>\n`;
    rdf += `    <schema:name>${escapeXml(basics.name)}</schema:name>\n`;
    rdf += `    <foaf:name>${escapeXml(basics.name)}</foaf:name>\n`;
    rdf += `    <schema:jobTitle>${escapeXml(basics.label)}</schema:jobTitle>\n`;
    rdf += `    <schema:email>mailto:${escapeXml(basics.email)}</schema:email>\n`;
    rdf += `    <foaf:mbox rdf:resource="mailto:${escapeXml(basics.email)}"/>\n`;
    rdf += `    <schema:telephone>${escapeXml(basics.phone)}</schema:telephone>\n`;
    rdf += `    <foaf:phone rdf:resource="tel:${escapeXml(basics.phone)}"/>\n`;
    rdf += `    <schema:url rdf:resource="${escapeXml(basics.url)}"/>\n`;
    rdf += `    <foaf:homepage rdf:resource="${escapeXml(basics.url)}"/>\n`;
    rdf += `    <schema:image rdf:resource="${escapeXml(basics.image)}"/>\n`;
    rdf += `    <foaf:img rdf:resource="${escapeXml(basics.image)}"/>\n`;
    rdf += `    <schema:description>${escapeXml(basics.summary)}</schema:description>\n`;

    // Location
    rdf += `    <schema:address>\n`;
    rdf += `      <rdf:Description>\n`;
    rdf += `        <rdf:type rdf:resource="http://schema.org/PostalAddress"/>\n`;
    rdf += `        <schema:addressLocality>${escapeXml(basics.location.city)}</schema:addressLocality>\n`;
    rdf += `        <schema:addressRegion>${escapeXml(basics.location.region)}</schema:addressRegion>\n`;
    rdf += `        <schema:postalCode>${escapeXml(basics.location.postalCode)}</schema:postalCode>\n`;
    rdf += `        <schema:addressCountry>${escapeXml(basics.location.countryCode)}</schema:addressCountry>\n`;
    rdf += `      </rdf:Description>\n`;
    rdf += `    </schema:address>\n`;

    // Profiles
    basics.profiles.forEach(profile => {
        rdf += `    <foaf:account>\n`;
        rdf += `      <rdf:Description>\n`;
        rdf += `        <rdf:type rdf:resource="http://xmlns.com/foaf/0.1/OnlineAccount"/>\n`;
        rdf += `        <foaf:accountServiceHomepage rdf:resource="${escapeXml(new URL(profile.url).origin)}"/>\n`;
        rdf += `        <foaf:accountName>${escapeXml(profile.username)}</foaf:accountName>\n`;
        rdf += `        <rdfs:seeAlso rdf:resource="${escapeXml(profile.url)}"/>\n`;
        rdf += `      </rdf:Description>\n`;
        rdf += `    </foaf:account>\n`;
        rdf += `    <schema:sameAs rdf:resource="${escapeXml(profile.url)}"/>\n`;
    });

    // Skills
    skills.flatMap(skillGroup => skillGroup.keywords).forEach(keyword => {
        rdf += `    <schema:knowsAbout>${escapeXml(keyword)}</schema:knowsAbout>\n`;
        rdf += `    <foaf:knows>\n`;
        rdf += `      <rdf:Description>\n`;
        rdf += `        <rdfs:label>${escapeXml(keyword)}</rdfs:label>\n`;
        rdf += `      </rdf:Description>\n`;
        rdf += `    </foaf:knows>\n`;
    });

    // Work Experience
    work.forEach(job => {
        rdf += `    <schema:workExperience>\n`;
        rdf += `      <rdf:Description>\n`;
        rdf += `        <rdf:type rdf:resource="http://schema.org/Role"/>\n`;
        rdf += `        <schema:roleName>${escapeXml(job.position)}</schema:roleName>\n`;
        rdf += `        <schema:startDate>${escapeXml(job.startDate)}</schema:startDate>\n`;
        rdf += `        <schema:endDate>${escapeXml(job.endDate)}</schema:endDate>\n`;
        rdf += `        <schema:description>${escapeXml(job.summary)}</schema:description>\n`;
        rdf += `        <schema:worksFor>\n`;
        rdf += `          <rdf:Description>\n`;
        rdf += `            <rdf:type rdf:resource="http://schema.org/Organization"/>\n`;
        rdf += `            <schema:name>${escapeXml(job.name)}</schema:name>\n`;
        rdf += `          </rdf:Description>\n`;
        rdf += `        </schema:worksFor>\n`;
        rdf += `      </rdf:Description>\n`;
        rdf += `    </schema:workExperience>\n`;
    });
    
    // Education
    education.forEach(edu => {
        rdf += `    <schema:alumniOf>\n`;
        rdf += `      <rdf:Description>\n`;
        rdf += `        <rdf:type rdf:resource="http://schema.org/EducationalOrganization"/>\n`;
        rdf += `        <schema:name>${escapeXml(edu.institution)}</schema:name>\n`;
        rdf += `        <schema:description>${escapeXml(edu.studyType)} - ${escapeXml(edu.area)}</schema:description>\n`;
        rdf += `      </rdf:Description>\n`;
        rdf += `    </schema:alumniOf>\n`;
    });
    
    // Projects
    projects.forEach(project => {
        rdf += `    <foaf:made>\n`;
        rdf += `      <rdf:Description rdf:about="${escapeXml(project.url)}">\n`;
        rdf += `        <rdf:type rdf:resource="http://xmlns.com/foaf/0.1/Project"/>\n`;
        rdf += `        <rdfs:label>${escapeXml(project.name)}</rdfs:label>\n`;
        rdf += `        <schema:name>${escapeXml(project.name)}</schema:name>\n`;
        rdf += `        <schema:description>${escapeXml(project.summary)}</schema:description>\n`;
        rdf += `        <foaf:page rdf:resource="${escapeXml(project.url)}"/>\n`;
        rdf += `      </rdf:Description>\n`;
        rdf += `    </foaf:made>\n`;
    });
    
    rdf += `  </rdf:Description>\n\n`;

    rdf += `</rdf:RDF>`;

    return new NextResponse(rdf, {
        headers: {
            'Content-Type': 'application/rdf+xml; charset=utf-8',
        },
    });
}
