from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils import timezone

class Author(models.Model):
    creation_date = models.DateTimeField(verbose_name="Datum vytvoření", default=timezone.now)
    full_name = models.CharField(verbose_name="Jméno",max_length=200)

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name_plural = "Autoři"
        verbose_name = "Autor"
        ordering = ["full_name"]
# Create your models here.

class YearOfMaturation(models.Model):
    date = models.CharField(verbose_name="Roky maturity xxxx až xxxx", max_length=200)

    def __str__(self):
        return self.date

    class Meta:
        verbose_name_plural = "Roky maturit"
        verbose_name = "Rok maturity"
        ordering = ["date"]

class Book(models.Model):
    creation_date = models.DateTimeField(verbose_name="Datum vytvoření", default=timezone.now)
    name = models.CharField(verbose_name="Název knihy", max_length=200)
    author = models.ForeignKey(Author, verbose_name="Autor", on_delete=models.CASCADE)
    maturity = models.ManyToManyField(YearOfMaturation, verbose_name="Roky maturit", blank=False, null=False)
    description = models.TextField(verbose_name="Popis")
    pdf = models.FileField(verbose_name="PDF", blank=False, null=False, upload_to='books', validators=[FileExtensionValidator(['pdf', 'PDF'])])
    logo = models.ImageField(verbose_name="Obrázek", blank=False, null=False, upload_to='books_covers', validators=[FileExtensionValidator(['png', 'jpg'])])
    season = models.CharField(verbose_name="Období",choices=[('literatura do konce 18. století','literatura do konce 18. století'),('literatura do konce 19. století','literatura do konce 19. století'),('světová literatura 20. a 21. století','světová literatura 20. a 21. století'),('česká literatura 20. a 21. století','česká literatura 20. a 21. století')], max_length=200, default="světová literatura 20. a 21. století")
    genre = models.CharField(verbose_name="Žánr",choices=[('poezie','poezie'),('próza','próza'),('drama','drama')], max_length=200, default='próza')


    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Knihy"
        verbose_name = "Kniha"