import React from 'react';

// just some regular React component
const ListItems = ({ record }) => {
  const parsed = JSON.stringify(record);
  //   console.log('parsed', parsed);
  console.log(record?.params);
  return <p></p>;
};

export default ListItems;
