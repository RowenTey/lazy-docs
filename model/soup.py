import requests
from bs4 import BeautifulSoup
from lib.keyphrase import extract_keyphrase
from lib.text_summarizer import summarise
from lib.preprocess import section_detection
from lib.generate_ppt import generate_ppt
from lib.agent import OpenAIAgent




# Define the URL of the website to summarize
url = "https://doi.org/10.7554/eLife.80379"

# Retrieve the HTML content of the website
response = requests.get(url)
html_content = response.content

# Parse the HTML content with a more efficient parser
soup = BeautifulSoup(html_content, "lxml")

# Extract the title of the website
title = soup.title.string

# Extract all the text content of the website
text = " ".join([p.text for p in soup.find_all("p")])
# print(text)

# preprocess the content
processed_content = section_detection(text)

# print(processed_content)

print()
print("-" * 80)
print("Research paper title: " + title + '\n')

# get summary information
summarised_content = []
for key, value in processed_content.items():
    if len(value) < 10:
        continue
    output = summarise(value, num_sentences=5)
    summarised = "\n".join(output)
    summarised_content.append(summarised)

# generate ppt
generate_ppt(summarised_content, title, "research.ppt")

# agent = OpenAIAgent(filename="research_paper.pdf")
# agent.get_content()
# agent.get_page_by_page_summary()
# print(agent.get_overall_summary())