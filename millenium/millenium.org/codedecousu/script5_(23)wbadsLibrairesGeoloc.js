window.wbads=window.wbads||{};

    window.wbads.libraries.geoloc={
        file:'https://goutee.top/geoloc3/whoiam',
        required:!1,
        enabled:!0,
        loaded:!1,
        data:{},
        cacheKey:'geoloc',
        load:function()
        {
            wbads.log('[wbads.libraries.geoloc.load]()');
            var localData=wbads.localStorage.get(this.cacheKey);
            if(localData)
            {
                var a=localData.split(',');
                if(a.length!==4)
                {
                wbads.localStorage.del(this.cacheKey);
                this.load();
                return
                }
                this.data={
                    country:a[0],
                    region:a[1],
                    departement:a[2],
                    city:a[3]
                    };
        
                wbads.log(
                    {
                        msg:"callback geoloc.load with local data",
                        data:this.data
                    });
                this.loaded=!0
            }else
            {
                var xhttp=(window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP"));
                xhttp.onreadystatechange=function()
                {
                    if(xhttp.readyState===4&&xhttp.status===200)
                    {
                        var data=JSON.parse(xhttp.responseText);
                    if(data.country&&data.region&&data.departement&&data.city)
                    {
                        wbads.libraries.geoloc.data=data;
                        wbads.localStorage.setex(wbads.libraries.geoloc.cacheKey,86400*7,[data.country,data.region,data.departement,data.city].join(','))
                    }
                    wbads.log(
                        {
                            msg:"callback geoloc.load",data:data
                        });
                        wbads.libraries.geoloc.loaded=!0
                    }
                };
                xhttp.open("GET",this.file,!0);
                xhttp.send()
            }
        }
    };
