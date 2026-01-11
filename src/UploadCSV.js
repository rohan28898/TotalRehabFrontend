// import $ from 'jquery';
// import Axios from 'axios';
// function UploadCSV() {
//     let uploadCsv = (e) => {

//         if ($("#fileToUpload").get(0).files.length == 0) {
//             alert("Please upload the file first.");
//             return;
//         }
//         let fileUpload = $("#fileToUpload").get(0);
//         let files = fileUpload.files;
//         if (files[0].name.toLowerCase().lastIndexOf(".csv") == -1) {
//             alert("Please upload only CSV files");
//             return;
//         }
//         let reader = new FileReader();
//         let bytes = 50000;

//         reader.onloadend = function (evt) {
//             let lines = evt.target.result;
//             if (lines && lines.length > 0) {
//                 let line_array = CSVToArray(lines);
//                 if (lines.length == bytes) {
//                     line_array = line_array.splice(0, line_array.length - 1);
//                 }
//                 var columnArray = [];
//                 for (let i = 0; i < line_array.length; i++) {
//                     let cellArr = line_array[i];

//                     for (var j = 0; j < cellArr.length; j++) {
//                         if (i == 0) {
//                             columnArray.push(cellArr[j].replace('ï»¿', ''));

//                         }
//                     }
//                     if (i != 0) {
//                         console.log(cellArr);
//                         if (cellArr.length > 1) {
//                             Axios.post('http://localhost:3001/loadCSV', { cellArr: cellArr }).then((res) => {


//                                 // console.log("success hit!" + res.data);
//                                 // setSearchData(res.data);
//                                 // console.log();
//                             }).catch((err) => { alert("some error in file upload try again!"); })
//                         }
//                     }

//                 }
//                 alert("data uploaded succesfully.");

//             }
//         }

//         let blob = files[0].slice(0, bytes);
//         reader.readAsBinaryString(blob);
//     }

//     function CSVToArray(strData, strDelimiter) {
//         strDelimiter = (strDelimiter || ",");
//         let objPattern = new RegExp(
//             (
//                 "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
//                 "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
//                 "([^\"\\" + strDelimiter + "\\r\\n]*))"
//             ),
//             "gi"
//         );
//         let arrData = [[]];
//         let arrMatches = null;
//         while (arrMatches = objPattern.exec(strData)) {
//             let strMatchedDelimiter = arrMatches[1];
//             let strMatchedValue = [];
//             if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
//                 arrData.push([]);
//             }
//             if (arrMatches[2]) {
//                 strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
//             } else {
//                 strMatchedValue = arrMatches[3];
//             }
//             arrData[arrData.length - 1].push(strMatchedValue);
//         }
//         return (arrData);
//     }

//     return (
//         <>
//                 <div className="container" style={{ marginTop: "30px" }}>
//                     <div className="col-md-4">
//                         <input type="file" id="fileToUpload" className="form-control"></input>
//                     </div>
//                     <div className="col-md-4">
//                         <button type="button" className="btn btn-info btn-lg" id="btnUploadFile" onClick={(e) => uploadCsv(e)}>Upload File</button>
//                     </div>
//                     <div className="table-responsive col-md-12 csv-table" style={{ marginTop: "20px" }}>
//                         <table className="table table-bordered table-hover table-striped"></table>
//                     </div>
//                 </div>
//         </>
//     )
// }
// export default UploadCSV;

