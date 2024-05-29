//Use in BookingForm Component
// hooks/useBookingForm.js
import { useState } from 'react';

const useBookingForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const resetForm = () => {
    setCustomerName('');
    setCustomerEmail('');
    setContactNumber('');
    setAddress('');
    setDate('');
    setTime('');
  };

  return {
    customerName,
    setCustomerName,
    customerEmail,
    setCustomerEmail,
    contactNumber,
    setContactNumber,
    address,
    setAddress,
    date,
    setDate,
    time,
    setTime,
    resetForm,
  };
};

export default useBookingForm;
