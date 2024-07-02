export interface RoomFormData {
  selectedRoomId: string;
  user_id: string;
  roomName: string;
  roomGuests: number;
  roomPrice: number;
  roomType: string;
  roomTypeIcon: string;
  roomDetails: string;
  roomExtras: string;
  roomArea: string;
  roomNumOfPersons: number;
  roomAdditionalPersons: number;
  roomNumOfSingleBeds: number;
  roomNumOfDoubleBeds: number;
  roomColor: string;
  roomCountry: RoomCountryTypes;
  roomAdress: string;
  roomPostCode: string;
  roomCity: string;
}

interface RoomCountryTypes {
  name: string;
  file_url: string;
}
