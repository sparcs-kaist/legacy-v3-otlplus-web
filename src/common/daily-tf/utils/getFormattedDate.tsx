const getFormattedDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
  };
  return date.toLocaleDateString('ko-KR', options).replace(',', '');
};

export default getFormattedDate;
