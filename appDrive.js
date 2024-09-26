// Informații necesare pentru autentificare
var CLIENT_ID = 'Y393599029680-1lhmu0dkdeu0u53ae03crv5v7g7upr9j.apps.googleusercontent.com'; // Înlocuiește cu client_id-ul tău
var API_KEY = 'AIzaSyBOB4cDdP0HgnEDt-OCPoxaft4MCwAPp-k'; // Înlocuiește cu API key-ul tău
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive.readonly';
var FOLDER_ID = '1B-lQqdcDwzQ59J422k1gyidzQJ6LPvAS'; // Înlocuiește cu ID-ul folderului din Google Drive

var authorizeButton = document.getElementById('auth-button');
var signoutButton = document.getElementById('signout-button');
var uploadButton = document.getElementById('upload-button');
var gallery = document.getElementById('gallery');

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        var authInstance = gapi.auth2.getAuthInstance();
        authInstance.isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(authInstance.isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
        uploadButton.onclick = listFiles;
    }).catch(function(error) {
        console.error('Error initializing Google API client:', error);
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        uploadButton.style.display = 'block';
        listFiles();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        uploadButton.style.display = 'none';
        gallery.innerHTML = '';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function listFiles() {
    console.log('Fetching files from Google Drive...');
    gapi.client.drive.files.list({
        'q': `'${FOLDER_ID}' in parents and mimeType contains 'image/'`,
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name, mimeType, webViewLink, webContentLink)"
    }).then(function(response) {
        var files = response.result.files;
        if (files && files.length > 0) {
            gallery.innerHTML = '';
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                gallery.innerHTML += '<img src="' + file.webContentLink + '" style="width:200px;margin:10px;">';
            }
        } else {
            gallery.innerHTML = 'Nu sunt fișiere disponibile în acest folder.';
        }
    }).catch(function(error) {
        console.error('Error fetching files:', error);
    });
}

// Încarcă clientul
handleClientLoad();
