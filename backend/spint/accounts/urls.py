from django.urls import path
from .views import UserListView, RegionListView, GameListView, BenefitListView, FacilityListView, \
    FacilityMapCoordinatesListView, FacilityDetailView, RoomsListView, BookingViewSet, \
    InvitationViewSet, NotificationListView, TestView, OrderViewSet  # Replace with your view path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'bookings', BookingViewSet, basename='booking')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'invitations', InvitationViewSet)

urlpatterns = [
    path('users/', UserListView.as_view()),
    path('regions/', RegionListView.as_view()),
    path('games/', GameListView.as_view()),
    path('benefits/', BenefitListView.as_view()),
    path('facilities/', FacilityListView.as_view()),
    path('facilities-map-coordinates/', FacilityMapCoordinatesListView.as_view()),
    path('facility/<int:pk>/', FacilityDetailView.as_view()),
    path('rooms/', RoomsListView.as_view()),
    path('notifications/', NotificationListView.as_view()),
    path('paycom/checkout', TestView.as_view())
]

urlpatterns += router.urls