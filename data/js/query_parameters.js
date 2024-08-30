/*
    Not really query parameters, but if a path
    is given, we will try to search/go for it.
    Ex: "https://bouillon.nopub.club/pain"
    */

const url_parameters = new URLSearchParams(window.location.search);
const user_query = url_parameters.get('q');
if (user_query !== null) {
    search_recipes(user_query,auto_display=true);
}
