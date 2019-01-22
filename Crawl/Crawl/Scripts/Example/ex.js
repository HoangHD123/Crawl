var jsonGenerator = new Object();
var arr = ["_xpath", "_removeTags", "attr", "_transformations"];
var arr1 = ["_xpath", "_removeTags", "attr", "_transformations", "text", "link"];
var listTypeDate = ["title_path", "meta_description", "categories", "time_path", "content_path", "news_relate", "tags"];
var domain = "";
var type = 0;
var javascript = "";
var id = 0;
var urlMain = "";

//var urlIframe = location.origin + location.pathname.replace("/Crawl", "/html");
var urlIframe = location.origin + "/Home/html";

//Thay đổi url của iframe
function setUrl(e) {
    urlMain = e;
    $('#crawlDATA').one('load', function () {
        $(".typedata").change();
    });
}

// Bẳt sực kiện khi thay chọn một Type khác
$("#Type").change(function () {
    changeAttrType();
    funcionClick();
    if ($("#Type").val() == 3)
        $("#myCssSelectorTest").val("\\d+.htm$");
});

// Xóa thuộc tính của class .typedata. Thêm thuộc tính mới của loại đã chọn
// 0: Loại dữ liệu là trang chi tiết
// 1,2: Loại dữ liệu là link của link bài viết/link chủ đề
// 3: Cấu hình lấy ID của bài viết(nếu có)
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

// Reload loại iframe khi thay đổi Javascript:
$("#Javascript").change(function () {
    funcionClick();
});

function clickShowContent(e) {
    var list = new Array();
    $(".form-control.typedata option").each(function () {
        list.push($(this).val());
    });
    $("#typedata-difference").remove();
    var id = $(e).attr('id');
    if (list.indexOf(id) > -1) {
        $(".form-control.typedata").val(id);
        if (id == "difference") {
            $(".div-typedata").append("<input class='form-control ml-auto' placeholder='Nhập loại dữ liệu' id='typedata-difference' type='text'>");
            $("#typedata-difference").val(id);
        }
    } else {
        $(".form-control.typedata").val("difference");
        $(".div-typedata").append("<input class='form-control ml-auto' placeholder='Nhập loại dữ liệu' id='typedata-difference' type='text'>");
        $("#typedata-difference").val(id);
    }

    $("#myCssSelectorTest").val(jsonGenerator[id]._xpath);
    $(".form-control.exclude").remove();
    $(".input-group.entityproperty").remove();
    if (jsonGenerator[id]._removeTags != null) {
        jsonGenerator[id]._removeTags.forEach(function (e) {
            $(".form-group.exclude").append("<div class='input-group'><input value=\"" + e + "\" type=\"text\" class=\"form-control form-control-sm exclude\" style=\"margin-top:5px;\"><em onclick='deleteInput(this);' class='fas fa-trash-alt trash-delete'></em></div>");
        });
    }
    if (jsonGenerator[id]["_transformations"] != null) {
        Object.keys(jsonGenerator[id]["_transformations"][0]).forEach(function (k) {
            $(".form-group.property").append("<div id='" + k + "' class='input-group entityproperty'><input placeholder='Thuộc tính' type=\"text\" value='" + k + "' class=\"col-md-4 form-control form-control-sm\" disabled><input placeholder='Giá trị' type=\"text\" value='" + jsonGenerator[id]["_transformations"][0][k] + "' class=\"col-md-8 form-control form-control-sm\" ></div>");
        });
    }
    if (id == "tags" || id == "categories" && jsonGenerator[id].attr == "html") {
        $(".form-group.property").append("<div id='text' class='input-group entityproperty'><input placeholder='Thuộc tính' type=\"text\" value='link' class=\"col-md-4 form-control form-control-sm\" disabled><input placeholder='Giá trị' type=\"text\" value='" + jsonGenerator[id]["link"]["_xpath"] + "' class=\"col-md-8 form-control form-control-sm\" ></div>");
        $(".form-group.property").append("<div id='text' class='input-group entityproperty'><input placeholder='Thuộc tính' type=\"text\" value='text' class=\"col-md-4 form-control form-control-sm\" disabled><input placeholder='Giá trị' type=\"text\" value='" + jsonGenerator[id]["text"]["_xpath"] + "' class=\"col-md-8 form-control form-control-sm\" ></div>");
        Object.keys(jsonGenerator[id]).forEach(function (k) {
            if (arr1.indexOf(k) == -1) {
                $(".form-group.property").append("<div class='input-group entityproperty'><input placeholder='Thuộc tính' type=\"text\" value=\"" + k + "\" class=\"col-md-4 form-control form-control-sm\" ><input placeholder='Giá trị' type=\"text\" value=\"" + jsonGenerator[id][k] + "\" class=\"col-md-8 form-control form-control-sm\" ><em onclick='deleteInput(this);' class='fas fa-trash-alt trash-delete-all'></em></div>");
            }
        });
    }
    else if (id == "link") {
        $('.selectAttributeCss').remove();
        $('.form-control.attribute').append("<option class='selectAttributeCss' value='href'>Href</option>");
    }
    else
        Object.keys(jsonGenerator[id]).forEach(function (k) {
            if (arr.indexOf(k) == -1) {
                $(".form-group.property").append("<div class='input-group entityproperty'><input placeholder='Thuộc tính' type=\"text\" value=\"" + k + "\" class=\"col-md-4 form-control form-control-sm\" ><input placeholder='Giá trị' type=\"text\" value=\"" + jsonGenerator[id][k] + "\" class=\"col-md-8 form-control form-control-sm\" ><em onclick='deleteInput(this);' class='fas fa-trash-alt trash-delete-all'></em></div>");
            }
        });
    $("#createTableJson").html("Cập nhật");
    $("#createTableJson").attr("onclick", "updateTable();");
    if ($("#Type").val() == 0)
        changeAttr(jsonGenerator[id]._xpath);
    $(".form-control.attribute").val(jsonGenerator[id].attr);
    getContent(false);
};

