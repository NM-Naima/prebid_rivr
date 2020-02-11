///////39
window.wbads=window.wbads||{};
    window.wbads.warn=function(message)
    {
        if(wbads.debug)
        {
            var style='color:#ffffff; background:#00561b;padding:1px 5px 1px 5px;border-radius:2px';
            switch(arguments.length)
            {
                case 1:window.console.warn('%cwbads',style,wbads.timeline.getTimeSinceStart(),arguments[0]);
                break;
                case 2:window.console.warn('%cwbads',style,wbads.timeline.getTimeSinceStart(),arguments[0],arguments[1]);
                break;
                case 3:window.console.warn('%cwbads',style,wbads.timeline.getTimeSinceStart(),arguments[0],arguments[1],arguments[2]);
                break;
                case 4:window.console.warn('%cwbads',style,wbads.timeline.getTimeSinceStart(),arguments[0],arguments[1],arguments[2],arguments[3]);
                break;
                default:wbads.warn(arguments)
            }
        }
    };
