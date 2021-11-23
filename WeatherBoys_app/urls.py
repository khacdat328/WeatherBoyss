from django.urls import path
from WeatherBoys_app import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('', views.home_view_log, name='home_log'),
    path('signup/', views.signup_view, name='sign_up'),
    path('signup/success/', views.sign_up_success, name='sign_up_success'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout, name='logout'),
    path('radar/', views.radar, name='radar'),
]