import { useCallback } from "react";
import { Reservation } from "@/app/components/RenderRows/types";
import { useAddReservationContext } from "@/app/contexts/AddReservation/AddReservationProvider";
import { useCalendarContext } from "@/app/contexts/Calendar/CalendarProvider";

const useHandleSetFormData = () => {
  const {setFormData} = useAddReservationContext()

  const handleSetFormData = useCallback(
    (query: Reservation) => {
      setFormData((prevData: FormData) => ({
        ...prevData,
        selectedReservationId: query.id,
        selectedRoomId: query.room_id,
        selectedStartDate: query.selected_start_date,
        selectedEndDate: query.selected_end_date,
        selectedStatus: query.selected_status,
        numOfAdults: query.num_of_adults,
        numOfKids: query.num_of_kids,
        advancePayment: query.advance_payment,
        deposit: query.deposit,
        paymentOnPlace: query.payment_on_place,
        localTax: query.local_tax,
        mainGuest: query.main_guest,
        phone: query.phone,
        email: query.email,
        houseNumber: query.house_number,
        apartmentNumber: query.apartment_number,
        city: query.city,
        postCode: query.post_code,
        country: query.country,
        passport: query.passport,
        company: query.company,
        companyStreet: query.company_street,
        companyCity: query.company_city,
        companyPostCode: query.company_post_code,
        companyCountry: query.company_country,
        companyNip: query.company_nip,
        notes: query.notes,
        passCode: query.pass_code,
        registration: query.registration,
        boarding: query.boarding,
      }));
    },
    [setFormData]
  );

  return {handleSetFormData}
}

export default useHandleSetFormData

