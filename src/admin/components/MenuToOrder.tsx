import React from 'react';
import { RecordActionResponse } from 'adminjs';
import { Badge } from '@adminjs/design-system';

const MenuToOrder = (props: RecordActionResponse) => {
  const { record } = props;
  const splitMenu = record.params.menuToOrder.split(', ');
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
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
  );
};

export default MenuToOrder;
