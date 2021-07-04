import axios from 'axios';

export const getInvoices = () => {
  axios.get('http://localhost:3000/api/invoices')
  .then((res) => res.data)
  .then((data) => {
    console.log(data)
  })
}

