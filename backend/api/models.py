from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique = True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def profile(self):
        profile = Profile.objects.get(user=self)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    bio = models.CharField(max_length=1000)
    verified = models.BooleanField(default = False)
    
def upload_path(instance,filename):
    return '/'.join(['Posts',str(instance.username),filename])

class CreatePost(models.Model):
    username = models.CharField(max_length=100)
    caption = models.TextField(blank=True)
    post = models.ImageField(blank=True,null=True,upload_to=upload_path)
    location = models.CharField(max_length=250,blank=True)
    tags = models.CharField(max_length=1500,blank=True)
    created_at = models.CharField(max_length=60)    
    likes = models.IntegerField(default=0)
 
class SavedPost(models.Model):
    username = models.CharField(max_length=100)
    post_id = models.IntegerField()
    
def upload_path(instance,filename):
    return '/'.join(['ProfilePics',str(instance.username),filename])
    
class UserProfile(models.Model):
    username = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    bio = models.TextField(max_length=1800)
    profilePic = models.ImageField(blank=True,null=True,upload_to=upload_path)
    
    
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)