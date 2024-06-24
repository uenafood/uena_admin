import React from 'react';
import { RecordActionResponse } from 'adminjs';

const Phone = (props: RecordActionResponse) => {
  console.log('props', props);
  return <p>{props.record.params.phone}</p>;
};

export default Phone;
