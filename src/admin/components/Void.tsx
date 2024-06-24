import React from 'react';
import { RecordActionResponse } from 'adminjs';
import { Badge } from '@adminjs/design-system';

const Void = (props: RecordActionResponse) => {
  const { record } = props;
  const isVoid = record.params.is_void;
  return isVoid ? <Badge variant="danger">Void</Badge> : null;
};

export default Void;
