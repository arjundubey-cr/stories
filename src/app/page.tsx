// src/app/page.tsx
import React from 'react';
import dynamic from 'next/dynamic';

const Story = dynamic(() => import('../components/HomePage'), { ssr: false });

const Home = () => {
  return (
    <div className="mobile-view border">
      <div className="text-xl lg:text-2xl leading-none font-extrabold text-gray-900 mb-8 mt-4">Instagram stories</div>
      <Story />
    </div>
  );
};

export default Home;
