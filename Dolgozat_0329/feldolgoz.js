$(document).ready(function() {
    $('#terulet').ready(beolvas);
    $('#add').on("click", hozzaad);
});

var todoLista = []; 

function beolvas() {
    $.ajax({
        type: "GET",
        url: "feldolgoz.php",
        success: function (result) {
            console.log(result);
            todoLista = JSON.parse(result);
            console.log(todoLista);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok betoltésekor");
        }
    });
}

function kiir(){
    for (var i = 0; i < todoLista.length; i++) {
        var ID = todoLista[i].ID;
        var todo = todoLista[i].todo;
        var datum = todoLista[i].datum;
        var allapot = todoLista[i].allapot;
        var elem = "<ul><li>" + ID + "</li><li>" + todo + "</li><li>" + datum + "</li><li>" + allapot + "</li></ul>";
        $("terulet").html(elem);
    }
}
    
    
function hozzaad() {
    var todoElem = {
            ID: 3,
            todo: $("#todo").val(),
            datum: $("#datum").val(),
            allapot: 0
    };
    
    $.ajax({
        type: "POST",
        url: "beir.php",
        data: todoElem,
        success: function (todoElem) {
            console.log(todoElem);
            todoLista.push(JSON.parse(todoElem));
            console.log(todoLista);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok mentésekor");
        }
    });
}
