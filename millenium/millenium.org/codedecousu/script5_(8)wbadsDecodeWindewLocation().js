window.wbads=window.wbads||{};

window.wbads.decodeWindowLocationHash=function()
{
    var s=[];
    if(typeof(window.location.hash)!=='undefined'){
        var hash=window.location.hash.replace('#','');
        hash=hash.split('&');
        for(var i=0;i<hash.length;i++)
        {
            var c=hash[i].split('=');
            if(c.length===2)
            {
                s[c[0]]=decodeURIComponent(c[1])
            }
        }
    }
        return s
};