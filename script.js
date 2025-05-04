// This is the URL to the published Google Sheets data as JSON (with the correct sheet name)
const sheetAPI = "https://sheets.googleapis.com/v4/spreadsheets/1-ZizIs2yL5cUrfBwJlXlGr9CxBdE6B1jKq7RzTOlEJE/values/WEBSITE%20SHEET!B1?key=AIzaSyC0CWXpzAi0FAZC0YD2szXZagZq7X7FunY";

// Function to fetch data from Google Sheets and update the number in the box
function updateStat() {
  fetch(sheetAPI)
    .then(response => response.json())
    .then(data => {
      console.log("Fetched data: ", data);  // Log the entire data for debugging

      // Check if the values array exists and is populated
      if (data.values && data.values.length > 0 && data.values[0].length > 0) {
        const number = data.values[0][0];  // Get the value from B1 cell
        document.getElementById("statNumber").textContent = number;
      } else {
        console.error("No value found in B1");
        document.getElementById("statNumber").textContent = "No data";
      }
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
      document.getElementById("statNumber").textContent = "Error";
    });
}

// Fetch data every 10 seconds
setInterval(updateStat, 10000);

// Initial data fetch on page load
updateStat();
