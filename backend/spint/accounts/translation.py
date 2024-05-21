from modeltranslation.translator import TranslationOptions, register
from .models import Game, Region, Benefit, Notification

@register(Game)
class GameTranslationOptions(TranslationOptions):
    fields = (('title',))

@register(Region)
class RegionTranslationOptions(TranslationOptions):
    fields = (('title',))

@register(Benefit)
class BenefitTranslationOptions(TranslationOptions):
        fields = (('title',))

@register(Notification)
class NotificationTranslationOptions(TranslationOptions):
            fields = (('message',))
