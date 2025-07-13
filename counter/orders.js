const sheetAPIOrders = "https://sheets.googleapis.com/v4/spreadsheets/1-ZizIs2yL5cUrfBwJlXlGr9CxBdE6B1jKq7RzTOlEJE/values/'ORDER SHEET'!A2:O2?key=AIzaSyC0CWXpzAi0FAZC0YD2szXZagZq7X7FunY";


function splitAndClean(cellValue) {
  return cellValue.split('\n').filter(line => line.trim() !== '----' && line.trim() !== '');
}


function updatenameheres() {
  fetch(sheetAPIOrders)
    .then(response => response.json())
    .then(data => {
      console.log("Fetched data: ", data);

      const values = data.values;
      const container = document.getElementById("allOrdersSection");

      if (values && values.length > 0) {
        const a2Value = values[0][0];  // A2
        const b2Value = values[0][1];  // B2
        const c2Value = values[0][2];  // C2
        const d2Value = values[0][3];  // D2
        const e2Value = values[0][4];  // E2
        const f2Value = values[0][5];  // F2
        const g2Value = values[0][6];  // G2
        const h2Value = values[0][7];  // H2
        const i2Value = values[0][8];  // I2
        const j2Value = values[0][9];  // J2
        const k2Value = values[0][10]; // K2
        const l2Value = values[0][11]; // L2
        const m2Value = values[0][12]; // M2
        const n2Value = values[0][13]; // N2
        const o2Value = values[0][14]; // O2
        

        const complete2El = document.getElementById("complete2Number");
        const hold2El = document.getElementById("hold2Number");
        const date2El = document.getElementById("date2Number");
        const jersey2El = document.getElementById("jersey2Number");
        const name2El = document.getElementById("name2Number");
        const school2El = document.getElementById("school2Number");
        const level2El = document.getElementById("level2Number");
        const sport2El = document.getElementById("sport2Number");
        const picture2El = document.getElementById("picture2Number");
        const graphic2El = document.getElementById("graphic2Number");
        const video2El = document.getElementById("video2Number");
        const price2El = document.getElementById("price2Number");
        const needphoto2El = document.getElementById("needphoto2Number");
        const neededit2El = document.getElementById("neededit2Number");
        const needpay2El = document.getElementById("needpay2Number");

        if (complete2El) complete2El.innerHTML = a2Value.replace(/\n/g, "<br>");
        if (hold2El) hold2El.innerHTML = b2Value.replace(/\n/g, "<br>");
        if (date2El) date2El.innerHTML = c2Value.replace(/\n/g, "<br>");
        if (jersey2El) jersey2El.innerHTML = d2Value.replace(/\n/g, "<br>");
        if (name2El) name2El.innerHTML = e2Value.replace(/\n/g, "<br>");
        if (school2El) school2El.innerHTML = f2Value.replace(/\n/g, "<br>");
        if (level2El) level2El.innerHTML = g2Value.replace(/\n/g, "<br>");
        if (sport2El) sport2El.innerHTML = h2Value.replace(/\n/g, "<br>");
        if (picture2El) picture2El.innerHTML = i2Value.replace(/\n/g, "<br>");
        if (graphic2El) graphic2El.innerHTML = j2Value.replace(/\n/g, "<br>");
        if (video2El) video2El.innerHTML = k2Value.replace(/\n/g, "<br>");
        if (price2El) price2El.innerHTML = l2Value.replace(/\n/g, "<br>");
        if (needphoto2El) needphoto2El.innerHTML = m2Value.replace(/\n/g, "<br>");
        if (neededit2El) neededit2El.innerHTML = n2Value.replace(/\n/g, "<br>");
        if (needpay2El) needpay2El.innerHTML = o2Value.replace(/\n/g, "<br>");
      } else {
        console.error("Expected values for B1 and B2 not found.");
        if (document.getElementById("complete2Number")) document.getElementById("complete2Number").textContent = "Error";
        if (document.getElementById("hold2Number")) document.getElementById("hold2Number").textContent = "Error";
        if (document.getElementById("date2Number")) document.getElementById("date2Number").textContent = "Error";
        if (document.getElementById("jersey2Number")) document.getElementById("jersey2Number").textContent = "Error";
        if (document.getElementById("name2Number")) document.getElementById("name2Number").textContent = "Error";
        if (document.getElementById("school2Number")) document.getElementById("school2Number").textContent = "Error";
        if (document.getElementById("level2Number")) document.getElementById("level2Number").textContent = "Error";
        if (document.getElementById("sport2Number")) document.getElementById("sport2Number").textContent = "Error";
        if (document.getElementById("picture2Number")) document.getElementById("picture2Number").textContent = "Error";
        if (document.getElementById("graphic2Number")) document.getElementById("graphic2Number").textContent = "Error";
        if (document.getElementById("video2Number")) document.getElementById("video2Number").textContent = "Error";
        if (document.getElementById("price2Number")) document.getElementById("price2Number").textContent = "Error";
        if (document.getElementById("needphoto2Number")) document.getElementById("needphoto2Number").textContent = "Error";
        if (document.getElementById("neededit2Number")) document.getElementById("neededit2Number").textContent = "Error";
        if (document.getElementById("needpay2Number")) document.getElementById("needpay2Number").textContent = "Error";
      }
    })
    .catch(error => {
      console.error("Fetch failed:", error);
      if (document.getElementById("complete2Number")) document.getElementById("complete2Number").textContent = "Error";
      if (document.getElementById("hold2Number")) document.getElementById("hold2Number").textContent = "Error";
      if (document.getElementById("date2Number")) document.getElementById("date2Number").textContent = "Error";
      if (document.getElementById("jersey2Number")) document.getElementById("jersey2Number").textContent = "Error";
      if (document.getElementById("name2Number")) document.getElementById("name2Number").textContent = "Error";
      if (document.getElementById("school2Number")) document.getElementById("school2Number").textContent = "Error";
      if (document.getElementById("level2Number")) document.getElementById("level2Number").textContent = "Error";
      if (document.getElementById("sport2Number")) document.getElementById("sport2Number").textContent = "Error";
      if (document.getElementById("picture2Number")) document.getElementById("picture2Number").textContent = "Error";
      if (document.getElementById("graphic2Number")) document.getElementById("graphic2Number").textContent = "Error";
      if (document.getElementById("video2Number")) document.getElementById("video2Number").textContent = "Error";
      if (document.getElementById("price2Number")) document.getElementById("price2Number").textContent = "Error";
      if (document.getElementById("needphoto2Number")) document.getElementById("needphoto2Number").textContent = "Error";
      if (document.getElementById("neededit2Number")) document.getElementById("neededit2Number").textContent = "Error";
      if (document.getElementById("needpay2Number")) document.getElementById("needpay2Number").textContent = "Error";
    });
}

setInterval(updatenameheres, 10000);
updatenameheres();
