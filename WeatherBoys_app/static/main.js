var inputLocation = document.getElementsByClassName("find-location")[0].getElementsByClassName("input-location")[0];
var findLocation = document.getElementsByClassName("find-location")[0].getElementsByClassName("find-button")[0];
// for(i=0;i < 6;i++)
// {
//     var forecastFuture=[document.getElementsByClassName('forecast-header')[i-1].getElementsByClassName('day')[0]] 
//     console.log(forecastFuture)
// }
function convertTZ(dt, tzString) {
    return new Date((new Date(dt*1000)).toLocaleString("en-US", {timeZone: tzString}));   
}
function getHourly(dt){
    var date = new Date(dt*1000)
    var SplitHour= date.toString().split(' ')
    return SplitHour[4].slice(0,5)
}
function dtToDay(dt){
    var date = new Date(dt * 1000);
    // console.log(date)
    var dateInStrin= date.toString();
    var SplitDate = dateInStrin.split(' ')
    // console.log(SplitDate)
    if(SplitDate[0]=='Mon'||SplitDate[0]=='Fri'||SplitDate[0]=='Sun')
    {
        return SplitDate[0]+'day'
    } else if (SplitDate[0]=='Tue')
    {
        return SplitDate[0]+'sday'
    } else if(SplitDate[0]=='Wed')
    {
        return SplitDate[0]+'nesday'
    } else if(SplitDate[0]=='Thu'){
        return SplitDate[0]+'rsday'
    } else {
       return SplitDate[0]+'urday'
    }
} 

function degToDir(a){
    var deg =Math.floor((a/45)+0.5) 
    var dir = ["North","North East",
                "East","South East", 
                "South","South West",
                "West","North West"
                ]
    return dir[deg%8]
}
function dtToDate(dt){
    var date = new Date(dt * 1000);
    var month = date.getMonth() + 1
    var dateInStrin= date.toString();
    var SplitDate = dateInStrin.split(' ')
    return date = SplitDate[2] +'/'+ month
}

