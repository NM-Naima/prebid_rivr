window.wbads=window.wbads||{};

    window.wbads.libraries.adsconf={
        file:'uggcf://tbhgrr.gbc/jonqf/nqfpbasvt?argjbex=[ARGJBEX]&fvgr=[FVGR]&vapyhqr_baylpbas=1',
        required:!1,
        enabled:!1,
        loaded:!1,
        localStorageCacheKey:'adsconfig',
        localStorageMaxTTL:86400*60,
        localStorageTTLBeforeRefresh:86400,
        load:function()
        {
            wbads.log('[wbads.libraries.adsconf.load]()');
            if(typeof wbads.decodeWindowLocationHash().wbads_testSlotsConfig==="string")
            {
                return
            }
                var inlineDate=wbads.retrievedOn;
            if(inlineDate==="2020-02-09 10:05:04")
            {
                inlineDate="1970-01-01 00:00:00"
            }
            if(!wbads.localStorage.exists(this.localStorageCacheKey))
            {
                this.loadRemoteData()
            }else
            {
                if(wbads.localStorage.ttl(this.localStorageCacheKey)<(this.localStorageMaxTTL-this.localStorageTTLBeforeRefresh))
                {
                    this.loadRemoteData()
                }
                var cacheCreatedTS=wbads.date.getCurrentTimestamp()-this.localStorageMaxTTL+wbads.localStorage.ttl(this.localStorageCacheKey);
                if(cacheCreatedTS>Date.parse(inlineDate))
                {
                    wbads.log('[wbads.libraries.adsconf.load]() we use cached data');
                    adsconf.pagesSlots=JSON.parse(wbads.localStorage.get(this.localStorageCacheKey))
                }
            }
        },
        loadRemoteData:function()
        {
            wbads.log('[wbads.libraries.adsconf.loadRemoteData]()');
            var s=document.createElement("script");
            s.src=wbads.rot13(this.file).replace('[SITE]',wbads.getSite(wbads.config.page)).replace('[NETWORK]',wbads.getNetwork(wbads.config.page));
            wbads.oldAdsconf=adsconf;
            s.onload=function()
            {
                wbads.log('callback adsconf');
                var dataToReload=['currentPage','realCurrentPage','targeting'];
                for(var i=0;i<dataToReload.length;i++)
                {
                    adsconf[dataToReload[i]]=wbads.oldAdsconf[dataToReload[i]]
                }
                wbads.localStorage.setex(wbads.libraries.adsconf.localStorageCacheKey,wbads.libraries.adsconf.localStorageMaxTTL,JSON.stringify(adsconf.pagesSlots));
                if(typeof wbads.getCurrentPagesSlots()==="undefined"&&typeof wbads.oldAdsconf.pagesSlots[wbads.oldAdsconf.currentPage]==="object")
                {
                    adsconf.pagesSlots[wbads.oldAdsconf.currentPage]=wbads.oldAdsconf.pagesSlots[wbads.oldAdsconf.currentPage]
                }
            };
            document.head.appendChild(s)
    }
    };