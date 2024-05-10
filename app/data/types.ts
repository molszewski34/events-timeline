export interface Room {
  id: string;
  roomName: string;
  roomGuests: number;
  roomType: string;
  roomPrice: number;
  roomTypeIcon: string;
  events: Event[];
}

interface Event {
  title: string;
  start: string;
  end: string;
}

export interface Country {
  name_pl: string;
  name_en: string;
  code: string;
}

export interface CountriesListTypes {
  url: string;
  alpha3: string;
  name: string;
  file_url: string;
  license: string;
}
