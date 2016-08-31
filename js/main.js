/*$(document).on("click", ".navbar-brand", function(){
    swal({
        title: "Error!",
        text: "Here's my error message!",
        type: "error",
        confirmButtonText: "Cool"
    });
});*/

$(document).on("click", "#linkCompanies", function(){
    $("#wdw-companies").show();
    $("#wdw-users").hide();
});

$(document).on("click", "#linkUsers", function(){
    $("#wdw-companies").hide();
    $("#wdw-users").show();
});

$(document).on("click", "#lblCompanies tr", function(){
    showEditableData(this);
});

$(document).on("click", "#submitEditableCompanyData", function(){
    submitEditableData();
})

$(document).on("click", "#modalCompaniesClose", function(){
    $("#modalCompanies").hide();
    showCompanyList();
});

// END OF EVENTS

// unique ID
// var iUniquieId = new Date().getTime();

var aCompanies = [];
var aUsers = [];

if( localStorage.sCompanies ){
    var sCompaniesFromLocalStorage = localStorage.sCompanies;
    aCompanies = JSON.parse( sCompaniesFromLocalStorage );
}

if( localStorage.sUsers ){
    var sUsersFromLocalStorage = localStorage.sUsers;
    aUsers = JSON.parse( sUsersFromLocalStorage );
}

function showCompanyList(){
    $("#lblCompanies").empty();
    for( var i = 0; i < aCompanies.length; i++ ){
        // $("#lblCompanies").append( "<div>" + aCompanies[i].name + "</div>"   );
        $("#lblCompanies").append('<tr><th scope="row">'+aCompanies[i].id+'</th><td>'+aCompanies[i].name+'</td><td>'+aCompanies[i].price+'</td></tr>');
    }
}

showCompanyList();

for( var i = 0; i < aUsers.length; i++ ){
    // $("#lblCompanies").append( "<div>" + aCompanies[i].name + "</div>"   );
    $("#lblUsers").append('<tr><th scope="row">'+aUsers[i].id+'</th><td>'+aUsers[i].name+'</td><td>'+aUsers[i].lastName+'</td></tr>');
}

// Sweetalert - swal
var iId = 0;
var sName = "";
var iPrice = 0;

function showEditableData(oElement){
    var aClickedData = [];
    $("#modalCompanies .modal-body #lblEditableCompaniesModal").empty();
    $("#modalCompanies").show();
    var result = $(oElement).each(function(){
        //console.log($(this));
        aClickedData.push($(this));
        //console.log($(this).text());
        iId = Number($(this).children("th:nth-child(1)").text());
        sName = $(this).children("td:nth-child(2)").text();
        iPrice = Number($(this).children("td:nth-child(3)").text());
        console.log("ID: "+iId+". Name: "+sName+". Price: "+iPrice+".");
    });

    $("#modalCompanies .modal-body #lblEditableCompaniesModal").append('<tr><td><input type="text" value="'+sName+'"></td><td><input type="text" value="'+iPrice+'"></td>'+'<td><i data-iCompanyId="+aCompanies[i].iCompanyId+" class="fa fa-trash-o fa-fw"></i></td></tr>');
}

function submitEditableData(){
    for(var i = 0; i < aCompanies.length; i++){
        if(aCompanies[i].id == iId){
            $("#modalCompanies .modal-body #lblEditableCompaniesModal tr").each(function(){
                sName = $(this).children("td:nth-child(1)").children().val();
                iPrice = Number($(this).children("td:nth-child(2)").children().val());
                console.log("Name: "+sName+". Price: "+iPrice+".");
                aCompanies[i].name = sName;
                //aCompanies[i].id = iId;
                aCompanies[i].price = iPrice;
            });
        }
    }
    updateLocal = JSON.stringify(aCompanies);
    localStorage.sCompanies = updateLocal;
}



$("#btnAddCompany").click(function(){
    var sCompanyId = new Date().getTime();
    var sCompanyName = $("#txtCompanyName").val();
    var sCompanyPrice = $("#txtCompanyPrice").val();

    $("#lblCompanies").append('<tr><th scope="row">'+sCompanyId+'</th><td>'+sCompanyName+'</td><td>'+sCompanyPrice+'</td>'+'<td><i data-iCompanyId="+aCompanies[i].iCompanyId+" class="fa fa-trash-o fa-fw"></i></td></tr>');

    var jCompany = {};
    jCompany.id = new Date().getTime();
    jCompany.name = sCompanyName;
    jCompany.price = sCompanyPrice;
    aCompanies.push( jCompany );
    console.log( aCompanies );
    // Save to the localStorage
    var sFinalCompanies = JSON.stringify( aCompanies );
    // Save/update the sCompanies in localStorage
    localStorage.sCompanies = sFinalCompanies;
});

$("#btnAddUser").click(function(){
    var sUserId = new Date().getTime();
    var sUserName = $("#txtUserName").val();
    var sUserLastName = $("#txtUserLastName").val();

    $("#lblUsers").append('<tr><th scope="row">'+sUserId+'</th><td>'+sUserName+'</td><td>'+sUserLastName+'</td></tr>');

    var jUser = {};
    jUser.id = new Date().getTime();
    jUser.name = sUserName;
    jUser.lastName = sUserLastName;
    aUsers.push( jUser );
    console.log( aUsers );
    // Save to the localStorage
    var sFinalUsers = JSON.stringify( aUsers );
    // Save/update the sCompanies in localStorage
    localStorage.sUsers = sFinalUsers;
});

$("#txtSearch").keyup(function(){
    // console.log("x");
    var sSearchFor = $(this).val();
    console.log(sSearchFor);

    $( "#lblCompanies").children("tr").children("td:nth-of-type(1)").each(function(){
        // console.log( $(this).text() ); // Mark, Jakob
        var sCompareTo = $(this).text();
        if(sSearchFor == sCompareTo){
            $(this).parent().css("background-color","yellow");
        }else{
            $(this).parent().css("background-color","white");
        }
    });
});

$("#txtSearchUsers").keyup(function(){
    // console.log("x");
    var sSearchFor = $(this).val();
    console.log(sSearchFor);

    $( "#lblUsers").children("tr").children("td:nth-of-type(1)").each(function(){
        // console.log( $(this).text() ); // Mark, Jakob
        var sCompareTo = $(this).text();
        if(sSearchFor == sCompareTo){
            $(this).parent().css("background-color","yellow");
        }else{
            $(this).parent().css("background-color","white");
        }
    });
});

