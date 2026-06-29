from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        try:
            token['role'] = user.userprofile.role
            token['company_id'] = user.userprofile.company.id
        except AttributeError:
            token['role'] = 'ADMIN'
            token['company_id'] = None

        return token