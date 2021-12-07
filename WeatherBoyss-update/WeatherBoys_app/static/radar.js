var dataJSON = JSON.parse(localStorage.getItem('data'))
var latlonJSON = JSON.parse(localStorage.getItem('datas'))
var lat = latlonJSON['data']['0']['latitude']
var lon = latlonJSON['data']['0']['longitude']
document.getElementsByClassName('map-contain2')[0]
.getElementsByClassName('radar')[0]
.setAttribute('src','https://embed.windy.com/embed2.html?lat='+lat+'&lon='+lon+'&width=650&height=450&zoom=9&level=surface&overlay=temp&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=m/s&metricTemp=default&radarRange=-1')

var input = document.getElementsByClassName('search-radar find-location')[0]
                    .getElementsByClassName('input-location2')[0]
var btn = document.getElementsByClassName('search-radar find-location')[0]
                    .getElementsByClassName('find-button2')[0]

btn.addEventListener('click',function(){
    console.log(input.value)
    fetch("http://api.positionstack.com/v1/forward?access_key=24a914d20c119b5ab5fdc0d2573d93c0&query="+input.value+"")
    .then(response => response.json())
    .then(coord => 
    { 
        lat = coord['data']['0']['latitude']
        lon = coord['data']['0']['longitude']
        document.getElementsByClassName('map-contain2')[0]
            .getElementsByClassName('radar')[0]
            .setAttribute('src','https://embed.windy.com/embed2.html?lat='+lat+'&lon='+lon+'&zoom=7&level=surface&overlay=temp&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&metricWind=default&metricTemp=default&radarRange=-1')
    })
})