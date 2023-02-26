import openai
from model.lib.text_summarizer import summarise
from model.lib.read_file import read_file
from model.lib.preprocess import section_detection
from model.lib.generate_ppt import generate_ppt
from model.lib.postprocess import clean_array_dict, clean_ppt_content
import os
import requests

openai.api_key = "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"


def respond(prompt, max_tokens=2048):
    completion = openai.Completion.create(
        engine="text-davinci-003", prompt=prompt, max_tokens=max_tokens)
    return completion.choices[0]['text']

def get_ppt_from_upload(filename):
    # read the file
    content = read_file(filename)
    
    print()
    print("-" * 80)

    # preprocess the content
    print("\nProcessing...")
    processed_content = section_detection(content)


    # print("\nProcessed!")
    # print(processed_content)

    # get summary information
    print("\nSummarising...")
    summarised_content = {}
    for section, content in processed_content.items():
        if len(content) < 10:
            continue
        output = summarise(content, num_sentences=5)
        summarised = "\n".join(output)
        summarised_content[section] = summarised

    # print("\nSummarised!")
    # print(summarised_content)
    
    print("\nQuerying GPT-3...")
    gpt_content = {}
    for section, content in summarised_content.items():
        res = respond(
            f"Rewrite this to be more concise yet make more sense:\n{content}")
        gpt_content[section] = res.split(".")

    # print("\nGPTed!")
    # print(gpt_content)
    
    print("\nCleaning data...")
    cleaned_gpt_content = clean_array_dict(gpt_content)

    # print("\nCleaned!")
    # print(cleaned_gpt_content)

    ppt_content = {}
    for section, row in cleaned_gpt_content.items():
        ppt_content[section] = '\n'.join(row)

    # print("\nPPTed!")
    # print(ppt_content)
    print("\nFinal cleaning...")
    final_ppt_content = clean_ppt_content(ppt_content)

    # print("\nPPTed + Cleaned!")
    # print(ppt_content)

    full_content = '\n'.join(list(final_ppt_content.values()))
    title = respond(
        f"Give an appropriate title based on this text: {full_content}")
    summary = respond(
        f"Summarise these text into 3 sentences: {full_content}")

    cwd = os.getcwd()  # Get the current working directory (cwd)
    files = os.listdir(cwd)  # Get all the files in that directory
    print("Files in %r: %s" % (cwd, files))
    
    with open('../data/summary.txt', "w") as f:
        f.write(summary)

    # generate ppt
    print("\nGenerating ppt...")
    generate_ppt(final_ppt_content, title, "research.ppt")

    return None


if __name__ == "__main__":
    get_ppt_from_upload("../data/upload.pdf")
