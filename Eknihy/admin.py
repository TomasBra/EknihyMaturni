from django.contrib import admin
from django.contrib.admin import AdminSite
from django.utils.translation import ugettext_lazy

from Eknihy.models import Book, Author, YearOfMaturation


# Register your models here.
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    search_fields = ("name", "author__full_name")
    list_display = ("name", "author", "creation_date", "genre", "season")
    list_filter = ("author__full_name", "creation_date", "maturity", "genre", "season")
    list_per_page = 10
    pass


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    search_fields = ("full_name",)
    list_display = ("full_name", "creation_date",)
    list_filter = ("full_name", "creation_date",)
    list_per_page = 10
    pass


@admin.register(YearOfMaturation)
class YearOfMaturationAdmin(admin.ModelAdmin):
    search_fields = ("date",)
    list_display = ("date",)
    list_per_page = 10
    pass

admin.site.site_header = 'Správa systému E-knihovny'
admin.site.site_title = 'Správa systému E-knihovny'
admin.site.index_title = 'Správa systému E-knihovny'