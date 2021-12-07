from django.contrib import admin
from WeatherBoys_app.models import store

@admin.register(store)
class store(admin.ModelAdmin):
    list_display = ('name', 'email', 'gender', 'address', 'birth',)
    search_fields = ('name', 'email',)
    list_filter = ('gender',)
