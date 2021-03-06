var xhr = new XMLHttpRequest();
xhr.open('GET', url);
if (access_token) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
}
xhr.onload = function() {
    if (typeof callback === 'object') {
        invoke(callback, new List([xhr.responseText]));
    }
};
xhr.onerror = function(error) {
    if (typeof error_callback === 'object') {
        invoke(error_callback, new List([url + " error is " + error.message]));
    }
};
xhr.onloadend = function() {
    if (xhr.status >= 400) {
	invoke(error_callback, new List([url + " replied " + xhr.statusText]));
    } else if (xhr.status === 0) {
	invoke(error_callback, new List([url + " failed to load."]));
    }
};
xhr.send();
