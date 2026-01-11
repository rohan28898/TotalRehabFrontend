import { useState } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import { useEffect } from 'react';

const SearchLr = () => {
  const [LRdata, setLRdata] = useState([]);
  useEffect(() => {
    Axios.post('http://localhost:3001/getLRData').then((res) => {
      // console.log("success hit!" + res.data);
      // console.log('response from get lr',res.data)
      // console.log();
      var temparr = [];
      for (var i = 0; i < res.data.length; i++) {
        temparr.push(res.data[i]);
      }
      setLRdata(temparr);
    })
  }, []);

  return (<>
    <h3>LR DATA:</h3><br></br>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">LR No.</th>
          <th scope="col">Booking date</th>
          <th scope="col">Vehical No</th>
          <th scope="col">LR No.</th>
          <th scope="col">Booking date</th>
          <th scope="col">Vehical No</th>
          <th scope="col">LR No.</th>
          <th scope="col">Booking date</th>
          <th scope="col">Vehical No</th>
          <th scope="col">LR No.</th>
          <th scope="col">Booking date</th>
          <th scope="col">Vehical No</th>
        </tr>
      </thead>
      <tbody>
        {LRdata.map(obj => {
          return (
            <tr>
              <td>{obj.lrno}</td>
              <td>{obj.bdate}</td>
              <td>{obj.vehicleno}</td>
              <td>{obj.lrno}</td>
              <td>{obj.bdate}</td>
              <td>{obj.vehicleno}</td>
              <td>{obj.lrno}</td>
              <td>{obj.bdate}</td>
              <td>{obj.vehicleno}</td>
              <td>{obj.lrno}</td>
              <td>{obj.bdate}</td>
              <td>{obj.vehicleno}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </>);
};

export default SearchLr;