window.wbads=window.wbads||{};

    window.wbads.initElementMapping=function(mapping)
    {
        wbads.log('[wbads.initElementMapping]()',mapping);
        for(var page in adsconf.pagesSlots)
        {
            for(var slot in adsconf.pagesSlots[page])
            {
                if(typeof adsconf.pagesSlots[page][slot].divId==="string")
                {
                    delete(adsconf.pagesSlots[page][slot].divId)
                }
            }
        }
    for(var pos in mapping)
    {
        if(typeof wbads.getCurrentPagesSlots()[pos]==="object")
        {
            wbads.getCurrentPagesSlots()[pos].divId=mapping[pos]}}};

window.wbads=window.wbads||{};

    window.wbads.initNbPageViews= function()
    {
        wbads.log('[wbads.initNbPageViews]()');
    try{
        if(typeof(sessionStorage)!=="undefined")
        {
            if(typeof(sessionStorage.nbpageviews)==="undefined")
            {
                sessionStorage.nbpageviews=1
                }else{
                    sessionStorage.nbpageviews=Number(sessionStorage.nbpageviews)+1
                    }
                    wbads.nbpageviews=Number(sessionStorage.nbpageviews)
        }
    }
    catch(error)
    {
        wbads.log('[wbads.initNbPageViews]() we have a problem')
        }
    };