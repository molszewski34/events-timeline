export interface PriceSettings {
    isReminding: boolean;
    partial_occupancy_price: boolean;
    weekend_price: boolean;
    stay_duration: boolean;
    child_price: boolean;
    meal_price: boolean;
    local_tax_amount: boolean;
    booking_restrictions: boolean;
    selected_currency: string;
    selected_min_age: number | null;
    selected_max_age: number | null;
    add_cost_to_adult: boolean;
    local_tax_for_child: string;
    min_age_list_open: boolean | null;
    max_age_list_open: boolean | null;
    age_ranges: Array<{ minAge: number | null; maxAge: number | null }>;
    long_stay: number;
    short_stay: number;
    meal_prices: {
      bb: string;
      hb: string;
      fb: string;
    };
    meal_included: {
      bb: boolean;
      hb: boolean;
      fb: boolean;
    };
    focused_field: string | null;
    user_id: string | null;
    id: string;
  }

  export interface PriceConfigurationProps {
    data: PriceSettings;
  }