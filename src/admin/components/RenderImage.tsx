import { RecordActionResponse } from 'adminjs';
import React from 'react';

export default function RenderImage(props: RecordActionResponse) {
  const place = props?.where || 'list';
  const label = props?.property?.custom['label'] || 'label';

  return (
    <>
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
      <img
        src={`https://kokilogy-storage.s3.ap-southeast-1.amazonaws.com/${props.record.params.image_path}`}
        alt={props.record.params.menu_name}
        loading="lazy"
        style={{ width: '100px', borderRadius: '8px', marginBottom: '24px' }}
      />
    </>
  );
}
