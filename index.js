const myAPI = 'qKIlZI0GxfxrjDYmAMkW7y2z41L1ZFuMlp7l7HOQ';
const base_url = 'developer.nps.gov/api/v1';


function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => ``);

}


function displayNationalParks(query, maxResults=10) {
  const params = {
    key: myAPI,
    q: query,
    maxResults,
    type: ''
  };
  const queryString = formatQueryParams(params)
  const url = base_url + '?' + queryString;
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    displayNationalParks(searchTerm, maxResults);
  });
}
  
$(watchForm);