from django.shortcuts import render

# Create your views here.
from Eknihy.forms import SearchForm
from Eknihy.models import Book
from Eknihy.models import YearOfMaturation
from django.db.models import Q


def index(request):
    books = Book.objects.all()
    maturity = YearOfMaturation.objects.all()
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = SearchForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            genre = form.data["genre"]
            season = form.data["season"]
            maturity = form.data["maturity"]

            if form.data["genre"] == "žánr:":
                genre = ""
            if form.data["season"] == "období:":
                season = ""

            books = Book.objects.filter(
                Q(author__full_name__contains=form.data["search_value"]) & Q(season__contains=season) & Q(
                    genre__contains=genre) | Q(name__contains=form.data['search_value']) & Q(
                    season__contains=season) & Q(genre__contains=genre))

            if form.data["maturity"]:
                books = books.filter(maturity=maturity)

            if 'cancel_search' in request.POST:
                books = Book.objects.all()
                form = SearchForm()

    if request.method == "GET":
        form = SearchForm()

    context = {"Books": books, "form": form, "Maturity": maturity}
    return render(request, "index.html", context)
