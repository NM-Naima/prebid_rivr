///////26
window.wbads=window.wbads||{};
window.wbads.libraries.indexExchange={
    file:'https://js-sec.indexww.com/ht/p/186247-34549482148542.js',
    required:!1,
    enabled:!0,
    loaded:!1,
    cmpVendorId:10,
    load:function(){
        wbads.log('[wbads.libraries.indexExchange.load]()');
        wbads.public.isGdprCompliant(
            this.cmpVendorId,function(res)
            {
                if(res===!0)
                {
                    wbads.log('[wbads.libraries.indexExchange.load]() cmp accepted');
                    setTimeout(function(){
                        var s=document.createElement("script");
                        s.async=!0;
                        s.src=wbads.libraries.indexExchange.file;
                        s.setAttribute('importance','low');
                        var g=document.getElementsByTagName("script")[0];
                        g.parentNode.insertBefore(s,g);
                        wbads.libraries.indexExchange.loaded=!0
                    },5000)
                }else
                {
                    wbads.log('[wbads.libraries.indexExchange.load]() cmp refused')
                }
            }
        )
    }
};