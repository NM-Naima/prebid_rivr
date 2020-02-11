window.wbads=window.wbads||{};

window.wbads.cappingByPosition={
    config:[
        {
            position:"interstitial",
            ttl:86400
        }
    ],
    isCappingReached:function(positionName)
    {
        for(var i=0;i<wbads.cappingByPosition.config.length;i++)
        {
            if(wbads.cappingByPosition.config[i].position===positionName)
            {
                if(wbads.localStorage.get('capping_'+positionName))
                {
                    wbads.log('[wbads.cappingByPosition.isCappingReached]('+positionName+') reached');
                return!0
                }
            }
        }
        return!1
    },

    setDisplayed:function(positionName)
    {
        wbads.log('[wbads.cappingByPosition.setDisplayed]('+positionName+')');
        for(var i=0;i<wbads.cappingByPosition.config.length;i++)
        {
            if(wbads.cappingByPosition.config[i].position===positionName)
            {
                wbads.log('[wbads.cappingByPosition.setDisplayed]('+positionName+') registered');
                wbads.localStorage.setex('capping_'+positionName,wbads.cappingByPosition.config[i].ttl,1)
            }
        }
    }
};