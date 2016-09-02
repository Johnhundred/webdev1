$(document).on("click", ".navbar-brand", function(){
    swal("About", "Stock Exchange Web Development project made by Johannes Otto Skjærbæk and Ralf Patrik Blaga.");
});

$(document).on("click", "#linkCompanies", function(){
    $("#wdw-companies").show();
    $("#wdw-users").hide();
});

$(document).on("click", "#linkUsers", function(){
    $("#wdw-companies").hide();
    $("#wdw-users").show();
});

$(document).on("click", "#lblCompanies tr td i.fa-pencil", function(){
    showEditableCompanyData(this);
});

$(document).on("click", "#submitEditableCompanyData", function(){
    submitEditableCompanyData();
});

/*$(document).on("click", "#modalCompaniesClose", function(){
    $("#modalCompanies").hide();
    showCompanyList();
});*/

$(document).on("click", ".close", function(){
    $("#modalCompanies").hide();
    showCompanyList();
    $("#modalUsers").hide();
    showUserList();
});

$(document).on("click", "#lblUsers tr td i.fa-pencil", function(){
    showEditableUserData(this);
});

$(document).on("click", "#submitEditableUserData", function(){
    submitEditableUserData();
});

$(document).on("click", "ul.nav li a", function(){
    updateNavbarHighlight(this);
});

/*
$(document).on("click", "#modalUsersClose", function(){
    $("#modalUsers").hide();
    showUserList();
});
*/

setInterval(function(){
    if(aCompanies.length > 0){
        updateCompanyStockPrice();
        getTotalCompanyStockValue();
        drawBasic();
    }
}, 10000);

// END OF EVENTS

var aTotalStockValues = [];

function getTotalCompanyStockValue(){
    var fTempStockValues = 0;
    for(i = 0; i < aCompanies.length; i++){
        fTempStockValues += Number(aCompanies[i].price);
    }
    fTempStockValues = Number(fTempStockValues.toFixed(4));
    aTotalStockValues.push(fTempStockValues);
    //console.log(aTotalStockValues);
}

