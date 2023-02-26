import re


def clean_array_dict(dict):
    # create a new array to store the cleaned data
    cleaned_dict = {}

    # iterate over each row in the original array
    for section, row in dict.items():
        cleaned_row = []

        # iterate over each element in the row
        for elem in row:
            # remove newline characters and strip leading whitespace
            cleaned_elem = elem.replace('\n', '').lstrip()

            # add the cleaned element to the cleaned row
            cleaned_row.append(cleaned_elem)

        cleaned_row.pop()

        # add the cleaned row to the cleaned array
        cleaned_dict[section] = cleaned_row
    print("=== Finished cleaning === ")
    return cleaned_dict


def clean_ppt_content(dict):
    # create a new array to store the cleaned data
    cleaned_dict = {}

    # iterate over each row in the original array
    for section, content in dict.items():
        cleaned_elem = re.sub(
            r'(?<=[a-z0-9])\n(?=[a-z0-9])', '.', content)

        # add the cleaned row to the cleaned array
        cleaned_dict[section] = cleaned_elem

    return cleaned_dict


if __name__ == '__main__':
    tmp = ['(https://orcid\norg/0000-0002-8166-812X)', '38\n4']
    print(clean_ppt_content(tmp))
