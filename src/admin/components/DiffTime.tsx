import React from 'react';
import { RecordActionResponse } from 'adminjs';
import moment from 'moment';

const DiffTime = (props: RecordActionResponse) => {
  const type = props?.property?.custom?.type || 'time';
  const label = props?.property?.custom?.label || 'label';
  const place = props?.where || 'list';

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
    if (finishCookingDate === 'Invalid date') {
      // kitchen not yet finish cooking
      diffTime = 'Belum selesai memasak';
    } else if (receivedCustomerDate === 'Invalid date') {
      // driver not yet deliver
      diffTime = 'Belum diterima customer';
    } else {
      diffTime = `${moment(receivedCustomerDate).diff(moment(orderDate), 'minutes')} menit`;
    }
  }

  return (
    <>
      {place === 'list' ? (
        <p>{diffTime}</p>
      ) : (
        <>
          <p
            style={{
              display: 'block',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '12px',
              lineHeight: '16px',
              color: 'rgb(137, 138, 154)',
              marginBottom: '4px',
              fontWeight: '300',
            }}
          >
            {label}
          </p>
          <p>{diffTime}</p>
          <br />
          <br />
        </>
      )}
    </>
  );
};

export default DiffTime;
