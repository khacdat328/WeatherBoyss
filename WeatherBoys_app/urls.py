from django.urls import path
from WeatherBoys_app import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('radar/', views.radar, name='radar'),
    path('about_us/', views.about, name='about'),
    path('more_forecast/', views.detail, name='detail'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='sign_up'),
    path('signup/success/', views.sign_up_success, name='sign_up_success'),
    path('home/', views.home_view_log, name='home_log'),
    path('radar_log/', views.radar_log, name='radar_log'),
    path('about_us_log/', views.about_log, name='about_log'),
    path('more_forecast_log/', views.detail_log, name='detail_log'),
    path('logout/', views.logout, name='logout'),
]