function updateTable() {
    var radio = $(".form-control.typedata").val();
    if (radio == "difference") {
        radio = $("#typedata-difference").val();
    }
    if (radio != null && radio.trim() != "") {
        delete jsonGenerator[radio];
        setNewType(radio);
        //$(".form-control.typedata").removeAttr('disabled');
        //$("#typedata-difference").removeAttr('disabled');
        //$("#createTableJson").html("Tạo");
        //$("#createTableJson").attr("onclick", "createTable();");
        $(".typedata").change();
    } else
        alert("Loại dữ liệu không được bỏ trống");
}
function cancelTable() {
    $("#ListData #" + $(".typedata").val()).click();
}

function convertData(e) {
    jsonGenerator = JSON.parse(e);
    Object.keys(jsonGenerator).forEach(function (k) {
        jsonGenerator[k].attr = jsonGenerator[k]._xpath.split("/@")[1];
        jsonGenerator[k]._xpath = jsonGenerator[k]._xpath.split("/@")[0];
        var div = "<tr><td class='col-md-11 myHover' onclick='clickShowContent(this);'  id='" + k + "'>" + k;
        div += "</td><td class='col-md-1'><i class='fa fa-trash' aria-hidden='true' data-toggle='tooltip' title='Xóa!' onclick='funcionRemove($(this));'></i></td></tr>";
        $("#ListData tbody").append(div);
    });

    if (jsonGenerator["time_path"] != null && jsonGenerator["time_path"]["_transformations"] != null)
        delete jsonGenerator["time_path"]["_transformations"][0]._type;
}

function parseData() {
    var json = clone(jsonGenerator);
    Object.keys(json).forEach(function (k) {
        //if (json[k].attr != "html")
        json[k]._xpath += "/@" + json[k].attr;
        delete json[k].attr;
    });
    if (json["time_path"] != null) {
        if (json["time_path"]["_transformations"] != null)
            json["time_path"]["_transformations"][0]._type = "DateTimeTransformation";
    }
    return json;
}

function editJson() {
    $('#myModal').modal();
}

$('.tooltip1').tooltip();
var iframe = $("#crawlDATA");
$("#meataData").keyup(function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        funcionClick();
    }
});

