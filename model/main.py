from lib.keyphrase import extract_keyphrase
from lib.text_summarizer import summarise
from lib.read_file import read_file
from lib.preprocess import section_detection
from lib.generate_ppt import generate_ppt
from lib.agent import OpenAIAgent

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

# generate ppt
generate_ppt(summarised_content, content[0], "research.ppt")

# agent = OpenAIAgent(filename="research_paper.pdf")
# agent.get_content()
# agent.get_page_by_page_summary()
# print(agent.get_overall_summary())
