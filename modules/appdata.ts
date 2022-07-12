export type AppType = {
  name: string;
  src: string;
  path: string;
};

export const AppData: AppType[] = [
  {
    name: '터미널',
    src: 'icon_terminal_cute.svg',
    path: '/terminal'
  },
  {
    name: '시스템 환경설정',
    src: 'icon_system.svg',
    path: '/system'
  }
];