export type AppType = {
  name: string;
  src: string;
  path: string;
};

export const AppData: AppType[] = [
  {
    name: '블로그',
    src: 'memoticon.svg',
    path: '/blog'
  },
  {
    name: '깃허브',
    src: 'icon_github.svg',
    path: 'https://github.com/ato-m-a'
  },
  {
    name: '터미널',
    src: 'icon_terminal_cute.svg',
    path: '/terminal'
  }
];