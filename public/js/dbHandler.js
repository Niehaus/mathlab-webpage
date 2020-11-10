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
        if (snapshot.exists()) {
            let content = '';
            const max_value_stage = [100000000, -1, -1]
            const max_value_stage_name = ["", "", ""]
            const list_cells = []

            const complete_game = '<i class="fas fa-brain"></i>' // Complete all game
            const best_time = '<i class="fas fa-user-ninja"></i>' // Best time fase1
            const best_point2 = '<i class="fab fa-medapps"></i>' // Best score fase2
            const best_point3 = '<i class="fas fa-medal"></i>' // Beste score fase3

            let id = 0
            snapshot.forEach(item => {
                if (item.val().name != undefined) {
                    let values = {
                        'id': id,
                        'name': item.val().name,
                        'fase1': item.val().tempoFase1,
                        'fase2': item.val().fase2,
                        'fase3': item.val().fase3,
                        'medals': ''
                    }

                    if (values.fase1 < max_value_stage[0]) {
                        max_value_stage[0] = values.fase1
                        max_value_stage_name[0] = values.id
                    }
                    if (values.fase2 > max_value_stage[1]) {
                        max_value_stage[1] = values.fase2
                        max_value_stage_name[1] = values.id
                    }
                    if (values.fase3 > max_value_stage[2]) {
                        max_value_stage[2] = values.fase3
                        max_value_stage_name[2] = values.id
                    }
                    list_cells.push(values)
                    id += 1
                }
            });

            list_cells.forEach(cell => {
                if (cell.fase1 > 0 && cell.fase2 > 0 && cell.fase3 > 0) {
                    cell.medals += complete_game
                }
                if (cell.id == max_value_stage_name[0]) {
                    cell.medals += ' ' + best_time
                }
                if (cell.id == max_value_stage_name[1]) {
                    cell.medals += ' ' + best_point2
                }
                if (cell.id == max_value_stage_name[2]) {
                    cell.medals += ' ' + best_point3
                }

                content += '<tr>';
                content += '<td>' + cell.name + '</td>';
                content += '<td>' + cell.fase1 + '</td>';
                content += '<td>' + cell.fase2 + '</td>';
                content += '<td>' + cell.fase3 + '</td>';
                content += '<td>' + cell.medals + '</td>';

                content += '</tr>';
            })

            $('#users-table').append(content);
        }
    });
}

get_data_test();