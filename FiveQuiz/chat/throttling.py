from rest_framework.throttling import SimpleRateThrottle


class UserChatbotThrottle(SimpleRateThrottle):
    scope = 'user-chat'

    def get_cache_key(self, request, view):
        user = request.user
        if user.is_authenticated:
            return f'user:{user.id}'
        return None