var iMaxGraphPoints = 51;

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Stock Market Value');

    var aTempArray = [];
    var aData = [];
    for(var i = 0; i < aTotalStockValues.length; i++){
        //console.log("x");
        aTempArray = [i, aTotalStockValues[i]];
        //console.log(aTemp);
        aData.push(aTempArray);
    }

    if(aData.length > iMaxGraphPoints){
        aTotalStockValues.splice(0, 1);
        aData.splice(0, 1);
        for(i = 0; i < aData.length; i++){
            aData[i][0] = aData[i][0] - 1;
        }
        //console.log(aData);
    }

    //console.log(aTest);

    data.addRows(aData);

    var options = {
        hAxis: {
            title: 'Time'
        },
        vAxis: {
            title: 'Stock Market Value'
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}

function updateNavbarHighlight(oElement){
    //console.log(oElement);
    $(oElement).parent().parent().children("li").each(function(){
        //console.log(this);
        $(this).removeClass("active");
    })
    $(oElement).parent().addClass("active");
}

var aStockStatus = [];

function updateCompanyStockPrice() {
    var fCurrentStockPrice, fNewStockPrice, jStockStatus = {};
    var fModifier = Math.random();
    fModifier = Number(fModifier.toFixed(4));
    aStockStatus = [];
    //console.log(fModifier);

    for(i = 0; i < aCompanies.length; i++){
        fCurrentStockPrice = Number(aCompanies[i].price);
        var fIndicator = Math.random();
        jStockStatus = {};
        if(fIndicator > 0.5){
            fNewStockPrice = fCurrentStockPrice - fModifier;
            //$('tr[data-companyId="'+aCompanies[i].id+'"]').children("td").children(".indicator");
            jStockStatus.status = 0;
            jStockStatus.id = aCompanies[i].id;
            jStockStatus.price = aCompanies[i].price;
            aStockStatus.push(jStockStatus);
            //console.log($('tr[data-companyId="'+aCompanies[i].id+'"]'));
        } else {
            fNewStockPrice = fCurrentStockPrice + fModifier;
            jStockStatus.status = 1;
            jStockStatus.id = aCompanies[i].id;
            jStockStatus.price = aCompanies[i].price;
            aStockStatus.push(jStockStatus);
        }
        aCompanies[i].price = fNewStockPrice.toFixed(4);
    }
    updateStockIndicator();
    updateLocal = JSON.stringify(aCompanies);
    localStorage.sCompanies = updateLocal;
}

function updateStockIndicator(){
    //console.log(aStockStatus);
    for(i = 0; i < aStockStatus.length; i++){
        //console.log(aStockStatus[i]);
        if(aStockStatus[i].status == 1){
            //console.log("1");
            $('tr[data-companyId="'+aStockStatus[i].id+'"]').children("td").children(".indicator").removeClass("fa-arrow-down").addClass("fa" + " fa-arrow-up").parent().children(".price").text(aStockStatus[i].price);
        } else if(aStockStatus[i].status == 0){
            //console.log("0");
            $('tr[data-companyId="'+aStockStatus[i].id+'"]').children("td").children(".indicator").removeClass("fa-arrow-up").addClass("fa fa-arrow-down").parent().children(".price").text(aStockStatus[i].price);
        }
    }
}

/*

Set interval every 1 second
Run function that:
Generates random number
Then:
Gets the current price of each stock
Saves it
Ramndomly adds or subtracts generated number to price
Based on if new number is higher or lower than older, set content of span to green/red

 */

// unique ID
// var iUniquieId = new Date().getTime();

var aCompanies = [{"id":1472754122074,"name":"Facebook","price":"17.1246"},{"id":1472754128096,"name":"Google","price":"29.4402"},{"id":1472754150849,"name":"Apple","price":"6.5615"},{"id":1472754157168,"name":"Tesla","price":"37.6602"},{"id":1472754167960,"name":"Lego","price":"58.6546"},{"id":1472754177717,"name":"Maersk","price":"69.3994"},{"id":1472754187676,"name":"NovoNordisk","price":"60.0476"},{"id":1472754195286,"name":"HTML24","price":"5.0973"},{"id":1472754200648,"name":"KEA","price":"20.7947"},{"id":1472754216416,"name":"Stromworks","price":"7.0688"},{"id":1472754252419,"name":"Cynapsus","price":"39.9761"},{"id":1472754264973,"name":"Stellar Acquisition","price":"28.8707"},{"id":1472754275303,"name":"Aquinox","price":"37.3311"},{"id":1472754287929,"name":"Airgain","price":"37.4499"},{"id":1472754300340,"name":"Medpace Holding","price":"21.6657"},{"id":1472754329854,"name":"Oxford Industries","price":"15.9587"},{"id":1472754338221,"name":"Vera Bradley","price":"11.5909"},{"id":1472754352391,"name":"Sirius XM","price":"42.2261"},{"id":1472754374798,"name":"Credit Suisse","price":"71.4816"},{"id":1472754387270,"name":"Campbell","price":"25.1943"}];
var aUsers = [{"id":1472754552962,"name":"John","lastName":"Johnson"},{"id":1472754561590,"name":"Johannes","lastName":"Otto"},{"id":1472754566649,"name":"Ralf","lastName":"Blaga"},{"id":1472754576683,"name":"Patrik","lastName":"Blaga"},{"id":1472754582916,"name":"Johannes","lastName":"Skjærbæk"},{"id":1472754592866,"name":"Nadia","lastName":"Nielsen"},{"id":1472754600298,"name":"Linn","lastName":"Nang"},{"id":1472754656545,"name":"Amelia","lastName":"P"},{"id":1472754664113,"name":"Anna","lastName":"Johansson"},{"id":1472754669196,"name":"Jens","lastName":"Jensen"},{"id":1472754675702,"name":"Hans","lastName":"Larsen"},{"id":1472754681391,"name":"Santiago","lastName":"Donoso"},{"id":1472754691071,"name":"Kevin","lastName":"Smith"},{"id":1472754711017,"name":"Lorenzo","lastName":"Medici"},{"id":1472754719269,"name":"Leonardo","lastName":"DaVinci"},{"id":1472754728805,"name":"Dave","lastName":"Rapoza"},{"id":1472754737093,"name":"Noah","lastName":"Bradley"}];

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
        var fPrice = Number(aCompanies[i].price);
        fPrice = fPrice.toFixed(4);
        // $("#lblCompanies").append( "<div>" + aCompanies[i].name + "</div>"   );
        $("#lblCompanies").append('<tr data-companyId="'+aCompanies[i].id+'"><th scope="row">'+aCompanies[i].id+'</th><td>'+aCompanies[i].name+'</td><td><span class="indicator"></span><span class="price">'+fPrice+'</span></td><td><i class="fa fa-pencil" aria-hidden="true"></i></td><td><i data-iCompanyId="'+aCompanies[i].id+'" class="fa fa-trash-o fa-fw"></i></td></tr>');
    }
}

function showUserList(){
    $("#lblUsers").empty();
    for( var i = 0; i < aUsers.length; i++ ){
        // $("#lblCompanies").append( "<div>" + aCompanies[i].name + "</div>"   );
        $("#lblUsers").append('<tr><th scope="row">'+aUsers[i].id+'</th><td>'+aUsers[i].name+'</td><td>'+aUsers[i].lastName+'</td><td><i class="fa fa-pencil" aria-hidden="true"></i></td><td><i data-iUserId="'+aUsers[i].id+'" class="fa fa-trash-o fa-fw"></i></td></tr>');
    }
}

showCompanyList();
showUserList();

// Sweetalert - swal
var iId = 0;
var sName = "";
var iPrice = 0;

