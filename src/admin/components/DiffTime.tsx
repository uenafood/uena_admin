import React from 'react';
import { RecordActionResponse } from 'adminjs';
import moment from 'moment';

const DiffTime = (props: RecordActionResponse) => {
  const type = props?.property?.custom?.type || 'time';
  let diffTime;

  const finishCookingDate = moment(props?.record?.params?.finish_cooking_date).format('YYYY-MM-DD HH:mm:ss');

  if (type === 'cook') {
    const orderDate = moment(props?.record?.params?.order_date).format('YYYY-MM-DD HH:mm:ss');
    if (finishCookingDate !== 'Invalid date') {
      diffTime = `${moment(finishCookingDate).diff(moment(orderDate), 'minutes')} menit`;
    } else {
      diffTime = `${moment().diff(moment(orderDate), 'minutes')} menit`;
    }
  } else if (type === 'delivery') {
    const receivedCustomerDate = moment(props?.record?.params?.received_by_customer_date).format('YYYY-MM-DD HH:mm:ss');

    if (finishCookingDate === 'Invalid date') {
      // kitchen not yet finish cooking
      diffTime = 'Belum selesai memasak';
    } else if (receivedCustomerDate === 'Invalid date') {
      diffTime = `${moment().diff(moment(finishCookingDate), 'minutes')} menit`;
    } else {
      diffTime = `${moment(receivedCustomerDate).diff(moment(finishCookingDate), 'minutes')} menit`;
    }
  } else if (type === 'completion') {
  }
  return <p>{diffTime}</p>;
};

export default DiffTime;
