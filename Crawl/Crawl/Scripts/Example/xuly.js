var isLink = false;
var isHide = true;
var isTurnOn = false;
var css = "";
var myCssSelector = $('#myCssSelectorTest', window.parent.document);
var myCheck = $('#myCheck', window.parent.document);
var listType = ["link", "news_relate"];

function getFullCss() {
    $("#cssSelector").val(css);
}

function AddCss() {
    var csstmp = $("#cssSelector").val().trim();
    if (myCssSelector.val() != "")
        myCssSelector.val(myCssSelector.val() + (csstmp != "" ? ", " + csstmp : ""));
    else
        myCssSelector.val(csstmp);
    myCheck.click();
}

function ReplaceCss() {
    myCssSelector.val($("#cssSelector").val().trim());
    myCheck.click();
}

function TestCss() {
    $(".myClass").removeClass("myClass");
    $($("#cssSelector").val().trim()).addClass("myClass");
    //$(".myClassChildren").removeClass("myClassChildren");
    //$($("#cssSelector").val().trim()).children().addClass("myClassChildren");
}

function ExcludeCss() {
    $('.form-group.exclude', window.parent.document).append("<div class='input-group'><input type=\"text\" class=\"form-control form-control-sm exclude\" style=\"margin-top:5px;\" value=\"" + $("#cssSelector").val().trim() + "\"><em onclick='deleteInput(this);' class='fas fa-trash-alt trash-delete'></em></div>");
}

