import re
from re import finditer


def process_paper(text):
    # Removes unwanted characters, accounting for unicode characters
    # text = (text.encode('ascii', 'ignore')).decode("utf-8")

    # Remove unwanted characters and extra spaces
    text = re.sub(r'[^\w\s\-\:\.\']', '', text)
    text = re.sub(r'[\n\r\t]+', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    # text = re.sub(r"-\s", "", text)

    body = text

    return body


def split_string(string, max_length=500):
    # Split the string into a list of words
    words = string.split()

    # Create a list to hold the sublists
    sublists = []

    # Loop over the words and group them into sublists of up to max_length words
    sublist = []
    sublist_len = 0
    for word in words:
        if sublist_len + len(word) > max_length:
            sublists.append(sublist)
            sublist = []
            sublist_len = 0
        sublist.append(word)
        sublist_len += len(word) + 1  # Add 1 for the space after the word

    # Add the last sublist to the list of sublists
    if len(sublist) > 6:
        sublists.append(sublist)

    # Join the sublists back into strings
    result = [' '.join(sublist) for sublist in sublists]

    return result


def check_dic(dic):
    for key, values in dic.items():
        dic[key] = split_string(values)

    return dic


def section_detection(text):
    headings = ["Abstract", "Introduction", "Background", "Analysis", "Discussion",
                "Conclusion", "References", "Acknowledgments", "Future Work", "Outcome", "Result"]
    cleaned_text = process_paper(text)
    title_list = []
    all = [[], []]
    dic = {}
    count = 0
    pattern = r"\b(" + "|".join(headings) + r")\b"

    # find matches
    for match in finditer(pattern, cleaned_text, re.IGNORECASE):
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

    # remove references & acknowledgements
    if 'Acknowledgments' in dic:
        del dic['Acknowledgments']

    if 'References' in dic:
        del dic['References']

    # dic = check_dic(dic)
    # print(dic)

    return dic


if __name__ == '__main__':
    from read_file import read_file
    text = read_file("../test1.pdf")
    res = section_detection(text)

    for key, val in res.items():
        print("key: " + key + '\n')
        print("val: " + val + '\n')
        print()
