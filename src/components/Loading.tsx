import { LoaderCircle } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <div className="w-full h-svh flex flex-col justify-center items-center">
      <LoaderCircle className="animate-spin w-16 h-16" />
    </div>
  );
};

export default Loading;
