window.wbads=window.wbads||{};

window.wbads.device={
    isDesktop:function()
    {
        return(wbads.device.getType()==='desktop')
    },
    isMobile:function()
    {
        return(wbads.device.getType()==='mobile')
    },
    isTablet:function()
    {
        return(wbads.device.getType()==='tablet')
    },
    getType:function()
    {
        if(((window.innerWidth<=640||/iPhone|iPod|BlackBerry/i.test(navigator.userAgent))&&!/CrOS/i.test(navigator.userAgent))||/Android.*Mobile/i.test(navigator.userAgent))
        {
        return'mobile'
        }
        else if(window.innerWidth<=1024||/Android|iPad/i.test(navigator.userAgent))
        {
            return'tablet'
        }
        return'desktop'
    }
};