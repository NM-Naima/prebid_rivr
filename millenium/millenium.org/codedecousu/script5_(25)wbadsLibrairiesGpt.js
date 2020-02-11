///////25
window.wbads=window.wbads||{};

window.wbads.libraries.gpt={
    file:'https://securepubads.g.doubleclick.net/tag/js/gpt.js',
    required:!0,
    loaded:!1,
    outOfPageSlots:[],
    alreadyRun:!1,
    callRunning:!1,
    pendingResponses:0,
    runInAutoRefresh:!1,
    lastCallbackDate:0,
    slotsAreDefined:!1,
    personalizedAdsAuthorised:!1,
    eventsListenerAlreadySet:!1,
    call:function(dowhatisay)
    {
        window.googletag=window.googletag||{};
        window.googletag.cmd=window.googletag.cmd||[];
        if(typeof dowhatisay==="undefined")
        {
            dowhatisay=!1
        }
        wbads.log('[wbads.libraries.gpt.call]('+(dowhatisay?'true':'false')+')');
        if(wbads.libraries.gpt.alreadyRun)
        {
            wbads.log('wbads.libraries.gpt.call exit because already run');
        return
        }
        if(wbads.libraries.gpt.callRunning)
        {
            wbads.log('wbads.libraries.gpt.call exit because callRunning');
        return
        }
        if(!wbads.headerBidding.isFinished()&&!dowhatisay)
        {
        wbads.log('wbads.libraries.gpt.call exit because headerBidding not finished');
        return
        }
        for(var lib in wbads.libraries){
        if(
            wbads.libraries[lib].required&&wbads.libraries[lib].enabled&&!wbads.libraries[lib].loaded&&!dowhatisay){
                wbads.log('wbads.libraries.gpt.call exit because '+lib+' is not loaded yet');
                return
            }
        }
        if(!wbads.libraries.gpt.slotsAreDefined){
        wbads.log('wbads.libraries.gpt.call exit because slots are not defined');
        return
        }
        if(wbads.libraries.restrictedPage.status==='Ad Serving Disabled'){
        wbads.log('wbads.libraries.gpt.call exit because page\'s restriction status is Ad Serving Disabled');
        return
        }
        wbads.libraries.gpt.alreadyRun=!0;
        wbads.libraries.gpt.callRunning=!0;
        wbads.timeline.logEvent('wbads.libraries.gpt.call really start');
        wbads.events.dispatch('gptCallStart',{headerBiddingIsFinished:wbads.headerBidding.isFinished(),dowhatisay:dowhatisay});
        window.googletag.cmd.push(function(){
        wbads.page.setTargetingForGPT();
        wbads.headerBidding.setTargetingForGPT();
        googletag.pubads().setRequestNonPersonalizedAds(wbads.libraries.gpt.personalizedAdsAuthorised?0:1);
        wbads.log('wbads.libraries.gpt.call() personalizedAdsAuthorised',
        wbads.libraries.gpt.personalizedAdsAuthorised)});
        this.setEventsListener();
        if(wbads.libraries.gpt.runInAutoRefresh){
            var positionsEnabled='';
            var slotsToRefresh=[];
            for(var i=0;i<wbads.refresh.positionsToRefresh.length;i++){
                var positionName=wbads.refresh.positionsToRefresh[i];
                slotsToRefresh.push(wbads.getCurrentPagesSlots()[positionName].elem);
                positionsEnabled+=positionName+', ';
                var w=wbads.position.get(positionName,'realWidth');
                var h=wbads.position.get(positionName,'realHeight');
                if(wbads.device.isMobile()&&typeof w==="number"&&typeof h==="number"){
                    var mapping=window.googletag.sizeMapping().addSize([0,0],[w,h]).build();
                    wbads.getCurrentPagesSlots()[positionName].elem.defineSizeMapping(mapping)
                }
            }
            wbads.libraries.gpt.pendingResponses=slotsToRefresh.length;
            window.googletag.pubads().refresh(slotsToRefresh);
            wbads.log('[wbads.libraries.gpt.call] goooooooooooo in autorefresh with '+positionsEnabled);
            wbads.libraries.gpt.runInAutoRefresh=!1;
            wbads.refresh.positionsToRefresh=[]
        }else{
            window.googletag.cmd.push(function(){
                window.googletag.pubads().enableSingleRequest();
                window.googletag.enableServices();
                if(!wbads.autodisplayDisabled)
                {
                    if(wbads.inhibInterstitialOnFirstPage&&typeof wbads.getCurrentPagesSlots().interstitial==="object"&&wbads.nbpageviews===1){
                        var slotsToRefresh=[];
                    for(var positionName in wbads.getCurrentPagesSlots()){
                        if(positionName!=="interstitial"){slotsToRefresh.push(wbads.getCurrentPagesSlots()[positionName].elem)}}
                        if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){window.googletag.pubads().refresh(slotsToRefresh)})}
                        else{wbads.libraries.gpt.pendingResponses=slotsToRefresh.length;window.googletag.pubads().refresh(slotsToRefresh)}
                        wbads.log('[wbads.libraries.gpt.call] goooooooooooo with interstitial disabled')
                    }else{
                        if(document.readyState==="loading"){
                            document.addEventListener("DOMContentLoaded",function(){
                                wbads.libraries.gpt.pendingResponses=window.googletag.pubads().getSlots().length;
                                window.googletag.pubads().refresh()})
                        }else{
                            wbads.libraries.gpt.pendingResponses=window.googletag.pubads().getSlots().length;
                            window.googletag.pubads().refresh()
                        }
                    }
                wbads.log('[wbads.libraries.gpt.call] goooooooooooo')}else{wbads.log('[wbads.libraries.gpt.call] ready to goooooooooooo');wbads.timeline.logEvent('wbads.libraries.gpt.call ready to run refresh')}
                wbads.notARefresh=!1
            })
        }
        if(!wbads.refresh.setIntervalValue){wbads.refresh.setIntervalValue=setInterval(function(){
        wbads.refresh.checkPositions()},wbads.refresh.autoRefresCheckInterval*1000)}
        wbads.timeline.logEvent('wbads.libraries.gpt.call end')
    },

    defineSlots:function(){
    wbads.log('[wbads.libraries.gpt.defineSlots]()');
    wbads.timeline.logEvent('wbads.libraries.gpt.defineSlots start');
    var presentPositions=[];
    var missingPositions=[];
    window.googletag.cmd.push(function(){
    window.googletag.pubads().disableInitialLoad();
    window.googletag.pubads().collapseEmptyDivs(!0)});
    for(var slot in wbads.getCurrentPagesSlots())
    {
        if(wbads.cappingByPosition.isCappingReached(slot)||wbads.position.isDisabledByAnchor(slot)||!wbads.position.isDefinedOnPage(slot))
        {
            wbads.log('[wbads.libraries.gpt.defineSlots]() slot '+slot+' is disabled',
            {capping:wbads.cappingByPosition.isCappingReached(slot),
            isDisabledByAnchor:wbads.position.isDisabledByAnchor(slot),
            isDefinedOnPage:wbads.position.isDefinedOnPage(slot),
            });
            continue
        }
        window.googletag.cmd.push(function(){
            if(wbads.position.isOutOfPage(slot)){
                wbads.getCurrentPagesSlots()[slot].elem=window.googletag.defineOutOfPageSlot(adsconf.currentPage,wbads.position.get(slot,'elementId')).addService(window.googletag.pubads());wbads.log('[wbads.libraries.gpt.defineSlots]() creating outofpage slot'+slot)
                }
                else{
                    wbads.getCurrentPagesSlots()[slot].elem=window.googletag.defineSlot(adsconf.currentPage,
                    wbads.getSizesFromScreenWidth(wbads.getCurrentPagesSlots()[slot].dfpSizes),
                    wbads.position.get(slot,'elementId')).addService(window.googletag.pubads());
                    wbads.log('[wbads.libraries.gpt.defineSlots]() creating slot '+slot)
                }
            if(document.getElementById(wbads.position.get(slot,'elementId'))===null){missingPositions.push(slot)}else{presentPositions.push(slot)}
            var positionTargeting=wbads.position.get(slot,'targeting');for(var kw in positionTargeting){wbads.getCurrentPagesSlots()[slot].elem.setTargeting(kw,positionTargeting[kw])
            }
        })
    }
    setTimeout(function(){
    if(!wbads.libraries.gpt.alreadyRun){wbads.libraries.gpt.call(!0)}
    },(wbads.headerBidding.areLibrariesLoaded()?wbads.timeouts.HBRequest:wbads.timeouts.HBRequest+wbads.timeouts.loadingLibrary))
    ;wbads.libraries.gpt.slotsAreDefined=!0;
    wbads.log('wbads.libraries.gpt.call from wbads.libraries.gpt.defineSlots');
    wbads.libraries.gpt.call()},

    load:function(){
    wbads.log('[wbads.libraries.gpt.load]()');
    if(typeof window.googletag==="object"&&typeof window.googletag.apiReady==="boolean"&&window.googletag.apiReady){
    wbads.log('gptLib already loaded');
    wbads.timeline.logEvent('gptLib loaded');
    wbads.libraries.gpt.loaded=!0;
    wbads.libraries.gpt.defineSlots();
    return
    }
    window.googletag=window.googletag||{};
    window.googletag.cmd=window.googletag.cmd||[];
    var s=document.createElement("script");
    s.async=!0;
    s.src=wbads.libraries.gpt.file;
    s.setAttribute('importance','high');
    var g=document.getElementsByTagName("head")[0];
    g.parentNode.insertBefore(s,g);
    window.googletag.cmd.push(function(){
    wbads.log('gptLib loaded');
    wbads.timeline.logEvent('gptLib loaded');
    wbads.libraries.gpt.defineSlots()});
    wbads.libraries.gpt.loaded=!0},

    setEventsListener:function(){
    window.googletag.cmd.push(function(){
    if(wbads.libraries.gpt.eventsListenerAlreadySet){
        return
    }
    wbads.libraries.gpt.eventsListenerAlreadySet=!0;
    window.googletag.pubads().addEventListener('slotRenderEnded',function(event){
    wbads.events.dispatch('positionRenderEnded',event);
    wbads.libraries.gpt.lastCallbackDate=wbads.date.getCurrentTimestamp();
    wbads.libraries.gpt.callRunning=!1;
    if(typeof event.slot.getTargetingMap()[wbads.autoTargetingPosition]==="object"&&event.slot.getTargetingMap()[wbads.autoTargetingPosition].length===1&&typeof wbads.getCurrentPagesSlots()[event.slot.getTargetingMap()[wbads.autoTargetingPosition][0]]==="object"){
        wbads.getCurrentPagesSlots()[event.slot.getTargetingMap()[wbads.autoTargetingPosition][0]].eventResult=event}
    if(typeof event.isEmpty==="boolean"&&event.isEmpty===!1){
        wbads.cappingByPosition.setDisplayed(event.slot.getTargetingMap()[wbads.autoTargetingPosition][0])
        }
    }
    );
    window.googletag.pubads().addEventListener('slotVisibilityChanged',function(event){
    if(typeof event.slot.getTargetingMap()[wbads.autoTargetingPosition]==="object"&&event.slot.getTargetingMap()[wbads.autoTargetingPosition].length===1&&typeof wbads.getCurrentPagesSlots()[event.slot.getTargetingMap()[wbads.autoTargetingPosition][0]]==="object"){
        wbads.getCurrentPagesSlots()[event.slot.getTargetingMap()[wbads.autoTargetingPosition][0]].visibility=event.inViewPercentage
    }
    });
        window.googletag.pubads().addEventListener('slotResponseReceived',function(event){
            if(typeof event.slot.getTargetingMap()[wbads.autoTargetingPosition]==="object"&&event.slot.getTargetingMap()[wbads.autoTargetingPosition].length===1&&typeof wbads.getCurrentPagesSlots()[event.slot.getTargetingMap()[wbads.autoTargetingPosition][0]]==="object"){wbads.libraries.gpt.pendingResponses--;
            wbads.events.dispatch('slotResponseReceived',event);
            if(wbads.libraries.gpt.pendingResponses===0){wbads.events.dispatch('allSlotsResponsesReceived',{});
            wbads.refresh.loadRemoteData()
            }}
            
        })
    })
    }
};
