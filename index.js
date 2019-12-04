// doing stuff to the document when ti loads 
document.addEventListener('DOMContentLoaded', () => {
  // Call the function to get api data and populate
  const coinID = [];
  getCoins(coinID);
  clicky(event, coinID)
})

const getPrice = async (coin_id) => {
  let coinList = document.querySelector('.coin-list');
  let response = await fetch(`https://api.coinpaprika.com/v1/coins/${coin_id}/ohlcv/today/`);
  let data = await response.json();
  // console.log(data[0].close);
  coinList.innerHTML += `<li>${data[0].close}</li>`;
}

// Print everything at the same time

const getCoins = async (coinID) => {
  const response = await fetch('https://api.coinpaprika.com/v1/coins');
  const data = await response.json();
  // # = id .= class NOTHING = html tags
  let coinList = document.querySelector('.coin-list');
  // Grabs the ul with class of coin-list
  for (let i = 0; i < 10; i++) {
    coinID.push(data[i].id);
    coinList.innerHTML += `<li>${data[i].name + ': ' + data[i].id}</li>`;
    // Will be literals of string instead of variable value
    // getPrice(data[i].id);

  }
  
  for (let j = 0; j < 10; j++) {
    // console.log(coinID[j]);
    getPrice(coinID[j]);
    // getHistory(coinID[j], "2019-11-29");
  }
  // console.log(coinID);

}


const getHistory = async (coin, date) => {
  // console.log(coinArray);
  let historyList = document.querySelector('.history-list');
  let response = await fetch(`https://api.coinpaprika.com/v1/tickers/${coin}/historical?start=${date}&interval=1h`);
  let data = await response.json();
  for (let i = 0; i < data.length; i++) {
    historyList.innerHTML += `<li>${data[i].price}</li>`;
  }
}



// Starting from input date to Date()
const clicky = (event, coinID) => {
  document.addEventListener("click", (event) => {

    let timeThing
    // console.log(event.target.previousElementSibling)
    if (event.target.className === "date") {
      // Do some validation what if I put penis inside date input field
      const inputDate = event.target.previousElementSibling
      const coinOption = document.querySelector(".coins")
      const inputCoin = coinOption.value
      // console.log(Date())
      timeThing = inputDate.value

      getHistory(inputCoin, timeThing)
    }
  }) 
}

// CHART STUFF IF YOU WANT OT USE CHART.JS
// ELSE LOOK UP D3 CAUSE ITS HOT AND HARD
// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   }
// });