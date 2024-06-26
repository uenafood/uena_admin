import React from 'react';
import { RecordActionResponse } from 'adminjs';
import moment from 'moment';

const DiffTime = (props: RecordActionResponse) => {
  const type = props?.property?.custom?.type || 'time';
  let diffTime;

  const finishCookingDate = moment(props?.record?.params?.finish_cooking_date).format('YYYY-MM-DD HH:mm:ss');
  const receivedCustomerDate = moment(props?.record?.params?.received_by_customer_date).format('YYYY-MM-DD HH:mm:ss');
  const orderDate = moment(props?.record?.params?.order_date).format('YYYY-MM-DD HH:mm:ss');

  if (type === 'cook') {
    if (finishCookingDate !== 'Invalid date') {
      diffTime = `${moment(finishCookingDate).diff(moment(orderDate), 'minutes')} menit`;
    } else {
      diffTime = `${moment().diff(moment(orderDate), 'minutes')} menit`;
    }
  } else if (type === 'delivery') {
    if (finishCookingDate === 'Invalid date') {
      // kitchen not yet finish cooking
      diffTime = 'Belum selesai memasak';
    } else if (receivedCustomerDate === 'Invalid date') {
      diffTime = `${moment().diff(moment(finishCookingDate), 'minutes')} menit`;
    } else {
      diffTime = `${moment(receivedCustomerDate).diff(moment(finishCookingDate), 'minutes')} menit`;
    }
  } else if (type === 'completion') {
    if (receivedCustomerDate === 'Invalid date') {
      // kitchen not yet finish cooking
      diffTime = 'Belum selesai memasak';
    } else {
      diffTime = `${moment(receivedCustomerDate).diff(moment(orderDate), 'minutes')} menit`;
    }
  }
  return <p>{diffTime}</p>;
};

export default DiffTime;
