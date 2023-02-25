import PyPDF2
from transformers import BertTokenizer, BertForSequenceClassification

# Load the pre-trained BERT tokenizer and model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased')

# Open the PDF file and read its contents
pdf_file = open('research_paper.pdf', 'rb')
pdf_reader = PyPDF2.PdfFileReader(pdf_file)
text = ''
for page_num in range(pdf_reader.getNumPages()):
    page = pdf_reader.getPage(page_num)
    text += page.extractText()

# Tokenize the text using the BERT tokenizer
inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True)

# Use the BERT model to analyze the text
outputs = model(inputs['input_ids'], attention_mask=inputs['attention_mask'])
predictions = outputs[0].argmax(dim=1)

# Print the predicted labels for each sentence in the text
sentences = text.split('.')
for i in range(len(predictions)):
    print(f"Sentence {i+1}: {sentences[i]}")
    print(f"Label: {predictions[i]}")
