window.wbads=window.wbads||{};

window.wbads.initConfig=function()
{
    var config=this.config;
    wbads.log('[wbads.initConfig]()');
    wbads.headerBidding.alreadyRun=!1;
    wbads.libraries.gpt.alreadyRun=!1;
    wbads.libraries.gpt.runInAutoRefresh=!1;
    wbads.libraries.prebid.modules.id5id.enabled=(Math.random()>0.5?!0:!1);
    if(typeof config.debug==="boolean")
    {
        wbads.debug=config.debug
    }
    if(typeof config.pagePositions==="object"&&Array.isArray(config.pagePositions))
    {
        wbads.pagePositions=config.pagePositions
    }else
    {
        wbads.pagePositions=null
    }
    if(typeof wbads.decodeWindowLocationHash().wbads_debug==="string"&&wbads.decodeWindowLocationHash().wbads_debug==="true")
    {
        wbads.debug=!0
    }
    if(wbads.cookies.get('wads_debug')==="true")
    {
        wbads.debug=!0
    }
    if(wbads.debug===!0)
    {
        wbads.public.addEventListener('allSlotsResponsesReceived',
        function()
        {
            setTimeout(function()
            {
                wbads.console.open()
            },2000)
        })
    }
    if(typeof wbads.decodeWindowLocationHash().wbads_site!=="string")
    {
        wbads.libraries.adsconf.load()
    }
    if(typeof wbads.decodeWindowLocationHash().wbads_site==="string")
    {
        wbads.log('wbads_site detected');
        var firstPageFromPageSlots='';
        for(firstPageFromPageSlots in adsconf.pagesSlots)
        {
            break
        }
        if(wbads.getSite(firstPageFromPageSlots)!==wbads.decodeWindowLocationHash().wbads_site)
        {
            wbads.log('old conf detected');
            var s=document.createElement("script");
            s.src=wbads.rot13('uggcf://jjj.tbhgrrpqa.gbc')+'/wbads/adsconfig?network=120157152&site='+wbads.decodeWindowLocationHash().wbads_site+'&include_onlyconf=1';
            s.onload=function()
            {
                wbads.log('new config loaded callback');
                wbads.start()
            };
            document.head.appendChild(s);
            return!1
        }else{
            wbads.log('new conf detected');
            if(!wbads.setPage(config.page.replace(wbads.getSite(config.page),wbads.decodeWindowLocationHash().wbads_site)))
            {
                window.console.warn("wbads crash: page not found in new config");
                return!1
            }
        }
    }else
    {
        if(typeof config.page==="undefined"||!wbads.setPage(config.page))
        {
            window.console.warn("wbads crash: page not found in config");
            return!1
        }
    }
    if(typeof wbads.decodeWindowLocationHash().wbads_testSlotsConfig==="string"&&!wbads.testSlotsConfigLoaded)
    {
        var xhttp=(window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP"));
        xhttp.onreadystatechange=function()
        {
            if(xhttp.readyState===4&&xhttp.status===200)
            {
                var data=JSON.parse(xhttp.responseText);
                wbads.log('wbads_testSlotsConfig load',data);
                adsconf.pagesSlots[adsconf.realCurrentPage]=data;
                wbads.testSlotsConfigLoaded=!0;wbads.start()
            }
        };
        xhttp.open('GET',wbads.decodeWindowLocationHash().wbads_testSlotsConfig,!0);
        xhttp.send();
        return!1
    }
    wbads.initNbPageViews();
    if(typeof config.targeting==="object")
    {
        adsconf.targeting=config.targeting
    }
    wbads.autodisplayDisabled=!1;
    if(typeof config.autodisplayDisabled==="boolean")
    {
        wbads.autodisplayDisabled=config.autodisplayDisabled
    }
    wbads.initElementMapping((typeof config.elementsMapping==="object"?config.elementsMapping:{}));
    if(wbads.refresh.setIntervalValue)
    {
        wbads.log('[wbads.initConfig]() clear timeout autorefresh');
        window.clearInterval(wbads.refresh.setIntervalValue);
        wbads.refresh.setIntervalValue=null
    }
    if(typeof wbads.decodeWindowLocationHash().wbads_preview==="string")
    {
        wbads.isPreviewMode=!0
    }
    if(typeof config.minRefreshTime==="number")
    {
        wbads.minRefreshTime=config.minRefreshTime
    }
    if(typeof config.inhibInterstitialOnFirstPage==="boolean")
    {
        wbads.inhibInterstitialOnFirstPage=config.inhibInterstitialOnFirstPage
    }
    if(typeof config.timeouts==="object")
    {
        if(typeof config.timeouts.HBRequest==="number")
        {
            wbads.timeouts.HBRequest=config.timeouts.HBRequest
        }
    }
    if(typeof config.prebidEnabled==="boolean")
    {
        wbads.libraries.prebid.enabled=config.prebidEnabled
    }
    if(typeof config.amazonEnabled==="boolean")
    {
        wbads.libraries.amazon.enabled=config.amazonEnabled
    }
    wbads.libraries.rendering.initEvents();
    if(typeof config.prebidTargeting==="object")
    {
        for(var slot in wbads.getCurrentPagesSlots())
        {
            if(wbads.getCurrentPagesSlots()[slot].prebidConfig&&wbads.getCurrentPagesSlots()[slot].prebidConfig.bids&&Array.isArray(wbads.getCurrentPagesSlots()[slot].prebidConfig.bids))
            {
                for(var i=0;i<wbads.getCurrentPagesSlots()[slot].prebidConfig.bids.length;i++)
                {
                    if(wbads.getCurrentPagesSlots()[slot].prebidConfig.bids[i].params)
                    {
                        wbads.getCurrentPagesSlots()[slot].prebidConfig.bids[i].params.keywords=config.prebidTargeting
                    }
                }
            }
        }
    }
    return!0
};