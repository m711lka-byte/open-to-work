# **App Name**: SemanticProfile Pro

## Core Features:

- Semantic Profile & Resume Pages: Present comprehensive candidate information in human-readable and ATS-friendly HTML5 semantic structure, embedded with JSON-LD for rich snippets, across '/', '/profile', and '/resume' pages.
- Machine-Readable Data Endpoints: Expose API routes ('/api/resume', '/api/skills', '/api/status') providing candidate data in standard machine-readable formats (JSON Resume, skill arrays, status objects), designed for direct consumption by ATS and AI systems.
- Static Semantic Data Exports: Serve dedicated static data files including 'resume.json', 'resume.rdf' (using FOAF + Schema.org for RDF triples), and 'resume.xml' as open data resources for comprehensive semantic interpretation.
- AI-Informed 'Open to Work' Indicator: Utilize a generative AI tool to evaluate candidate availability and preferences, reasoning to dynamically adjust the presentation and emphasis of the 'open to work' status across the UI and API, optimizing for various recruiter AI system interpretations.
- Crawler Optimization & AI Dataset Integration: Automatically generate and serve 'robots.txt' and 'sitemap.xml' with specific directives to ensure optimal indexing by search engines and dedicated AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended), ensuring maximum data discoverability.
- Web Identity & Linked Data Integration: Implement web identity features like 'humans.txt' and '.well-known/webfinger' for clear authorship and provide robust RDF triples in '/data/resume.rdf' to establish explicit knowledge graph relationships (Person → hasSkill → Skill, etc.) for linked data platforms.

## Style Guidelines:

- The application employs a professional light color scheme to enhance data readability. The primary color is a deep, focused blue-grey (#36597D), signifying data clarity and technical expertise. The background is a very light, desaturated cool grey (#F0F2F4), providing a clean canvas. A vibrant accent color of bright cyan (#19E5E5) is used for calls to action and to highlight key interactive elements, providing a modern, digital contrast.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, tech-inspired, and impactful aesthetic. Body text font: 'Inter' (sans-serif) for optimal legibility, neutrality, and clear display of structured data, ensuring readability for both humans and automated systems.
- Employ a minimalist set of line-art icons that emphasize data structure, connectivity, and clear navigation. Icons should be functional and modern, without unnecessary visual flair.
- A clean, content-first layout prioritizes the presentation of structured data and resume content. Ample whitespace should be utilized to improve scannability, and the design must be fully responsive to ensure optimal display across all devices and for automated parsers.
- Subtle, fluid animations on navigation elements and interactive data filters should be implemented. These should enhance the user experience without detracting from the primary focus on content and data delivery, ensuring quick load times.