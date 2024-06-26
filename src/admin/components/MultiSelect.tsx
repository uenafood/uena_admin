import React, { useState, useEffect } from 'react';
import { Label } from '@adminjs/design-system';
import { FilterPropertyProps, RecordActionResponse } from 'adminjs';
import { Select } from '@adminjs/design-system';

const MultiSelect = (props: FilterPropertyProps) => {
  const [value, setValue] = useState([{ value: '', label: '' }]);
  const options = [...props.property.custom['availableValues']];

  const labelText =
    props.property.custom['labelText'] !== undefined ? props.property.custom['labelText'] : props?.property?.path;

  const onChange = (
    selected: [
      {
        value: string;
        label: string;
      },
    ],
  ) => {
    setValue(selected);
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
