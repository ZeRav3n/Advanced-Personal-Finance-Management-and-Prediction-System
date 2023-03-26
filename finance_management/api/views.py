from django.shortcuts import render
from .models import Expense
from django.http import JsonResponse
# Create your views here.
def expenses(request):
    if request.user.is_authenticated:
        expenses = Expense.objects.filter(user=request.user)
        expenses_date = [{"id": expense.id, "title": expense.title, "amount": expense.amount, "category": expense.category, "date": expense.date} for expense in expenses]
        return JsonResponse({"expenses": expenses_date})
    else:
        return JsonResponse({"error": "User not authenticated!"})