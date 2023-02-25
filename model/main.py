from lib.keyphrase import extract_keyphrase
from lib.text_summarizer import summarise
from lib.read_file import read_file
from lib.preprocess import section_detection
from lib.generate_ppt import generate_ppt
from lib.agent import OpenAIAgent
import openai


openai.api_key = "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"


def respond(self, prompt, max_tokens=2048):
    completion = openai.Completion.create(
        engine="text-davinci-003", prompt=prompt, max_tokens=max_tokens)
    return completion.choices[0]['text']


# read the file
content = read_file("test1.pdf")

# preprocess the content
processed_content = section_detection(content[1])

print()
print("-" * 80)
print("Research paper title: " + content[0] + '\n')

# get summary information
summarised_content = []
for key, value in processed_content.items():
    if len(value) < 10:
        continue
    output = summarise(value, num_sentences=5)
    summarised = "\n".join(output)
    summarised_content.append(summarised)

print(summarised_content)

gpt_content = []
for content in summarised_content:
    res = respond(f"Rewrite this to be more neat and concise:\n{content}")
    gpt_content.append(res)

print(gpt_content)

# generate ppt
# generate_ppt(summarised_content, content[0], "research.ppt")