function showEditableCompanyData(oElement){
    var aClickedData = [];
    $("#modalCompanies .modal-body #lblEditableCompaniesModal").empty();
    $("#modalCompanies").show();
    var result = $(oElement).parent().parent().each(function(){
        //console.log($(this));
        aClickedData.push($(this));
        //console.log($(this).text());
        iId = Number($(this).children("th:nth-child(1)").text());
        sName = $(this).children("td:nth-child(2)").text();
        iPrice = Number($(this).children("td:nth-child(3)").text());
        //console.log("ID: "+iId+". Name: "+sName+". Price: "+iPrice+".");
    });

    $("#modalCompanies .modal-body #lblEditableCompaniesModal").append('<tr><td><input type="text" value="'+sName+'"></td><td><input type="text" value="'+iPrice+'"></td></tr>');
}

function submitEditableCompanyData(){
    for(var i = 0; i < aCompanies.length; i++){
        if(aCompanies[i].id == iId){
            $("#modalCompanies .modal-body #lblEditableCompaniesModal tr").each(function(){
                sName = $(this).children("td:nth-child(1)").children().val();
                iPrice = Number($(this).children("td:nth-child(2)").children().val());
                //console.log("Name: "+sName+". Price: "+iPrice+".");
                aCompanies[i].name = sName;
                //aCompanies[i].id = iId;
                aCompanies[i].price = iPrice;
            });
        }
    }
    updateLocal = JSON.stringify(aCompanies);
    localStorage.sCompanies = updateLocal;
}

function showEditableUserData(oElement){
    var aClickedData = [];
    $("#modalUsers .modal-body #lblEditableUsersModal").empty();
    $("#modalUsers").show();
    var result = $(oElement).parent().parent().each(function(){
        //console.log($(this));
        aClickedData.push($(this));
        //console.log($(this).text());
        iId = Number($(this).children("th:nth-child(1)").text());
        sName = $(this).children("td:nth-child(2)").text();
        sLastName = $(this).children("td:nth-child(3)").text();
        console.log("ID: "+iId+". Name: "+sName+". Last Name: "+sLastName+".");
    });

    $("#modalUsers .modal-body #lblEditableUsersModal").append('<tr><td><input type="text" value="'+sName+'"></td><td><input type="text" value="'+sLastName+'"></td></tr>');
}

function submitEditableUserData(){
    for(var i = 0; i < aUsers.length; i++){
        if(aUsers[i].id == iId){
            $("#modalUsers .modal-body #lblEditableUsersModal tr").each(function(){
                sName = $(this).children("td:nth-child(1)").children().val();
                sLastName = $(this).children("td:nth-child(2)").children().val();
                console.log("Name: "+sName+". Last Name: "+sLastName+".");
                aUsers[i].name = sName;
                //aCompanies[i].id = iId;
                aUsers[i].lastName = sLastName;
            });
        }
    }
    updateLocal = JSON.stringify(aUsers);
    localStorage.sUsers = updateLocal;
}



$("#btnAddCompany").click(function(){
    var sCompanyId = new Date().getTime();
    var sCompanyName = $("#txtCompanyName").val();
    var sCompanyPrice = $("#txtCompanyPrice").val();

    $("#lblCompanies").append('<tr data-companyId="'+sCompanyId+'"><th scope="row">'+sCompanyId+'</th><td>'+sCompanyName+'</td><td><span class="indicator fa"></span><span class="price">'+sCompanyPrice+'</span></td><td><i class="fa fa-pencil" aria-hidden="true"></i></td><td><i data-iCompanyId="'+sCompanyId+'" class="fa fa-trash-o fa-fw"></i></td></tr>');

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

    $("#lblUsers").append('<tr><th scope="row">'+sUserId+'</th><td>'+sUserName+'</td><td>'+sUserLastName+'</td><td><i class="fa fa-pencil" aria-hidden="true"></i></td><td><i data-iUserId="'+sUserId+'" class="fa fa-trash-o fa-fw"></i></td></tr>');

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

$(document).on("click", "#lblCompanies tr td i.fa-trash-o", function (){
    // console.log ("XXXX");
    var nCompaniesId = $(this).attr("data-icompanyid");
    // console.log (nCompaniesId);
    for(var i = 0; i < aCompanies.length; i++){
        if(aCompanies[i].id == nCompaniesId){
            // console.log ("MATCH!");
            $(this).parent().parent().empty();
            aCompanies.splice(i, 1);
        }
    }
    updateLocal = JSON.stringify(aCompanies);
    localStorage.sCompanies = updateLocal;
    showCompanyList();
});

$(document).on("click", "#lblUsers tr td i.fa-trash-o", function (){
    // console.log ("XXXX");
    var nUsersId = $(this).attr("data-iUserId");
    // console.log (nUsersId);
    for(var i = 0; i < aUsers.length; i++){
        if(aUsers[i].id == nUsersId){
            // console.log ("MATCH!");
            $(this).parent().parent().empty();
            aUsers.splice(i, 1);
        }
    }
    updateLocal = JSON.stringify(aUsers);
    localStorage.sUsers = updateLocal;
    showUserList();
});


