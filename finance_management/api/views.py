from django.shortcuts import render
from .models import Expense, Income, Investment, Saving
from django.http import JsonResponse
from rest_framework import generics
from .serializers import ExpenseSerializer, IncomeSerializer, InvestmentSerializer, SavingSerializer
# Create your views here.
def expenses(request):
    if request.user.is_authenticated:
        expenses = Expense.objects.filter(user=request.user)
        expenses_date = [{"id": expense.id, "title": expense.title, "amount": expense.amount, "category": expense.category, "date": expense.date} for expense in expenses]
        return JsonResponse({"expenses": expenses_date})
    else:
        return JsonResponse({"error": "User not authenticated!"})
    
def incomes(request):
    if request.user.is_authenticated:
        incomes = Income.objects.filter(user=request.user)
        incomes_date = [{"id": income.id, "title": income.title, "amount": income.amount, "source": income.source, "date": income.date} for income in incomes]
        return JsonResponse({"incomes": incomes_date})
    else:
        return JsonResponse({"error": "User not authenticated!"})

def investments(request):
    if request.user.is_authenticated:
        investments = Investment.objects.filter(user=request.user)
        investments_date = [{"id": investment.id, "title": investment.title, "amount": investment.amount, "type": investment.type, "date": investment.date} for investment in investments]
        return JsonResponse({"investments": investments_date})
    else:
        return JsonResponse({"error": "User not authenticated!"})
    
def savings(request):
    if request.user.is_authenticated:
        savings = Saving.objects.filter(user=request.user)
        savings_date = [{"id": saving.id, "title": saving.title, "amount": saving.amount, "goal": saving.goal, "date": saving.date} for saving in savings]
        return JsonResponse({"savings": savings_date})
    else:
        return JsonResponse({"error": "User not authenticated!"})
    
class ExpenseListCreate(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    
    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
class ExpenseRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenseSerializer
    
    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

class IncomeListCreate(generics.ListCreateAPIView):
    serializer_class = IncomeSerializer
    
    def get_queryset(self):
        return Income.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
class IncomeRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IncomeSerializer
    
    def get_queryset(self):
        return Income.objects.filter(user=self.request.user)
    
class InvestmentListCreate(generics.ListCreateAPIView):
    serializer_class = InvestmentSerializer
    
    def get_queryset(self):
        return Investment.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
class InvestmentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = InvestmentSerializer
    
    def get_queryset(self):
        return Investment.objects.filter(user=self.request.user)
    
class SavingListCreate(generics.ListCreateAPIView):
    serializer_class = SavingSerializer
    
    def get_queryset(self):
        return Saving.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
class SavingRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SavingSerializer
    
    def get_queryset(self):
        return Saving.objects.filter(user=self.request.user)