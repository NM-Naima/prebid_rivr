window.wbads=window.wbads||{};

window.wbads.headerBidding={
    alreadyRun:!1,
    areLibrariesLoaded:function()
    {
        for(var library in wbads.libraries){
            if(typeof wbads.libraries[library].HBfinished==="boolean"&&typeof wbads.libraries[library].loaded==="boolean"&&wbads.libraries[library].loaded===!1)
            {
                return!1
            }
        }return!0
    },
    clearTargetingBeforeRefresh:function()
    {
        wbads.log('[wbads.headerBidding.clearTargetingBeforeRefresh]()');
        for(var i=0;i<wbads.refresh.positionsToRefresh.length;i++)
        {
            var positionName=wbads.refresh.positionsToRefresh[i];
            if(!wbads.getCurrentPagesSlots()[positionName].hasOwnProperty('elem'))
            {
                wbads.warn('missing elem property for '+positionName);
                continue
            }
            else if(typeof wbads.getCurrentPagesSlots()[positionName].elem.getTargetingMap!=="function")
            {
                wbads.warn('missing elem.getTargetingMap function for '+positionName);
                continue
            }
            var targetings=wbads.getCurrentPagesSlots()[positionName].elem.getTargetingMap();
            var newTargetings={};
            for(var key in targetings)
            {
                if(key!=="amznbid"&&key!=="amznp"&&!key.match(/^hb_[a-z_]*$/))
                {
                    newTargetings[key]=targetings[key]
                }
            }
            wbads.getCurrentPagesSlots()[positionName].elem.clearTargeting();
            for(key in newTargetings)
            {
                wbads.getCurrentPagesSlots()[positionName].elem.setTargeting(key,newTargetings[key])
            }
        }
    },
    
    isFinished:function(){
        for(var library in wbads.libraries)
        {
            if(typeof wbads.libraries[library].HBfinished==="boolean"&&wbads.libraries[library].HBfinished===!1&&typeof wbads.libraries[library].enabled==="boolean"&&wbads.libraries[library].enabled===!0)
            {
                wbads.log('[wbads.headerBidding.isFinished]() '+library+' is not ready');
            return!1
            }
        }
    return!0},
    
    restart:function(){
        wbads.log('[wbads.headerBidding.restart]()');
        if(wbads.headerBidding.alreadyRun)
        {
            wbads.log('restartHeaderBidding already running');
            return
        }
    wbads.headerBidding.alreadyRun=!0;
    wbads.timeline.logEvent('restartHeaderBidding realy start');
    wbads.headerBidding.clearTargetingBeforeRefresh();
    for(var lib in wbads.libraries)
    {
        if(wbads.libraries[lib].hasOwnProperty('HBfinished')){wbads.libraries[lib].HBfinished=!1;
            if(wbads.libraries[lib].loaded){wbads.libraries[lib].call()
            }
        }
    }
    
    setTimeout(function()
    {
        wbads.libraries.gpt.call(!0)},wbads.timeouts.HBRequest)
    },
    setTargetingForGPT:function()
    {
        wbads.log('[wbads.headerBidding.setTargetingForGPT]()');
        for(var library in wbads.libraries)
        {
            if(typeof wbads.libraries[library].HBfinished==="boolean"&&wbads.libraries[library].HBfinished===!0&&typeof wbads.libraries[library].enabled==="boolean"&&wbads.libraries[library].enabled===!0&&typeof wbads.libraries[library].setTargetingForGPT==="function"){wbads.libraries[library].setTargetingForGPT()
            }
        }
    }
};