$.fn.xpathEvaluate = function (xpathExpression) {
    $this = this.first();
    xpathResult = this[0].evaluate(xpathExpression, this[0], null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    result = [];
    while (elem = xpathResult.iterateNext()) {
        result.push(elem);
    }
    $result = jQuery([]).pushStack(result);
    return $result;
}

function getContent(isChange) {
    if (isChange && $("#Type").val() == 0) {
        var value = $(".attribute").val();
        changeAttr($("#myCssSelectorTest").val());
        $(".attribute").val(value);
    }
    iframe.contents().find("#divShowInfoTag").hide();
    var value = $("#myCssSelectorTest").val();
    iframe.contents().find(".myClass").removeClass("myClass");
    //var xpath = iframe.contents().xpathEvaluate(value);
    try {
        var xpath = $(value, iframe.contents());
        xpath.addClass("myClass");
        var attr = $(".form-control.attribute").find(":selected").val();
        var content = "";
        if (attr != null) {
            if (attr == 'html' || attr == 'text')
                content = iframe.contents().find(".myClass").html();
            else
                content = iframe.contents().find(".myClass").attr(attr);
        }
        $("#myContentValue").val(content);
    } catch (err) {
        console.log(err)
    }
}


$("#myCssSelectorTest").change(function () {
    getContent(true);
    $(this).val($(this).val().trim());
});

function changeAttr(value) {
    //var xpath = iframe.contents().xpathEvaluate(value);
    var xpath = $(value, iframe.contents());
    $('.selectAttributeCss').remove();
    var tailieu = $('.form-control.attribute');
    var value = "";
    xpath.first().each(function () {
        $.each(this.attributes, function () {
            if (this.specified && this.name != 'id' && this.name != 'class') {
                value = this.value;
                if (value.length > 50)
                    value = value.substring(0, 49);
                var attr = "<option class='selectAttributeCss' value='" + this.name + "'>" + this.name + " : " + value + "</option>";
                tailieu.append(attr);
            }
        });
    });
}

function funcionRemove(e) {
    var id = e.parent().prev().attr('id');
    delete jsonGenerator[id];
    e.parent().parent().html("");
    $(".typedata").change();
}

function update_url(url) {
    history.pushState(null, null, '?url=' + encodeURIComponent($("#meataData").val()) + "&type=" + $("#Type").val() + "&javascript=" + $("#Javascript").val());
}

function funcionClick() {
    $("#meataData").val($("#meataData").val().trim());
    var urltmp = $("#meataData").val().trim();
    if (urltmp != urlMain || $("#Type").val() != type || $("#Javascript").val() != javascript) {
        if (urltmp != urlMain || $("#Javascript").val() != javascript) {
            if (!urltmp.startsWith("http")) {
                urltmp = "http://" + urltmp;
            }
            iframe.attr('src', urlIframe + '?url=' + encodeURIComponent(urltmp) + "&javascript=" + $("#Javascript").val());
            $("#meataData").val(urltmp);
            javascript = $("#Javascript").val();
        }
        jsonGenerator = new Object();
        domain = urltmp.split('/').length > 2 ? urltmp.split('/')[2].replace("www.", "") : "";
        update_url();
        clearData();
        getData();
    }
};

function getData() {
    var typeConfig = $("#Type").val();
    $(".updateData , .createData, .deletaData").remove();
    $("table#ListData tbody tr").remove();
    $.ajax({
        type: "GET",
        url: "./api/get",
        data: {
            "url": domain,
            "type": typeConfig
        }, error: function () {
            alert("Can't get data from database!")
        },
        success: function (data) {
            if (data != null) {
                $(".updateData , .createData, .deletaData").remove();
                $("table#ListData tbody tr").remove();
                if (typeConfig == 3) {
                    jsonGenerator = new Object();
                    var newType = new Object();
                    newType._xpath = data.Content;
                    newType.attr = 'text';
                    jsonGenerator['id'] = newType;
                    var div = "<tr><td class='col-md-11 myHover' onclick='clickShowContent(this);' id='id'>id</td> <td class='col-md-1'><i class='fa fa-trash' aria-hidden='true' data-toggle='tooltip' title='Xóa!' onclick='funcionRemove($(this));'></i></td></tr >";
                    $("#ListData tbody").append(div);
                }
                else
                    convertData(data.Content);
                if ($("#meataData").val() != urlMain) {
                    $('#crawlDATA').one('load', function () {
                        $(".typedata").change();
                    });
                } else {
                    $(".typedata").change();
                }
                id = data.Id;
                type = data.Type;
                $(".createUpdateData").prepend("<button class='btn btn-danger btn-sm deletaData ml-auto' onclick='deleteData();'>Xóa Domain</button>");
                $(".createUpdateData").prepend("<button class='btn btn-primary btn-sm updateData' onclick='updateData();'>Cập nhật Domain</button>");
            } else {
                jsonGenerator = new Object();
                $(".createUpdateData").prepend("<button class='btn btn-primary btn-sm createData' onclick='createData();'>Lưu Domain</button>");
                if ($("#meataData").val() != urlMain) {
                    $('#crawlDATA').one('load', function () {
                        if ($("#Type").val() == 0)
                            recommendData();
                    });

                } else {
                    if ($("#Type").val() == 0)
                        recommendData();
                }
                type = $("#Type").val();
            }
            urlMain = $("#meataData").val();
        },
        timeout: 5000
    });
}

function testData() {
    var isID = false;
    var body;
    if ($("#Type").val() == 3) {
        body = jsonGenerator["id"] ? jsonGenerator["id"]["_xpath"] : "";
        isID = true;
    }
    else
        body = JSON.stringify(parseData());
    var url = $("#meataData").val();
    var data = new Object();
    data.url = url;
    data.data = body;
    data.javascript = $("#Javascript").val();
    data.isID = isID;
    $.ajax({
        url: "./Home/JsonResult",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            $("#myData").modal();
            $("#url").val($("#meataData").val());
            $("#data").val(JSON.stringify(body, undefined, 2));
            $("#result tbody tr").remove();
            var result = JSON.parse(json);
            Object.keys(result).forEach(function (k) {
                if (k != "content_path") {
                    if (result[k] instanceof Array) {
                        var arrays = new Array();
                        var kq = "";
                        result[k].forEach(function (e) {
                            if (e instanceof Object)
                                kq += JSON.stringify(e) + "<br>";
                            else {
                                if (arrays.indexOf(e) < 0) {
                                    kq += e + "<br>";
                                    arrays.push(e);
                                }
                            }
                        });
                        $("#result tbody").append("<tr><td>" + k + "</td><td>" + kq + "</td></tr>");
                    } else if (result[k] instanceof Object)
                        $("#result tbody").append("<tr><td>" + k + "</td><td>" + JSON.stringify(result[k]) + "</td></tr>");
                    else
                        $("#result tbody").append("<tr><td>" + k + "</td><td>" + result[k] + "</td></tr>");
                } else {
                    $("#result tbody").append("<tr><td>" + k + "</td><td><textarea class='form-control ml-auto' rows='10' id='content_path' disabled></textarea><button type='button' onclick='viewHtml();' class='btn btn-sm btn-default'>View html</button></td></tr>");
                    $("#result tbody #content_path").val(result[k]);
                }
            });
        }
    })
}

