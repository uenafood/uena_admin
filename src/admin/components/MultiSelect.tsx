import React, { useState, useEffect } from 'react';
import { Label } from '@adminjs/design-system';
import { FilterPropertyProps, RecordActionResponse } from 'adminjs';
import { Select } from '@adminjs/design-system';

const MultiSelect = (props: FilterPropertyProps) => {
  const [value, setValue] = useState([]);
  const options = [...props.property.custom['availableValues']];

  const labelText =
    props.property.custom['labelText'] !== undefined ? props.property.custom['labelText'] : props?.property?.path;

  const onChange = (selected) => {
    setValue(selected);
    console.log('props.onChange', props.onChange);
    console.log('record', props.record);
    console.log('property', props.property);
    /**
     * TODO: Remove %5B0%5D from the key
     */
    props.onChange(
      props.property.path,
      selected.map((item) => item.value),
    );
  };

  return (
    <>
      <Label>{labelText}</Label>
      <Select
        isMulti
        value={value}
        options={options}
        onChange={(selected) => {
          onChange(selected);
        }}
      />
      <br />
    </>
  );
};

export default MultiSelect;
