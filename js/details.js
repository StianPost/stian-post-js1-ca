// get the query string
const queryString = document.location.search;
// create an object that will allows us to access all the query string parameters
const params = new URLSearchParams(queryString);
// get the id parameter from the query string
const id = params.get('id');

const loading = document.querySelector('.loading');

async function getCoin(coinID) {
  try {
    const response = await fetch(
      'https://api.coinlore.net/api/ticker/?id=' + coinID
    );
    const result = await response.json();
    loading.innerHTML = '';
    document.querySelector('.singleCoin').style.display = 'block';
    result.forEach((element) => {
      document.title = element.name;
      document.querySelector('.singleCoin').innerHTML = `
        <h1> ${element.name}</h1>
        <p>${element.symbol}</p>
        <p>Rank: ${element.rank}</p>
        <p>Price USD: ${element.price_usd}</p>
        <p>Price BTC: ${element.price_btc}</p>
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
getCoin(id);
