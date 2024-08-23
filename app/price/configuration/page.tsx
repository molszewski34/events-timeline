import React from 'react';
import PriceConfigurationWrapper from '@/app/components/PriceConfiguration/PriceConfigurationWrapper';
import { getPriceSettings } from '@/app/components/PriceConfiguration/utils/getPriceSettings';

const Page = async () => {
  const { data, error } = await getPriceSettings();

  if (error) {
    return <div>Error loading price settings</div>;
  }

  return (
    <div>
      <PriceConfigurationWrapper data={data} />
    </div>
  );
};

export default Page;
