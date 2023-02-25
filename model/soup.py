import requests
import openai
from bs4 import BeautifulSoup
from lib.keyphrase import extract_keyphrase
from lib.text_summarizer import summarise
from lib.preprocess import section_detection
from lib.generate_ppt import generate_ppt
from lib.postprocess import clean_2d_array, clean_ppt_content

openai.api_key = "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"


def get_ppt_from_url(url):
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

    # preprocess the content
    processed_content = section_detection(text)

    print()
    print("-" * 80)
    # get summary information
    summarised_content = []
    for key, value in processed_content.items():
        if len(value) < 10:
            continue
        output = summarise(value, num_sentences=5)
        summarised = "\n".join(output)
        summarised_content.append(summarised)

    # print("\nSummarised!")
    # print(summarised_content)

    gpt_content = []
    for content in summarised_content:
        res = respond(
            f"Rewrite this to be more concise yet make more sense:\n{content}")
        gpt_content.append(res.split("."))

    # print("\nGPTed!")
    # print(gpt_content)

    cleaned_gpt_content = clean_2d_array(gpt_content)

    # print("\nCleaned!")
    # print(cleaned_gpt_content)

    ppt_content = []
    for row in cleaned_gpt_content:
        ppt_content.append('\n'.join(row))

    # print("\nPPTed!")
    # print(ppt_content)

    final_ppt_content = clean_ppt_content(ppt_content)

    # print("\nPPTed + Cleaned!")
    # print(ppt_content)

    full_content = '\n'.join(final_ppt_content)
    title = respond(
        f"Give an appropriate title based on this text: {full_content}")
    summary = respond(
        f"Summarise these text into 3 sentences: {full_content}")

    # generate ppt
    generate_ppt(final_ppt_content, title, "research.ppt")

    return summary


if __name__ == "__main__":
    get_ppt_from_url()
