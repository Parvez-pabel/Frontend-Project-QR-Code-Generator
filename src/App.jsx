import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import QRCode from "react-qr-code"; // ✅ Correct and Vite-compatible
import logo from "./assets/image/QRLogo.png";

const App = () => {
  const [input, setInput] = useState("https://www.google.com/");
  // const downloadImg = () => {
  //   const svg = document.querySelector("svg");
  //   const imageDataURL = svg.toDataURL("image/png");
  //   const el = document.createElement("a");
  //   el.href = imageDataURL;
  //   el.download = "QRCode.png";
  //   el.click();
  // };
  const downloadImg = () => {
    const svg = document.querySelector("svg"); // grab the <svg>
    const svgData = new XMLSerializer().serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = svg.clientWidth || 200;
      canvas.height = svg.clientHeight || 200;

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "QRCode.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = url;
  };

  return (
    <>
      <Navbar className="bg-body-tertiary sticky-top shadow-sm">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="QR Logo"
              src={logo}
              width="120"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className="container">
        <div className="row py-5">
          <div className="col-md-6 offset-md-3">
            <h3 className="fw-bold">QR Code Generator</h3>
            <hr />
            <input
              type="url"
              placeholder="Enter a URL"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {input && (
              <div className="d-flex flex-column w-50 mx-auto">
                <div className="bg-white p-3 mt-4 d-inline-block mx-auto shadow-lg rounded-2 ">
                  <QRCode
                    value={input}
                    size={200}
                    level="M"
                    className="rounded-2"
                  />
                </div>
                <button className="btn btn-dark mt-4" onClick={downloadImg}>
                  Download QR
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
