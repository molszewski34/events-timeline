export const initialSetPriceData = {
  currentDateTimestamp: null,
  room: '',
  selectedRooms: [],
  partialPrices: [],
  partialPricesForChildrens: [],
  dates: [
    {
      id: Date.now(),
      isDefault: true,
      startDate: new Date(),
      endDate: new Date(),
    },
  ],
};
