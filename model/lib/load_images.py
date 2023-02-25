import PyPDF2

def load_images(filename="../research_paper2.pdf"):
    try:
        reader = PyPDF2.PdfReader(filename)
        print(reader)
        for page in reader.pages:
            for image in page.images:
                with open("../output/posterImg.png", "wb") as fp:
                    fp.write(image.data)
                    # write once
                    # break
    except:
        pass