function GetDataAjax(url, async, success, error) {
    $.ajax({
        type: "GET",
        datatype: "JSON",
        url: url,
        async: async,
        crossDomain: true,
        success: success,
        error: error
    });
}