function update_url(url) {
    parent.history.pushState(null, null, url);
}
function LinkInfo(x) {
    if (isLink) {
        //if (x.split('/')[2].replace("www.", "").indexOf(window.parent.domain) != -1) {
        location.href = location.origin + location.pathname + '?url=' + encodeURIComponent(x) + "&javascript=" + window.parent.$("#Javascript").val();
        parent.document.getElementById(window.parent.$("#meataData").val(x));
        //$('.myButton', window.parent.document).click();
        update_url('?url=' + encodeURIComponent(x) + "&type=" + window.parent.$("#Type").val() + "&javascript=" + window.parent.$("#Javascript").val());
        parent.setUrl(x);
        //} else
        //    alert("Không được chuyển sang Domain khác!");
    }
}
$(document).ready(function () {

    //function getPathTo(element) {
    //    if (element.id !== '')
    //        return "//*[@id='" + element.id + "']";
    //    if (element === document.body)
    //        return element.tagName;

    //    var ix = 0;
    //    var siblings = element.parentNode.childNodes;
    //    for (var i = 0; i < siblings.length; i++) {
    //        var sibling = siblings[i];
    //        if (sibling === element)
    //            return getPathTo(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
    //        if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
    //            ix++;
    //    }
    //}

    jQuery.fn.getPath = function () {
        var parents = $(this).parents();
        var selector = "";
        for (var i = parents.length - 1; i >= 0; i--) {
            if (i < parents.length - 2) {
                selector += $(parents[i]).prop("tagName").toLowerCase();
                var classNames = $(parents[i]).attr("class");
                if (classNames) {
                    var array = classNames.split(" ");
                    array.forEach(function (item) {
                        if (item)
                            selector += "." + item;
                    });
                }
                var id = $(parents[i]).attr("id");
                if (id) {
                    var array = id.split(" ");
                    array.forEach(function (item) {
                        if (item)
                            selector += "#" + item;
                    });
                }
                //if (id || classNames)
                selector += " ";
            }
        };

        selector += $(this).prop("tagName").toLowerCase();
        var classNames = $(this).attr("class");
        if (classNames) {
            var array = classNames.split(" ");
            array.forEach(function (item) {
                if (item)
                    selector += "." + item;
            });
        }
        var id = $(this).attr("id");
        if (id) {
            var array = id.split(" ");
            array.forEach(function (item) {
                if (item)
                    selector += "#" + item;
            });
        }
        return selector;
    };


    $("body").append("<div id='divShowInfoTag' style=' display: none;  top:-100px; left:-100px; position: fixed '>"
        + "<b>Css Selector: </b></br><textarea id='cssSelector' style='with: 367px; height:124px;' ></textarea>"
        + "<br/><div class='totaltooltip'>"
        + "<button style = 'padding:3px 5px; background:green;  border:solid 1px #CCC; cursor: pointer;color: #FFF; margin: 3px;' onclick = 'myFunction()' onmouseout = 'outFunc()' > <span class='tooltiptext' id='myTooltip'>Copy to clipboard</span> Copy </button></div> "
        + "<button style = 'padding:3px 5px; background:green;  border:solid 1px #CCC; cursor: pointer;color: #FFF; margin: 3px;' onclick = 'getFullCss();' > Full Css</button>"
        + "<button style = 'padding:3px 5px; background:green;  border:solid 1px #CCC; cursor: pointer;color: #FFF; margin: 3px;' onclick = 'AddCss();' > Append</button>"
        + "<button style = 'padding:3px 5px; background:green;  border:solid 1px #CCC; cursor: pointer;color: #FFF; margin: 3px;' onclick = 'TestCss();' > Test</button>"
        + "<button style = 'padding:3px 5px; background:green;  border:solid 1px #CCC; cursor: pointer;color: #FFF; margin: 3px;' onclick = 'ReplaceCss();' > Replace</button>"
        + "<button style = 'padding:3px 5px; background:green;  border:solid 1px #CCC; cursor: pointer;color: #FFF; margin: 3px;' onclick = 'ExcludeCss();' > Exclude</button>"
        + "<div style='float: right'><input id='myClose' type='button' value='Đóng' style='padding:3px 5px; background:#9d234c;  border:solid 1px #CCC; cursor: pointer;color: #FFF; margin: 3px'/></div></div> ");

    $("#myClose").click(function () {
        $("#divShowInfoTag").hide();
        isHide = true;
        $(".myClass").removeClass("myClass");
    });

    $("*").on("mousemove", function (e) {
        if (isTurnOn) {
            //if (e === undefined) e = window.e;
            //var target = 'target' in e ? e.target : e.srcElement;
            $(".myClass").removeClass("myClass");
            //var value = getPathTo(target);
            //$("#cssSelector").val(value);
            $("#cssSelector").val($(e.target).getPath());
            //console.log($(e.target).css());
            //parent.document.getElementById("myCssSelectorTest").value = value;
            $(e.target).addClass("myClass");

            clientX = e.clientX + 30;
            clientY = e.clientY + 30;
            if (clientX > 0.5 * window.innerWidth) {
                clientX = clientX - $("#divShowInfoTag").width() - 80;
            }
            if (clientY > 0.5 * window.innerHeight)
                clientY = clientY - $("#divShowInfoTag").height() - 80;
            $("#divShowInfoTag").css({ left: clientX + "px", top: clientY + "px" });
        }
    });

    //$(document).click(function (e) {
    //    if (isTurnOn)
    //        isTurnOn = false;
    //    window.parent.$('.selectAttributeCss').remove();
    //    var tailieu = window.parent.$('.form-control.attribute');
    //    $.each(e.target.attributes, function () {
    //        if (this.specified && this.name != 'id' && this.name != 'class') {
    //            var attr = "<option class='selectAttributeCss' value='" + this.name + "'>" + this.name + "</option>";
    //            tailieu.append(attr);
    //        }

    //    });
    //});


    $(document).keydown(function (e) {
        if (e.which == 18) {
            if (!isTurnOn)
                isTurnOn = true;
            if (isHide)
                $("#divShowInfoTag").show();
        } else
            if (e.which == 17)
                isLink = true;
    });
    $(document).keyup(function (e) {
        if (e.which == 18) {
            isTurnOn = false;
            var cssSelector = $("#cssSelector").val();
            if (listType.indexOf($('.typedata', window.parent.document).val()) >= 0)
                while (true) {
                    if (cssSelector.indexOf(" ") > 0) {
                        var csstmp = cssSelector.substring(cssSelector.lastIndexOf(" ") + 1, cssSelector.length);
                        if (!csstmp.startsWith("a"))
                            cssSelector = cssSelector.substring(0, cssSelector.lastIndexOf(" "));
                        else
                            break;
                    } else {
                        if (!csstmp.startsWith("a"))
                            cssSelector = "";
                        break;
                    }
                }
            css = cssSelector;
            var count = $(cssSelector).length;
            //console.log(count);
            var firstElement = $(cssSelector).first();
            while (cssSelector.indexOf(" ") > 0) {
                var csstmp = cssSelector.substring(cssSelector.indexOf(" ") + 1, cssSelector.length);
                var elementstmp = $(csstmp);
                if (elementstmp.length == count && firstElement[0] === elementstmp[0])
                    cssSelector = csstmp;
                else
                    break;
            }

            $("#cssSelector").val(cssSelector);
            $(".myClass").removeClass("myClass");
            $(cssSelector).addClass("myClass");
        } else
            if (e.which == 17)
                isLink = false;
    });

});


function myFunction() {
    var textArea = document.createElement("textarea");
    textArea.value = $("#cssSelector").val();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied! "
}

function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}