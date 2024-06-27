import React from 'react';
import { Badge } from '@adminjs/design-system';
import { RecordActionResponse } from 'adminjs';

const SingleBadge = (props: RecordActionResponse) => {
  const { record } = props;
  const text = record?.params?.voucher_code;
  const label = props?.property?.custom['label'] || 'label';
  const place = props?.where || 'list';
  const attribute = {
    variant: props?.property?.custom['variant'] || 'primary',
  };

  return (
    <>
      {place === 'list' && text ? <Badge {...attribute}>{text}</Badge> : null}
      {place === 'show' ? (
        <p
          style={{
            display: 'block',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '12px',
            lineHeight: '16px',
            color: 'rgb(137, 138, 154)',
            marginBottom: '8px',
            fontWeight: '300',
          }}
        >
          {label}
        </p>
      ) : null}
      {place === 'show' && text ? (
        <>
          <Badge {...attribute}>{text}</Badge>
          <div
            style={{
              marginBottom: '24px',
            }}
          />
        </>
      ) : null}
    </>
  );
};

export default SingleBadge;
