all: 
	pdflatex abtesting.tex
	bibtex abtesting.aux
	pdflatex abtesting.tex
	pdflatex abtesting.tex

open:
	open -a Preview abtesting.pdf 	
