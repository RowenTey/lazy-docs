import re
from re import finditer


def process_paper(text):
    # Removes unwanted characters, accounting for unicode characters
    text = re.sub("@&#", " ", text)
    text = re.sub("\n", " ", text)
    text = re.sub(r'(?<=[a-zA-Z])-(?=[a-zA-Z])', '', text)
    text = (text.encode('ascii', 'ignore')).decode("utf-8")

    # Extracting the highlights, body from the paper
    body_main = text

    # Making a copy of the body, removing punctuations & extra spaces
    body_copy = body_main
    body_copy = re.sub('[^\w\s\d\.]', '', body_copy)
    body_copy = ' '.join(body_copy.split())
    # body_copy = body_copy.split(".")

    return body_copy


def section_detection(text):
    cleaned_text = process_paper(text)
    title_list = []
    all = [[], []]
    dic = {}
    count = 0
    pattern = r'\b(Abstract|Introduction|Background|Analysis|Discussion|Conclusion|References|Acknowledgments)\b'

    # find matches
    for match in finditer(pattern, cleaned_text):
        if match.group() != '':
            all[0].append(match.span()[0])
            all[1].append(match.span()[1])
            title_list.append(match.group())
            count += 1

    # get the paragraph until next match
    for i in range(count):
        j = i+1
        try:
            dic[title_list[i]] = cleaned_text[all[1][i]:all[0][j]]
        except IndexError:
            dic[title_list[i]] = cleaned_text[all[1][i]:]

    if 'Acknowledgments' in dic:
        del dic['Acknowledgments']

    if 'References' in dic:
        del dic['References']

    return dic


if __name__ == '__main__':
    from read_file import read_file
    text = read_file("../research_paper.pdf")

    # tmp = ' '.join(process_paper(text)[1])
    # print(tmp)
    res = section_detection(text)

    for key, val in res.items():
        print("key: " + key + '\n')
        print("val: " + val + '\n')
        print()
