/*
Objectives:

1. Asynchronously fetch data from different URLs and store the data in the `dataArray`.
2. Filter the data based on the city name.
3. Display the data for the city of Lisbon by manipulating the DOM

*/
(async function fetchData(dataArray = []) {
  // Performs a fetch request with the passed URL and returns the data as text asynchronously
  const makeRequest = async function (url) {
    const response = await fetch(url);
    const data = await response.text();
    return data;
  };

  // Pass the Lisbon data to the dataArray
  /**
   * @param data - the first parameter for this function is the variable with the stored Lisbon weather data
   * @param dataArr - the dataArray variable which hold all four data responses from the given URLs
   */
  const addLisbonDataToDocument = (data, dataArr = []) => {
    // validate data format and data
    data = JSON.parse(data); //construct an object using the instructions described in the JSON string.
    if (data.name !== 'Lisbon') {
      data = null;
    }

    // create DOM element for Lisbon Data title and add it to document
    let arrayLengthDiv = document.createElement('div');
    arrayLengthDiv.innerHTML = `<div id="array-length-div">Data Items:${dataArr.length}</div>`;
    document.body.appendChild(arrayLengthDiv); //add it to the end of the body

    // create DOM element for Lisbon Data and add it to document
    let lisbonDiv = document.createElement('div');
    lisbonDiv.innerHTML = `<div id="lisbon-data-div">Weather:${JSON.stringify(data)}</div>`; //show data fetched as a string
    document.body.appendChild(lisbonDiv); // add it to the end of the body
  };

  // List of URL from where data will be fetched
  // insert your own Api-key in the field APPID
  /*
  HOW TO GENERATE YOUR OWN API-KEY
  Create an Account:
  1. Go to https://openweathermap.org/Links to an external site.
  2. On the right side of the navigation bar, click “Sign In”
  3. Click the “Create an Account” link 
  4. Enter a Username, your Email, and a password.
  5. Check “I am 16 years old and over” and “I agree with Privacy Policy…”
  6. Check “I am not a robot”
  7. Click the “Create Account” button
  8. You will be prompted to disclose how and where you will use the API
  9. Leave the Company field blank
  10. For the Purpose field, select “Education/Science” from the dropdown.
  11. Click the “Save” button
  Access API Key:
  1. To access your API key go to https://home.openweathermap.org/api_keysLinks to an external site.
  2.Copy the key, it should look something like 125a227a8361eb6f2e52482b227a46464
  */
  const urlArray = [
    'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9e8fba51ce56cd13f485e33d97d2a5ff',
    'https://api.openweathermap.org/data/2.5/weather?q=Houston&APPID=9e8fba51ce56cd13f485e33d97d2a5ff',
    'https://api.openweathermap.org/data/2.5/weather?q=Lisbon&APPID=9e8fba51ce56cd13f485e33d97d2a5ff',
    'https://api.openweathermap.org/data/2.5/weather?q=Baltimore&APPID=9e8fba51ce56cd13f485e33d97d2a5ff',
  ];

  // Loop through each URL to fetch data and store it in dataArray
  urlArray.forEach(async (url) => {
    // calling async function makeRequest using 'then' method to get each satisfactory 'result' and push it in the 'dataArray'.
    makeRequest(url).then(function (result) {
      // Store `result` inside the variable dataArray
      dataArray.push(result);

      if (dataArray.length == urlArray.length) {
        // When all the data have been fetched then loop through each item in the `dataArray` and get the weather data for `Lisbon`
        dataArray.forEach( (element) => {
          if (JSON.parse(element).name == "Lisbon") {
            addLisbonDataToDocument(element, dataArray); // call function attaching weather data for Lisbon
          }
        });
        return dataArray;
      }
    });
  });
})();
