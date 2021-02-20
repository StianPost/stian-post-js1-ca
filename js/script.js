const animeAPI =
  'https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=40';
const animeCardCointainer = document.querySelector('.animeCardContainer');
const loading = document.querySelector('.loading');

async function getAnimeAPI(url) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const resultArray = result.data;
    console.log(resultArray);
    loading.innerHTML = '';

    resultArray.forEach((element) => {
      let title = element.attributes.titles.en;

      if (!title) {
        title = element.attributes.titles.en_jp;
      }

      animeCardCointainer.innerHTML += `
        <div class="animeCard">
            <h2> ${title} </h2>
            <img src="${element.attributes.posterImage.small}" alt="${element.attributes.titles.en} Cover image" />
            <p>Rating: ${element.attributes.averageRating}/100</p>
            <p>Episodes: ${element.attributes.episodeCount}</p>
            <p>Type: ${element.attributes.subtype}</p>
            <p>Age Rating: ${element.attributes.ageRating}</p>
            <p> ${element.attributes.ageRatingGuide}</p>
            <a href="details.html?id=${element.id}">Read More</a> 
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
getAnimeAPI(animeAPI);
