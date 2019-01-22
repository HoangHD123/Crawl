function changeSrcIframe() {
    //var node = document.createElement("body");
    //var textnode = document.createTextNode("<script type='text/javascript' src='inIframe.js'></script>");
    //node.appendChild(textnode);
    $("#crawData").attr("src", "/Home/Crawl?url=" + $("#linkcrawl").val());
}
function changeAttrType() {
    $(".valueOption").remove();
    $('.selectAttributeCss').remove();
    var type = $("#Type").val();

    switch (type) {
        case '3':
            $(".form-control.typedata").prepend("<option class='valueOption' value='id'>ID</option>");
            $(".form-control.typedata").val("id");
            $("#labelName").html("Nhập Regex lấy ID của bài viết:");
            $('.allPropperty').attr("disabled", "disabled");
            $("#myCssSelectorTest").val("\\d+.htm$");
            break;
        case '0':
            $(".form-control.typedata").prepend("<option class='valueOption' value='keywords'>Keywords</option>");
            $(".form-control.typedata").prepend("<option class='valueOption' value='tags'>Tags</option>");
            $(".form-control.typedata").prepend("<option class='valueOption' value='news_relate'>News Relate</option>");
            $(".form-control.typedata").prepend("<option class='valueOption' value='content_path'>Content path</option>");
            $(".form-control.typedata").prepend("<option class='valueOption' value='time_path'>Time path</option>");
            $(".form-control.typedata").prepend("<option class='valueOption' value='categories'>Categories</option>");
            $(".form-control.typedata").prepend("<option class='valueOption' value='meta_description'>Meta description</option>");
            $(".form-control.typedata").prepend("<option class='valueOption' value='title_path'>Title path</option>");
            $(".form-control.typedata").val("title_path");
            $("#labelName").html("Nhập bộ chọn Css:");
            $('.allPropperty').removeAttr("disabled");
            break;
        default:
            $(".form-control.typedata").prepend("<option class='valueOption' value='link'>Link</option>");
            $(".form-control.typedata").val("link");
            $('.form-control.attribute').append("<option class='selectAttributeCss' value='href'>Href</option>");
            $("#labelName").html("Nhập bộ chọn Css:");
            $('.allPropperty').removeAttr("disabled");
            break;

    }
}