findLocation.addEventListener('click',function()
{

    // modeule.export{lat}
    fetch("http://api.positionstack.com/v1/forward?access_key=24a914d20c119b5ab5fdc0d2573d93c0&query="+inputLocation.value+"")
    .then(response => response.json())
    .then(datas => 
    {
        // console.log(datas)
        lat = datas['data']['0']['latitude']
        lon = datas['data']['0']['longitude']
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=metric&exclude=minutely,alerts&appid=256d2ae8d5d5bba4e10364d782f85bcb')
        .then(response => response.json())
        .then(data => 
        {
            console.log('daily',data)
            // Thời tiết 7 hằng ngày
            for(i = 1; i<7;i++)
            {   
                var currentIcon = data['current']['weather']['0']['icon']
                var everyDayIcon = data['daily'][i]['weather']['0']['icon']
                // console.log(everyDayIcon)
                // console.log(everyDayIcon)
                var todayInDt = data['daily'][0]['dt']
                var dayInDt = data['daily'][i]['dt']
                // console.log(todayInDt)
                
                var today = dtToDay(todayInDt)
                var day = dtToDay(dayInDt)
                var date = dtToDate(data['daily'][0]['dt'])
                var MaxTemp = data['daily'][i]['temp']['max']
                var MinTemp = data['daily'][i]['temp']['min']
                var currentTemp = data['current']['temp']
                var location = datas['data']['0']['name']
                 //temp max
                // console.log(data['current']['wind_deg'])
                // Today
            
                var todayTemp = document.getElementsByClassName('forecast-content')[0]
                .getElementsByClassName('degree')[0].getElementsByClassName('num')[0]
                .innerHTML=currentTemp.toFixed() +'<sup>o</sup>C'   

                var forecastDate=document.getElementsByClassName('forecast-header')[0]
                .getElementsByClassName('date')[0].innerHTML=date

                var forecastDay=document.getElementsByClassName('forecast-header')[0]
                .getElementsByClassName('day')[0].innerHTML=today

                var todayIcon = document.getElementsByClassName('degree')[0]
                .getElementsByClassName('forecast-icon')[0].innerHTML='<img src="./asset/img/images/icons/New folder/' + currentIcon +'.svg" alt="" width="90">'

                var todayWindSpeed = document.getElementsByClassName('forecast-content')[0]
                .getElementsByClassName('wind-speed')[0].innerHTML='<img src="./asset/img/images/icon-wind.png" alt="">'+ data['current']['wind_speed'] +'m/s'

                var todayWindDir = document.getElementsByClassName('forecast-content')[0]
                .getElementsByClassName('wind-dir')[0].innerHTML='<img src="./asset/img/images/icon-compass.png" alt="">'+ degToDir(data['current']['wind_deg'])

                document.getElementsByClassName('degree')[0]
                .getElementsByClassName('description')[0].innerHTML=data['current']['weather']['0']['description']
                // Today
                var Location = document.getElementsByClassName('forecast-content')[0]
                .getElementsByClassName('location')[0].innerHTML=location

                var DailyIcon  = document.getElementsByClassName('forecast-content')[i]
                .getElementsByClassName('forecast-icon')[0].innerHTML = '<img src="./asset/img/images/icons/New folder/' + everyDayIcon +'.svg" alt="" width="60">'

                var EveryDayTemp =document.getElementsByClassName('forecast-content')[i]
                .getElementsByClassName('degree')[0].innerHTML=MaxTemp.toFixed() +'<sup>o</sup>C'

                var EveryDayTemp =document.getElementsByClassName('forecast-content')[i]
                .getElementsByClassName('min')[0].innerHTML=MinTemp.toFixed() +'<sup>o</sup>C'

                var forecastDay=document.getElementsByClassName('forecast-header')[i]
                .getElementsByClassName('day')[0].innerHTML=day
            }
            // Thời tiết 7 hằng ngày
        

            // Thời tiết trong ngày
            document.getElementsByClassName('today-header')[0]
            .getElementsByClassName('today-forecast')[0].innerHTML= 'TODAY FORECAST FOR ' + location.toString().toUpperCase()
        
            document.getElementsByClassName('today-header')[0]
            .getElementsByClassName('today-day')[0].innerHTML= dtToDay(todayInDt) + ' ' + dtToDate(todayInDt) + '/' +Date(todayInDt).slice(11,15)
        
            var getDt=data['current']['dt']
            console.log(getDt)
            fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat='+lat+'&lon='+lon+'&dt='+getDt+'&units=metric&exclude=minutely,alerts&appid=256d2ae8d5d5bba4e10364d782f85bcb&lang=vi')
            .then(response => response.json())
            .then(historyData => 
            {
                console.log('Hôm nay',historyData)
                // console.log(historyData['hourly]'])
                var MDEN = ['morn','day','night','eve']
                for(i=0; i<4;i++)
                {   
                    console.log(i)
                    console.log(MDEN[i],data['daily'][0]['temp'][MDEN[i]])
                    document.getElementsByClassName('session-weather')[i]
                    .getElementsByClassName('session-temp')[0].innerHTML=data['daily'][0]['temp'][MDEN[i]].toFixed() +'<sup>o</sup>C</span>'
                    // document.getElementsByClassName('session-weather')[3]
                    // .getElementsByClassName('session-temp')[0].innerHTML=data['daily'][0]['temp'][MDEN[3]].toFixed()+'<sup>o</sup>C</span>'
                    var ValueLength = historyData['hourly']
                    if((i*6+3)<=ValueLength.length)
                    {
                        // console.log(i*6+3, ValueLength.length)
                        document.getElementsByClassName('session-weather')[i]
                        .getElementsByClassName('session-rain-ratio')[0].innerHTML=' <i class="wi wi-raindrop"></i>'+ historyData['hourly'][i*6+3]['humidity']+'%'
                    } else 
                    {
                        document.getElementsByClassName('session-weather')[i]
                        .getElementsByClassName('session-rain-ratio')[0].innerHTML=' <i class="wi wi-raindrop"></i>' + data['hourly'][i*6+4-ValueLength.length]['humidity'] +'%'
                    }
                }
            })
            // Thời tiết trong ngày

            // Next 6 hours
                document.getElementsByClassName('hourly-location')[0].innerHTML= location.toUpperCase()
                
                for(i = 0; i < 6;i++)
                {
                    var getHourlyDt = data['hourly'][i]['dt']
                    var timezone = data['timezone']
                    const now = convertTZ(getHourlyDt, timezone).getHours()
                    const nowdate = convertTZ(getHourlyDt, timezone).getDate() +"/"
                    const nowmonth = convertTZ(getHourlyDt, timezone).getMonth()+1
                    if(now < 10) {
                        document.getElementsByClassName('hourly-time')[i].innerHTML= '0'+now+':00';
                    } else{

                        document.getElementsByClassName('hourly-time')[i].innerHTML= now+':00';
                    }
                    var a = data['hourly'][i]['weather']['0']['description']
                    console.log(a)
                 /*Date*/   document.getElementsByClassName('hourly-date')[i].innerHTML= nowdate + nowmonth
                 /*Icon*/   document.getElementsByClassName('hourly-img')[i].setAttribute('src','./asset/img/images/icons/New folder/' + data['hourly'][i]['weather']['0']['icon']+'.svg')
                 /*Desc*/   document.getElementsByClassName('condition')[i].innerHTML= data['hourly'][i]['weather']['0']['description'].toUpperCase()
                 /*Temp*/   document.getElementsByClassName('temp')[i].innerHTML=parseFloat(data['hourly'][i]['temp'].toFixed(1))  + '<sup>o</sup>C'
                 /*POP */   document.getElementsByClassName('raindrop')[i].innerHTML=parseFloat((data['hourly'][i]['pop']*100).toFixed(1)) +'%'

                 //  Details
                    document.getElementsByClassName('humid')[i].innerHTML= data['hourly'][i]['humidity']+'%'
                    document.getElementsByClassName('ws')[i].innerHTML= data['hourly'][i]['wind_speed']+'m/s'
                    document.getElementsByClassName('wg')[i].innerHTML= data['hourly'][i]['wind_gust']+'m/s'
                    document.getElementsByClassName('wd')[i].innerHTML= degToDir(data['hourly'][i]['wind_deg'])
                    document.getElementsByClassName('pr')[i].innerHTML= data['hourly'][i]['pressure']+ 'hPa'
                    document.getElementsByClassName('uvi')[i].innerHTML= data['hourly'][i]['uvi']
                 //  Details
                    
                }
            // Next 6 hours
        
        })
            document.getElementsByClassName('map-contain')[0]
            .getElementsByClassName('map')[0]
            .setAttribute('src','https://embed.windy.com/embed2.html?lat='+lat+'&lon='+lon+'&width=650&height=450&zoom=9&level=surface&overlay=temp&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1')
    })
})

