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
              <img class="animeCardImg" src="${element.attributes.posterImage.original}" alt="${element.attributes.titles.en} Cover image" />
              <p><span>Rating: </span>${element.attributes.averageRating}/100</p>
              <p><span>Episodes: </span>${element.attributes.episodeCount}</p>
              <p><span>Type: </span>${element.attributes.subtype}</p>
              <p><span>Age Rating: </span>${element.attributes.ageRating}</p>
              <p>${element.attributes.ageRatingGuide}</p>
              <a href="details.html?id=${element.id}">
            <div class="animeCardLink">Read More</div>
            </a> 
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
