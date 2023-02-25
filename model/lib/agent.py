import openai
from model.lib.read_file import read_file
from model.lib.preprocess import section_detection
from model.lib.generate_ppt import generate_ppt

openai.api_key = "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"


class OpenAIAgent():
    def __init__(self, filename) -> None:
        print()
        print("-" * 80)
        print("Initializing OpenAIAgent...")
        self.filename = filename
        self.full_summarised_content = ""
        self.summary = ""
        self.title = ""
        self.sections = {}
        self.insights = []
        print("Agent initialized!")

    def respond(self, prompt, max_tokens=2048):
        completion = openai.Completion.create(
            engine="text-davinci-003", prompt=prompt, max_tokens=max_tokens)
        return completion.choices[0]['text']

    def get_content(self):
        res = read_file(self.filename)
        self.title, content = res
        self.sections = section_detection(content)
        print("Got content!")

    def get_page_by_page_summary(self):
        for section, content in self.sections.items():
            # for parts in content:
            summarised_page = self.respond(
                f"Summarise this paragraph:\n{content}")
            print("Paragraph summarised!")
            self.full_summarised_content += summarised_page

    def get_overall_summary(self, max_tokens=2048):
        self.summary = self.respond(
            f"Summarise this research paper title {self.title}:\n{self.full_summarised_content}", max_tokens=max_tokens)
        return self.summary

    def key_insights(self):
        for section, content in self.sections.items():
            page_insights = self.respond(
                f"List in bullet points only the key insights of {section} sections:\n{content}")
            page_insights = page_insights.replace('\n', ' ')

            if '•' in page_insights:
                page_insights = page_insights.split('•')
            elif '- ' in page_insights:
                page_insights = page_insights.split('- ')
            else:
                page_insights = page_insights.split(' -')

            page_insights = [insight.strip()
                             for insight in page_insights if len(insight.strip()) > 13]
            self.insights.append(page_insights)
        return self.insights

    def save_ppt(self, output='research_paper.pptx'):
        generate_ppt(self.insights, self.title, output)
