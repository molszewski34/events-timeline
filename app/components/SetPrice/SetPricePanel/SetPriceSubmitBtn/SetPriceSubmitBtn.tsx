import React, { useState } from 'react';

import SubmitButton from '@/app/components/utils/SubmitButton';
import { useSetPriceContext } from '@/app/contexts/SetPrice/SetPriceProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPrice } from '@/app/actions/createPrices';
const SetPriceSubmitBtn = () => {
  const { priceFormData } = useSetPriceContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPrice,
    onSuccess: async () => {
      await queryClient.invalidateQueries('prices');
      alert('Dodano ceny');
    },
    onError: (error) => {
      alert('Błąd podczas dodawania cen: ' + error.message);
    },
  });

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await mutation.mutateAsync(priceFormData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SubmitButton
      text="Zapisz"
      icon="save"
      onClick={handleSubmit}
      disabled={false}
    />
  );
};

export default SetPriceSubmitBtn;
