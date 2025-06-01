const sheetAPIOther = "https://sheets.googleapis.com/v4/spreadsheets/1-ZizIs2yL5cUrfBwJlXlGr9CxBdE6B1jKq7RzTOlEJE/values/'TOTAL SHEET'!B1:B?key=AIzaSyC0CWXpzAi0FAZC0YD2szXZagZq7X7FunY";

function updatepictures() {
  fetch(sheetAPIOther)
    .then(response => response.json())
    .then(data => {
      console.log("Fetched data: ", data);

      const values = data.values;

      if (values && values.length >= 0) {
        const b1Value = values[0][0]; // B1
        const b2Value = values[1][0]; // B2
        const b3Value = values[2][0]; // B3
        const b4Value = values[3][0]; // B4
        const b6Value = values[5][0]; // B6
        const b7Value = values[6][0]; // B7
        const b8Value = values[7][0]; // B8
        const b10Value = values[9][0]; // B10
        const b11Value = values[10][0]; // B11
        const b12Value = values[11][0]; // B12
        const b14Value = values[13][0]; // B14
        const b15Value = values[14][0]; // B15
        const b16Value = values[15][0]; // B16

        const pictureNumberEl = document.getElementById("pictureNumber");
        const graphicNumberEl = document.getElementById("graphicNumber");
        const completeNumberEl = document.getElementById("completeNumber");
        const holdNumberEl = document.getElementById("holdNumber");
        const totalNumberEl = document.getElementById("totalNumber");
        const expectedNumberEl = document.getElementById("expectedNumber");
        const receivedNumberEl = document.getElementById("receivedNumber");
        const openphotoNumberEl = document.getElementById("openphotoNumber");
        const openeditNumberEl = document.getElementById("openeditNumber");
        const openpayNumberEl = document.getElementById("openpayNumber");
        const holdphotoNumberEl = document.getElementById("holdphotoNumber");
        const holdeditNumberEl = document.getElementById("holdeditNumber");
        const holdpayNumberEl = document.getElementById("holdpayNumber");

        if (pictureNumberEl) pictureNumberEl.textContent = b1Value;
        if (graphicNumberEl) graphicNumberEl.textContent = b2Value;
        if (completeNumberEl) completeNumberEl.textContent = b3Value;
        if (holdNumberEl) holdNumberEl.textContent = b4Value;
        if (totalNumberEl) totalNumberEl.textContent = b6Value;
        if (expectedNumberEl) expectedNumberEl.textContent = b7Value;
        if (receivedNumberEl) receivedNumberEl.textContent = b8Value;
        if (openphotoNumberEl) openphotoNumberEl.textContent = b10Value;
        if (openeditNumberEl) openeditNumberEl.textContent = b11Value;
        if (openpayNumberEl) openpayNumberEl.textContent = b12Value;
        if (holdphotoNumberEl) holdphotoNumberEl.textContent = b14Value;
        if (holdeditNumberEl) holdeditNumberEl.textContent = b15Value;
        if (holdpayNumberEl) holdpayNumberEl.textContent = b16Value;
      } else {
        console.error("Expected values for B1 and B2 not found.");
        if (document.getElementById("pictureNumber")) document.getElementById("pictureNumber").textContent = "Error";
        if (document.getElementById("graphicNumber")) document.getElementById("graphicNumber").textContent = "Error";
        if (document.getElementById("completeNumber")) document.getElementById("completeNumber").textContent = "Error";
        if (document.getElementById("holdNumber")) document.getElementById("holdNumber").textContent = "Error";
        if (document.getElementById("totalNumber")) document.getElementById("totalNumber").textContent = "Error";
        if (document.getElementById("expectedNumber")) document.getElementById("expectedNumber").textContent = "Error";
        if (document.getElementById("receivedNumber")) document.getElementById("receivedNumber").textContent = "Error";
        if (document.getElementById("openphotoNumber")) document.getElementById("openphotoNumber").textContent = "Error";
        if (document.getElementById("openeditNumber")) document.getElementById("openeditNumber").textContent = "Error";
        if (document.getElementById("openpayNumber")) document.getElementById("openpayNumber").textContent = "Error";
        if (document.getElementById("holdphotoNumber")) document.getElementById("holdphotoNumber").textContent = "Error";
        if (document.getElementById("holdeditNumber")) document.getElementById("holdeditNumber").textContent = "Error";
        if (document.getElementById("holdpayNumber")) document.getElementById("holdpayNumber").textContent = "Error";
      }
    })
    .catch(error => {
      console.error("Fetch failed:", error);
      if (document.getElementById("pictureNumber")) document.getElementById("pictureNumber").textContent = "Error";
      if (document.getElementById("graphicNumber")) document.getElementById("graphicNumber").textContent = "Error";
      if (document.getElementById("completeNumber")) document.getElementById("completeNumber").textContent = "Error";
      if (document.getElementById("holdNumber")) document.getElementById("holdNumber").textContent = "Error";
      if (document.getElementById("totalNumber")) document.getElementById("totalNumber").textContent = "Error";
      if (document.getElementById("expectedNumber")) document.getElementById("expectedNumber").textContent = "Error";
      if (document.getElementById("receivedNumber")) document.getElementById("receivedNumber").textContent = "Error";
      if (document.getElementById("openphotoNumber")) document.getElementById("openphotoNumber").textContent = "Error";
      if (document.getElementById("openeditNumber")) document.getElementById("openeditNumber").textContent = "Error";
      if (document.getElementById("openpayNumber")) document.getElementById("openpayNumber").textContent = "Error";
      if (document.getElementById("holdphotoNumber")) document.getElementById("holdphotoNumber").textContent = "Error";
      if (document.getElementById("holdeditNumber")) document.getElementById("holdeditNumber").textContent = "Error";
      if (document.getElementById("holdpayNumber")) document.getElementById("holdpayNumber").textContent = "Error";
    });
}

setInterval(updatepictures, 10000);
updatepictures();
