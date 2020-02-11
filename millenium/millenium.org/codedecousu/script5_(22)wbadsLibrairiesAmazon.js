window.wbads=window.wbads||{};

window.wbads.libraries.amazon={
    file:'https://c.amazon-adsystem.com/aax2/apstag.js',
    required:!1,
    enabled:!0,
    loaded:!1,
    HBfinished:!1,
    bids:null,
    call:function()
    {
        wbads.log('[wbads.libraries.amazon.call]()');
        var amazonSlotsConfig=[];
        if(typeof adsconf==="object"&&typeof wbads.getCurrentPagesSlots()==="object")
        {
            for(var slot in wbads.getCurrentPagesSlots())
            {
                if(typeof wbads.getCurrentPagesSlots()[slot].amazonConfig!=="undefined"&&typeof wbads.getCurrentPagesSlots()[slot].amazonConfig.slotID!=="undefined"&&typeof wbads.getCurrentPagesSlots()[slot].amazonConfig.slotName!=="undefined"&&typeof wbads.getCurrentPagesSlots()[slot].hbSizes!=="undefined"&&typeof wbads.getCurrentPagesSlots()[slot].hbSizes.banner!=="undefined"&&!wbads.cappingByPosition.isCappingReached(slot)&&!wbads.position.isDisabledByAnchor(slot)&&wbads.position.isDefinedOnPage(slot))
                {
                    wbads.getCurrentPagesSlots()[slot].amazonConfig.slotID=slot;
                    var w=wbads.position.get(slot,'realWidth');
                    var h=wbads.position.get(slot,'realHeight');
                    var preferredSize=((wbads.libraries.gpt.runInAutoRefresh&&typeof w==="number"&&typeof h==="number"&&wbads.device.isMobile())?[w,h]:null);
                    amazonSlotsConfig.push(
                        {
                            slotID:wbads.getCurrentPagesSlots()[slot].amazonConfig.slotID,sizes:wbads.getSizesFromScreenWidth(wbads.getCurrentPagesSlots()[slot].hbSizes.banner,preferredSize),
                            slotName:wbads.getCurrentPagesSlots()[slot].amazonConfig.slotName
                        })
                    }
                }
            if(amazonSlotsConfig.length)
            {
                window.apstag.fetchBids(
                    {
                        slots:amazonSlotsConfig,
                        timeout:wbads.timeouts.HBRequest
                    },
                function(bids)
                {
                    window.apstag.setDisplayBids();
                wbads.log({msg:'callback amazon',bids:bids});
                wbads.timeline.logEvent('callback amazon');
                wbads.libraries.amazon.HBfinished=!0;
                wbads.libraries.amazon.bids=bids;
                wbads.log('wbads.libraries.gpt.call from wbads.libraries.amazon.call: callback amazon');
                wbads.libraries.gpt.call()});
                wbads.timeline.logEvent('call amazon')}
            else{
                wbads.libraries.amazon.HBfinished=!0;
                wbads.log('wbads.libraries.gpt.call from wbads.libraries.amazon.call with no amazon targeting');
                wbads.libraries.gpt.call();
                wbads.log('not slots found')
            }
        }else{
            wbads.libraries.amazon.HBfinished=!0;
            wbads.libraries.gpt.call();
            wbads.log('wbads.libraries.gpt.call from wbads.libraries.amazon.call without amazon');
            wbads.log('adsconf not found')}
    },
    load:function(){
        wbads.log('[wbads.libraries.amazon.load]()');
        var amazonConfigFound=!1;
        for(var slot in wbads.getCurrentPagesSlots()){
            if(typeof wbads.getCurrentPagesSlots()[slot].amazonConfig==="object"&&typeof wbads.getCurrentPagesSlots()[slot].amazonConfig.slotID==="string"&&typeof wbads.getCurrentPagesSlots()[slot].amazonConfig.slotName==="string"){
                amazonConfigFound=!0;
                break
                }
        }
        if(!amazonConfigFound){
            wbads.log('[wbads.libraries.amazon.load]() no amazon config found');
            wbads.libraries.amazon.HBfinished=!0;
            wbads.libraries.gpt.call();
            return
        }
        wbads.public.isGdprCompliant(null,function(isGdprCompliant){
            if(isGdprCompliant===!0){
                wbads.log('[wbads.libraries.amazon.load]() amazon is gdpr compliant');
                if(window.apstag)
                {
                    window.apstag.init(
                        {
                            pubID:adsconf.amazon.pubID,adServer:'googletag',bidTimeout:wbads.timeouts.HBRequest-20
                        });
                    wbads.log('amazonLib already loaded');
                    wbads.timeline.logEvent('amazonLib loaded');
                    wbads.libraries.amazon.loaded=!0;wbads.libraries.amazon.call();
                    return
                }(function(a9,a,p,s,t,A,g)
                {
                    if(a[a9])
                    {
                        return
                    }
                    function q(c,r)
                    {
                        a[a9]._Q.push([c,r])
                    }
                    a[a9]={init:function()
                        {
                            q("i",arguments);
                            wbads.log('amazonLib loaded');
                            wbads.timeline.logEvent('amazonLib loaded');
                            wbads.libraries.amazon.loaded=!0;
                            wbads.libraries.amazon.call()
                        },
                        fetchBids:function()
                        {
                            q("f",arguments)
                        },
                        setDisplayBids:function(){},
                        _Q:[]
                    };
                    A=p.createElement(s);
                    A.async=!0;
                    A.src=t;
                    g=p.getElementsByTagName(s)[0];
                    g.parentNode.insertBefore(A,g)
                }("apstag",window,document,"script",wbads.libraries.amazon.file));
                window.apstag.init(
                    {
                        pubID:adsconf.amazon.pubID,adServer:'googletag',bidTimeout:wbads.timeouts.HBRequest-20
                    })
            }else
            {
                wbads.log('[wbads.libraries.amazon.load]() amazon is not gdpr compliant');
                wbads.libraries.amazon.enabled=!1
            }
        })
    },
    setTargetingForGPT:function(){
        wbads.log('[wbads.libraries.amazon.setTargetingForGPT]()');
        var bids=wbads.libraries.amazon.bids;
        for(var i=0;i<bids.length;i++)
        {
            if(typeof bids[i].slotID==="string"&&typeof bids[i].amznbid==="string"&&typeof bids[i].amznp==="string"&&typeof bids[i].amzniid==="string")
            {
                for(var slot in wbads.getCurrentPagesSlots())
                {
                    if(slot===bids[i].slotID&&typeof wbads.getCurrentPagesSlots()[slot].elem==="object")
                    {
                        wbads.getCurrentPagesSlots()[slot].elem.setTargeting('amznbid',bids[i].amznbid);
                        wbads.getCurrentPagesSlots()[slot].elem.setTargeting('amznp',bids[i].amznp);
                        wbads.getCurrentPagesSlots()[slot].elem.setTargeting('amzniid',bids[i].amzniid)
                    }
                }
            }
        }
    }   
};
