///////33
window.wbads=window.wbads||{};

window.wbads.preview={
    DOMReady:function(cb)
    {
        if(document.readyState==="loading")
        {
            document.addEventListener("DOMContentLoaded",cb)
        }else
        {
            cb()
        }
    },
    autoResize:function(elementId)
    {
        var iframe=document.getElementById(elementId);
        var ifrm=(iframe.contentWindow)?iframe.contentWindow:(iframe.contentDocument.document)?iframe.contentDocument.document:iframe.contentDocument;
        var w=ifrm.document.getElementsByTagName("body")[0].scrollWidth;
        var h=ifrm.document.getElementsByTagName("body")[0].scrollHeight;
        parent.document.getElementById(elementId).style.width=w+'px';
        parent.document.getElementById(elementId).style.height=h+'px'},
        display:function()
        {
            var previewString=wbads.decodeWindowLocationHash().wbads_preview;
            var previewDomain=wbads.decodeWindowLocationHash().wbads_preview_url;
            var previewNetwork=wbads.decodeWindowLocationHash().wbads_preview_network;
            var previewRequest=[];
            var previewProvider=null;
            if(previewString.substring(0,5)==='dfp:{')
            {
                previewString=previewString.slice(5,-1);
                previewProvider='dfp'
            }
            if(previewString.substring(0,10)==='appnexus:{')
            {
                previewString=previewString.slice(10,-1);
                previewProvider='appnexus'
            }
            if(previewProvider!==null)
            {
                var previewRequestTemp=previewString.split(",");
                previewRequestTemp.forEach(function(previewRequestEl)
                {
                    previewRequest.push([previewRequestEl.split(':')[0],
                    previewRequestEl.split(':')[1]])
                });
                previewRequest.forEach(function(previewRequestEl)
                {
                    var slot=previewRequestEl[0];
                    var elementId=wbads.position.get(slot,'elementId');
                    var newIf=document.createElement('iframe');
                    newIf.frameBorder=0;
                    newIf.scrolling="no";
                    newIf.id='preview-'+slot;
                    newIf.src='about:blank';
                    newIf.style.cssText="width:0px;height:0px;border:none;padding:0px;margin:0px;overflow:hidden;";
                    newIf.marginWidth=newIf.marginHeight=newIf.frameBorder=newIf.width=newIf.height=0;
                    document.getElementById(elementId).appendChild(newIf);
                    var ifrm=(newIf.contentWindow)?newIf.contentWindow:(newIf.contentDocument.document)?newIf.contentDocument.document:newIf.contentDocument;
                    ifrm.document.open("text/html","replace");
                    fetch(previewDomain+"?provider="+previewProvider+"&id="+previewRequestEl[1]+"&network="+previewNetwork).then(function(response)
                    {
                        return response.json()
                    }).then(function(json)
                    {
                        var html='';
                        html+='<ht'+'ml><bo'+'dy style="overflow:hidden;">';
                        html+='<scr'+'ipt> window.onload=function() { parent.wbads.preview.autoResize(\''+newIf.id+'\');}; </scr'+'ipt>';
                        html+='<scr'+'ipt> var inDapIF=true; var inFIF=true; var RMIF=true; </scr'+'ipt>';
                        html+=json.html;html+='</bo'+'dy></ht'+'ml>';
                        ifrm.document.write(html);
                        ifrm.document.close()
                    })
                })
            }
        }
    };
