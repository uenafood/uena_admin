import React from 'react';
import { Badge } from '@adminjs/design-system';
import { RecordActionResponse } from 'adminjs';

const MenuGroupItem = (props: RecordActionResponse) => {
  console.log('props', props);
  return <p>{props.record.params.phone}</p>;
};

export default MenuGroupItem;
