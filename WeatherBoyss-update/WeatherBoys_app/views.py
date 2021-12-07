from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import login, authenticate
from WeatherBoys_app.forms import SignUpForm
from django.urls import reverse

def signup_view(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            success_url = reverse('sign_up_success')
            return redirect(success_url)
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'signup_form': form})

def sign_up_success(request): #sign up success page
    return render(
        request,
        'success.html'
        )

def login_view(request):
    if request.method == 'POST':
       form = AuthenticationForm(data=request.POST)
       if form.is_valid():
           success_url = reverse('home_log')
           return redirect(success_url)
    else:
       form = AuthenticationForm()
    return render(
        request,
        'login.html',
        {'login_form':form},
    )

def logout(request):
    success_url = reverse('login')
    return redirect(success_url)

def home_view(request):
    return render(
        request,
        'index2.html',
    )

def home_view_log(request):
    return render(
        request,
        'index2-log.html',
    )
    
def radar(request):
    return render(
        request,
        'radar.html',
    )

def radar_log(request):
    return render(
        request,
        'radar-log.html',
    )

def about(request):
    return render(
        request,
        'about.html',
    )

def about_log(request):
    return render(
        request,
        'about-log.html',
    )

def detail(request):
    return render(
        request,
        'detail.html',
    )

def detail_log(request):
    return render(
        request,
        'detail-log.html',
    )