// get the query string
const queryString = document.location.search;
// create an object that will allows us to access all the query string parameters
const params = new URLSearchParams(queryString);
// get the id parameter from the query string
const id = params.get('id');
const animeDiv = document.querySelector('.animeDiv');

const loading = document.querySelector('.loading');

async function getAnime(animeID) {
  try {
    const response = await fetch('https://kitsu.io/api/edge/anime/' + animeID);
    const result = await response.json();
    const anime = result.data;
    loading.innerHTML = '';
    console.log(anime);
    let title = anime.attributes.titles.en;
    if (!title) {
      title = anime.attributes.titles.en_jp;
    }
    document.title = title;

    animeDiv.innerHTML = `
      <h1>${title}</h1>
      <img src="${anime.attributes.posterImage.small}" alt="${anime.attributes.titles.en} Cover image" />
      <p>Rating: ${anime.attributes.averageRating}/100</p>
      <p>Episodes: ${anime.attributes.episodeCount}</p>
      <p>Type: ${anime.attributes.subtype}</p>
      <p>Age Rating: ${anime.attributes.ageRating}</p>
      <p> ${anime.attributes.ageRatingGuide}</p>
      <p>Synopsis: ${anime.attributes.synopsis} </p>
    `;
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
getAnime(id);
