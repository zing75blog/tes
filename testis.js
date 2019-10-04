<script>
//<![CDATA[
function showPagePosts(t) {
    var a, e, i, s, r, p, n, o, l = "";
    0 === pagernum && (postsnum = parseInt(t.feed.openSearch$totalResults.$t), pagernum = parseInt(postsnum / postPerPage) + 1);
    for(var u = 0; postPerPage > u; u++)
        if("entry" in t.feed) {
            if(u == t.feed.entry.length) break;
            a = t.feed.entry[u], e = a.title.$t;
            for(var c = 0, g = a.link.length; g > c; c++)
                if("alternate" == a.link[c].rel) {
                    i = a.link[c].href;
                    break
                }
            for(var m = 0, d = a.link.length; d > m; m++)
                if("replies" == a.link[m].rel && "text/html" == a.link[m].type) {
                    var v = a.link[m].title.split(" ")[0];
                    break
                }
            r = "summary" in a ? a.summary.$t.replace(/<br ?\/?>/gi, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "") : "", r.length > numChars && (r =
                numChars >
                0 && numChars !== !1 ? r.substring(0, numChars) + "..." : "");
            var f = a.published.$t,
                h = f.substring(0, 4),
                _ = f.substring(5, 7),
                b = f.substring(8, 10);
            n = idMode ? ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ], o = showPostDate ? b + " " + n[parseInt(_, 10) - 1] + " " + h + " - " : "", p = showComments ? v + " " + commentsLabel : "", s =
                "media$thumbnail" in a ? a.media$thumbnail.url.replace(/\/s\d+(\-c)?\//, "/s500-c/") : a.content.$t.match(/src\s*=\s*"([^"]+)"/) ? a.content
                .$t.match(/src\s*=\s*"([^"]+)"/)[1] : imgBlank, l += '<div class="itemposts">', l +=
                '<h67><a href="' + i + '" title="' + e + '">' + e + "</a></h67>", l += '<div class="iteminside"><a href="' + i + '"><img src="' + s +
                '" /></a>', l += '<span class="summary">' + r + "</span></div>", l += '<div style="clear:both;"></div><div class="itemfoot">' + o + p +
                "</div>", l += "</div>"
        }
    _results.innerHTML = l, _create_pagination()
}

function _create_pagination() {
    output = "";
    var t = 0;
    if(output += (actualpage > 1 ? '<a title="' + prevText + '" class="prevjson" href="javascript:_init_script(' + (actualpage - 1) + ')">' + prevText +
            "</a>" :
            '<span class="prevjson hidden">' + prevText + "</span>") + '<em style="font:inherit;color:inherit;" class="pagernumber">', maxpage + 1 >
        pagernum)
        for(t = 1; pagernum >= t; t++) output += t == actualpage ? '<span class="actual">' + t + "</span>" : '<a href="javascript:_init_script(' + t +
            ')">' +
            t + "</a>";
    else if(pagernum > maxpage - 1)
        if(minpage > actualpage) {
            for(t = 1; maxpage - 2 > t; t++) output += t == actualpage ? '<span class="actual">' + t + "</span>" : '<a href="javascript:_init_script(' + t +
                ')">' + t + "</a>";
            output += " ... ", output += '<a href="javascript:_init_script(' + parseInt(pagernum - 1) + ')">' + parseInt(pagernum - 1) + "</a>", output +=
                '<a href="javascript:_init_script(' + pagernum + ')">' + pagernum + "</a>"
        } else if(pagernum - (minpage - 1) > actualpage && actualpage > minpage - 1) {
        for(output += '<a href="javascript:_init_script(1)">1</a>', output += '<a href="javascript:_init_script(2)">2</a>', output += " ... ", t =
            actualpage -
            2; actualpage + 2 >= t; t++) output += t == actualpage ? '<span class="actual">' + t + "</span>" : '<a href="javascript:_init_script(' + t +
            ')">' +
            t + "</a>";
        output += " ... ", output += '<a href="javascript:_init_script(' + (pagernum - 1) + ')">' + parseInt(pagernum - 1) + "</a>", output +=
            '<a href="javascript:_init_script(' + pagernum + ')">' + pagernum + "</a>"
    } else
        for(output += '<a href="javascript:_init_script(1)">1</a>', output += '<a href="javascript:_init_script(2)">2</a>', output += " ... ", t = pagernum -
            (
                minpage + 1); pagernum >= t; t++) output += t == actualpage ? '<span class="actual">' + t + "</span>" : '<a href="javascript:_init_script(' +
            t +
            ')">' + t + "</a>";
    output += "</em>" + (t - 1 > actualpage ? '<a title="' + nextText + '" class="nextjson" href="javascript:_init_script(' + (actualpage + 1) + ')">' +
            nextText + "</a>" : '<span class="nextjson hidden">' + nextText + "</span>"), _pagination.innerHTML = output, _totalposts.innerHTML =
        totalPostLabel + " " + postsnum + " - " + jumpPageLabel + " " + (actualpage * postPerPage - (postPerPage - 1)) + (t - 1 > actualpage ? " - " +
            actualpage * postPerPage : "")
}

function _init_script(t) {
    var a, e, i = t * postPerPage - (postPerPage - 1),
        s = document.getElementsByTagName("head")[0],
        r = sortByLabel ? siteUrl + "/feeds/posts/default/-/" + labelSorter + "?start-index=" + i : siteUrl + "/feeds/posts/default?start-index=" + i;
    1 == firstpage && (document.documentElement.scrollTop = _results.offsetTop - 30, document.body.scrollTop = _results.offsetTop - 30, a = document.getElementById(
            "TEMPORAL"), a.parentNode.removeChild(a)), _results.innerHTML = '<div id="loadingscript">' + loadingText + "</div>", _pagination.innerHTML = "",
        _totalposts.innerHTML = "", e = document.createElement("script"), e.type = "text/javascript", e.src = r + "&max-results=" + postPerPage +
        "&orderby=published&alt=json-in-script&callback=showPagePosts", e.id = "TEMPORAL", s.appendChild(e), firstpage = 1, actualpage = t
}
var minpage = 6,
    maxpage = 10,
    firstpage = 0,
    pagernum = 0,
    postsnum = 0,
    actualpage = 1;
document.write(
    '<div id="toc-outer"><div id="results"></div><div id="itempager" style="position:relative;"><div id="pagination"></div><div id="totalposts"></div><a title="Taufik Nurrohman" style="display:block!important;visibility:visible!important;opacity:1!important;position:absolute;bottom:10px;right:14px;font:normal bold 8px Arial,Sans-Serif!important;color:#666;text-shadow:0 1px 0 rgba(255,255,255,.1);text-decoration:none;" href="http://hompimpaalaihumgambreng.blogspot.com/2012/03/daftar-isi-blogger-dengan-navigasi.html" target="_blank">&#9658;TN</a></div></div>'
);
var _results = document.getElementById("results"),
    _pagination = document.getElementById("pagination"),
    _totalposts = document.getElementById("totalposts");
window.onload = function() {
    _init_script(1)
};
//]]>
</script>