function createTable() {
    var text = $("#myCssSelectorTest").val();
    if (text != "") {
        var radio = $(".typedata").val();
        if (radio == "difference") {
            radio = $("#typedata-difference").val();
        }
        if (radio != null && radio.trim() != "") {
            var check = $("#ListData #" + radio);
            if (check.length == 0) {
                var div = "<tr><td class='col-md-11 myHover' onclick='clickShowContent(this);'  id='" + radio + "'>" + radio;
                div += "</td><td class='col-md-1'><i class='fa fa-trash' aria-hidden='true' data-toggle='tooltip' title='Xóa!' onclick='funcionRemove($(this));'></i></td></tr>";
                $("#ListData tbody").append(div);
                setNewType(radio);
                if ($("#Type").val() == 0) {
                    for (var i = 0; i < listTypeDate.length; i++) {
                        if (!(listTypeDate[i] in jsonGenerator)) {
                            $(".typedata").val(listTypeDate[i]);
                            break;
                        }
                    };
                }
                $(".typedata").change();

            } else
                alert("Loại dữ liệu đã tồn tại");
        }
        else
            alert("Loại dữ liệu không được bỏ trống");
    } else
        alert("Xpath không được bỏ trống");
}

// Thêm trường mới 
function setNewType(e) {
    var newType = new Object();
    newType._xpath = $("#myCssSelectorTest").val();
    newType.attr = $(".form-control.attribute").find(":selected").val();
    var excludes = $(".form-control.exclude");
    var properties = $(".form-group.property .input-group.entityproperty");
    var list = [];
    if (excludes.length > 0)
        excludes.each(function () {
            if ($(this).val() != "")
                list.push($(this).val());
        });
    if (e == "time_path") {
        var tranform = new Object();
        tranform[properties[0].children[0].value] = properties[0].children[1].value;
        tranform[properties[1].children[0].value] = properties[1].children[1].value;
        tranform[properties[2].children[0].value] = properties[2].children[1].value;
        newType["_transformations"] = [tranform];
        properties[0].remove();
        properties[1].remove();
        properties[2].remove();

    }
    else if (e == "tags" || e == "categories" && $(".attribute").val() == "html") {
        var obj = new Object();
        obj._xpath = properties[0].children[1].value;
        obj._transformations = ["TrimTransformation"];
        newType[properties[0].children[0].value] = obj;
        obj = new Object();
        obj._xpath = properties[1].children[1].value;
        obj._transformations = ["TrimTransformation"];
        newType[properties[1].children[0].value] = obj;
        properties[0].remove();
        properties[1].remove();
    }
    properties = $(".form-group.property .input-group.entityproperty");
    if (properties.length > 0)
        properties.each(function () {
            var ppties = $(this).children();
            if (ppties[0].value != "" && ppties[1].value != "") {
                if (arr.indexOf(ppties[0].value) == -1)
                    newType[ppties[0].value] = ppties[1].value;
            }

        });

    if (list.length > 0)
        newType._removeTags = list;
    jsonGenerator[e] = newType;
}

