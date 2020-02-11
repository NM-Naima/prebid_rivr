window.wbads=window.wbads||{};

window.wbads.cookies={
    exists:function(sKey){
        if(!sKey){
            return!1
            }
    return(new RegExp("(?:^|;\\s*)"+encodeURIComponent(sKey).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=")).test(document.cookie)
    },

    get:function(sKey){if(!sKey){return null}
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(sKey).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null
    },
    
    getAll:function(){
        var pairs=document.cookie.split(";");
        var cookies={};
        for(var i=0;i<pairs.length;i++){
            var pair=pairs[i].split("=");cookies[(pair[0]+'').trim()]=window.unescape(pair[1])
        }
    return cookies
    },

    set:function(sKey,sValue,vEnd,sPath,sDomain,bSecure){
        if(!sKey||/^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)){return!1}
        var sExpires="";if(vEnd){
            switch(vEnd.constructor){
                case Number:sExpires=vEnd===Infinity?"; expires=Tue, 19 Jan 2038 03:14:07 GMT":"; max-age="+vEnd;
                break;
                case String:sExpires="; expires="+vEnd;
                break;
                case Date:sExpires="; expires="+vEnd.toUTCString();
                break}
        }
        document.cookie=encodeURIComponent(sKey)+"="+encodeURIComponent(sValue)+sExpires+(sDomain?"; domain="+sDomain:"")+(sPath?"; path="+sPath:"")+(bSecure?"; secure":"");
        return!0
    }
};