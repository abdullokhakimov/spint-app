import random
import string

from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import uuid

class UserAccountManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not username:
            raise ValueError('Users must have an username')
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            username=username,
            email=email,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email='', password=None):  # Allow empty email for superuser
        user = self.model(
            username=username,
            email=email,
        )

        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True, verbose_name='Имя пользователя')
    email = models.EmailField(max_length=255, unique=True, verbose_name='Email')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_owner = models.BooleanField(verbose_name="Владелец сооружения", default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    class Meta:
        verbose_name = "Аккаунт"
        verbose_name_plural = "Аккаунты"


class Game(models.Model):
    title = models.CharField(max_length=250, verbose_name='Название игры')
    svg_icon_colored = models.TextField(verbose_name='Цветной SVG код иконки игры', default='')
    svg_icon_non_colored = models.TextField(verbose_name='Нецветной SVG код иконки игры', default='')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Игра'
        verbose_name_plural = 'Игры'
        ordering = ['pk']

class Region(models.Model):
    title = models.CharField(max_length=50, verbose_name='Название района')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Район'
        verbose_name_plural = 'Районы'
        ordering = ['pk']

class Benefit(models.Model):
    title = models.CharField(max_length=250, verbose_name='Название удобства')
    svg_icon = models.TextField(verbose_name='SVG код иконки удобства')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Удобство'
        verbose_name_plural = 'Удобства'
        ordering = ['pk']

class Facility(models.Model):
    owner = models.OneToOneField(UserAccount, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=255, verbose_name='Название сооружения')
    game = models.ForeignKey(Game, on_delete=models.CASCADE, verbose_name='Вид сооружения')
    images = models.ImageField(upload_to='facilities', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    phone = models.CharField(unique=True, max_length=30, verbose_name='Телефонный номер владельца')
    region = models.ForeignKey(Region, on_delete=models.CASCADE, verbose_name='Район', related_name='fields')
    address = models.CharField(max_length=250, default='Ташкент', verbose_name='Адрес сооружения')
    address_url = models.URLField(max_length=300, verbose_name='Адрес URL',
                                 default='https://yandex.uz/maps/10335/tashkent/?ll=69.279737%2C41.311151&z=12')
    address_coordinates = models.CharField(max_length=50, verbose_name='Кординаты адреса поля',
                                          default='41.311151, 69.279716')
    start_time = models.TimeField(verbose_name='Начало рабочего дня')
    end_time = models.TimeField(verbose_name='Конец рабочего дня')


    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Сооружения'
        verbose_name_plural = 'Сооружения'
        ordering = ['-created_at', 'region']


class Room(models.Model):
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, verbose_name='Название сооружения')
    title = models.CharField(max_length=255, verbose_name='Название или номер кабинета')
    price = models.IntegerField(verbose_name='Цена сооружения на час')
    benefits = models.ManyToManyField(Benefit, verbose_name='Удобство сооружения')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    def __str__(self):
        return self.title

class Booking(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Бронировщик", related_name='bookings_as_user')
    room = models.ForeignKey(Room, on_delete=models.CASCADE, verbose_name='Название комнаты')
    date = models.DateField(verbose_name='Дата бронирования', null=True, blank=True)
    time = models.TimeField(verbose_name='Время бронирования', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    class Meta:
        verbose_name = 'Бронирование'
        verbose_name_plural = 'Бронирования'
        ordering = ['-created_at']

class Order(models.Model):
    PAYMENT_OPTION_CHOICES = [
        ('deposit', 'Депозит'),
        ('full', 'Полная оплата'),
    ]

    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Заказчик", related_name='ordering_as_user')
    status = models.CharField(max_length=20, choices=PAYMENT_OPTION_CHOICES, default="full")
    total_price = models.IntegerField(default=0)
    is_finished = models.BooleanField(default=False)
    payme_checkout_link = models.CharField(max_length=300, blank=True, null=True, verbose_name="Ссыслка дл оплаты через Payme")
    room = models.ForeignKey(Room, on_delete=models.CASCADE, verbose_name='Название комнаты')
    date = models.DateField(verbose_name='Дата бронирования', null=True, blank=True)
    time = models.JSONField(default=list, blank=True, verbose_name='Время бронирования')
    invited_users = models.ManyToManyField(UserAccount, blank=True, verbose_name="Приглашенные пользователи",
                                           related_name='order_as_invited_user')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = self.generate_unique_order_id()
        super().save(*args, **kwargs)

    def generate_unique_order_id(self):
        # Define the desired minimum value for the order_id
        min_value = 1000000  # Example: 1 million

        while True:
            # Generate a random number larger than the minimum value
            random_number = random.randint(min_value, 10 ** 8)  # 10**8 is an arbitrary large number

            # Check if the random number is unique in the database
            if not Order.objects.filter(id=random_number).exists():
                return random_number


    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
        ordering = ['-created_at']


class Invitation(models.Model):
    sender = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='sent_invitations')
    receiver = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='received_invitations')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='invitations', default=0)
    status = models.CharField(max_length=10, choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected'), ('excluded', 'Excluded')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")

    def clean(self):
        if self.sender == self.receiver:
            raise ValidationError('Вы не можете приглашать самого себя.')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def accept(self):
        self.status = 'accepted'
        self.order.invited_users.add(self.receiver)
        self.save()

class Notification(models.Model):
    type = models.CharField(max_length=20, choices=[('invite_user', 'Invite User'), ('invite_user_action', 'Invite User Action')], default='invite_user')
    receiver = models.ForeignKey(UserAccount, related_name='received_notifications', on_delete=models.CASCADE)
    invitation = models.ForeignKey(Invitation, blank=True, null=True, on_delete=models.SET_NULL)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message

    class Meta:
        verbose_name = 'Уведомление'
        verbose_name_plural = 'Уведомления'
        ordering = ['pk']


