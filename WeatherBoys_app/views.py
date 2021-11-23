from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import login, authenticate
from WeatherBoys_app.forms import SignUpForm
from django.urls import reverse

def home_view(request):
    return render(
        request,
        'index2.html',
    )

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

def home_view_log(request):
    return render(
        request,
        'index2-log.html',
    )

def logout(request):
    success_url = reverse('login')
    return redirect(success_url)

def radar(request):
    return render(
        request,
        'radar.html',
    )