///////37
window.wbads=window.wbads||{};
    window.wbads.setPage=function(page)
    {
        wbads.log('[wbads.public.setPage]('+page+')');
        var res=wbads.page.findBest(page);
        if(res.found)
        {
            adsconf.currentPage=page;
            var match=(res.realCurrentPage.match(/\/_default$/g)||res.realCurrentPage.match(/\/_default-(mobile|desktop|tablet)$/g));
            if(match)
            {
                if(match[0]==="/_default")
                {
                    adsconf.realCurrentPage=page
                }else
                {
                    adsconf.realCurrentPage=page+'-'+wbads.device.getType()
                }
            adsconf.pagesSlots[adsconf.realCurrentPage]=adsconf.pagesSlots[res.realCurrentPage]
        }else
        {
            adsconf.realCurrentPage=res.realCurrentPage
        }
        wbads.log(
            {currentPage:adsconf.currentPage,
                pageFound:res.realCurrentPage,
                realCurrentPage:adsconf.realCurrentPage
            });
            return!0
        }else
        {
            adsconf.currentPage=null;
            wbads.log('adsconf.pagesSlots['+page+'] not found');
            return!1
        }
    };
