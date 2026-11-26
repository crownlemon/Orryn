import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'The Orryn Chronicles',
      description: 'An evolving encyclopedia of Westeros and the Orryn game timeline.',
      social: [{ icon: 'github', label: 'Project source', href: 'https://github.com/crownlemon/Orryn' }],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Introduction', link: '/' },
        { label: 'Noble Houses', items: [{ autogenerate: { directory: 'houses' } }] },
        { label: 'Characters', items: [{ autogenerate: { directory: 'characters' } }] },
        { label: 'The Realm', items: [{ autogenerate: { directory: 'realm' } }] },
        { label: 'Politics & Events', items: [{ autogenerate: { directory: 'events' } }] },
        { label: 'Chapters', items: [{ autogenerate: { directory: 'chapters' } }] },
        { label: 'About & Sources', items: [{ autogenerate: { directory: 'about' } }] }
      ]
    })
  ]
});
