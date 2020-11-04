  // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyD--76yByrIzYGqDkcCf9EnuRbUwP5yVwo",
    authDomain: "mathlab-dd587.firebaseapp.com",
    databaseURL: "https://mathlab-dd587.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
  };

  firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function get_data_test() {
    firebase.database().ref('users').once('value').then(function (snapshot) {
        // var values = snapshot.val();
        if(snapshot.exists()) {
            var content = '';
            snapshot.forEach(item => {
                console.log(item.val())
                    content +='<tr>';
                    content += '<td>' + item.val().name + '</td>';
                    content += '<td>' + item.val().tempoFase1 + '</td>';
                    content += '<td>' + item.val().fase2 + '</td>';
                    content += '<td>' + item.val().fase3 + '</td>';
                    content += '<td> None </td>';
    
                    content += '</tr>';
            });
            $('#users-table').append(content);
        }
    });
}

get_data_test();