function clearData() {
    $(".form-control.exclude").remove();
    $(".input-group.entityproperty").remove();
    if ($("#Type").val() == 0 || $("#Type").val() == 3)
        $(".form-control.attribute").val("text");
    else
        $(".form-control.attribute").val("href");
    $("#myCssSelectorTest").val("");
    $("#myContentValue").val("");
    $("#typedata-difference").remove();
    $("#createTableJson").html("Tạo");
    $("#createTableJson").attr("onclick", "createTable();");
}

function getPathTo(element) {
    if (element.id !== '')
        return "//*[@id='" + element.id + "']";
    if (element === document.body)
        return element.tagName;

    var ix = 0;
    var siblings = element.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
        var sibling = siblings[i];
        if (sibling === element)
            return getPathTo(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
            ix++;
    }
}

function addExclude() {
    $(".form-group.exclude").append("<div class='input-group'><input type=\"text\" class=\"form-control form-control-sm exclude\" style=\"margin-top:5px;\"><em onclick='deleteInput(this);' class='fas fa-trash-alt trash-delete'></em></div>");
}

function addPropertiese() {
    $(".form-group.property").append("<div class='input-group entityproperty'><input placeholder='Thuộc tính' type=\"text\" class=\"col-md-4 form-control form-control-sm\" ><input placeholder='Giá trị' type=\"text\" class=\"col-md-8 form-control form-control-sm\" ><em onclick='deleteInput(this);' class='fas fa-trash-alt trash-delete-all'></em></div>");
}

