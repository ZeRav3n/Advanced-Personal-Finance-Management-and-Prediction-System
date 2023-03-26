from django.urls import path
from . import views

urlpatterns = [
    path('expenses/', views.ExpenseListCreate.as_view(), name='expense_list_create'),
    path('expenses/<int:pk>/', views.ExpenseRetrieveUpdateDestroy.as_view(), name='expense_retrieve_update_destroy'),
    path('incomes/', views.IncomeListCreate.as_view(), name='income_list_create'),
    path('incomes/<int:pk>/', views.IncomeRetrieveUpdateDestroy.as_view(), name='income_retrieve_update_destroy'),
    path('investments/', views.InvestmentListCreate.as_view(), name='investment_list_create'),
    path('investments/<int:pk>/', views.InvestmentRetrieveUpdateDestroy.as_view(), name='investment_retrieve_update_destroy'),
    path('savings/', views.SavingListCreate.as_view(), name='saving_list_create'),
    path('savings/<int:pk>/', views.SavingRetrieveUpdateDestroy.as_view(), name='saving_retrieve_update_destroy'),
]
