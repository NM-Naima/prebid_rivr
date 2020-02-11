///////34
window.wbads=window.wbads||{};

window.wbads.refresh={
    autoRefresCheckInterval:1,
    setIntervalValue:null,
    autoRefreshDisabledPositions:['header','interstitial',],
    visibilityFloor:50,
    positionsToRefresh:[],
    auto:function()
    {
        wbads.log('[wbads.refresh.auto]()');
        wbads.autodisplayDisabled=!1;
        wbads.headerBidding.alreadyRun=!1;
        wbads.libraries.gpt.alreadyRun=!1;
        wbads.libraries.gpt.runInAutoRefresh=!0;
        wbads.headerBidding.restart()
    },
    loadRemoteData:function()
    {
        if(typeof JSON!=="object"||typeof JSON.stringify!=="function")
        {
            return
        }
        var data={
            adunit:adsconf.currentPage,
            positions:[]
        };
        for(var positionName in wbads.getCurrentPagesSlots())
        {
            data.positions.push(
                {
                    name:positionName,
                    lineitem:wbads.position.get(positionName,'lineItemId'),
                    advertiser:wbads.position.get(positionName,'advertiserId')
                })
        }
        var xhttp=(window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP"));
        xhttp.onreadystatechange=function()
        {
            if(xhttp.readyState===4&&xhttp.status===200)
            {
                var data=JSON.parse(xhttp.responseText);
                for(var positionName in data)
                {
                    if(data[positionName]===!1)
                    {
                        wbads.getCurrentPagesSlots()[positionName].autoRefreshInterval=!1
                    }else
                    {
                        wbads.getCurrentPagesSlots()[positionName].autoRefreshInterval=parseInt(data[positionName])
                    }
                }
            wbads.log({msg:"callback refresh.loadRemoteData()",data:data})
            }
        };
        var url="https://goutee.top/wbads/refresh/"+JSON.stringify(data);
        xhttp.open("GET",url,!0);
        xhttp.send()
    },
    checkPositions:function()
    {
        for(var slot in wbads.getCurrentPagesSlots())
        {
            if(!wbads.position.isDefinedOnPage(slot))
            {
                continue
                }
        if(wbads.position.get(slot,'autoRefreshInterval')===!1)
        {
            continue
        }
        var disabledPosition=!1;
        for(var i=0;i<this.autoRefreshDisabledPositions.length&&!disabledPosition;i++)
        {
            if(this.autoRefreshDisabledPositions[i]===slot)
            {
                disabledPosition=!0
            }
        }
        if(!disabledPosition&&!wbads.position.isLinked(slot)&&wbads.position.get(slot,"visibility")>=this.visibilityFloor&&((typeof document.hasFocus==="function"&&document.hasFocus()===!0)||(typeof document.hasFocus==="undefined")))
        {
            wbads.position.set(slot,"visibilityTime",wbads.position.get(slot,"visibilityTime")+this.autoRefresCheckInterval);
            if(wbads.position.get(slot,"visibilityTime")>=wbads.position.get(slot,'autoRefreshInterval'))
            {
                wbads.position.set(slot,"visibilityTime",0);
                if(!wbads.cappingByPosition.isCappingReached(slot))
                {
                    this.positionsToRefresh.push(slot)
                }
            }
        }
        }
        if(this.positionsToRefresh.length>0&&!wbads.libraries.gpt.runInAutoRefresh)
        {
            wbads.autodisplayDisabled=!1;
            wbads.headerBidding.alreadyRun=!1;
            wbads.libraries.gpt.alreadyRun=!1;
            wbads.libraries.gpt.runInAutoRefresh=!0;
            wbads.headerBidding.restart()
        }
    },
};
