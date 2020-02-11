///////30
window.wbads=window.wbads||{};

    window.wbads.localStorage={
        variablesPrefix:'wbads_',
    del:function(key)
    {
        wbads.log('[wbads.localStorage.del]('+key+')');
        if(typeof(localStorage)!=="undefined")
        {
            localStorage.removeItem(this.variablesPrefix+key)
            ;
            return!0
        }
        return null
    },
    exists:function(key)
    {
        wbads.log('[wbads.localStorage.exists]('+key+')');
        return(typeof(localStorage)!=="undefined"&&this.get(key)!==null)
    },
    garbage:function()
    {
        wbads.log('[wbads.localStorage.garbage]()');
        if(typeof(localStorage)!=="undefined")
        {
            for(var key in localStorage)
            {
                if(key.indexOf(this.variablesPrefix)!==-1)
                {
                    this.ttl(key.substring(key.indexOf(this.variablesPrefix)))
                }
            }
        }
    },
    get:function(key)
    {
        if(typeof(localStorage)!=="undefined")
        {
            var o=JSON.parse(localStorage.getItem(this.variablesPrefix+key));
            if(o===null)
            {
                return null
            }
            if(o.e==="-1")
            {
                return o.v
            }else
            {
                var now=wbads.date.getCurrentTimestamp();
                if(o.e>=now)
                {
                    return o.v
                }
            }
        }
        return null
    },
    set:function(key,value)
    {
        try{if(typeof(localStorage)!=="undefined")
        {
            localStorage.setItem(this.variablesPrefix+key,JSON.stringify({v:value,e:'-1'}));
            return!0
        }
    }catch(error){}
        return!1
    },
    setex:function(key,ttl,value)
    {
        try
        {
            var expire=wbads.date.getCurrentTimestamp()+ttl;
            if(typeof(localStorage)!=="undefined")
            {
                localStorage.setItem(this.variablesPrefix+key,JSON.stringify({v:value,e:expire}));
                return!0
            }
        }catch(error){}
        return!1
    },
    ttl:function(key)
    {
        if(typeof(localStorage)!=="undefined")
        {
            var o=JSON.parse(localStorage.getItem(this.variablesPrefix+key));
            if(o===null)
            {
                return-2
            }
            if(o.e===-1)
            {
                return-1
            }else
            {
                var now=wbads.date.getCurrentTimestamp();
                if(o.e>now)
                {
                    return(o.e-now)
                }else
                {
                    this.del(key);
                    return-2
                }
            }
        }
        return null
    }
};