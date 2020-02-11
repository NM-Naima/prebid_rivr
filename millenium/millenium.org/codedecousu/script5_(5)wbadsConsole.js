window.wbads=window.wbads||{};

window.wbads.console={
    
    close:function()
    {
        while(wbads.console.isOpen())
        {
            var elem=document.getElementById("wbadsConsole");
            elem.parentNode.removeChild(elem)
        }
    },
    
    changeDisplayPageTargeting:function()
    {
        if(document.getElementById('wbadsConsolePageTargeting').style.display==="none")
        {
            document.getElementById('wbadsConsolePageTargeting').style.display=""}
        else
        {
            document.getElementById('wbadsConsolePageTargeting').style.display="none"}
    },
    
    changeDisplaySlotTargeting:function(slot)
    {
        if(document.getElementById('wbadsConsolePosition'+slot+'Targeting').style.display==="none")
        {
            document.getElementById('wbadsConsolePosition'+slot+'Targeting').style.display=""
        }else
        {
            document.getElementById('wbadsConsolePosition'+slot+'Targeting').style.display="none"}
    },
    
    changeDisplayTimeline:function()
    {
        if(document.getElementById('wbadsConsoleTimeline').style.display==="none")
        {
            document.getElementById('wbadsConsoleTimeline').style.display=""
        }else
        {
            document.getElementById('wbadsConsoleTimeline').style.display="none"}
    },
    
    isOpen:function()
    {
        var elem=document.getElementById("wbadsConsole");
        if(elem)
        {
            return!0
        }
    return!1
    },
    
    open:function()
    {
        wbads.log('[wbads.console.open]()');
        if(wbads.console.isOpen())
        {
            wbads.console.close()
        }
        var div=document.createElement('div');
        div.setAttribute("id","wbadsConsole");
        div.textContent="";
        div.style.position='fixed';
        div.style.top=0;
        div.style.right=0;
        div.style.backgroundColor="#d4ced7";
        div.style.height="100%";
        div.style.width="380px";
        div.style.overflow="auto";
        div.style.zIndex="2000000000";
        document.body.appendChild(div);
        var ulStyle='margin:0px; padding-left:20px; list-style-type: disc;';
        div.innerHTML+="Positions<br>";
        var urls={prefix:'https://admanager.google.com/[NETWORK]#delivery/',
        order:'[PREFIX]order/order_overview/order_id=[ORDERID]',
        lineitem:'[PREFIX]line_item/detail/order_id=[ORDERID]&line_item_id=[LINEITEMID]&sort_by=Name&li_tab=settings',
        creative:'[PREFIX]line_item_creative_association/detail/order_id=[ORDERID]&line_item_id=[LINEITEMID]&creative_id=[CREATIVEID]&li_tab=creatives',};
        urls.prefix=urls.prefix.replace('[NETWORK]',
        wbads.getNetwork());
        urls.order=urls.order.replace('[PREFIX]',urls.prefix);
        urls.lineitem=urls.lineitem.replace('[PREFIX]',urls.prefix);
        urls.creative=urls.creative.replace('[PREFIX]',urls.prefix);
        var toHtml='<ul style="'+ulStyle+'">';
        for(var slot in wbads.getCurrentPagesSlots())
        {
            if(!wbads.position.isDefinedOnPage(slot))
            {
                continue
            }
        toHtml+='<li><b>'+slot+'</b>';
        if(typeof wbads.getCurrentPagesSlots()[slot].eventResult==="object")
        {
            var slotEventResult=wbads.getCurrentPagesSlots()[slot].eventResult;
            toHtml+='<ul style="'+ulStyle+'">'+'<li>'+(document.getElementById(wbads.position.get(slot,'elementId'))?"position presente":"position absente")+'</li>'+'<li>order '+"<a href='"+urls.order.replace('[ORDERID]',
            slotEventResult.campaignId)+"' target='_blank'>"+slotEventResult.campaignId+'</a></li>'+'<li>lineitem '+" <a href='"+urls.lineitem.replace('[ORDERID]',
            slotEventResult.campaignId).replace('[LINEITEMID]',
            slotEventResult.sourceAgnosticLineItemId)+"' target='_blank'>"+slotEventResult.sourceAgnosticLineItemId+'</a></li>'+'<li>creative '+"<a href='"+urls.creative.replace('[ORDERID]',
            slotEventResult.campaignId).replace('[LINEITEMID]',
            slotEventResult.sourceAgnosticLineItemId).replace('[CREATIVEID]',
            slotEventResult.sourceAgnosticCreativeId)+"' target='_blank'>"+slotEventResult.sourceAgnosticCreativeId+'</a></li>'+'<li><u  onclick="wbads.console.changeDisplaySlotTargeting(\''+slot+'\')" style="cursor: zoom-in;">targeting</u></li>'+'</ul>';
            var posTargeting=wbads.position.get(slot,'allTargeting');
            toHtml+='<table id="wbadsConsolePosition'+slot+'Targeting" style="display:none;">';
            for(var key in posTargeting)
            {
                toHtml+='<tr><td>'+key+'</td><td>';
                for(var k=0;k<posTargeting[key].length;k++)
                {
                    if(k>0)
                    {
                        toHtml+='</td></tr><tr><td></td><td>'
                    }
                    toHtml+=posTargeting[key][k]
                }
            toHtml+='</td></tr>'
            }
        toHtml+='</table>'
        }
        toHtml+='</li>'}
        toHtml+='</ul>';
        div.innerHTML+=toHtml;
        var pageHtml='<hr />Page'+'<ul style="'+ulStyle+'">'+'<li>'+adsconf.currentPage+'</li>'+'<li><u  onclick="wbads.console.changeDisplayPageTargeting()" style="cursor: zoom-in;">targeting</u></li>'+'<li><u  onclick="wbads.console.changeDisplayTimeline()" style="cursor: zoom-in;">timeline</u></li>'+'</ul>';
        div.innerHTML+=pageHtml;
        div.innerHTML+='<hr />';
        var pageTargeting='<table id="wbadsConsolePageTargeting" style="display:none;">';
        ///GETTARGETING KEY
        var targetingKeys=window.googletag.pubads().getTargetingKeys();
        for(var i=0;i<targetingKeys.length;i++)
        { 
            pageTargeting+='<tr><td>'+targetingKeys[i]+'</td><td>';
            for(var j=0;j<window.googletag.pubads().getTargeting(targetingKeys[i]).length;j++)
            {
                if(j>0)
                {
                    pageTargeting+='</td></tr><tr><td></td><td>'
                }
            pageTargeting+=window.googletag.pubads().getTargeting(targetingKeys[i])[j]
            }
            pageTargeting+='</td></tr>'
        }
        pageTargeting+='</table>';
        div.innerHTML+=pageTargeting;
        var pageTimeline='<div id="wbadsConsoleTimeline" style="display:none;">';
        var start=0;
        if(wbads.timeline.data.length)
        {
            start=wbads.timeline.data[0].timestamp
        }
        for(i=0;i<wbads.timeline.data.length;i++)
        {
            pageTimeline+=(wbads.timeline.data[i].timestamp-start)+': '+wbads.timeline.data[i].event+'<br />'
        }
        pageTimeline+='</div>';div.innerHTML+=pageTimeline;div.innerHTML+='<span style="position:absolute; top:0px; right:0px; cursor:pointer;" onclick="wbads.console.close()">close</span>'
    }
};