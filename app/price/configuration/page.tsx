import React from 'react';
import PriceConfiguration from '@/app/components/PriceConfiguration/PriceConfiguration';
import { getPriceSettings } from '@/app/components/PriceConfiguration/utils/getPriceSettings';

const Page = async () => {
  const { data, error } = await getPriceSettings();

  if (error) {
    return <div>Error loading price settings</div>;
  }

  return (
    <div>
      <PriceConfiguration data={data} />
    </div>
  );
};

export default Page;
