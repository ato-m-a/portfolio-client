export type AppType = {
  name: string;
  src: string;
  path: string;
  external?: boolean;
};

export const AppData: AppType[] = [
  {
    name: '블로그',
    src: 'memoticon.png',
    path: '/blog'
  },
  {
    name: '깃허브',
    src: 'icon_github.png',
    path: 'https://github.com/ato-m-a',
    external: true
  },
  {
    name: '터미널',
    src: 'icon_terminal_cute.svg',
    path: '/terminal'
  }
];