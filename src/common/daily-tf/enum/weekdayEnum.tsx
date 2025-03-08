export enum WeekdayEnum {
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun,
}

export const weekdayToKorean = (day: WeekdayEnum): string => {
  const weekdays: { [key in WeekdayEnum]: string } = {
    [WeekdayEnum.Mon]: '월요일',
    [WeekdayEnum.Tue]: '화요일',
    [WeekdayEnum.Wed]: '수요일',
    [WeekdayEnum.Thu]: '목요일',
    [WeekdayEnum.Fri]: '금요일',
    [WeekdayEnum.Sat]: '토요일',
    [WeekdayEnum.Sun]: '일요일',
  };

  return weekdays[day];
};
