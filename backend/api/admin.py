from django.contrib import admin
from api.models import Profile, User,CreatePost,SavedPost,UserProfile
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ['username','email']

class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['full_name', 'user', 'verified']
    
class CreatePostAdmin(admin.ModelAdmin):
    list_display=['id','username','caption','post','location','tags','created_at','likes']
    
class SavedPostAdmin(admin.ModelAdmin):
    list_display=['username','post_id']
    
class UserProfileAdmin(admin.ModelAdmin):
    list_display=['id','username','name','bio','profilePic']

admin.site.register(User,UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(CreatePost,CreatePostAdmin)
admin.site.register(SavedPost,SavedPostAdmin)
admin.site.register(UserProfile,UserProfileAdmin)