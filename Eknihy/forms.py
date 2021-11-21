from django import forms

from Eknihy.models import YearOfMaturation


class SearchForm(forms.Form):

    search_value = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control row m-0','placeholder':'Hledejte...'}), max_length=100, required=False)
    season = forms.ChoiceField(widget=forms.Select(attrs={'class': 'form-control mt-2'}),
                          choices=[('období:','období:'),('literatura do konce 18. století', 'literatura do konce 18. století'),
                                   ('literatura do konce 19. století', 'literatura do konce 19. století'),
                                   ('světová literatura 20. a 21. století', 'světová literatura 20. a 21. století'),
                                   ('česká literatura 20. a 21. století', 'česká literatura 20. a 21. století')], )
    genre = forms.ChoiceField(widget=forms.Select(attrs={'class': 'form-control mt-2'}), choices=[('žánr:','žánr:'),('poezie', 'poezie'), ('próza', 'próza'), ('drama', 'drama')])
    maturity = forms.ModelChoiceField(widget=forms.Select(attrs={'class': 'form-control mt-2',}), queryset=YearOfMaturation.objects.all(),required=False)
