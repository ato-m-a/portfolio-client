export type AppType = {
  name: string;
  src: string;
  path: string;
};

export const AppData: AppType[] = [
  {
    name: '터미널',
    src: 'terminal.png',
    path: '/terminal'
  },
  {
    name: '시스템 환경설정',
    src: 'system.png',
    path: '/system'
  }
];