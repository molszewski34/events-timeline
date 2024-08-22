'use client';
import { updatePriceConfiguration } from '@/app/actions/updatePriceConfiguration';
import { usePriceConfigurationContext } from '@/app/contexts/PriceConfiguration/PriceConfiguration';
import { PriceConfiguration } from '@/app/contexts/PriceConfiguration/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const UpdatePriceSettingsSubmitBtn = () => {
  const { priceSettings, setPriceSettings } = usePriceConfigurationContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updatePriceConfiguration,
    onSuccess: async () => {
      await queryClient.invalidateQueries('price_configuration');
      alert('Zaktualizowane ustawienia');
    },
    onError: (error) => {
      alert('Błąd podczas aktualizacji ustawień: ' + error.message);
    },
  });

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const updatedSettings = {
      ...priceSettings,
      isReminding: false,
    };

    setPriceSettings(updatedSettings);

    try {
      await mutation.mutateAsync(updatedSettings);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      className="flex text-center text-white text-sm bg-green-600 hover:bg-green-700 py-2 rounded-sm justify-center"
      onClick={handleSubmit}
      disabled={isSubmitting}
    >
      Zapisz i przejdź dalej
    </button>
  );
};

export default UpdatePriceSettingsSubmitBtn;
