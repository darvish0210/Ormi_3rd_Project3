from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login
from chat.models import Conversation
from .serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            conversation = Conversation.objects.create(
                user=user, prompt="너(assistant)의 역할은 뭐야?",
                response="assistant는 다양한 장르에 대한 지식과 이해를 기반으로 간단한 퀴즈를 내주는 친절한 AI입니다.")
            response_data = {
                'message': '회원가입에 성공하였습니다.',
                'user': serializer.data,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': '로그인에 성공하였습니다.'
            }, status=status.HTTP_200_OK)
        return Response({'error': '로그인에 실패하였습니다.'}, status=status.HTTP_401_UNAUTHORIZED)