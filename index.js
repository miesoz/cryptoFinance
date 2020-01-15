// doing stuff to the document when ti loads 
let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Coin in USD',
      data: [],
      fill: false,
      backgroundColor: ['rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)' ],
      borderWidth: 3
    }]
  },
  options: {
    responsive: true,
    hover: {
      mode: 'nearest',
      intersect: false
    },
    scales: {
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'USD'
        }
      }],
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }]
    },
  }
});
document.addEventListener('DOMContentLoaded', () => {
  let coinDict = {};
  //let myChart;
  build(coinDict);
  console.log(coinDict);
  //let xlabels = [];
  //let ydata = [];
  //getHistory(xlabels, ydata, "btc-bitcoin");
  const ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Coin in USD',
        data: [],
        fill: false,
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)' ],
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      hover: {
        mode: 'nearest',
        intersect: false
      },
      scales: {
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'USD'
          }
        }],
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        }]
      },
    }
  })
  //myChart = chartFirst(coinDict);
  //chartFirst(myChart, coinDict);
  //chartIt();


})

async function build(coinDict) {        //builds coin dictionary while simaltaneously dynamically populating the entries on the table and drop down menu.
  const response = await fetch('https://api.coinpaprika.com/v1/coins');
  const data = await response.json();
  // # = id .= class NOTHING = html tags
  let coinTickerResponse, coinTickerData;
  const table = document.querySelector('.tableData');
  const dropMenu = document.querySelector('.coins');
  for (let i = 0; i < 10; i++) {
    coinTickerResponse = await fetch(`https://api.coinpaprika.com/v1/tickers/${data[i].id}`);
    coinTickerData = await coinTickerResponse.json();
    coinDict[data[i].rank] = coinTickerData;
    table.innerHTML += `<tr><td>${coinDict[data[i].rank].name}</td>` + `<td>${coinDict[data[i].rank].quotes.USD.price}</td>` + `<td>${coinDict[data[i].rank].quotes.USD.percent_change_24h}</td>` + `<td>${coinDict[data[i].rank].quotes.USD.market_cap}</td>` + '</tr';
    dropMenu.innerHTML += '<option value="' + coinDict[data[i].rank].id + '">' + coinDict[data[i].rank].id + '</option>';
  }
}

var plot = function(e){
  if (e.value != "Select a Coin to Plot"){
    chartIt(e.value);
  }
}

//const clicky = (event, name) => {
//  document.addEventListener("click", (event) => {

    //let timeThing;
    // console.log(event.target.previousElementSibling)
   // if (event.target.className === "date") {
      // Do some validation what if I put penis inside date input field
  //    const inputDate = event.target.previousElementSibling;
  //    const coinOption = document.querySelector(".coins");
    //  const inputCoin = coinOption.value;
      // console.log(Date());
     // timeThing = inputDate.value;

      //getHistory(inputCoin, timeThing);
//    }
//  }) 
//}

async function getHistory(xlabels, ydata, coinID) { 
  const firstTrade = await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`)
  const firstTradeData = await firstTrade.json();
  const tickerFetch = await fetch(`https://api.coinpaprika.com/v1/tickers/${firstTradeData.id}/historical?start=${firstTradeData.started_at}&interval=7d`);
  const history = await tickerFetch.json();
  for (var date in history){
    xlabels.push(history[date].timestamp.substring(0,10));
    ydata.push(history[date].price);
  }
}

//var chartFirst = async (coinDict) => {
//  let xlabels = [];
//  let ydata = [];
 // await getHistory(xlabels, ydata, coinDict[1]);
 // const ctx = document.getElementById('myChart').getContext('2d');
  //console.log(xlabels);
  //console.log(ydata);
  //myChart = new Chart(ctx, {
   // type: 'line',
    //data: {
     // labels: xlabels,
      //datasets: [{
       // label: 'USD',
        //data: ydata,
        //fill: true,
       // backgroundColor: ['rgba(255, 99, 132, 0.2)'],
//        borderColor: ['rgba(255, 99, 132, 1)' ],
  //      borderWidth: 3
    //    
      //}]
   // },
    //options: {
     // responsive: true,
     // hover: {
      //  mode: 'nearest',
       // intersect: false
      //},
      //scales: {
       // yAxes: [{
       //   display: true,
        //  scaleLabel: {
         //   display: true,
          //  labelString: 'USD'
          //}
        //}],
       // xAxes: [{
       //   display: true,
        //  scaleLabel: {
         //   display: true,
          //  labelString: 'Date'
          //}
        //}]
      //},
    //}
  //})
  //return myChart;
//}
function removeData(myChart) {
  myChart.data.labels.pop();
  myChart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  myChart.update();
}

function addData(myChart, labels, data) {
  console.log(labels);
  myChart.data.labels = labels;
  //console.log(myChart.data.datasets.data);
  myChart.data.datasets[0].data = data;
  //myChart.data.datasets.forEach((dataset) => {
  //  dataset.data.push(data);
  //});
  myChart.update();
  console.log(myChart);
}

async function chartIt(coinID) {
  //await resetCanvas();
  console.log(coinID);
  //removeData(myChart);
  let xlabels = [];
  let ydata = [];
  await getHistory(xlabels, ydata, coinID);
  //const ctx = document.getElementById('myChart').getContext('2d');
  console.log(xlabels);
  console.log(ydata);
  addData(myChart, xlabels, ydata);
}