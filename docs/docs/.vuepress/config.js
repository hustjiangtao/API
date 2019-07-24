/*
* @Author: jiangtao
* @Date:   2019-07-24 13:30:26
* @Last Modified by:   jiangtao
* @Last Modified time: 2019-07-24 13:30:26
*/

const { join, basename, relative } = require('path');
const glob = require('glob');

const generateBlogSideBar = dir => {
  const structure = {};
  const files = glob.sync('**/*.md', { cwd: join(__dirname, '..', dir) })
    .filter(p => basename(p) !== 'README.md')
    .map(p => {
      const [folder, filename] = p.split('/');
      const file = basename(filename, '.md');
      return [folder, file];
    }).forEach(([folder, file]) => {
      structure[folder] = { ...structure[folder] };
      structure[folder][file] = join(dir, folder, file);
    });

  const folders = Object.keys(structure).sort().reverse();

  return [...folders.map(folder => {
    const filenames = Object.keys(structure[folder]).sort().reverse();
    return {
      title: folder,
      collapsable: true,
      children: [].concat(...filenames.map(filename => {
        return [join(folder, filename)]
      }))
    };
  })];
};

module.exports = {
    // base: '/vuepress/',
    // port: 8888,
    evergreen: true,
    serviceWorker: false,
    // ga: 'UA-123873826-1',
	  dest: 'build',

    title: 'API',
    description: 'API Collections',

    locales: {
        // '/': {
        //     // lang: 'en-US',
        //     lang: 'zh-CN',
        //     // title: 'Jiangtao',
        //     title: '木先生',
        //     // description: 'Keep Calm and Carry On',
        //     description: '规则之内，无不可走之路'
        // },
        // '/zh/': {
        //     lang: 'zh-CN',
        //     title: 'Jiangtao',
        //     description: '君子性非异也，善假于物也'
        // }
    },
    head: [
        ['link', { rel: 'icon', href: `/favicon.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `/favicon.png` }],
        // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/favicon.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    themeConfig: {
        repo: 'hustjiangtao/API',
        editLinks: true,
        // docsDir: 'docs',
        locales: {
            '/': {
                label: 'English',
                selectText: 'Languages',
                // editLinkText: 'Edit this page',
                lastUpdated: 'Last Updated',
                nav: [
                    {
                        text: 'Home',
                        link: '/'
                    },
                    {
                        text: 'API',
                        link: '/api/'
                    },
                    {
                        text: 'About',
                        link: '/about'
                    },
                    {
                        text: 'Contact',
                        link: '/contact'
                    },
                ],
                sidebar: {
                    '/api/': [
                        ...generateBlogSideBar('/api'),
                        ],
                },
                // search: false,
                // searchMaxSuggestions: 10,
            },
        },
    },
}
