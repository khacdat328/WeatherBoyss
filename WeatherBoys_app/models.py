from django.db import models

class store(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    gender_choice = (
        ('M', 'Nam'),
        ('F', 'Nu')
    )
    gender = models.CharField(max_length=1, choices=gender_choice, default='M')
    address = models.CharField(max_length=300)
    birth = models.DateField(blank=True, null=True)

def __str__(self):
    return self.name