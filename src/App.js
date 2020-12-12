import React, { Component, useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsDown,
  faThumbsUp,
  faImage,
  faMoneyCheckAlt,
  faSearchDollar,
} from '@fortawesome/free-solid-svg-icons';

const invoicesComponent = (invoices, remove) =>
  invoices.map(invoice => (
    <tr key={invoice.Id}>
      <td>{invoice.Vendor}</td>
      <td>{invoice.Amount}</td>
      <td>{invoice.invoice}</td>
      <td>{invoice.Date}</td>
      <td>
        <Button
          className="btn btn-lg btn-success"
          onClick={() => remove(invoice.Id)}
        >
          <FontAwesomeIcon icon={faThumbsUp} /> OK
        </Button>
      </td>
      <td>
        <Button
          className="btn btn-lg btn-danger"
          onClick={() => remove(invoice.Id)}
        >
          <FontAwesomeIcon icon={faThumbsDown} /> NOK
        </Button>
      </td>
      <td>
        <Button
          className="btn btn-lg btn-info"
          onClick={() => remove(invoice.Id)}
        >
          <FontAwesomeIcon icon={faMoneyCheckAlt} /> 50%
        </Button>
      </td>
      <td>
        <Button
          className="btn btn-lg btn-warning"
          onClick={() => remove(invoice.Id)}
        >
          <FontAwesomeIcon icon={faSearchDollar} /> ??
        </Button>
      </td>
      <td>
        <Button
          className="btn btn-lg btn-info"
          onClick={() => remove(invoice.Id)}
        >
          <FontAwesomeIcon icon={faImage} /> Image
        </Button>
      </td>
    </tr>
  ));

function App() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      const response = await fetch(
        'https://1n9r5vizt2.execute-api.eu-west-2.amazonaws.com/dev'
      );
      const body = await response.json();
      console.log(body);
      setInvoices(body);
      setLoading(false);
    };
    fetchInvoices();
    return () => {};
  }, []);

  const remove = Id => {
    const updateedInvoices = [...invoices].filter(i => i.Id !== Id);
    setInvoices(updateedInvoices);
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="container border border-secondary rouded center">
      <div className="row">
        <div className="col-12">
          <h4>Pending Invoices - The Test Comapny</h4>
        </div>
      </div>

      <div className="row">
        <div className=".col-xs-12 center text-center">
          <Table dark responsive striped bordered hover>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Invoice #</th>
                <th>Date</th>
                <th colSpan="4">Actions</th>
                <th>Image</th>
              </tr>
            </thead>

            <tbody>
              {invoices.length === 0 ? (
                <td colSpan="9">All caught up!</td>
              ) : (
                invoicesComponent(invoices, remove)
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default App;
