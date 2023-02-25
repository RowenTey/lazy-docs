import re


def clean_2d_array(arr):
    # create a new array to store the cleaned data
    cleaned_arr = []

    # iterate over each row in the original array
    for row in arr:
        cleaned_row = []

        # iterate over each element in the row
        for elem in row:
            # remove newline characters and strip leading whitespace
            cleaned_elem = elem.replace('\n', '').lstrip()

            # add the cleaned element to the cleaned row
            cleaned_row.append(cleaned_elem)

        cleaned_row.pop()

        # add the cleaned row to the cleaned array
        cleaned_arr.append(cleaned_row)
    print("=== Finished cleaning === ")
    return cleaned_arr


def clean_ppt_content(arr):
    # create a new array to store the cleaned data
    cleaned_arr = []

    # iterate over each row in the original array
    for elem in arr:
        cleaned_elem = re.sub(
            r'(?<=[a-z0-9])\n(?=[a-z0-9])', '.', elem)

        # add the cleaned row to the cleaned array
        cleaned_arr.append(cleaned_elem)

    return cleaned_arr


if __name__ == '__main__':
    tmp = ['(https://orcid\norg/0000-0002-8166-812X)', '38\n4']
    print(clean_ppt_content(tmp))
