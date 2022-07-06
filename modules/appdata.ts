export type AppType = {
  name: string;
  src: string;
  path: string;
};

export const AppData = (): AppType[] => {
  return [
    {
      name: '터미널',
      src: 'terminal.png',
      path: '/terminal'
    }
  ];
}