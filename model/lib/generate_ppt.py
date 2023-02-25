import os
import pptx
from pptx.util import Pt


def generate_ppt(content, filename):
    directory = 'output'
    if not os.path.exists(directory):
        os.makedirs(directory)
    filepath = os.path.join(directory, filename)

    # Create a PowerPoint presentation with the key insights and findings
    ppt = pptx.Presentation()
    for i in range(len(content)):
        slide = ppt.slides.add_slide(ppt.slide_layouts[1])

        title = slide.shapes.title
        title.text = f"Key Insight {i+1}"

        body = slide.placeholders[1]
        body.text = content[i]

        # Set the font size of the body text to 16
        for para in body.text_frame.paragraphs:
            para.font.size = Pt(16)
    ppt.save(filepath)


if __name__ == "__main__":
    tmp = ["hello\nhaha", "world"]
    generate_ppt(tmp, "test1.ppt")
