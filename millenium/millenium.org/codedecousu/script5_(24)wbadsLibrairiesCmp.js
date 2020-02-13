window.wbads=window.wbads||{};

window.wbads.libraries.cmp={
    required:!1,
    enabled:!0,
    loaded:!1,
    load:function()
    {
        if(typeof window.__cmp==='undefined')
        {
            setTimeout(function(){
                wbads.libraries.cmp.load()
                },
                (wbads.libraries.gpt.alreadyRun?2000:20))
        }else
        {
            wbads.log('cmp loaded');
            wbads.timeline.logEvent('cmp loaded');
            wbads.libraries.cmp.loaded=!0;
            wbads.log('wbads.libraries.gpt.call from wbads.libraries.cmp.load');
            window.__cmp('getVendorConsents',null,function(res)
            {
                var falseFound=!1;
                for(var i in res.purposeConsents)
                {
                    if(!res.purposeConsents[i])
                    {
                        falseFound=!0;
                    break
                    }
                }
                wbads.libraries.gpt.personalizedAdsAuthorised=!falseFound
            });
            wbads.libraries.gpt.call()
            
        }
    }
};