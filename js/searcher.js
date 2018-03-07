$("#search").on("click", function() {
    callSolr();
});
$("#searchForm").submit(function() {
    callSolr();
    return false;
});
function callSolr() {
    console.log("Buscando "+  $("#valuetosearch").val()+"...");
    var select;
    if($("#valuetosearch").val()=="")
        select = "*"
    else
        select = $("#valuetosearch").val();

    $.ajax({
        method: "GET",
        url: "http://localhost:8983/solr/localDocs/select",
        data: {q: select},
        dataType: "jsonp",
        jsonp: 'json.wrf'
        //contentType: 'application/json; charset=utf-8'
    }).done(function(data) {
        convertSolrData(data);
    }).fail(function(data) {
        alert("error");
    });
}

function convertSolrData(dataAjax) {
    $("#results").empty();
    $("#results").append("<p>Number of results: "+dataAjax.response.numFound+"</p>");
    var div;

    $.each(dataAjax.response.docs, function( key, value ) {
        div = "<div style='padding:10px 5px;'>"+
            "<p>Nombre: "+value.id+"</p>"+
            "<p>Tipo: "+value.content_type+"</p>"+
            "<p>Fecha: "+value.date+"</p>"+
            "<p><a href=\""+value.resourcename+"\">Download</href></p>"+
            "</div>";
        $("#results").append(div);
    });
}