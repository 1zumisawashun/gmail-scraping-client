export const formatDateFullYearMonthDateTime = ({
  date,
}: {
  date: GoogleAppsScript.Base.Date;
}) => {
  return Utilities.formatDate(date, 'JST', 'yyyy/MM/dd HH:mm:ss');
};
