window.wbads=window.wbads||{};

window.wbads.date={
    
    getCurrentTimestamp:function(milliseconds)
    {
        if(typeof milliseconds==="undefined")
        {
            milliseconds=!1
        }
        if(!Date.now)
        {
            Date.now=function(){return new Date().getTime()
            }
        }
        if(milliseconds)
        {
            return Date.now()
        }else
        {
            return Math.floor(Date.now()/1000)
        }
    }
};