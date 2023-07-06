import React from 'react';
import { Helmet } from 'react-helmet';

const DocumentHead = () => {
  return (
    <Helmet>
      <meta name="description" content={`Atask Tech Coding Test`} />
      <title>{`Atask Tech Coding Test`}</title>
    </Helmet>
  );
};

export default DocumentHead;
