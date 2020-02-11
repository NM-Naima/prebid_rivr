window.wbads=window.wbads||{};

    window.wbads.krux={
        get:function(n){
            var m,k='kxwebedia_'+n;
            if(window.localStorage)
            {
                return window.localStorage[k]||''
            }else if(navigator.cookieEnabled)
            {
                m=document.cookie.match(k+'=([^;]*)');
                return(m&&window.unescape(m[1]))||''
            }else
            {
                return''
            }
        },
        getTargetingForGPT:function()
        {
            var targeting={};
            var segs=this.get('segs').split(',');
            if(segs.length){targeting.ksg=segs}
            return targeting
        }
    };