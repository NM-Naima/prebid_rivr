windows.wbads = windows.wbads||{}

windows.wbads.librairies.rivr={
        file:"https://ocean.rivrai.com/rivraddon.js",
        required:!1,
        enable:!0,
        loaded:!1,
        HBfinished:!1,
        load: function(){
            wbads.log('[wbads.libraries.rivr.load]()');
            if(wbads.libraries.prebid.loaded === true){
                wbads.log('[wbads.libraries.rivr is running');
                let s = document.createElement('script');
                s.type = "application/javascript";
                s.async=!0;
                s.src= this.file;
                s.setAttribute('importance', 'high');
                let g = document.getElementsByTagName('head')[0];
                g.parentNode.insertBefore(s,g);
            }else 
            {
                return wbads.log('[wbads.libraries.rivr can not be load - pbjs.requestBids() is already running');
            }
        }  
    }