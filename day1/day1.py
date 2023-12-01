lines = []
with open('./input.txt', 'r') as f:
    lines = f.readlines()

words = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
]

sum = 0

for line in lines:
    first = -1
    last = -1
    for i, char in enumerate(line):
        for k, word in enumerate(words):
            if line[i:i + len(word)] == word:
                if first == -1: first = k + 1
                last = k + 1

        if not char.isdigit(): continue
        if first == -1: first = char
        last = char
    
    num = f'{first}{last}'
    sum += int(num)
    
print(sum)

