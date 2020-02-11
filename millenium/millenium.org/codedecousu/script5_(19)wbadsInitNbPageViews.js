window.wbads=window.wbads||{};

    window.wbads.initNbPageViews= function()
    {
        wbads.log('[wbads.initNbPageViews]()');
    try{
        if(typeof(sessionStorage)!=="undefined"){
            if(typeof(sessionStorage.nbpageviews)==="undefined"){
                sessionStorage.nbpageviews=1
                }else{
                    sessionStorage.nbpageviews=Number(sessionStorage.nbpageviews)+1
                    }
                    wbads.nbpageviews=Number(sessionStorage.nbpageviews)}}
    catch(error){
        wbads.log('[wbads.initNbPageViews]() we have a problem')
        }
    };