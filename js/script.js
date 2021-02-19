const coinAPI = 'https://api.coinlore.net/api/tickers/';
const coinCointainer = document.querySelector('.coinContainer');
const loading = document.querySelector('.loading');
let count = 0;

async function getCoinAPI(url) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const resultArray = result.data;

    loading.innerHTML = '';
    resultArray.forEach((element) => {
      count++;
      let BGC = 'odd';
      if (count % 2 === 0) {
        BGC = 'even';
      }
      coinCointainer.innerHTML += `
        <div class="coinCard ${BGC}">
            <h2> ${element.name} </h2>
            <p>Price USD: ${element.price_usd}$</p>
            <a href="coinPage.html?id=${element.id}">Read More</a> 
        </div>
        `;
    });
  } catch (error) {
    console.log(error);
    document.querySelector('.alert').innerHTML = showAlertTouser(
      'An error occured',
      'danger'
    );
  } finally {
    setTimeout(function () {
      document.querySelector('.alert').innerHTML = '';
    }, 3000);
  }
}
getCoinAPI(coinAPI);
