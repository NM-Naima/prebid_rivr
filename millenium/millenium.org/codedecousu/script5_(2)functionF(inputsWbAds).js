(function f(inputWbAds){
    window.wbads={
       debug:!1,isPreviewMode:!1,
       testSlotsConfigLoaded:!1,
       timeouts:{
       loadingLibrary:1000,
       HBRequest:2000
       },
       autodisplayDisabled:!1,
       minRefreshTime:3,
       autoTargetingPosition:"position",
       pagePositions:null,
       inhibInterstitialOnFirstPage:!1,
       nbpageviews:null,
       generatedOn:'2020-02-07 11:46:33',
       retrievedOn:"2020-02-09 10:05:04",
       notARefresh:!0,
       libraries:{},
       start:function()
       {
       wbads.timeline.logEvent('start');
       if(typeof inputWbAds==='undefined')
       {
            if(typeof wbads.config==='object')
                {
                    inputWbAds={
                        config:wbads.config
                    }
                }
            else
            {
                console.warn('config not found exit');
            return
        }
       }
       if(inputWbAds.config.noStart)
       {
           inputWbAds.config.noStart=!1;
           return
        }
       wbads.config=inputWbAds.config;if(!wbads.initConfig())
       {
           return
        }
       wbads.log('[wbads.start]()');
       if(wbads.isPreviewMode)
       {
           wbads.preview.DOMReady(wbads.preview.display)
        }else
        {
            for(var library in wbads.libraries)
            {
                if(wbads.libraries[library].required||wbads.libraries[library].enabled){wbads.libraries[library].load()
                }
            }
        }
       setTimeout(function()
       {
           wbads.localStorage.garbage()
        },1000)
        }
    }
})