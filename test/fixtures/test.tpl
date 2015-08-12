<%if(!love_items || !love_items.length){%>
<div class="bd-menu-noitem">
    <span class="ico-info-normal"></span>
    <span class="noitem">该老师还没有开过课！</span>
</div>
<%}%>
<%for(var i=0;i<Math.min(love_items.length,2);i++){%>
<li class="mod mod-1">
    <div class="bm-menu-more">
        <div class="bm-menu-img">
            <a  class="a-parent" href="<%=$.render.url[love_items[i].type==2?'video_play_page':'course_detail'](love_items[i].id)%>" target="_blank">
                <img lazy-src="<%=love_items[i].cover_url%>90" title="<%=love_items[i].name%>" alt="<%=love_items[i].name%>" />
                <%if(love_items[i].type == 2 ){%>
                <label class="play-button small"></label>
                <%}%>
            </a>
            <a href="<%=$.render.url[love_items[i].type==2?'video_play_page':'course_detail'](love_items[i].id)%>" target="_blank" class="border"></a>
        </div>
        <div class="bm-menu-info">
            <p class="bm-menu-info-top">
                <a title="<%=love_items[i].name%>" target="_blank" href="<%=$.render.url.course_detail(love_items[i].id)%>" report-tdw="Hotcourse-clk&ver1=<%=love_items[i].id%>&ver2=<%=tid%>"><%=strEllipsis.substring(love_items[i].name, 153, 2)%></a>
            </p>
            <p class="bm-menu-info-bottom">
                <span class="bm-menu-price"><%=$.render.price(love_items[i].price)%></span>
                <%if(love_items[i].type ==2 ){%>
                    <%=(love_items[i].see_num?'<span>' + love_items[i].see_num + '人观看</span>':'')%>
                <%}else{%>
                    <%=(love_items[i].apply_num?'<span>' +love_items[i].apply_num + (love_items[i].price>0?'人购买':'人报名')+'</span>':'')%>
                <%}%>
            </p>
        </div>
        <div class="clear"></div>
    </div>
</li>
<%}%>