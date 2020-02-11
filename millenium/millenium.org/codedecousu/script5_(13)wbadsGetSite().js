window.wbads=window.wbads||{};

window.wbads.getSite=function(from)
{
    if(typeof from==="undefined")
    {
        from=adsconf.currentPage
    }
    if(from.match(/\/[0-9]+\/([a-zA-Z0-9_]+)\//).length===2)
    {
        return from.match(/\/[0-9]+\/([a-zA-Z0-9_]+)\//)[1]
    }
    return!1
};