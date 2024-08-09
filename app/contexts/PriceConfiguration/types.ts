export interface PriceConfiguration {
    partialOccupancyPrice: boolean;
    weekendPrice: boolean;
    stayDuration: boolean;
    childPrice: boolean;
    mealPrice: boolean;
    localTaxAmount: boolean;
    bookingRestrictions: boolean;
    selectedCurrency: string;
    selectedMinAge: number | null;
    selectedMaxAge: number | null;
    addCostToAdult: boolean;
    localTaxForChild: string;
    minAgeListOpen: number | null;
    maxAgeListOpen: number | null;
    ageRanges: { minAge: number | null; maxAge: number | null }[];
    longStay: number;
    shortStay: number;

}

export type MealType = 'bb' | 'hb' | 'fb';

export interface MealIncluded {
    bb: boolean;
    hb: boolean;
    fb: boolean;
  }

export interface MealPrices {
    bb: string;
    hb: string;
    fb: string;
  }



  
  
