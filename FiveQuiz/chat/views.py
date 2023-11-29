from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import get_user_model
from .models import Conversation
from .throttling import UserChatbotThrottle
import openai

User = get_user_model()
class ChatbotView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [UserChatbotThrottle]

    def get(self, request):
        user = request.user
        conversations = Conversation.objects.filter(user=user)
        serialized_conversations = [
            {'prompt': c.prompt, 'response': c.response} for c in conversations]
        return Response({'conversations': serialized_conversations}, status=status.HTTP_200_OK)

    def post(self, request):
        prompt = request.data.get('prompt')
        if prompt:
            user = request.user
            total_count = Conversation.objects.filter(user=user).count()
            start_index = max(0, total_count - 3)
            previous_conversations = Conversation.objects.filter(
                user=user).order_by('id')[start_index:]
            previous_conversations_text = "\n".join(
                [f"User: {c.prompt}\nAssistant: {c.response}" for c in previous_conversations])
            prompt_with_previous = f"{previous_conversations_text}\nUser: {prompt}\nAssistant:"
            model_engine = "text-davinci-003"
            completions = openai.Completion.create(
                engine=model_engine,
                prompt=prompt_with_previous,
                max_tokens=1024,
                n=1,
                stop=None,
                temperature=0.5,
            )
            response = completions.choices[0].text.strip()
            return Response({'prompt': prompt, 'response': response}, status=status.HTTP_200_OK)
        return Response({'error': 'Prompt field is required.'}, status=status.HTTP_400_BAD_REQUEST)