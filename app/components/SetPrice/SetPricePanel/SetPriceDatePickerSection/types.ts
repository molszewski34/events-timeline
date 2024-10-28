interface DatePickerItem {
  id: number;
  isDefault: boolean;
  startDate: Date;
  endDate: Date;
}

interface FormData {
  dates: DatePickerItem[];
}
