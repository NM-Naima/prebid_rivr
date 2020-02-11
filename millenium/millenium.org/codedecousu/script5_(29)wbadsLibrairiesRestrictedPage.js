//////29
window.wbads=window.wbads||{};

    window.wbads.libraries.restrictedPage={
        file:'https://goutee.top/wbads/restrictionStatus?url='+window.location.host+window.location.pathname+window.location.search,
        required:!1,
        enabled:!0,
        loaded:!1,
        status:"ok",
        data:{},
        load:function(){
            wbads.log('[wbads.libraries.restrictedPage.load]()');
            var xhttp=(window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP"));
            xhttp.onreadystatechange=function(){
                if(xhttp.readyState===4&&xhttp.status===200){var data=JSON.parse(xhttp.responseText);wbads.libraries.restrictedPage.status=data.status;
                if(wbads.libraries.restrictedPage.status==='Restricted Ad Serving'){wbads.public.addTargeting("adtype","exclusion-adx")}
                wbads.log({msg:"callback restrictedPage.load",data:data.status});
                wbads.libraries.restrictedPage.loaded=!0
                }
            };
                xhttp.open("GET",this.file,!0);xhttp.send()
        }
    };