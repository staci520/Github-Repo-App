'use strict';

//calls Github API to searh for user handle
function getUser(inputValue) {
    let sourceUrl = `https://api.github.com/users/${inputValue}/repos`
    console.log(sourceUrl);

    fetch(sourceUrl)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Oops! User not found.'));
}

//displays user repos
function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('#results-list').append(
            `<li>
                <h4><p>${responseJson[i].description}</p>
                <p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p></h4>
            </li>`)
    }
    $('#results').removeClass('hidden');
};

//watch form for submission
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const userSearch = $('#js-user-search').val();
        getUser(userSearch);
    });
}

$(function () {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});