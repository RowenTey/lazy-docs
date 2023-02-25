import PyPDF2


def read_file(filename):
    """ Open the PDF file and read its contents

    returns a string of text containing file content
    """
    pdf_file = open(filename, 'rb')
    pdf_reader = PyPDF2.PdfFileReader(pdf_file)
    text = ''
    for page_num in range(pdf_reader.getNumPages()):
        page = pdf_reader.getPage(page_num)
        text += page.extractText()
    return text
