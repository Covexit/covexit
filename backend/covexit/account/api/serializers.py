from django.conf import settings
from rest_framework import serializers

from ..models import (
    Profile,
    VERIFICATION_KEY_LENGTH,
    create_verification_key,
    send_verification_email,
)


class ProfileRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = [
            "user",
            "verified",
            "verification_key",
        ]


class RegisterSerializer(serializers.ModelSerializer):
    profile = ProfileRegisterSerializer(required=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
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
        user = settings.AUTH_USER_MODEL.objects.create(
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
            verified=False,
            verification_key=create_verification_key(),
        )
        send_verification_email(user)
        return user


class VerifySerializer(serializers.Serializer):
    user_id = serializers.IntegerField(required=True)
    verification_key = serializers.CharField(
        max_length=VERIFICATION_KEY_LENGTH, required=True
    )

    def validate(self, attrs):
        """Check for correct user ID and verification_key."""
        try:
            user = User.objects.get(pk=attrs['user_id'])
        except User.DoesNotExist:
            raise serializers.ValidationError("User does not exist")
        if user.profile.verification_key != attrs['verification_key']:
            raise serializers.ValidationError("Incorrect verification key!")
        self.instance = user
        return attrs
