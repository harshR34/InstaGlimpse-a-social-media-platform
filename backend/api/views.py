from django.shortcuts import render
from .models import User,CreatePost,SavedPost,Profile,UserProfile
# Create your views here.
from django.http import HttpResponse
from .serializers import MyTOPS, RegistrationSerializer,CreatePostSerializer,SavedPostSerializer,UserProfileSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics,views
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTOPS

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer
    
class UserProfileCreate(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserProfileSerializer
    
class UserProfileList(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserProfileSerializer
    
class UserProfileUpdate(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserProfileSerializer
    lookup_field = 'id'
    
        
class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

class PostCreate(generics.CreateAPIView):
    queryset = CreatePost.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CreatePostSerializer

class PostList(generics.ListAPIView):
    queryset = CreatePost.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CreatePostSerializer
    
class PostLikeUpdate(generics.UpdateAPIView):
    queryset = CreatePost.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CreatePostSerializer
    lookup_field = 'id'
     
class DeletePostView(generics.DestroyAPIView):
    queryset = CreatePost.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CreatePostSerializer
    lookup_field = 'id'  # Assuming the URL will use 'id' for lookup
    
class SavedPostCreate(generics.CreateAPIView):
    queryset = SavedPost.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = SavedPostSerializer

class SavedPostList(generics.ListAPIView):
    queryset = SavedPost.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = SavedPostSerializer
    
class DeleteSavedPost(generics.DestroyAPIView):
    queryset = SavedPost.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = SavedPostSerializer

    def get_object(self):
        # Override this method to look up the object by `post_id`
        post_id = self.kwargs.get('post_id')
        try:
            return SavedPost.objects.get(post_id=post_id)
        except SavedPost.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

class DeleteSavedPostWithUser(generics.DestroyAPIView):
    queryset = SavedPost.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = SavedPostSerializer

    def get_object(self):
        # Override this method to look up the object by `username` and `post_id`
        username = self.kwargs.get('username')
        post_id = self.kwargs.get('post_id')
        try:
            return SavedPost.objects.get(username=username, post_id=post_id)
        except SavedPost.DoesNotExist:
            raise Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protectedView(request):
    output = f"Welcome {request.user}, Authentication Successful"
    return Response({'response':output}, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_all_routes(request):
    data = [
        'api/token/refresh/',
        'api/register/',
        'api/registerList/'
        'api/token/',
        'api/addpost/',
        'api/postlist/',
        'api/postupdate/<int:id>/',
        'api/delete-post/<int:id>/',
        'api/add-saved-post/',
        'api/saved-post-list/',
        'api/delete-saved-post/<int:post_id>/',
        'api/deletesavedpost/<str:username>/<int:post_id>/',
        'api/create-user-profile/',
        'api/user-profile-list/',
        'api/update-user-profile/<int:id>/',
    ]

    return Response(data)