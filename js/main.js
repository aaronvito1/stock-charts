let infoArray = [];
let tickerArray = [];
// Fetched data using Polygon's stocks API
	// Used Kickstart coding's example and changed to manipulate data for stocks

// if a stock number goes past 100, the charts will become proportional 
let highestNum = 100;
let highestNumClose = 100;

function doFetch() {
	let searchInputVal = document.querySelector('#search');

	let value = searchInputVal.value;
	console.log('Searched value is:', value);

	let url = "https://api.polygon.io/v3/reference/tickers?ticker=" + value + "&market=stocks&active=true&sort=ticker&order=asc&limit=10&apiKey=fURCL4yNKe4CuMX2Fk5yMA70pUTDAHAe";

	searchInputVal.innerHTML = '';

	fetch(url)
		.then(response => response.json())
		.then(data => {
			let arrayOfInfo = data.results;
			// console.log(' --dofetch data:', data)
			infoArray.arrayOfInfo = arrayOfInfo;
			fetchStockStats();
		});
	}

function fetchStockStats() {
	// console.log(' --displayStockStats is being called');
	// call for the open/close url key provided
	let searchInputVal = document.querySelector('#search');
	let stockVal = searchInputVal.value;
	searchInputVal.innerHTML = '';

	// search for user input dates
	let searchDateVal = document.querySelector('#searchDate');
	let dateValue = searchDateVal.value
	console.log('Date entered:', dateValue)

	// api used to find the open/close of stocks
	let dailyTickerUrl = 'https://api.polygon.io/v1/open-close/' + stockVal + '/' + dateValue + '?adjusted=true&apiKey=fURCL4yNKe4CuMX2Fk5yMA70pUTDAHAe';
	
	fetch(dailyTickerUrl)
		.then(response => response.json())
		.then(data => {
			tickerArray.tickerData = data;
			displayOutput();
		});

}

function displayOutput()  {
	let outputDiv = document.querySelector('#outputInfo');

	let resultsDiv = document.querySelector('#results');
	// resets the information that is produced everytime searched
	resultsDiv.innerHTML = '';

	// gets data from the info and ticker arrays
	const stock = infoArray;
	const tickerSpec = tickerArray;

	let newDiv = document.createElement('div');
	newDiv.innerHTML = stock.arrayOfInfo[0].name + ' (' + stock.arrayOfInfo[0].ticker + ')';
	outputDiv.appendChild(newDiv);

	let chartDiv = document.createElement('div');
	let chartDivClose = document.createElement('div');
	chartDivClose.innerHTML = '';

	// gets the info for the open data, represented on the graph as red
	resultsDiv.appendChild(chartDiv);

	let chart = document.querySelector("#chart-location");
	let width = tickerArray.tickerData.open;
	let bar = document.createElement("div");

	bar.classList.add("progression-bar");
	bar.textContent = 'Open: ' + tickerArray.tickerData.open;

	if (highestNum < width) {
		highestNum = width;
		console.log('highest:', highestNum)
	}
	let newWidth = (tickerArray.tickerData.open / highestNum) * 200
	bar.style.width = newWidth + "px";
	chart.appendChild(bar);

	// gets the info for the close data, represented on the graph as red
	resultsDiv.appendChild(chartDivClose);

	let chartClose = document.querySelector('#chart-location');
	let widthClose = tickerArray.tickerData.close;
	let barClose = document.createElement("div");

	barClose.classList.add("progression-bar-close");
	barClose.textContent = 'Close: ' + tickerArray.tickerData.close;

	if (highestNumClose < widthClose) {
		highestNumClose = widthClose;
		console.log('highest:', highestNumClose)
	}
	let newWidthClose = (tickerArray.tickerData.close / highestNumClose) * 200
	barClose.style.width = newWidthClose + "px";
	chartClose.appendChild(barClose);
}

