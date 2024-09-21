from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView)
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(),name="token-obtain"),
    path('token/refresh/', TokenRefreshView.as_view(), name="refresh-token"),
    path('register/', views.RegisterView.as_view(), name="register-user"),
    path('registerList/', views.ProfileListView.as_view(), name="register-user-list"),
    path('test/', views.protectedView, name="test"),
    path('', views.view_all_routes, name="all-routes"),
    path('addpost/',views.PostCreate.as_view(),name='addpost'),
    path('postlist/',views.PostList.as_view(),name='postlist'),
    path('postupdate/<int:id>/',views.PostLikeUpdate.as_view(),name='postupdate'),
    path('delete-post/<int:id>/', views.DeletePostView.as_view(), name='delete-post'),
    path('add-saved-post/',views.SavedPostCreate.as_view(),name='addsavedpost'),
    path('saved-post-list/',views.SavedPostList.as_view(),name='savedpostlist'),
    path('delete-saved-post/<int:post_id>/',views.DeleteSavedPost.as_view(),name='delete-saved-post'),
    path('deletesavedpost/<str:username>/<int:post_id>/', views.DeleteSavedPostWithUser.as_view(), name='deletesavedpost'),
    
    path('create-user-profile/',views.UserProfileCreate.as_view(),name='create-user-profile'),
    path('user-profile-list/',views.UserProfileList.as_view(),name='user-profile-list'),
    path('update-user-profile/<int:id>/',views.UserProfileUpdate.as_view(),name='create-user-profile'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)