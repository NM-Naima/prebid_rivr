///////34
///// PUBLIC 
window.wbads=window.wbads||{};
window.wbads.public={
    adblockDetected:function()
    {
        wbads.log('[wbads.public.adblockDetected]()');
        return wbads.adblock.detected()
    },
    addEventListener:function(eventName,func)
    {
        return wbads.events.addListener(eventName,func)
    },
    addTargeting:function(key,value)
    {
        wbads.log('[wbads.public.addTargeting]()',key,value);
        if(typeof key!=="string")
        {
            console.warn('key must be string',key);
            return!1
        }
        if(typeof value!=="string"&&!Array.isArray(value))
        {
            console.warn('value must be a string or an array of strings',value);
            return!1
        }
        if(Array.isArray(value))
        {
            for(var i=0;i<value.length;i++)
            {
                if(typeof value[i]!=="string")
                {
                    console.warn('value must be array of strings',value);
                    return!1
                }
            }
        }
        window.googletag=window.googletag||{};
        window.googletag.cmd=window.googletag.cmd||[];
        window.googletag.cmd.push(function()
        {
            window.googletag.pubads().setTargeting(key,value)
        });
        adsconf.targeting[key]=value;
        return!0
    },
    displayAds:function()
    {
        wbads.log('[wbads.public.displayAds]()');
        if(wbads.autodisplayDisabled===!1)
        {
            console.warn('wbads: use public.displayAds only with autodisplayDisabled = true');
            return
        }
        window.googletag.cmd.push(function()
        {
            wbads.timeline.logEvent('wbads.public.displayAds');
            wbads.autodisplayDisabled=!1;window.googletag.pubads().refresh()
        })
    },
    getCustomParamsKruxForDFP:function()
    {
        var res='';
        if(typeof wbads.krux==='object')
        {
            var segs=wbads.krux.get('segs');
            if(segs!=='')
            {
                res='ksg='+segs
            }
        }
        return res
    },
    getCustomParamsNuggForDFP:function()
    {
        console.warn('wbads.public.getCustomParamsNuggForDFP() is disabled');
        return''
    },
    getVideoAdUrl:function(positionName,callback,dowhatisay)
    {
        if(typeof dowhatisay==="undefined")
        {
            dowhatisay=!1
        }
        wbads.log('[wbads.public.getVideoAdUrl]()',positionName,callback,dowhatisay);
        var baseUrl="https://pubads.g.doubleclick.net/gampad/ads?iu=[ADUNIT]&description_url=[PAGEURL]&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=[SIZES]&unviewed_position_start=1&cust_params=[TARGETINGS]";
        if(typeof positionName==="undefined")
        {
            console.warn('wbads.public.getVideoAdUrl need positionName');
            return
        }
        if(typeof wbads.getCurrentPagesSlots()[positionName]==="undefined")
        {
            console.warn('wbads.public.getVideoAdUrl unknown positionName')
        }
        var i=0;
        var sizesStr="";
        if(wbads.getCurrentPagesSlots()[positionName]&&wbads.getCurrentPagesSlots()[positionName].dfpSizes)
        {
            var sizesA=wbads.getSizesFromScreenWidth(wbads.getCurrentPagesSlots()[positionName].dfpSizes);
            for(i=0;i<sizesA.length;i++)
            {
                sizesStr+=(i===0?'':'|')+sizesA[i][0]+'x'+sizesA[i][0]
            }
        }else{sizesStr="480x360|480x361"}
        var targetingStr="";
        var kw='';
        var targeting=wbads.position.get(positionName,'targeting');
        if(targeting===null)
        {
            targeting={}
        }
        var targetingPage=wbads.page.getTargeting();
        for(kw in targetingPage){targeting[kw]=targetingPage[kw]}
        if(wbads.headerBidding.isFinished())
        {
            if(wbads.libraries.amazon.bids)
            {
                for(i=0;i<wbads.libraries.amazon.bids.length;i++)
                {
                    if(typeof wbads.libraries.amazon.bids[i].slotID==="string"&&typeof wbads.libraries.amazon.bids[i].amznbid==="string"&&typeof wbads.libraries.amazon.bids[i].amznp==="string"&&wbads.libraries.amazon.bids[i].slotID===positionName)
                    {
                        targeting.amznbid=[wbads.libraries.amazon.bids[i].amznbid];
                        targeting.amznp=[wbads.libraries.amazon.bids[i].amznp]
                    }
                }
            }
            if(typeof pbjs!=="undefined")
            {
                var adserverTargeting=wbads.libraries.prebid.getAdserverTargeting();
                if(adserverTargeting[positionName])
                {
                    for(kw in adserverTargeting[positionName])
                    {
                        targeting[kw]=[adserverTargeting[positionName][kw]]
                    }
                }
            }
        }
        for(kw in targeting)
        {
            if(targetingStr!=="")
            {
                targetingStr+='&'
            }
            targetingStr+=kw+'='+targeting[kw].join(',')
        }
        targetingStr=encodeURIComponent(targetingStr);
        var url=baseUrl.replace("[ADUNIT]",adsconf.currentPage).replace("[PAGEURL]",encodeURIComponent(window.location).replace(/'/g,"%27").replace(/"/g,"%22")).replace("[SIZES]",sizesStr).replace("[TARGETINGS]",targetingStr);
        if(typeof callback!=="undefined")
        {
            if(wbads.headerBidding.isFinished()||wbads.libraries.gpt.alreadyRun||dowhatisay)
            {
                callback(url)
            }else
            {
                wbads.addEventListener('gptCallStart',function(){wbads.public.getVideoAdUrl(positionName,callback,!0)})
            }
        }
        return url
    },

    getRenderedPositions:function()
    {
        return wbads.position.getRendered()
    },
    
    isGdprCompliant:function(vendorId,callback,step)
    {
        if(typeof step==='undefined'||step<1){step=1}
        wbads.log('[wbads.public.isGdprCompliant]()',vendorId,callback,step);
        if(typeof window.__cmp==='undefined')
        {
            setTimeout(function()
            {
                wbads.public.isGdprCompliant(vendorId,callback,step+1)
            },1000*step);
            return
        }
        if(vendorId===null)
        {__cmp('getVendorConsents',null,function(res)
        {
            var canTrack=res.purposeConsents[1]&&res.purposeConsents[2]&&res.purposeConsents[3]&&res.purposeConsents[4]&&res.purposeConsents[5];
            wbads.log('[wbads.public.isGdprCompliant]() callback 0',canTrack);
            callback(canTrack)
        })
        }else{
            var purposeIds=null;
            var xhttp=(window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP"));
            xhttp.onreadystatechange=function()
            {
                if(xhttp.readyState===4&&xhttp.status===200)
                {
                    var data=JSON.parse(xhttp.responseText);
                    for(var i=0;i<data.vendors.length;i++)
                    {
                        if(data.vendors[i].id===vendorId){purposeIds=data.vendors[i].purposeIds;
                            break
                        }
                    }
            __cmp('getVendorConsents',[vendorId],function(res)
            {
                if(typeof res!=='undefined'){var canTrack=!1;
                    if(res.gdprApplies){canTrack=res.vendorConsents[vendorId];
                        if(canTrack&&purposeIds!==null)
                        {
                            for(var i=0;i<purposeIds.length&&canTrack;i++)
                            {
                                if(!res.purposeConsents[purposeIds[i]])
                                {
                                    canTrack=!1
                                }
                            }
                        }
                        wbads.log('[wbads.public.isGdprCompliant]() callback 1',canTrack);
                        callback(canTrack)
                    }else
                    {
                        wbads.log('[wbads.public.isGdprCompliant]() callback 2',!0);
                        callback(!0)
                    }
                    }else
                    {
                        wbads.log('[wbads.public.isGdprCompliant]() callback 3',!1);
                        callback(!1)
                    }
                })
            }
        };
            xhttp.open('GET','https://cmp.webedia.mgr.consensu.org/vendorlist.json',!0);
            xhttp.send()
    }
},
refreshAds:function(dowhatisay)
{
    if(typeof dowhatisay==="undefined")
    {
        dowhatisay=!1
    }
        wbads.log('[wbads.public.refreshAds]()');
        if(wbads.libraries.gpt.lastCallbackDate+wbads.minRefreshTime>wbads.date.getCurrentTimestamp()&&!dowhatisay)
        {
            wbads.log('[wbads.public.refreshAds]() too fast, min '+wbads.minRefreshTime+' seconds between refresh');
            return!1
        }
        if(wbads.libraries.gpt.callRunning)
        {
            wbads.log('[wbads.public.refreshAds]() gpt already run');
            return!1
        }
        if(!wbads.headerBidding.isFinished())
        {
            wbads.log('[wbads.public.refreshAds]() headerBidding running');
            return!1
        }
        if(!wbads.initConfig())
        {
            wbads.log('[wbads.public.refreshAds]() problem initConfig');
            return!1
        }
        wbads.headerBidding.restart();
        return!0
},
removePosition:function(positionName)
{
    wbads.log('[wbads.public.removePosition]()',positionName);
    wbads.position.remove(positionName)
},
setConfig:function(config)
{
    wbads.log('[wbads.public.setConfig]()',config);
    if(wbads.timeline&&wbads.timeline.data&&Array.isArray(wbads.timeline.data))
    {
        for(var i=0;i<wbads.timeline.data.length;i++)
        {
            if(wbads.timeline.data[i].event==="start")
            {
                console.warn('[wbads.public.setConfig]() disabled, already start');
            return!1
            }
        }
    }
wbads.config=config
},
setConfigAndReloadAds:function(config)
{
    wbads.log('[wbads.public.setConfigAndReloadAds]()',config);
    wbads.config=config;
    if(wbads.initConfig())
    {
        window.googletag.cmd.push(function()
        {
            window.googletag.destroySlots();
            wbads.headerBidding.restart();wbads.libraries.gpt.defineSlots()
        })
    }
},
setElementMapping:function(mapping)
{
    wbads.log('[wbads.public.setElementMapping]()',mapping);
    wbads.initElementMapping(mapping)
},
setPageAndReloadAds:function(page)
{
    wbads.log('[wbads.public.setPageAndReloadAds]('+page+')');
    wbads.public.setConfigAndReloadAds({page:page})},
    setTargeting:function(targeting)
    {
        wbads.log('[wbads.public.setTargeting]()',targeting);
        adsconf.targeting=targeting
    },
    start:function()
    {
        wbads.log('[wbads.public.start]()');
        wbads.start()
    }
};
