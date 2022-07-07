// detect mobile device
export const detector = (userAgent: string): boolean => {
  const mobileRegex = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

  return mobileRegex.some(mobile => userAgent.match(mobile));
};