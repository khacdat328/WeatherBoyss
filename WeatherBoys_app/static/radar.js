
var x = localStorage.getItem("input")
// console.log(x.value)
var btn = localStorage.getItem('button')
btn.addEventListener('click',function(){
    console.log('123')
})
// btn.addEventListener('click',function()
// {
//     fetch("http://api.positionstack.com/v1/forward?access_key=24a914d20c119b5ab5fdc0d2573d93c0&query="+x.value+"")
//     .then(response => response.json())
//     .then(datas => 
//     {   
//         var lat =  datas['data']['0']['latitude']
//         var lon = datas['data']['0']['longitude']
//         console.log("lat", lat)
//         console.log('lon',lon)

//         var mapping = document.getElementsByClassName('map-contain')[0]
//         .getElementsByClassName('map')[0];
//         if(mapping)
//         {
//             mapping.innerHTML='<iframe src="https://embed.windy.com/embed2.html?lat='+lat+'&lon='+lon+'&width=650&height=450&zoom=5&level=surface&overlay=temp&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1" frameborder="0" class="map"></iframe>'
//         }
//     })
// })