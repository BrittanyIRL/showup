import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";

const DatePickerInput = ({ handleDateChange, value }) => {
  const dateFormat = "MM/dd/yyyy";

  const handleFormatDate = (date, format, locale) => {
    return dateFnsFormat(date, format, { locale });
  };

  const handleParseDate = (str, format, locale) => {
    if (str.length >= 8) {
      const parsedDate = dateFnsParse(str, format, new Date(), { locale });
      if (DateUtils.isDate(parsedDate)) {
        return parsedDate;
      }
    }
    return undefined;
  };
  return (
    <DayPickerInput
      formatDate={handleFormatDate}
      format={dateFormat}
      value={value}
      parseDate={handleParseDate}
      placeholder={`${dateFnsFormat(new Date(), dateFormat)}`}
      onDayChange={handleDateChange}
    />
  );
};

export default DatePickerInput;
