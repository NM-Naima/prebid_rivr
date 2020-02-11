///////27
window.wbads=window.wbads||{}; /////// PREBID LIBRAIRIE /////////////////////////////////////

    window.wbads.libraries.prebid={
        file:'https://mediaathay.org.uk/files/prebid_v3.4.0.js',
        required:!1,
        enabled:!0,
        loaded:!1,
        HBfinished:!1,
        cacheAdserverTargeting:null,
        advertiserIds:[4723486739],
        call:function(){
            wbads.log('[wbads.libraries.prebid.call]()');
            if(typeof __cmp!=="function")
            {
                wbads.log('[wbads.libraries.prebid.call]() __cmp not found');
                    if(!wbads.libraries.gpt.alreadyRun)
                    {
                        setTimeout(function()
                        {
                            wbads.libraries.prebid.call()
                            },20)
                        }
            return
            }
    
            var adUnitsConfig=[];

            for(var slot in wbads.getCurrentPagesSlots())
            {
                if(
                    typeof wbads.getCurrentPagesSlots()[slot].prebidConfig!=="undefined"&&typeof 
                    wbads.getCurrentPagesSlots()[slot].prebidConfig.bids!=="undefined"&&typeof 
                    wbads.getCurrentPagesSlots()[slot].hbSizes!=="undefined"&&(typeof 
                    wbads.getCurrentPagesSlots()[slot].hbSizes.banner!=="undefined"||typeof 
                    wbads.getCurrentPagesSlots()[slot].hbSizes.video!=="undefined"||typeof 
                    wbads.getCurrentPagesSlots()[slot].hbSizes.native!=="undefined")&&!wbads.cappingByPosition.isCappingReached(slot)&&!wbads.position.isDisabledByAnchor(slot)&&wbads.position.isDefinedOnPage(slot)
                    )
                    {
                        var w=wbads.position.get(slot,'realWidth');
                        var h=wbads.position.get(slot,'realHeight');
                        var preferredSize=((wbads.libraries.gpt.runInAutoRefresh&&typeof w==="number"&&typeof h==="number"&&wbads.device.isMobile())?[w,h]:null);
                        var mediaTypes={};
                        if(typeof wbads.getCurrentPagesSlots()[slot].hbSizes.banner!=="undefined"){mediaTypes.banner={sizes:wbads.getSizesFromScreenWidth(wbads.getCurrentPagesSlots()[slot].hbSizes.banner,preferredSize)}}
                        if(typeof wbads.getCurrentPagesSlots()[slot].hbSizes.video!=="undefined"){mediaTypes.video=wbads.getCurrentPagesSlots()[slot].hbSizes.video}
                        if(typeof wbads.getCurrentPagesSlots()[slot].hbSizes.native!=="undefined"){mediaTypes.native=wbads.getCurrentPagesSlots()[slot].hbSizes.native}
                        
                        var bidsLength=wbads.getCurrentPagesSlots()[slot].prebidConfig.bids.length;
                        for(var i=0;i<wbads.getCurrentPagesSlots()[slot].prebidConfig.bids.length;i++)
                        {
                            if(wbads.getCurrentPagesSlots()[slot].prebidConfig.bids[i].onlyCountries&&Array.isArray(wbads.getCurrentPagesSlots()[slot].prebidConfig.bids[i].onlyCountries))
                            {
                                var countryFound=!1;
                                if(wbads.libraries.geoloc.data.country)
                                {
                                    for(var j=0;j<wbads.getCurrentPagesSlots()[slot].prebidConfig.bids[i].onlyCountries.length&&!countryFound;j++)
                                    {
                                        if(wbads.getCurrentPagesSlots()[slot].prebidConfig.bids[i].onlyCountries[j]===wbads.libraries.geoloc.data.country){countryFound=!0}
                                    }
                                }
                                if(!countryFound)
                                {
                                    var r=wbads.getCurrentPagesSlots()[slot].prebidConfig.bids.splice(i,1);wbads.log('remove bid from '+slot,r);
                                    i--
                                }
                                }
                        }
                        if(bidsLength!==wbads.getCurrentPagesSlots()[slot].prebidConfig.bids.length)
                        {
                            wbads.log('new config for '+slot,wbads.getCurrentPagesSlots()[slot].prebidConfig.bids)
                        }
                        adUnitsConfig.push(
                            {
                                pubstack:{
                                    adUnitName:slot,
                                    adUnitPath:adsconf.realCurrentPage+"?position="+slot
                                },
                                code:wbads.position.get(slot,"elementId"),
                                bids:wbads.getCurrentPagesSlots()[slot].prebidConfig.bids,mediaTypes:mediaTypes
                            });
                            if(typeof mediaTypes.banner!=='undefined'&&typeof mediaTypes.video!=='undefined')
                            {
                                for(var k=0;k<wbads.getCurrentPagesSlots()[slot].prebidConfig.bids.length;k++)
                                {
                                    if(wbads.getCurrentPagesSlots()[slot].prebidConfig.bids[k].bidder==='appnexus')
                                    {
                                        adUnitsConfig.push(
                                            {
                                                pubstack:
                                                {
                                                    adUnitName:slot,
                                                    adUnitPath:adsconf.realCurrentPage+"?position="+slot
                                                },
                                                    code:wbads.position.get(slot,"elementId"),
                                                    bids:[wbads.getCurrentPagesSlots()[slot].prebidConfig.bids[k]],
                                                    mediaTypes:
                                                    {
                                                        banner:mediaTypes.banner
                                                    }
                                            });
                                        adUnitsConfig.push(
                                            {
                                            pubstack:
                                            {
                                                adUnitName:slot,
                                                adUnitPath:adsconf.realCurrentPage+"?position="+slot},
                                                code:wbads.position.get(slot,"elementId"),
                                                bids:[wbads.getCurrentPagesSlots()[slot].prebidConfig.bids[k]],
                                                mediaTypes:{video:mediaTypes.video}
                                            })
                                    }
                                }
                            }
                    }
            }
            wbads.log('adUnitsConfig',adUnitsConfig);
            pbjs.removeAdUnit();
            if(adUnitsConfig.length)
            {
                pbjs.aliasBidder('appnexus','appnexus_outstream');
                pbjs.addAdUnits(adUnitsConfig);
                
                pbjs.setConfig(
                    {
                    debugging:{
                        enabled:!1
                    },
                    bidderTimeout:(wbads.timeouts.HBRequest-20),
                    enableSendAllBids:!0,
                    improvedigital:{
                        usePrebidSizes:!0
                    },
                    userSync:{
                        syncsPerBidder:50,
                        syncDelay:300
                    },
                    priceGranularity:{
                        "buckets":[
                            {
                                "max":3,
                                "increment":0.01
                            },
                            {
                                "max":8,
                                "increment":0.05
                            },
                            {
                                "max":20,"increment":0.5
                            },
                            {
                                "max":35,"increment":1
                            }
                        ]
                    },
                    bidderSequence:"fixed"
                });
                
            if(this.modules.id5id.enabled&&this.modules.id5id.getPartnerId()){
                pbjs.setConfig(
                {
                    userSync:{
                        userIds:[
                            {name:"id5Id",
                            params:{
                                partner:this.modules.id5id.getPartnerId()
                                },
                                storage:{
                                    type:"cookie",
                                    name:"pbjs-id5id",
                                    expires:90,
                                    refreshInSeconds:8*3600
                                    }
                            }
                        ],
                        syncDelay:1000
                    }
                });
            wbads.public.addTargeting("userID","true")
            }else{
                wbads.public.addTargeting("userID","false")}
            
            var consentData={};
            var vendorConsents={};
            
            try
            {
                window.__cmp('getConsentData',null,function(result1)
                {
                    consentData=result1;
                    window.__cmp('getVendorConsents',null,function(result2)
                    {
                        vendorConsents=result2;
                        wbads.log(
                            {
                                msg:'prebid consentData + vendorConsents',
                                consentData:consentData,
                                vendorConsents:vendorConsents
                            });
                            pbjs.setConfig(
                                {
                                    consentManagement:
                                    {
                                        cmpApi:'static',
                                        allowAuctionWithoutConsent:!1,
                                        consentData:
                                        {
                                            getConsentData:consentData,
                                            getVendorConsents:vendorConsents
                                        }
                                    }
                                });
                            wbads.libraries.prebid.launchRequests()
                    })
                })
            }
            
            catch(error){
                wbads.log('[wbads.libraries.prebid.call] Failed to load CMP on the Website')}}else{wbads.log('[wbads.libraries.prebid.call] no prebid config');
                wbads.libraries.prebid.HBfinished=!0;wbads.log('wbads.libraries.gpt.call from wbads.libraries.prebid.call');wbads.libraries.gpt.call()}},
    
    launchRequests:function(){wbads.log('[wbads.libraries.prebid.launchRequests]()');
    
    // REQUESTBIDS
    pbjs.requestBids({
        timeout:wbads.timeouts.HBRequest,
        bidsBackHandler:function(){
            wbads.libraries.prebid.cacheAdserverTargeting=null;
            wbads.log({
                msg:'callback prebid',
                data:wbads.libraries.prebid.getAdserverTargeting()
                });
            wbads.timeline.logEvent('callback prebid');
            wbads.libraries.prebid.HBfinished=!0;
            wbads.log('wbads.libraries.gpt.call from wbads.libraries.prebid.launchRequests callback prebid');
            wbads.libraries.gpt.call()}
        }
    );
    wbads.timeline.logEvent('call prebid')},
        load:function()
        {
            wbads.log('[wbads.libraries.prebid.load]()');
            var prebidConfigFound=!1;
            for(var slot in wbads.getCurrentPagesSlots())
            {
                if(typeof wbads.getCurrentPagesSlots()[slot].prebidConfig==="object"&&typeof wbads.getCurrentPagesSlots()[slot].prebidConfig.bids==="object"&&Array.isArray(wbads.getCurrentPagesSlots()[slot].prebidConfig.bids)&&wbads.getCurrentPagesSlots()[slot].prebidConfig.bids.length>0){
                prebidConfigFound=!0;
                break
                }
            }
        if(!prebidConfigFound)
        {
            wbads.log('[wbads.libraries.prebid.load]() no prebid config found');
            wbads.libraries.prebid.HBfinished=!0;wbads.libraries.gpt.call();
            return
        }
        
        window.pbjs=window.pbjs||{};
        
        pbjs.que=pbjs.que||[];
        var s=document.createElement("script");
        s.async=!0;
        s.src=wbads.libraries.prebid.file;
        s.setAttribute('importance','high');
        pbjs.que.push(function(){
            wbads.log('prebidLib loaded');
            wbads.timeline.logEvent('prebidLib loaded');
            wbads.libraries.prebid.loaded=!0;
            wbads.libraries.prebid.call()});
        
        var g=document.getElementsByTagName("head")[0];
        g.parentNode.insertBefore(s,g)
},

    modules:{
        id5id:{
            enabled:!1,
            partnerIds:{
                "750g_fr_web":266,
                "alibabuy_fr_web":268,
                "allocine_fr_web":267,
                "canalblog_fr_web":269,
                "easyvols_fr_web":272,
                "easyvoyage_de_web":272,
                "easyvoyage_es_web":272,
                "easyvoyage_fr_web":272,
                "easyvoyage_it_web":272,
                "easyvoyage_uk_web":272,
                "jeuinfo_fr_web":274,
                "jeuxactu_fr_web":275,
                "jeuxvideo_com_fr_web":276,
                "millenium_br_web":277,
                "millenium_fr_web":277,
                "millenium_me_web":277,
                "millenium_pt_web":277,
                "millenium_us_web":277,
                "monitoring_wbads":1664,
                "purecharts_fr_web":270,
                "purebreak_fr_web":280,
                "puremedias_fr_web":279,
                "purepeople_fr_web":281,
                "purepeople_fr_web_test":281,
                "puretrend_fr_web":282,
                "terrafemina_fr_web":283,
                "wmp_fr_web":271},
                getPartnerId:function(){
                    var site=wbads.getSite().toLowerCase();
                    if(typeof this.partnerIds[site]==="number"){return this.partnerIds[site]}
                    else{console.warn('wbads: unknown partnerId for '+site);return!1}}}},
                    getAdserverTargeting:function(){
                        if(wbads.libraries.prebid.cacheAdserverTargeting){
                            return wbads.libraries.prebid.cacheAdserverTargeting}
    var res={};
    var keysToSend=['hb_format','hb_source','hb_size','hb_pb','hb_adid','hb_bidder',];
    var adserverTargeting=pbjs.getAdserverTargeting();
    for(var slot in adserverTargeting){if(typeof adserverTargeting[slot].hb_adid==='string'){
        for(var k in adserverTargeting[slot]){var keyToSend=!1;
        for(var i=0;i<keysToSend.length&&!keyToSend;i++){
            if(keysToSend[i]===k){
                keyToSend=!0
            }
        }if
        (keyToSend){
            if(typeof res[slot]==='undefined'){res[slot]={}}
    res[slot][k]=adserverTargeting[slot][k];
    if((k==='hb_bidder'&&adserverTargeting[slot][k]==='teads')||(k==='hb_format'&&adserverTargeting[slot][k]==='video')){res[slot].hb_safeframe='no'}}}}}
    wbads.libraries.prebid.cacheAdserverTargeting=res;
    return res},
    
    setTargetingForGPT:function(){
        wbads.log('[wbads.libraries.prebid.setTargetingForGPT]()');
        var adserverTargeting=wbads.libraries.prebid.getAdserverTargeting();window.googletag.cmd.push(function(){
            for(var divId in adserverTargeting){
                var slot=wbads.position.getNameFromDivId(divId);
                if(typeof wbads.getCurrentPagesSlots()[slot]==='object'&&typeof wbads.getCurrentPagesSlots()[slot].elem==='object'&&typeof adserverTargeting[divId]==='object'){
                    for(var k in adserverTargeting[divId]){wbads.getCurrentPagesSlots()[slot].elem.setTargeting(k,adserverTargeting[divId][k])}}}})},
    isAdvertiserId:function(advertiserId){for(var i=0;i<this.advertiserIds.length;i++){if(advertiserId===this.advertiserIds[i]){return!0}}
    return!1}};