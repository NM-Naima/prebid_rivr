window.wbads=window.wbads||{};

window.wbads.position={
    destroyUnavailables:function(){
        wbads.log('[wbads.position.destroyUnavailables]()');
        for(var positionName in wbads.getCurrentPagesSlots())
        {
            if(positionName==="preroll")
            {
                continue
            }
            if(document.getElementById(wbads.position.get(positionName,'elementId'))===null)
            {
                wbads.log('[wbads.position.destroyUnavailables]() remove '+positionName);
                window.googletag.destroySlots([wbads.position.get(positionName,'elem')])
            }else
            {
                wbads.log('[wbads.position.destroyUnavailables]() position found '+positionName)
            }
        }
    },
    get:function(positionName,what)
    {
        if(typeof wbads.getCurrentPagesSlots()[positionName]==="undefined")
        {
            return null
        }
        if(what==="lineItemId")
        {
            what="sourceAgnosticLineItemId"
        }
        if(what==="creativeId")
        {
            what="sourceAgnosticCreativeId"
        }
        switch(what)
        {
            case "autoRefreshInterval":
                var res=30;
                if(typeof wbads.getCurrentPagesSlots()[positionName].autoRefreshInterval==="number"||wbads.getCurrentPagesSlots()[positionName].autoRefreshInterval===!1)
                {
                    res=wbads.getCurrentPagesSlots()[positionName].autoRefreshInterval
                }
                if(res<30&&wbads.libraries.prebid.isAdvertiserId(wbads.position.get(positionName,'advertiserId'))&&(wbads.position.get(positionName,'hb_bidder')==="spotx"||wbads.position.get(positionName,'hb_bidder')==="teads"))
                {
                    return 30
                }
            return res;
            case "hb_bidder":
                if(typeof wbads.libraries.prebid.getAdserverTargeting()==="object"&&typeof wbads.libraries.prebid.getAdserverTargeting()[positionName]==="object"&&typeof wbads.libraries.prebid.getAdserverTargeting()[positionName].hb_bidder==="string")
                {
                    return wbads.libraries.prebid.getAdserverTargeting()[positionName].hb_bidder
                }
            return null;
            case "advertiserId":
            case "campaignId":
            case "isEmpty":
            case "sourceAgnosticCreativeId":
            case "sourceAgnosticLineItemId":
                if(typeof wbads.getCurrentPagesSlots()[positionName].eventResult==="undefined"||typeof wbads.getCurrentPagesSlots()[positionName].eventResult[what]==="undefined")
                {
                    return null
                }else
                {
                    return wbads.getCurrentPagesSlots()[positionName].eventResult[what]
                }
            break;
            case "elementId":
                if(typeof wbads.getCurrentPagesSlots()[positionName].divId==="string")
                {
                    return wbads.getCurrentPagesSlots()[positionName].divId
                }else
                {
                    return positionName
                }
            break;
            case "allTargeting":
                var res={};
                if(typeof wbads.getCurrentPagesSlots()[positionName].elem==="object"&&typeof wbads.getCurrentPagesSlots()[positionName].elem.getTargetingKeys==="function")
                {
                    var keys=wbads.getCurrentPagesSlots()[positionName].elem.getTargetingKeys();for(var i=0;i<keys.length;i++){res[keys[i]]=wbads.getCurrentPagesSlots()[positionName].elem.getTargeting(keys[i])
                    }
                }
            return res;
            case "visibility":
            case "visibilityTime":
                return(typeof wbads.getCurrentPagesSlots()[positionName][what]!=="undefined"?wbads.getCurrentPagesSlots()[positionName][what]:0);
                case "realHeight":
                    if(document.getElementById(wbads.position.get(positionName,'elementId'))!==null&&document.getElementById(wbads.position.get(positionName,'elementId')).childNodes&&document.getElementById(wbads.position.get(positionName,'elementId')).childNodes.length===1&&document.getElementById(wbads.position.get(positionName,'elementId')).childNodes[0].childNodes&&document.getElementById(wbads.position.get(positionName,'elementId')).childNodes[0].childNodes.length===1&&document.getElementById(wbads.position.get(positionName,'elementId')).childNodes[0].childNodes[0].offsetHeight)
                    {
                        return document.getElementById(wbads.position.get(positionName,'elementId')).childNodes[0].childNodes[0].offsetHeight
                    }
            return null;
            case "realWidth":
                if(document.getElementById(wbads.position.get(positionName,'elementId'))!==null&&document.getElementById(wbads.position.get(positionName,'elementId')).childNodes&&document.getElementById(wbads.position.get(positionName,'elementId')).childNodes.length===1&&document.getElementById(wbads.position.get(positionName,'elementId')).childNodes[0].childNodes&&document.getElementById(wbads.position.get(positionName,'elementId')).childNodes[0].childNodes.length===1&&document.getElementById(wbads.position.get(positionName,'elementId')).childNodes[0].childNodes[0].offsetWidth)
                {
                    return document.getElementById(wbads.position.get(positionName,'elementId')).childNodes[0].childNodes[0].offsetWidth
                }
            return null;
            case "targeting":
                var targeting={};
                if(typeof wbads.getCurrentPagesSlots()[positionName].targeting!=="undefined")
                {
                    for(var kw in wbads.getCurrentPagesSlots()[positionName].targeting)
                    {
                        if(typeof wbads.getCurrentPagesSlots()[positionName].targeting[kw]==="string"){targeting[kw]=[wbads.getCurrentPagesSlots()[positionName].targeting[kw]]
                        }else if(Array.isArray(wbads.getCurrentPagesSlots()[positionName].targeting[kw]))
                        {
                            targeting[kw]=wbads.getCurrentPagesSlots()[positionName].targeting[kw]
                        }else if(typeof wbads.getCurrentPagesSlots()[positionName].targeting[kw]==="number")
                        {
                            targeting[kw]=[wbads.getCurrentPagesSlots()[positionName].targeting[kw].toString()]
                        }else
                        {
                            console.warn('wbads: bad targeting for slot '+positionName,wbads.getCurrentPagesSlots()[positionName].targeting[kw])
                        }
                    }
                }
            targeting[wbads.autoTargetingPosition]=[positionName];
            targeting.pos=[positionName];
            targeting.hb_safeframe=['yes'];
            if(typeof wbads.refresh.autoRefreshInterval==="number"){targeting.refreshTime=[wbads.position.get(positionName,'autoRefreshInterval').toString()+'000']
            }
            return targeting;
            default:if(typeof wbads.getCurrentPagesSlots()[positionName][what]!=="undefined")
            {
                return wbads.getCurrentPagesSlots()[positionName][what]
            }
            console.warn('wbads.position.get('+positionName+', '+what+") unknown "+what);
            return null
        }
    },
    getRendered:function()
    {
        var list=[];
        for(var slot in wbads.getCurrentPagesSlots())
        {
            if(wbads.getCurrentPagesSlots()[slot].eventResult)
            {
                list.push(
                    {
                        name:slot,isEmpty:wbads.position.get(slot,'isEmpty')
                    })
            }
        }
        return list
    },
    getNameFromDivId:function(divId)
    {
        if(typeof wbads.getCurrentPagesSlots()[divId]==='object')
        {
            return divId
        }else
        {
            for(var positionName in wbads.getCurrentPagesSlots())
            {
                if(wbads.getCurrentPagesSlots()[positionName].divId&&divId===wbads.getCurrentPagesSlots()[positionName].divId)
                {
                    return positionName
                }
            }
        }
        wbads.warn('[wbads.position.getNameFromDivId]('+divId+') return null');
        return null
    },
    isDefinedOnPage:function(positionName)
    {
        if(typeof wbads.getCurrentPagesSlots()[positionName]==="undefined")
        {
            return!1
        }
        if(wbads.pagePositions===null)
        {
            return!0
        }
        for(var i=0;i<wbads.pagePositions.length;i++)
        {
            if(wbads.pagePositions[i]===positionName)
            {
                return!0
            }
        }
        return!1
    },
    isDisabledByAnchor:function(positionName)
    {
        var noPositions=wbads.decodeWindowLocationHash().wbads_no_position||wbads.decodeWindowLocationHash().wads_no_position;
        if(noPositions)
        {
            noPositions=noPositions.split('|');
            for(var i=0;i<noPositions.length;i++)
            {
                if(noPositions[i]===positionName)
                {
                    return!0
                }
            }
        }
        return!1
    },
    isLinked:function(positionName)
    {
        var positionsToCheck=['header','rectangle_atf'];
        var noLinkedAdvertisers=[4723192977,53717792,4716679368,];
        noLinkedAdvertisers=noLinkedAdvertisers.concat(wbads.libraries.prebid.advertiserIds);
        var foundInPositionsToCheck=!1;
        for(var i=0;i<positionsToCheck.length;i++)
        {
            if(positionsToCheck[i]===positionName)
            {
                foundInPositionsToCheck=!0
            }
        }
        if(!foundInPositionsToCheck)
        {
            return!1
        }
        var positionAdvertiser=wbads.position.get(positionName,"advertiserId");
        if(positionAdvertiser)
        {
            for(i=0;i<noLinkedAdvertisers.length;i++)
            {
                if(noLinkedAdvertisers[i]===positionAdvertiser)
                {
                    return!1
                }
                }
            for(i=0;i<positionsToCheck.length;i++)
            {
                if(positionsToCheck[i]!==positionName)
                {
                    if((positionAdvertiser===wbads.position.get(positionsToCheck[i],"advertiserId"))||(wbads.position.get(positionName,"lineItemId")===wbads.position.get(positionsToCheck[i],"lineItemId")))
                    {
                        return!0
                    }
                }
            }
            return!1
        }else
        {
            return!1
        }
    },
    isOutOfPage:function(positionName)
    {
        for(var i=0;i<wbads.libraries.gpt.outOfPageSlots.length;i++)
        {
            if(wbads.libraries.gpt.outOfPageSlots[i]===positionName)
            {
                return!0
            }
        }
        return!1
    },
    remove:function(positionName)
    {
        window.googletag.cmd.push(function()
        {
            window.googletag.destroySlots([wbads.position.get(positionName,'elem')]);
            wbads.getCurrentPagesSlots()[positionName].autoRefreshInterval=!1;
            delete wbads.getCurrentPagesSlots()[positionName].elem;
            delete wbads.getCurrentPagesSlots()[positionName].eventResult
        })
    },
    set:function(positionName,what,value)
    {
        wbads.getCurrentPagesSlots()[positionName][what]=value
    }
};
