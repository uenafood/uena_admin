import React from 'react';
import { Badge } from '@adminjs/design-system';
import { RecordActionResponse } from 'adminjs';

const SingleBadge = (props: RecordActionResponse) => {
  const { record } = props;
  const text = record?.params?.voucher_code;
  const attribute = {
    variant: props?.property?.custom['variant'] || 'primary',
  };

  return text ? <Badge {...attribute}>{text}</Badge> : null;
};

export default SingleBadge;
