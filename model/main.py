import openai
from model.lib.text_summarizer import summarise
from model.lib.read_file import read_file
from model.lib.preprocess import section_detection
from model.lib.generate_ppt import generate_ppt
from model.lib.postprocess import clean_2d_array, clean_ppt_content

openai.api_key = "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"


def respond(prompt, max_tokens=2048):
    completion = openai.Completion.create(
        engine="text-davinci-003", prompt=prompt, max_tokens=max_tokens)
    return completion.choices[0]['text']


def get_ppt_from_upload(filename):
    # read the file
    content = read_file(filename)

    # preprocess the content
    processed_content = section_detection(content)

    print()
    print("-" * 80)

    # print("\nProcessed!")
    # print(processed_content)

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
    get_ppt_from_upload()
