import Signature from './Signature';
import './sheet.css';
import { useState } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import { useEffect } from 'react';
import $ from 'jquery';

function Sheet() {

    // console.log(document.getElementsByTagName('nav'));
    // let nav=document.getElementsByTagName('nav');
    let loadDataForCustomer = (e) => {
        console.log("here" + customername);

        Axios.post('http://localhost:3001/getfromcustomercode', { customername: customername }).then((res) => {
            // console.log("success hit!" + res.data);
            console.log('table dat:' + res.data[0]);
            setDname(res.data[0].Name);
            setDadd(res.data[0].address);

            setDest(res.data[0].destination);

            setDpin(res.data[0].pincode);
            setDcity(res.data[0].city);
            setDgst(res.data[0].gst);
            setDmob(res.data[0].mobile);


            // setLrno(res.data[0].lrno);
            // console.log();
        })
    }
    
    let pan = 'asdasfasfa';
    let cin = '12r542645754745';
    let add = '3862, Patel Estate, B/h PWD Store, Aslali By-Pass Road Aslali, Ahmedabad-382427';
    const [searchdata, setSearchData] = useState([]);
    const [supplytransport, setSupplytransport] = useState([]);
    const [customercode, setCustomercode] = useState([]);
    const [box, setBox] = useState('0');
    const [invoicevalue, setInvoicevalue] = useState('0');
    const [invoiceno, setInvoiceNo] = useState('');
    const [l, setL] = useState('');
    const [b, setB] = useState('');
    const [h, setH] = useState('');
    const [proddesc, setProddesc] = useState('');

    const [invdate, setInvDate] = useState('');

    const [date, setDate] = useState('');
    const [lrno, setLrno] = useState('');
    const [mode, setMode] = useState('');
    const [ltype, setLtype] = useState('');
    const [w, setW] = useState('');
    const [con, setCon] = useState('');
    const [vno, setVno] = useState('');
    const [vtype, setVtype] = useState('Road');
    const [pterm, setPterm] = useState('');
    const [customername, setCustomername] = useState('');
    const [cname, setCname] = useState('');
    const [dname, setDname] = useState('');
    const [cadd, setCadd] = useState('');
    const [dadd, setDadd] = useState('');
    const [orgin, setOrigin] = useState('');
    const [dest, setDest] = useState('');
    const [cpin, setCpin] = useState('');
    const [dpin, setDpin] = useState('');
    const [ccity, setCcity] = useState('');
    const [dcity, setDcity] = useState('');
    const [cstate, setCstate] = useState('');
    const [dstate, setDstate] = useState('');
    const [cgst, setCgst] = useState('');
    const [dgst, setDgst] = useState('');
    const [cmob, setCmob] = useState('');
    const [dmob, setDmob] = useState('');
    const [amount, setAmount] = useState('');
    const [spinstruct, setSpinstruct] = useState('');
    const [terms, setTerms] = useState('');

    const [GST, setGST] = useState('');
    const clear = () => {
        setDate(''); setLrno(''); setMode(''); setLtype(''); setW(''); setCon(''); setVno(''); setVtype(''); setPterm(''); setCustomername('');
        setCname(''); setDname(''); setCadd(''); setDadd(''); setOrigin(''); setDest(''); setCpin(''); setDpin(''); setCcity(''); setDcity(''); setCstate(''); setDstate('');
        setCgst(''); setDgst(''); setCmob(''); setDmob(''); setAmount(''); setSpinstruct(''); setTerms('');
        setB(''); setL(''); setH(''); setBox('0'); setInvoicevalue('0'); setProddesc(''); setInvoiceNo(''); setInvDate(''); setGST('');
    }
    const [searchlrno, setSearchLrno] = useState('');
    const loadData = (e, key) => {
        clear();
        var loadedData = searchdata[key];
        console.log("loading for row no" + loadedData.invoiceno);
        if (loadedData.invoiceno == null) {
            setInvoiceNo('');
        }
        else {
            setInvoiceNo(loadedData.invoiceno);
        }
        setInvDate(loadedData.invoicedate.substring(0, 10));
        setDate(loadedData.bdate.substring(0, 10)); setLrno(loadedData.lrno); setMode(loadedData.mode); setLtype(loadedData.loadtype); setW(loadedData.weight); setCon(loadedData.condit); setVno(loadedData.vehicleno); setVtype(loadedData.vehicletype); setPterm(loadedData.paymmentterm); setCustomername(loadedData.customername);
        setCname(loadedData.cname); setDname(loadedData.dname); setCadd(loadedData.caddress); setDadd(loadedData.dadress); setOrigin(loadedData.origin); setDest(loadedData.destination); setCpin(loadedData.cpin); setDpin(loadedData.dpin); setCcity(loadedData.ccity); setDcity(loadedData.dcity); setCstate(loadedData.cstate); setDstate(loadedData.dstate);
        setCgst(loadedData.cgst); setDgst(loadedData.dgst); setCmob(loadedData.cmobile); setDmob(loadedData.dmobile); setAmount(loadedData.amount); setSpinstruct(loadedData.spinstruction); setTerms(loadedData.terms);
        setB(loadedData.b); setL(loadedData.l); setH(loadedData.h); setBox(loadedData.box); setInvoicevalue(loadedData.invoicevalue); setProddesc(loadedData.pdesc);
        closeModal(); setGST(loadedData.gst);


    };
    useEffect(() => {
        Axios.post('http://localhost:3001/getLRNO').then((res) => {
            // console.log("success hit!" + res.data);
            console.log(res.data)
            setLrno(res.data[0].lrno);
            // console.log();
        })
    }, []);
    useEffect(() => {
        Axios.post('http://localhost:3001/getconsignordet').then((res) => {
            // console.log("success hit!" + res.data);
            console.log(res.data)
            setCname(res.data[0].name);
            setCadd(res.data[0].add);
            setOrigin(res.data[0].origin);
            setCpin(res.data[0].pincode);
            setCgst((res.data[0].GST));
            setCmob(res.data[0].mobile);
            setCcity(res.data[0].city);
            // console.log();
        })
    }, []);
    useEffect(() => {
        Axios.post('http://localhost:3001/getSuppTransport').then((res) => {
            // console.log("success hit!" + res.data);
            var temparr = [];
            for (var i = 0; i < res.data.length; i++) {
                temparr.push(res.data[i].name);
            }
            setSupplytransport(temparr);
            // console.log();
        })
    }, []);

    useEffect(() => {
        Axios.post('http://localhost:3001/getCustomercode').then((res) => {
            // console.log("success hit!" + res.data);
            console.log(res.data);
            var temparr = [];
            for (var i = 0; i < res.data.length; i++) {
                temparr.push(res.data[i].pan);
            }
            setCustomercode(temparr);
            // console.log();
        })
    }, []);

    const searchData = (e) => {
        Axios.post('http://localhost:3001/get', { lrno: searchlrno }).then((res) => {
            // console.log("success hit!" + res.data);
            setSearchData(res.data);
            // console.log();
        })
    };
    const insert = () => {
        if (date.length <= 0) {
            alert("Date value can't be empty");
        }
        if (invdate.length <= 0) {
            alert("Invoice Date value can't be empty");
        }
        //alert(date);
        Axios.post('http://localhost:3001/create',
            {
                GST: GST,
                invoiceno: invoiceno,
                invdate: invdate,
                proddesc: proddesc,
                l: l,
                b: b,
                h: h,
                box: box,
                invoicevalue: invoicevalue,
                pan: pan,
                add: add,
                cin: cin,
                date: date,
                lrno: lrno,
                mode: mode,
                ltype: ltype,
                w: w,
                con: con,
                vno: vno,
                vtype: vtype,
                pterm: pterm,
                customername: customername,
                cname: cname,
                dname: dname,
                cadd: cadd,
                dadd: dadd,
                orgin: orgin,
                dest: dest,
                cpin: cpin,
                dpin: dpin,
                ccity: ccity,
                dcity: dcity,
                cstate: cstate,
                dstate: dstate,
                cgst: cgst,
                dgst: dgst,
                cmob: cmob,
                dmob: dmob,
                amount: amount,
                spinstruct: spinstruct,
                terms: terms
            }).then((res) => {
                alert("data inserted");
                clear();
                console.log("success hit!" + res.data);
            })
    };

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <>
            <div className='row' style={{ border: '1px solid', borderRight: '2px solid' }}>
                <div className='col-md-3' style={{ border: '1px solid', borderRight: '2px solid', borderLeft: '2px solid black' }}><b>SANOTSHI</b></div>
                <div className='col-md-6'>
                    <div className='row' style={{ border: '1px solid', borderBottom: '2px solid' }}>
                        <div className='col-md-12' >

                            <b>LORRY RECEIPT</b>
                        </div>
                    </div>

                    <div className='row' >
                        <div className='col-md-12'>

                            <b>  {add}</b>
                        </div>
                    </div>
                </div>
                <div className='col-md-3' style={{ border: '1px solid', borderLeft: '2px solid black' }}>
                    <div className='row'>
                        <div className='col-md-1'>
                            <input type='checkbox'></input>
                        </div>

                        <div className='col-md-11'>

                            <b >Original COPY</b>

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-1'>
                            <input type='checkbox'></input>
                        </div>
                        <div className='col-md-11'>
                            <b >Duplicate COPY</b>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-1'>
                            <input type='checkbox'></input>
                        </div>

                        <div className='col-md-11'>

                            <b >Transport COPY</b>

                        </div>
                    </div>
                </div>
            </div>


            <div className='row' style={{ border: '1px solid' }}>
                <div className="input-group input-group-sm mb-0">
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>BOOKING DATE: </b></span>
                    {/* <input type="date" name="begin" placeholder="dd-mm-yyyy" min="1997-01-01" max="2030-12-31"></input> */}

                    <input type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={date} onChange={(e) => { setDate(e.target.value) }} />
                    <span className="input-group-text " id="inputGroup-sizing-sm"><b>LR No: </b></span>
                    <input type="text" className="form-control " aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled value={lrno} onChange={(e) => { setLrno(e.target.value) }} />
                </div>
                {/* <div className="input-group input-group-sm mb-0 ">
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>Mode: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={mode} onChange={(e) => { setMode(e.target.value) }} />
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>Load Type: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={ltype} onChange={(e) => { setLtype(e.target.value) }} />
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>Actual Weight (KG.) </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={w} onChange={(e) => { setW(e.target.value) }} />
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />

                </div> */}
                <div className="input-group mb-0">
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>Product Condition: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={con} onChange={(e) => { setCon(e.target.value) }} />
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>Vehicle No: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={vno} onChange={(e) => { setVno(e.target.value) }} />
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>Vehicle Type: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={'Road'} disabled onChange={(e) => { setVtype('Road') }} />
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>Payment term: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={pterm} onChange={(e) => { setPterm(e.target.value) }} />

                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b><u>Customer Code: </u></b></span>
                    <input type="text" className="form-control" list="customercodes" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={customername} onChange={(e) => { setCustomername(e.target.value) }} ></input>
                    <datalist id="customercodes">
                        {
                            customercode.map((val, key) => {
                                return <option value={val}>{val}</option>
                            })
                        }


                    </datalist>
                    <button className='btn btn-primary' onClick={(e) => loadDataForCustomer(e)}>load</button>
                </div>
                {/* <div className="input-group mb-3">
                    <span className="input-group-text form-control text-center" id="inputGroup-sizing-sm"><b><u>CONSIGNOR DETAILS</u></b></span>

                    <span className="input-group-text form-control" id="inputGroup-sizing-sm"><b><u>CONSIGNEE DETAILS</u></b></span>

                </div> */}
                <div className="input-group mb-0">

                    <span className="input-group-text" id="bootstrap-overrides"><b>CONSIGNOR NAME: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled value={cname} onChange={(e) => { setCname(e.target.value) }} />
                    <span className="input-group-text" id="bootstrap-overrides"><b>CONSIGNEE NAME: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={dname} onChange={(e) => { setDname(e.target.value) }} />
                </div>
                <div className="input-group mb-0">

                    <table className="table table-bordered mb-0">
                        <thead>
                            <tr>
                                <th><span className="input-group-text" id="inputGroup-sizing-sm" ><b>CONSIGNOR ADD: </b></span>
                                    <textarea className="form-control form-control-sm" value={cadd} disabled onChange={(e) => { setCadd(e.target.value) }}></textarea>
                                </th>
                                <th><span className="input-group-text" id="inputGroup-sizing-sm"><b>DELIVERY ADD: </b></span>
                                    <textarea className="form-control form-control-sm" value={dadd} onChange={(e) => { setDadd(e.target.value) }}></textarea>

                                </th>

                            </tr>
                        </thead>

                    </table>
                </div>

                {/* <div className="input-group mb-0">

                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>ORIGIN: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={orgin} onChange={(e) => { setOrigin(e.target.value) }} />
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>DESTINATION: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={dest} onChange={(e) => { setDest(e.target.value) }} />
                </div> */}



{/* 
                <div className="input-group mb-0">

                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>PINCODE: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={cpin} onChange={(e) => { setCpin(e.target.value) }} />
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>PINCODE: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={dpin} onChange={(e) => { setDpin(e.target.value) }} />
                </div> */}

                {/* <div className="input-group mb-0">

                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>CITY: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={ccity} onChange={(e) => { setCcity(e.target.value) }} />
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>CITY: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={dcity} onChange={(e) => { setDcity(e.target.value) }} />
                </div> */}
                {/* <div className="input-group mb-0">

                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>STATE: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={cstate} onChange={(e) => { setCstate(e.target.value) }} />
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>STATE: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={dstate} onChange={(e) => { setDstate(e.target.value) }} />
                </div> */}

                <div className="input-group mb-0">

                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>GST NO: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" disabled aria-describedby="inputGroup-sizing-sm" value={cgst} onChange={(e) => { setCgst(e.target.value) }} />
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>GST NO: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={dgst} onChange={(e) => { setDgst(e.target.value) }} />
                </div>

                <div className="input-group mb-5">

                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>MOBILE NO: </b></span>
                    <input type="text" className="form-control" disabled aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={cmob} onChange={(e) => { setCmob(e.target.value) }} />
                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>MOBILE NO:</b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={dmob} onChange={(e) => { setDmob(e.target.value) }} />
                </div>
                {/* <div className="container">
                    <table className="table table-bordered">
                        <thead>
                            <b><u>CONSIGNOR</u></b>
                            <tr>
                                <th>No. of Box</th>
                                <th>Product Description</th>
                                <th>Length(cm)</th>
                                <th>Breadth(cm)</th>
                                <th>Height(cm)</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type='text' style={{ border: '0px', textAlign: 'center' }} value={box} onChange={(e) => { setBox(e.target.value) }}></input></td>
                                <td><input type='text' style={{ border: '0px', textAlign: 'center' }} value={proddesc} onChange={(e) => { setProddesc(e.target.value) }}></input></td>
                                <td><input type='text' style={{ border: '0px', textAlign: 'center' }} value={l} onChange={(e) => { setL(e.target.value) }}></input></td>
                                <td><input type='text' style={{ border: '0px', textAlign: 'center' }} value={b} onChange={(e) => { setB(e.target.value) }}></input></td>
                                <td><input type='text' style={{ border: '0px', textAlign: 'center' }} value={h} onChange={(e) => { setH(e.target.value) }}></input></td>

                            </tr>
                            <tr>
                                <td>Total Pcs.<input type='text' style={{ border: '0px', textAlign: 'center' }} value={box} disabled></input></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                            </tr>
                        </tbody>
                    </table>

                </div> */}

                <div className='container'>
                    {/* <div className="input-group mb-0">

                        <span className="input-group-text" id="inputGroup-sizing-sm"><b>GST: </b></span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={GST} onChange={(e) => { setGST(e.target.value) }} />
                    </div> */}

                    <table className="table table-sm table-bordered" style={{ position: 'relative' }}>
                        <thead>
                            <b><u>CONSIGNEE</u></b>
                            <tr>
                                <th>No. of Box</th>
                                <th>No. of Bag / Drum</th>
                                <th>Product Description</th>
                                <th>Invoice No</th>
                                <th>Invoice Date</th>
                                <th>Invoice Value</th>
                                <th>E-waybill No</th>
                                <th>E-waybill Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type='text' style={{ border: '0px', textAlign: 'center' }} value={box} onChange={(e) => { setBox(e.target.value) }}></input></td>
                                <td><input type='text' style={{ border: '0px', textAlign: 'center' }} value={l} onChange={(e) => { setL(e.target.value) }}></input></td>
                                <td><input type='text' style={{ border: '0px', textAlign: 'center' }} value={proddesc} onChange={(e) => { setProddesc(e.target.value) }}></input></td>
                                <td><input type='text' style={{ border: '0px', textAlign: 'center' }} value={invoiceno} onChange={(e) => { setInvoiceNo(e.target.value) }} ></input></td>
                                <td><input type='date' style={{ border: '0px', textAlign: 'center' }} value={invdate} onChange={(e) => { setInvDate(e.target.value) }}></input></td>
                                <td><input type='text' style={{ border: '0px', textAlign: 'center' }} value={invoicevalue} onChange={(e) => { setInvoicevalue(e.target.value) }}></input></td>
                                <td><input type='text' style={{ border: '0px', textAlign: 'center' }}></input></td>
                                <td><input type='text' style={{ border: '0px', textAlign: 'center' }}></input></td>

                            </tr>
                            <tr>
                                <td>Total Box:<input type='text' style={{ border: '0px', textAlign: 'center' }} disabled value={box}></input></td>
                                <td></td>
                                <td></td>

                                <td></td>
                                <td></td>
                                <td>Invoice Value:<input type='text' style={{ border: '0px', textAlign: 'center' }} disabled value={invoicevalue}></input></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* <div className="input-group mb-0">

                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>AMOUNT IN WORDS: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                </div> */}


                {/* <div className="input-group mb-0">

                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>Supply Transport </b></span>
                    <input type="text" className="form-control" list='supplytrans' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={spinstruct} onChange={(e) => { setSpinstruct(e.target.value) }} />
                    <datalist id="supplytrans">
                        {
                            supplytransport.map((val, key) => {
                                return <option value={val}>{val}</option>
                            })
                        }


                    </datalist>
                </div> */}
                <Signature></Signature>


                <div className="input-group mt-1 mb-0">

                    <span className="input-group-text" id="inputGroup-sizing-sm"><b>Terms & Conditions of Carrier: </b></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={terms} onChange={(e) => { setTerms(e.target.value) }} />
                </div>
            </div>

            <br></br>
            {/* code for search starts here */}
            <div>

                <button className='btn btn-primary mr-50' onClick={(e) => insert()}>SAVE</button>

                <button className='btn btn-success ml-50' onClick={openModal}>Search</button>




                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                    style={{ border: '2px solid green' }}
                // className='myclass'

                >
                    {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                    <button type="button" className="btn btn-danger" onClick={closeModal}>X</button>
                    <br></br>
                    <br></br><span className="input-group-text" id="inputGroup-sizing-sm"><b>Search Data: </b></span>
                    <div className="input-group mb-0">

                        <span className="input-group-text" id="inputGroup-sizing-sm"><b>LR No: </b></span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={searchlrno} onChange={(e) => { setSearchLrno(e.target.value) }} />
                    </div>
                    <button type="button" className="btn btn-success" onClick={(e) => searchData(e)}>Search</button>
                    <br></br><br></br>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">LR NO</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchdata.map((val, key) => {
                                    return <tr><td>{val.lrno}</td><td><button className="btn btn-primary" onClick={(e) => loadData(e, key)}>load</button></td></tr>
                                })
                            }
                        </tbody>
                    </table>


                </Modal>
            </div>
            {/* <style type="text/css">
                {`.navbar {display: none}`}
            </style> */}
        </>
    );
}
export default Sheet;