function clone(obj) {
    var copy;
    if (null == obj || "object" != typeof obj) return obj;
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
function deleteInput(e) {
    $(e).parent().remove();
}
function viewHtml() {
    var w = window.open();
    $(w.document.body).html($("#result tbody #content_path").val());
}
function createData() {
    var body;
    if ($("#Type").val() == 3) {
        body = jsonGenerator["id"] ? jsonGenerator["id"]["_xpath"] : "";
    } else
        body = JSON.stringify(parseData());
    $.ajax({
        type: "PUT",
        url: "./api/domain",
        data: {
            "Domain1": domain,
            "Type": $("#Type").val(),
            "Content": body,
            "Properties": JSON.stringify(new Object().javascript = $("#Javascript").val())
        },
        success: function (data) {
            if (data == "success") {
                alert("Thêm Domain thành công!");
                getData();
            } else
                alert(data);
        }, error: function () {
            alert("Thêm Domain thất bại!");
        }
    });
}

function recommendData() {
    clearData();
    jsonGenerator = new Object();
    var a = iframe.contents().find("meta[name*='title'],meta[property*='title']").first();
    if (a.length > 0) {
        var newType = new Object();
        if (a.attr("name") != undefined)
            newType._xpath = "meta[name='" + a.attr("name") + "']";
        else
            newType._xpath = "meta[property='" + a.attr("property") + "']";
        newType.attr = "content";
        jsonGenerator["title_path"] = newType;
        $("#ListData tbody").append("<tr><td class='col-md-11 myHover' onclick='clickShowContent(this);'  id='title_path'>title_path</td><td class='col-md-1'><i class='fa fa-trash' aria-hidden='true' data-toggle='tooltip' title='Xóa!' onclick='funcionRemove($(this));'></i></td></tr>");
    }
    var a = iframe.contents().find("meta[name*='time'],meta[property*='time']").first();
    if (a.length > 0) {
        var newType = new Object();
        var tranform = new Object();
        tranform["date_regex"] = "\\d+-\\d+-\\d+";
        tranform["time_regex"] = "\\d+:\\d+:\\d+";
        tranform["datetime_format"] = "yyyy-MM-dd HH:mm:ss";
        newType["_transformations"] = [tranform];
        if (a.attr("name") != undefined)
            newType._xpath = "meta[name='" + a.attr("name") + "']";
        else
            newType._xpath = "meta[property='" + a.attr("property") + "']";
        newType.attr = "content";
        jsonGenerator["time_path"] = newType;
        $("#ListData tbody").append("<tr><td class='col-md-11 myHover' onclick='clickShowContent(this);'  id='time_path'>time_path</td><td class='col-md-1'><i class='fa fa-trash' aria-hidden='true' data-toggle='tooltip' title='Xóa!' onclick='funcionRemove($(this));'></i></td></tr>");
    }
    var a = iframe.contents().find("meta[name*='description'],meta[property*='description']").first();
    if (a.length > 0) {
        var newType = new Object();
        if (a.attr("name") != undefined)
            newType._xpath = "meta[name='" + a.attr("name") + "']";
        else
            newType._xpath = "meta[property='" + a.attr("property") + "']";
        newType.attr = "content";
        jsonGenerator["meta_description"] = newType;
        $("#ListData tbody").append("<tr><td class='col-md-11 myHover' onclick='clickShowContent(this);'  id='meta_description'>meta_description</td><td class='col-md-1'><i class='fa fa-trash' aria-hidden='true' data-toggle='tooltip' title='Xóa!' onclick='funcionRemove($(this));'></i></td></tr>");
    }
    var a = iframe.contents().find("meta[name*='keywords'],meta[property*='keywords']").first();
    if (a.length > 0) {
        var newType = new Object();
        if (a.attr("name") != undefined)
            newType._xpath = "meta[name='" + a.attr("name") + "']";
        else
            newType._xpath = "meta[property='" + a.attr("property") + "']";
        newType.attr = "content";
        jsonGenerator["keywords"] = newType;
        $("#ListData tbody").append("<tr><td class='col-md-11 myHover' onclick='clickShowContent(this);'  id='keywords'>keywords</td><td class='col-md-1'><i class='fa fa-trash' aria-hidden='true' data-toggle='tooltip' title='Xóa!' onclick='funcionRemove($(this));'></i></td></tr>");
    }
    $(".typedata").change();
}


function deleteData() {
    if (confirm("Bạn có chắc chắn xóa domain này!")) {
        $.ajax({
            type: "DELETE",
            url: "./api/domain/delete/" + id,
            success: function (data) {
                if (data != null) {
                    alert("Xóa thành công!");
                    type = data.type;
                    update_url();
                    //update_url('?url=' + $("#meataData").val() + "&type=" + type);
                    getData();
                    $(".typedata").change();
                } else
                    alert("Xóa thất bại!");
            },
            error: function () {
                alert("Xóa thất bại!")
            }
        })
    }
}
function updateData() {
    var body;
    if ($("#Type").val() == 3) {
        body = jsonGenerator["id"] ? jsonGenerator["id"]["_xpath"] : "";
    } else
        body = JSON.stringify(parseData());
    $.ajax({
        type: "POST",
        url: "./api/update",
        data: {
            "Id": id,
            "Content": body,
            "Properties": JSON.stringify(new Object().javascript = $("#Javascript").val())
        },
        success: function (data) {
            if (data == true) {
                alert("Đã cập nhật Domain!");
                update_url();
                getData();
            } else
                alert("Cập nhật thất bại!");
        },
        error: function () {
            alert("Cập nhật thất bại!")
        }
    })
}
$(document).ready(function () {
    $(".form-control.typedata").change(function () {
        var radio = $(this).val();
        if (radio == "difference") {
            radio = $("#typedata-difference").val();
        }
        if ($("#ListData #" + radio).length > 0) {
            $("#ListData #" + radio).click();
        } else {
            clearData();
            if ($(this).val() == "difference")
                $(".div-typedata").append("<input class='form-control ml-auto' placeholder='Nhập loại dữ liệu' id='typedata-difference' type='text'>");
            else if ($(this).val() == "time_path") {
                $(".form-group.property").prepend("<div id='datetime_format' class='input-group entityproperty'><input placeholder='Thuộc tính' type=\"text\" value='datetime_format' class=\"col-md-4 form-control form-control-sm\" disabled><input placeholder='Giá trị' type=\"text\" class=\"col-md-8 form-control form-control-sm\" value='dd/MM/yyyy HH:mm'></div>");
                $(".form-group.property").prepend("<div id='time_regex' class='input-group entityproperty'><input placeholder='Thuộc tính' type=\"text\" value='time_regex' class=\"col-md-4 form-control form-control-sm\" disabled><input placeholder='Giá trị' type=\"text\" class=\"col-md-8 form-control form-control-sm\" value='\\d+:\\d+' ></div>");
                $(".form-group.property").prepend("<div id='date_regex' class='input-group entityproperty'><input placeholder='Thuộc tính' type=\"text\" value='date_regex' class=\"col-md-4 form-control form-control-sm\" disabled><input placeholder='Giá trị' type=\"text\" class=\"col-md-8 form-control form-control-sm\" value='\\d+/\\d+/\\d+' ></div>");
            }
            else if ($(this).val() == "tags" || $(this).val() == "categories") {
                $(".form-group.property").prepend("<div id='link_" + $(this).val() + "' class='input-group entityproperty'><input placeholder='Thuộc tính' type=\"text\" value='link' class=\"col-md-4 form-control form-control-sm\" disabled><input placeholder='Giá trị' value='a/@href' type=\"text\" class=\"col-md-8 form-control form-control-sm\" ></div>");
                $(".form-group.property").prepend("<div id='text_" + $(this).val() + "' class='input-group entityproperty'><input placeholder='Thuộc tính' type=\"text\" value='text' class=\"col-md-4 form-control form-control-sm\" disabled><input placeholder='Giá trị' value='a/@text' type=\"text\" class=\"col-md-8 form-control form-control-sm\" ></div>");
            }
            if ($(this).val() == "content_path" || $(this).val() == "tags" || $(this).val() == "categories")
                $(".form-control.attribute").val("html");
            else if ($(this).val() == "news_relate") {
                $('.form-control.attribute').append("<option class='selectAttributeCss' value='href'>Href</option>");
                $(".form-control.attribute").val("href");
            }
            else $(".form-control.attribute").val("text");
        }
    });

    $("select.attribute").change(function () {
        var type = $(".form-control.typedata").val();
        var attr = $(this).val();
        if (type == "time_path" && $(this).val() == "datetime") {
            $("#datetime_format").children(0).eq(1).val("yyyy-MM-dd HH:mm:ss");
            $("#time_regex").children(0).eq(1).val("\\d+:\\d+:\\d+");
            $("#date_regex").children(0).eq(1).val("\\d+-\\d+-\\d+");
        } else if (type == "tags" || type == "categories") {
            $(".input-group.entityproperty").remove();
            if (attr == 'html') {
                $(".form-group.property").prepend("<div id='link_" + $(this).val() + "' class='input-group entityproperty'><input placeholder='Thuộc tính' type=\"text\" value='link' class=\"col-md-4 form-control form-control-sm\" disabled><input placeholder='Giá trị' value='a/@href' type=\"text\" class=\"col-md-8 form-control form-control-sm\" ></div>");
                $(".form-group.property").prepend("<div id='text_" + $(this).val() + "' class='input-group entityproperty'><input placeholder='Thuộc tính' type=\"text\" value='text' class=\"col-md-4 form-control form-control-sm\" disabled><input placeholder='Giá trị' value='a/@text' type=\"text\" class=\"col-md-8 form-control form-control-sm\" ></div>");
            }
        }
    });
});