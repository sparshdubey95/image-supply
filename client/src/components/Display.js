import { useState } from "react";
import "./Display.css";

const renderFile = (cid, fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
  
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
    // For images
    return <img src={url} alt={fileName} />;
  } else if (extension === 'pdf') {
    // For PDFs - provide a link
    return (
      <div className="pdf-container">
        <p>{fileName}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="pdf-link">
          View PDF
        </a>
        {/* Optional: Add PDF preview using an iframe */}
        <iframe 
          src={`${url}#toolbar=0&navpanes=0`} 
          title={fileName}
          className="pdf-preview"
        />
      </div>
    );
  } else {
    // For other file types
    return (
      <div>
        <p>{fileName}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Download File
        </a>
      </div>
    );
  }
};

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      const files = str_array.map((item, i) => {
        const fileName = item.substring(item.lastIndexOf('/') + 1);
        return renderFile(item.substring(6), fileName);
      });
      setData(files);
    } else {
      alert("No file to display");
    }
  };
  return (
    <>
      <div className="file-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;
