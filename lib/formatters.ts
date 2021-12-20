export const durationFormatter = (time: string | number) => {
  const timeinminutes = +time / 60;
  const wholeminute = Math.floor(timeinminutes);
  const remainingseconds = Math.round((timeinminutes - wholeminute) * 60);

  return `${wholeminute}:${remainingseconds > 10 ? "" : 0}${remainingseconds}`;
};
