import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'The Orryn Chronicles',
      description: 'An encyclopedia of the history, houses and people of Westeros in 208 AC.',
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Main page', link: '/' },
        { label: 'Noble Houses', items: [{ autogenerate: { directory: 'houses' } }] },
        { label: 'Characters', items: [{ autogenerate: { directory: 'characters' } }] },
        { label: 'Places', items: [{ autogenerate: { directory: 'places' } }] },
        { label: 'The Realm', items: [{ autogenerate: { directory: 'realm' } }] },
        { label: 'Titles & Offices', items: [{ autogenerate: { directory: 'titles' } }] },
        { label: 'Chapters', items: [{ autogenerate: { directory: 'chapters' } }] },
        { label: 'Politics & Events', items: [{ autogenerate: { directory: 'events' } }] }
      ]
    })
  ]
});
