import { RecordActionResponse } from 'adminjs';
import React from 'react';

export default function RenderImage(props: RecordActionResponse) {
  return (
    <img
      src={`https://kokilogy-storage.s3.ap-southeast-1.amazonaws.com/${props.record.params.image_path}`}
      alt={props.record.params.menu_name}
      loading="lazy"
      style={{ width: '100px', borderRadius: '8px' }}
    />
  );
}
