from lib.keyphrase import extract_keyphrase
from lib.text_summarizer import summarise
from lib.read_file import read_file
from lib.preprocess import section_detection
from lib.generate_ppt import generate_ppt

# read the file
content = read_file("research_paper.pdf")

# preprocess the content
processed_content = section_detection(content)

print()
print("-" * 60)

# get summary information
summarised_content = []
for key, value in processed_content.items():
    output = summarise(value, num_sentences=10)
    summarised = "\n".join(output)
    # print("key: " + key)
    # print("summarised: ", summarised)
    # print()
    summarised_content.append(summarised)

# print("key: " + key)
# print("summarised: ", summarised)
# print()
# summarised_content.append(summarised)

# generate ppt
generate_ppt(summarised_content, "research.ppt")
