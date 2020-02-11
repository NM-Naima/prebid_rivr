window.wbads=window.wbads||{};

window.wbads.events={
    listened:{},
    listenable:
    [
        'allSlotsResponsesReceived',
        'gptCallStart',
        'positionRenderEnded',
        'slotResponseReceived'
    ],
    addListener:function(eventName,func)
    {
        wbads.log('[wbads.event.addListener]('+eventName+')',func);
        for(var i=0;i<wbads.events.listenable.length;i++)
        {
            if(eventName===wbads.events.listenable[i])
            {
                wbads.events.listened[eventName]=wbads.events.listened[eventName]||[];wbads.events.listened[eventName].push(func);
                return!0
            }
        }
        console.warn('wbads: bad eventName: '+eventName);
        return!1
    },
    dispatch:function(eventName,params)
    {
        var position=null;if(params.hasOwnProperty('slot')&&params.slot.hasOwnProperty('getTargetingMap')&&params.slot.getTargetingMap().hasOwnProperty(wbads.autoTargetingPosition)&&params.slot.getTargetingMap()[wbads.autoTargetingPosition].length===1)
        {
            position=params.slot.getTargetingMap()[wbads.autoTargetingPosition][0];
            wbads.log('[wbads.event.dispatch]('+eventName+', '+position+')',params)
        }else
        {
            wbads.log('[wbads.event.dispatch]('+eventName+')',params)
        }
        if(wbads.events.listened[eventName])
        {
            for(var i=0;i<wbads.events.listened[eventName].length;i++){wbads.events.listened[eventName][i](params,position)
            }
        }
    }
};
