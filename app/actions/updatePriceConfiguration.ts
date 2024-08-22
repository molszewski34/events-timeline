'use server'

import { createClient } from '@/utils/supabase/server';
import { PriceConfiguration } from '../contexts/PriceConfiguration/types';


export async function updatePriceConfiguration(priceSettings: PriceConfiguration) {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
        console.error('Error fetching user:', authError);
        return { success: false, error: authError.message };
      }
    
      if (!user) {
        console.error('User not logged in');
        return { success: false, error: 'User not logged in' };
      }

      const {
        id,
        isReminding,
        partialOccupancyPrice,
        weekendPrice,
        stayDuration,
        childPrice,
        mealPrice,
        localTaxAmount,
        bookingRestrictions,
        selectedCurrency,
        selectedMinAge,
        selectedMaxAge,
        addCostToAdult,
        localTaxForChild,
        minAgeListOpen,
        maxAgeListOpen,
        ageRanges,
        longStay,
        shortStay,
        mealPrices,
        mealIncluded,
        focusedField,
      } = priceSettings;

      const {error} = await supabase.from('price_configuration').update([
{
    id: id,
    isReminding:isReminding,
    partial_occupancy_price: partialOccupancyPrice,
    weekend_price: weekendPrice,
    stay_duration: stayDuration,
    child_price: childPrice,
    meal_price: mealPrice,
    local_tax_amount: localTaxAmount,
    booking_restrictions: bookingRestrictions,
    selected_currency: selectedCurrency,
    selected_min_age: selectedMinAge,
    selected_max_age: selectedMaxAge,
    add_cost_to_adult: addCostToAdult,
    local_tax_for_child: localTaxForChild,
    min_age_list_open: minAgeListOpen,
    max_age_list_open: maxAgeListOpen,
    age_ranges: ageRanges,
    long_stay: longStay,
    short_stay: shortStay,
    meal_prices: mealPrices,
    meal_included: mealIncluded,
    focused_field: focusedField
 
},
])
.eq('id', id)

      if (error) {
        console.error('Error adding room:', error);
        return { success: false, error };
      }
      return { success: true };
}