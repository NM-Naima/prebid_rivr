///////36
window.wbads=window.wbads||{};
    window.wbads.rot13=function(s)
    {
        return s.replace(/[a-zA-Z]/g,
            function(c)
            {
                return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26)
            })
    };
