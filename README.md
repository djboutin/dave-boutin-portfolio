# Dave Boutin portfolio

A Next.js portfolio for daveboutin.ca, deployed on Netlify and edited through Pages CMS.

## Content

- General biography, role, experience, and profile links live in `content/site.json`.
- Project case studies live as Markdown files in `content/projects`.
- Project images live in `public/images/projects`.
- `.pages.yml` defines the Pages CMS editing interface.

Once this repository is connected to Pages CMS, sign in at [app.pagescms.org](https://app.pagescms.org), select the repository, and use **Projects** to create or update case studies. Each save creates a GitHub commit and triggers a Netlify deploy.

Projects marked as drafts are excluded from the site. Projects marked as featured appear on the homepage; display order controls their sequence.

## Local development

Install dependencies with `npm install`, then run `npm run dev`. Use `npm run build` to validate a production build.

## Contact form

The visible form posts to Netlify Forms. `public/forms/contact.html` is the static form definition Netlify needs when scanning a Next.js deploy. Enable form detection in the Netlify project before the first production deployment.
