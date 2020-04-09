from django.contrib.auth.models import User
from rest_framework import serializers

from ..models import Profile


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        exclude = [
            "user",
            "verified"
        ]


class RegisterSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "password",
            "email",
            "first_name",
            "last_name",
            "profile"
        )

    def create(self, validated_data):
        """Create a new user + an associated profile."""
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_active=False,  # inactive until email is verified
        )
        user.set_password(validated_data['password'])
        user.save()

        profile_data = validated_data.pop('profile')
        Profile.objects.create(
            user=user,
            phone=profile_data['phone'],
            zip_and_city=profile_data['zip_and_city'],
            address=profile_data['address'],
            accepted_tos=profile_data['accepted_tos'],
            accepted_privacy_policy=profile_data['accepted_privacy_policy'],
        )
        return user
