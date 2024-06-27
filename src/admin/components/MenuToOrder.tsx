import React from 'react';
import { RecordActionResponse } from 'adminjs';
import { Badge } from '@adminjs/design-system';

const MenuToOrder = (props: RecordActionResponse) => {
  const { record } = props;
  const splitMenu = record?.params?.menuToOrder.split(', ');
  const place = props?.where || 'list';
  const label = props?.property?.custom['label'] || 'label';
  return (
    <>
      {place !== 'list' && (
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
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px',
          maxWidth: '200px',
          marginBottom: place === 'list' ? '0' : '24px',
        }}
      >
        {splitMenu.map((item: string, index: number) =>
          item !== '' ? (
            <Badge variant="primary" outline="false" key={index}>
              {item}
            </Badge>
          ) : null,
        )}
      </div>
    </>
  );
};

export default MenuToOrder;
