export function formatDuration(secunds: number) {
  let res: string = "";
  let rem: number = secunds;
  while(rem > 0) {
    res = `${(rem % 60).toString().padStart(2, '0')}:${res}`;
    rem = Math.floor(rem/60);
  }

  res = res.slice(0, -1);
  const split = res.split(':');

  return [res, `PT${split[0]}M${split[1]}S`] as const;
}

export function formatOrdinal(num: number) {
  const ones = num % 10;
  const tens = num % 100;
  if (ones === 1 && tens !== 11) {
      return num + "st";
  }
  if (ones === 2 && tens !== 12) {
      return num + "nd";
  }
  if (ones === 3 && tens !== 13) {
      return num + "rd";
  }
  return num + "th";
}
