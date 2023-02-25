import PyPDF2

def load_images(filename="../research_paper.pdf"):
    try:
        reader = PyPDF2.PdfReader(filename)
        print(reader)
        for page in reader.pages:
            for image in page.images:
                with open(image.name, "wb") as fp:
                    fp.write(image.data)
    except:
        pass