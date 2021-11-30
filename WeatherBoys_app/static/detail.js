function openCity(evt, time)
{
  // Declare all variables
  var i, tabcontent, tablinks;
  
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(time).style.display = "block";
  evt.currentTarget.className += " active";
}

mybutton = document.getElementById("goTop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

var itmCln= document.getElementsByClassName('tabcontent')[1].getElementsByClassName('weather-content')[0]
for(i=0; i < 23; i++)
{
  var Cln = itmCln.cloneNode(true)  
  document.getElementById('Hourly').appendChild(Cln)
}

var pastClone= document.getElementById('PastForecast')
.getElementsByClassName('weather-content')[0]
for(i=0; i< 2; i++)
{
  document.getElementById('PastForecast').appendChild(pastClone.cloneNode(true))
}

var CloneContent = document.getElementById('Next7days')
.getElementsByClassName('weather-content')[0]
for(i = 0; i < 6; i++)
{
  document.getElementById('Next7days').appendChild(CloneContent.cloneNode(true))
}



function UVlevel(x)
{
    var y
  if(x<2.9 && x>=0)
  {
    return y = '(Low)'
  }
  if(x>=3 && x<5.9)
  {
    return y = "(Moderate)"
  }
  if(x>=6 && x<7.9)
  {
    return y = "(High)"
  }
  if(x>=8 && x< 10.9)
  {
    return y = "(Very hight)"
  }
  if(x>= 11)
  {
    return y = "Extreme"
  }
}

function TimeFormat(x,y)
{
  if(x<10)
  {
    x = '0' + x.toString()
  }
  if(y<10)
  {
    y ='0'+ y.toString()
  }
  return x+':'+y
}
// TimeFormat(4,5)
function convertTZ(dt, tzString) {
  return new Date((new Date(dt*1000)).toLocaleString("en-US", {timeZone: tzString}));   
}

function getHourly(dt){
  var date = new Date(dt*1000)
  var SplitHour= date.toString().split(' ')
  console.log(SplitHour)
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


var coordinates = JSON.parse(localStorage.getItem('datas'))
var currentData = JSON.parse(localStorage.getItem('data'))
var historyData = JSON.parse(localStorage.getItem('historyData'))
// console.log('history',historyData)
console.log('current',currentData)
var lat = coordinates['data']['0']['latitude']
var lon = coordinates['data']['0']['longitude']
var currentDt = currentData['daily']['0']['dt']

var DtOf3DayAgo = currentDt - 3600*3*24
var DtOf2DayAgo = currentDt - 3600*2*24
var DtOf1DayAgo = currentDt - 3600*24
// console.log(convertTZ(DtOf1DayAgo,Tz).getDate())
var DtofPast = [
  DtOf3DayAgo, 
  DtOf2DayAgo,
  DtOf1DayAgo
]

    document.getElementsByClassName('detail-location')[0]
    .getElementsByClassName('location-forecast')[0].innerHTML =coordinates['data']['0']['label'].toString().toUpperCase()
  // console.log(location)


fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat='+lat+'&lon='+lon+'&dt='+DtofPast[0]+'&units=metric&exclude=minutely,alerts&appid=256d2ae8d5d5bba4e10364d782f85bcb')
    .then(response => response.json())
    .then(data  =>
    {   
      console.log('1',data)
      // PastForecast(1)
      var dateInDt= data['current']['dt']
      var Tz = data['current']['timezone']
      var dateConvert = dtToDate(dateInDt)
      console.log(dateConvert)
      console.log(convertTZ(dateInDt,Tz).getDate())
        var date = document.getElementById('PastForecast')
        .getElementsByClassName('weather-content')[0].getElementsByClassName('weather-header')[0]
        .getElementsByClassName('time')[0]
        date.innerHTML = dateConvert
        // DATA HEADER
        var pastIcon = document.getElementById('PastForecast').getElementsByClassName('weather-content')[0]
            .getElementsByClassName('short-forecast')[0].getElementsByTagName('img')[0]
        var pastDesc = document.getElementById('PastForecast').getElementsByClassName('weather-content')[0]
            .getElementsByClassName('short-forecast')[0].getElementsByClassName('detail description')[0]
        var realFeel = document.getElementById('PastForecast')
                    .getElementsByClassName('weather-content')[0]
                    .getElementsByClassName('detail real-feel')[0].getElementsByTagName('span')[0]
        var temp = document.getElementById('PastForecast')
                  .getElementsByClassName('weather-content')[0]
                  .getElementsByClassName('detail temp')[0].getElementsByTagName('span')[0]
        realFeel.innerHTML = parseFloat(data['current']['feels_like'].toFixed(1)) +'<sup>o</sup>C'
        temp.innerHTML = parseFloat(data['current']['temp'].toFixed(1)) +'<sup>o</sup>C'
        pastIcon.setAttribute('src','http://openweathermap.org/img/wn/'+data['current']['weather'][0]['icon']+'@2x.png')
        pastDesc.innerHTML= data['current']['weather'][0]['description']
        // DATA HEADER



        // DATA BODY
        var humidityValue = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[0]
            .getElementsByClassName('weather-index')[0]
            
        var pressureValue = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[0]
            .getElementsByClassName('weather-index')[1]
            
        var visibilityValue = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[0]
            .getElementsByClassName('weather-index')[2]
        var Sunrise = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[0]
            .getElementsByClassName('weather-index')[3]
        var Sunset = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[0]
            .getElementsByClassName('weather-index')[4]
        var UVindex = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[0]
            .getElementsByClassName('weather-index')[5]
        var Windir = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[0]
            .getElementsByClassName('weather-index')[6]
        var WindGustValue = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[0]
            .getElementsByClassName('weather-index')[7]
        var WindSpd = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[0]
            .getElementsByClassName('weather-index')[8]
          humidityValue.innerHTML= data['current']['humidity']+'%'
          pressureValue.innerHTML = data['current']['pressure']+'hPa'
          visibilityValue.innerHTML = data['current']['visibility']/1000 +'km'
          var getSunriseDt = data['current']['sunrise']
          var getSunsetDt = data['current']['sunset']
          var timezone = data['timezone']
          // Sun rise
          var SRhour = convertTZ(getSunriseDt,timezone).getHours()
          var SRmin = convertTZ(getSunriseDt,timezone).getMinutes();
          Sunrise.innerHTML =  TimeFormat(SRhour,SRmin)
          // Sun set
          var SShour = convertTZ(getSunsetDt,timezone).getHours()
          var SSmin = convertTZ(getSunsetDt,timezone).getMinutes()
          Sunset.innerHTML = TimeFormat(SShour,SSmin)
          UVindex.innerHTML = parseFloat(data['current']['uvi'].toFixed(1)) + UVlevel(data['current']['uvi'].toFixed(1))
          Windir.innerHTML = degToDir(data['current']['wind_deg'])
          WindGustValue.innerHTML = data['current']['wind_gust']+'m/s'
          WindSpd.innerHTML = data['current']['wind_speed']+'m/s'

          // var SS = convertTZ(getSunsetDt,timezone)
          
    })

    fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat='+lat+'&lon='+lon+'&dt='+DtofPast[1]+'&units=metric&exclude=minutely,alerts&appid=256d2ae8d5d5bba4e10364d782f85bcb')
    .then(response => response.json())
    .then(data  =>
    {   
      // console.log('2',data)
        var dateInDt= data['current']['dt']
        var Tz = data['current']['timezone']
        var dateConvert = dtToDate(dateInDt)
        console.log(dateConvert)
        console.log(convertTZ(dateInDt,Tz).getDate())
        var date = document.getElementById('PastForecast')
        .getElementsByClassName('weather-content')[1].getElementsByClassName('weather-header')[0]
        .getElementsByClassName('time')[0]
        date.innerHTML = dateConvert
        // DATA HEADER
        var pastIcon = document.getElementById('PastForecast').getElementsByClassName('weather-content')[1]
        .getElementsByClassName('short-forecast')[0].getElementsByTagName('img')[0]
        var pastDesc = document.getElementById('PastForecast').getElementsByClassName('weather-content')[1]
        .getElementsByClassName('short-forecast')[0].getElementsByClassName('detail description')[0]
        var realFeel = document.getElementById('PastForecast')
                    .getElementsByClassName('weather-content')[1]
                    .getElementsByClassName('detail real-feel')[0].getElementsByTagName('span')[0]
        var temp = document.getElementById('PastForecast')
                  .getElementsByClassName('weather-content')[1]
                  .getElementsByClassName('detail temp')[0].getElementsByTagName('span')[0]
        realFeel.innerHTML = parseFloat(data['current']['feels_like'].toFixed(1)) +'<sup>o</sup>C'
        temp.innerHTML = parseFloat(data['current']['temp'].toFixed(1)) +'<sup>o</sup>C'
        pastIcon.setAttribute('src','http://openweathermap.org/img/wn/'+data['current']['weather'][0]['icon']+'@2x.png')
        pastDesc.innerHTML= data['current']['weather'][0]['description']
        // DATA HEADER



        // DATA BODY
        var humidityValue = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[1]
            .getElementsByClassName('weather-index')[0]
            
        var pressureValue = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[1]
            .getElementsByClassName('weather-index')[1]
            
        var visibilityValue = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[1]
            .getElementsByClassName('weather-index')[2]
        var Sunrise = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[1]
            .getElementsByClassName('weather-index')[3]
        var Sunset = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[1]
            .getElementsByClassName('weather-index')[4]
        var UVindex = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[1]
            .getElementsByClassName('weather-index')[5]
        var Windir = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[1]
            .getElementsByClassName('weather-index')[6]
        var WindGustValue = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[1]
            .getElementsByClassName('weather-index')[7]
        var WindSpd = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[1]
            .getElementsByClassName('weather-index')[8]
          humidityValue.innerHTML= data['current']['humidity']+'%'
          pressureValue.innerHTML = data['current']['pressure']+'hPa'
          visibilityValue.innerHTML = data['current']['visibility']/1000 +'km'
          var getSunriseDt = data['current']['sunrise']
          var getSunsetDt = data['current']['sunset']
          var timezone = data['timezone']
          // Sun rise
          var SRhour = convertTZ(getSunriseDt,timezone).getHours()
          var SRmin = convertTZ(getSunriseDt,timezone).getMinutes();
          Sunrise.innerHTML =  TimeFormat(SRhour,SRmin)
          // Sun set
          var SShour = convertTZ(getSunsetDt,timezone).getHours()
          var SSmin = convertTZ(getSunsetDt,timezone).getMinutes()
          Sunset.innerHTML = TimeFormat(SShour,SSmin)
          UVindex.innerHTML = parseFloat(data['current']['uvi'].toFixed(1)) + UVlevel(data['current']['uvi'].toFixed(1))
          Windir.innerHTML = degToDir(data['current']['wind_deg'])
          WindGustValue.innerHTML = data['current']['wind_gust']+'m/s'
          WindSpd.innerHTML = data['current']['wind_speed']+'m/s'

    })

    fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat='+lat+'&lon='+lon+'&dt='+DtofPast[2]+'&units=metric&exclude=minutely,alerts&appid=99c5329857ccca7720e61f40dbb9b1f5')
    .then(response => response.json())
    .then(data  =>
    {  
        let pastData = JSON.stringify(data)
        localStorage.setItem("pastData",pastData)
      //  console.log('3',data)
        var dateInDt= data['current']['dt']
        var Tz = data['current']['timezone']
        var dateConvert = dtToDate(dateInDt)
        console.log(dateConvert)
        console.log(convertTZ(dateInDt,Tz).getDate())
        var date = document.getElementById('PastForecast')
        .getElementsByClassName('weather-content')[2].getElementsByClassName('weather-header')[0]
        .getElementsByClassName('time')[0]
        date.innerHTML = dateConvert
        // DATA HEADER
        var pastIcon = document.getElementById('PastForecast').getElementsByClassName('weather-content')[2]
        .getElementsByClassName('short-forecast')[0].getElementsByTagName('img')[0]
        var pastDesc = document.getElementById('PastForecast').getElementsByClassName('weather-content')[2]
        .getElementsByClassName('short-forecast')[0].getElementsByClassName('detail description')[0]
        
        var realFeel = document.getElementById('PastForecast')
                    .getElementsByClassName('weather-content')[2]
                    .getElementsByClassName('detail real-feel')[0].getElementsByTagName('span')[0]
        var temp = document.getElementById('PastForecast')
                  .getElementsByClassName('weather-content')[2]
                  .getElementsByClassName('detail temp')[0].getElementsByTagName('span')[0]
        realFeel.innerHTML = parseFloat(data['current']['feels_like'].toFixed(1)) +'<sup>o</sup>C'
        temp.innerHTML = parseFloat(data['current']['temp'].toFixed(1)) +'<sup>o</sup>C'
        pastIcon.setAttribute('src','http://openweathermap.org/img/wn/'+data['current']['weather'][0]['icon']+'@2x.png')
        pastDesc.innerHTML= data['current']['weather'][0]['description']
        // DATA HEADER



        // DATA BODY
        var humidityValue = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[2]
            .getElementsByClassName('weather-index')[0]
            
        var pressureValue = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[2]
            .getElementsByClassName('weather-index')[1]
            
        var visibilityValue = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[2]
            .getElementsByClassName('weather-index')[2]
        var Sunrise = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[2]
            .getElementsByClassName('weather-index')[3]
        var Sunset = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[2]
            .getElementsByClassName('weather-index')[4]
        var UVindex = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[2]
            .getElementsByClassName('weather-index')[5]
        var Windir = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[2]
            .getElementsByClassName('weather-index')[6]
        var WindGustValue = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[2]
            .getElementsByClassName('weather-index')[7]
        var WindSpd = document.getElementById('PastForecast')
            .getElementsByClassName('weather-content')[2]
            .getElementsByClassName('weather-index')[8]
          humidityValue.innerHTML= data['current']['humidity']+'%'
          pressureValue.innerHTML = data['current']['pressure']+'hPa'
          visibilityValue.innerHTML = data['current']['visibility']/1000 +'km'
          var getSunriseDt = data['current']['sunrise']
          var getSunsetDt = data['current']['sunset']
          var timezone = data['timezone']
          // Sun rise
          var SRhour = convertTZ(getSunriseDt,timezone).getHours()
          var SRmin = convertTZ(getSunriseDt,timezone).getMinutes();
          Sunrise.innerHTML =  TimeFormat(SRhour,SRmin)
          // Sun set
          var SShour = convertTZ(getSunsetDt,timezone).getHours()
          var SSmin = convertTZ(getSunsetDt,timezone).getMinutes()
          Sunset.innerHTML = TimeFormat(SShour,SSmin)
          UVindex.innerHTML = parseFloat(data['current']['uvi'].toFixed(1)) + UVlevel(data['current']['uvi'].toFixed(1))
          Windir.innerHTML = degToDir(data['current']['wind_deg'])
          WindGustValue.innerHTML = data['current']['wind_gust']+'m/s'
          WindSpd.innerHTML = data['current']['wind_speed']+'m/s'
    })

/////////////////////////////////////////// ID: HOURLY  ///////////////////////////////////////////////////////////////
var previousData = JSON.parse(localStorage.getItem('pastData'))
function HourlyForecast()
{ 
    var i
    for(i=0;i < 24; i++)
    {
    // DATA HEADER
      var hourlyIcon = document.getElementById('Hourly').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('short-forecast')[0].getElementsByTagName('img')[0]
      var hourlyDescr = document.getElementById('Hourly').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('short-forecast')[0].getElementsByClassName('detail description')[0]
      var TimeForecast = document.getElementById('Hourly').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('short-forecast')[0].getElementsByClassName('time')[0]
      var hourlyRainVlmn =  document.getElementById('Hourly').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('detail rain-volumn')[0].getElementsByTagName('span')[0]
      var hourlyTemp = document.getElementById('Hourly').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('detail temp')[0].getElementsByTagName('span')[0]
    // DATA HEADER
  
      // DATA TABLE
      var hourlyHumidity = document.getElementById('Hourly').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[0]
      var hourlyPressure = document.getElementById('Hourly').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[1]
      var hourlyRealFeel = document.getElementById('Hourly').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[2]
      var hourlyWindDir = document.getElementById('Hourly').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[3]
      var hourlyWindGust = document.getElementById('Hourly').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[4]
      var hourlyWindSpeed = document.getElementById('Hourly').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[5]
      var hourlyUvi = document.getElementById('Hourly').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[6]
      var hourlyCloud = document.getElementById('Hourly').getElementsByClassName('weather-content')[i]
       .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[7]
      var hourlyVision = document.getElementById('Hourly').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[8]
      var timeZones = currentData['timezone']
      console.log(timeZones)

      var timeToForecast = currentData['hourly'][i]['dt']
      var hour = convertTZ(timeToForecast,timeZones).getHours()
      var date = convertTZ(timeToForecast,timeZones).getDate()
      var month = convertTZ(timeToForecast,timeZones).getMonth()
      if(hour < 10)
      {
        TimeForecast.innerHTML = '0'+hour+ ':00' 
      } else {
        TimeForecast.innerHTML = hour+ ':00'
      }
      hourlyIcon.setAttribute('src',"http://openweathermap.org/img/wn/"+ currentData['hourly'][i]['weather']['0']['icon'] +"@2x.png") 
      hourlyDescr.innerHTML = currentData['hourly'][i]['weather']['0']['description']
      hourlyRainVlmn.innerHTML =parseFloat(currentData['hourly'][i]['pop'].toFixed(1))+'%'
      hourlyTemp.innerHTML = parseFloat(currentData['hourly'][i]['temp'].toFixed(1))+'<sup>o</sup>C'
      hourlyHumidity.innerHTML = currentData['hourly'][i]['humidity']+"%"
      hourlyPressure.innerHTML = currentData['hourly'][i]['pressure']+"hPa"
      hourlyRealFeel.innerHTML = currentData['hourly'][i]['feels_like'] + '<sup>o</sup>C'
      hourlyWindDir.innerHTML =degToDir(currentData['hourly'][i]['wind_deg']) 
      hourlyWindGust.innerHTML = currentData['hourly'][i]['wind_gust']+'m/s'
      hourlyWindSpeed.innerHTML = currentData['hourly'][i]['wind_speed']+'m/s'
      hourlyUvi.innerHTML = currentData['hourly'][i]['uvi'].toFixed(1) + UVlevel(currentData['hourly'][i]['uvi'].toFixed(1))
      hourlyCloud.innerHTML = currentData['hourly'][i]['clouds']+'%'
      hourlyVision.innerHTML = currentData['hourly'][i]['visibility']/1000 +'km'
  }
}
HourlyForecast()
// --------------------------------------- ID:DAILY---------------------------------------------------------//

function Daily(){
  DailyTimezone = currentData['timezone']
  for(i = 0; i < 7; i++)
  {
    // DATA HEADER
    var index=i+1
    var dailyIcon = document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('short-forecast')[0].getElementsByTagName('img')[0]
    var dailyDescr = document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('short-forecast')[0].getElementsByClassName('detail description')[0]
    var TimeForecast = document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
    .getElementsByClassName('short-forecast')[0].getElementsByClassName('time')[0]
    var dailyMaxTemp =  document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
    .getElementsByClassName('detail rain-volumn')[0].getElementsByTagName('span')[0]
    var dailyMinTemp = document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
    .getElementsByClassName('detail temp')[0].getElementsByTagName('span')[0]
    if(convertTZ(currentData['daily'][index]['dt']).getDate()<10)
    {
      TimeForecast.innerHTML = '0'+convertTZ(currentData['daily'][index]['dt']).getDate() +'/'+ convertTZ(currentData['daily'][index]['dt']).getMonth()
    } else{
      TimeForecast.innerHTML = convertTZ(currentData['daily'][index]['dt']).getDate()+'/'+ convertTZ(currentData['daily'][index]['dt']).getMonth()
    }
    dailyMaxTemp.innerHTML = parseFloat(currentData['daily'][index]['temp']['max'].toFixed(1))+'<sup>o</sup>C'
    // console.log(dailyMaxTemp.innerHTML)
    dailyMinTemp.innerHTML = parseFloat(currentData['daily'][index]['temp']['min'].toFixed(1))+'<sup>o</sup>C'
    // DATA HEADER
    
    var dailyHumidity = document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[0]
    var dailyPressure = document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[1]
    var dailyPop = document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[2]
    var dailyWindDir = document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[3]
    var dailyWindGust = document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[4]
    var dailyWindSpeed = document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[5]
    var dailyUvi = document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[6]
    var dailyCloud = document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
       .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[7]
    var dailyVision = document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
        .getElementsByClassName('fully-information')[0].getElementsByClassName('weather-index')[8]
        console.log(currentData['daily'][index]['weather']['0']['icon'])
      dailyIcon.setAttribute('src',"http://openweathermap.org/img/wn/"+ currentData['daily'][index]['weather']['0']['icon'] +"@2x.png") 
      dailyDescr.innerHTML = currentData['daily'][index]['weather']['0']['description']
      dailyHumidity.innerHTML = currentData['daily'][index]['humidity']+'%'
      dailyPressure.innerHTML = currentData['daily'][index]['pressure']+' hPa'
      dailyPop.innerHTML = (currentData['daily'][index]['pop']*100).toFixed() +'%'
      dailyWindDir.innerHTML = degToDir(currentData['daily'][index]['wind_deg'])
      dailyWindGust.innerHTML = currentData['daily'][index]['wind_gust']+' m/s'
      dailyWindSpeed.innerHTML = currentData['daily'][index]['wind_speed']+' m/s'
      dailyUvi.innerHTML = currentData['daily'][index]['uvi'].toFixed(1)+UVlevel(currentData['daily'][index]['uvi'].toFixed(1))
      if(typeof currentData['daily'][index]['rain']!='undefined')
      {
        dailyVision.innerHTML = currentData['daily'][index]['rain']+'mm'
      } else{
          
        dailyVision.innerHTML= "-------------"
      }
    var session = ['morn','day','eve','night']
    for(j=0;j<4;j++)
    {
      var getDiv = document.getElementById('Next7days').getElementsByClassName('weather-content')[i]
      var sessionTemp = getDiv.getElementsByClassName('detail session-content')[0]
      .getElementsByClassName('detail inday-forecast')[j].getElementsByClassName('session-temp')[0]
      var sessionFeelLike = getDiv.getElementsByClassName('detail session-content')[0]
      .getElementsByClassName('detail inday-forecast')[j].getElementsByClassName('session-rain-ratio')[0]
      sessionTemp.innerHTML = parseFloat(currentData['daily'][index]['temp'][session[j]].toFixed(1))+'<sup>o</sup>C'
      sessionFeelLike.innerHTML = parseFloat(currentData['daily'][index]['feels_like'][session[j]].toFixed(1)) +'<sup>o</sup>C'
    }
  }
}
Daily()

