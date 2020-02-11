window.wbads=window.wbads||{};

window.wbads.getSizesFromScreenWidth=function(sizesMapping,preferredSize)
{
    var pageWidth=window.innerWidth||document.body.clientWidth;
    var sizes=Object.keys(sizesMapping).sort(function(n1,n2)
    {
        return(n2-n1)
    });
    var res=sizesMapping[sizes[sizes.length-1]];
    var found=!1;
    for(var i=0;i<sizes.length&&!found;i++)
    {
        if(pageWidth>=sizes[i]){
            res=sizesMapping[sizes[i]];
            found=!0
        }
    }
    if(typeof preferredSize!=="undefined"&&preferredSize!==null)
    {
        for(i=0;i<res.length;i++){
            if(res[i][0]===preferredSize[0]&&res[i][1]===preferredSize[1])
            {
                res=[preferredSize]
            }
        }
    }
    return res};