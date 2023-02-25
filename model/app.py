import openai
from lib.read_file import read_file
from lib.preprocess import section_detection
from lib.generate_ppt import generate_ppt
from PIL import Image
from urllib import request

openai.api_key = "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"


def respond(prompt):
    completion = openai.Completion.create(
        engine="text-davinci-003", prompt=prompt, max_tokens=2048)
    return completion.choices[0]['text']


def page_by_page_summary(filename):
    research_paper = ""
    pdf_file = open(filename, 'rb')
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        page_text = page.extract_text()
        summarised_page = respond(f"Summarise page {page_num+1}:\n{page_text}")
        research_paper += summarised_page
    return research_paper


# read the file
content = read_file("research_paper.pdf")

# preprocess the content
processed_content = section_detection(content)
