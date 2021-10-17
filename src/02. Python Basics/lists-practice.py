## Check shallow copy
list_1 = [1,2,3]
list_2 = list_1
list_3 = list_1.copy()

list_2[1] = 'test'
list_3[0] = 'test'

print(list_1)

del list_1, list_2, list_3

## Check shallow copy deep

list_1 = [[1,2,3], [1,2,3], [1,2,3]]
list_2 = list_1.copy()

list_2[0] = 'test'
list_2[1][0] = 'test'
print(list_1)

del list_1, list_2

## Check extend method

list_1 = [1,2,3]
list_2 = [4,5,6]
list_1.extend(list_2)
print(list_1)

del list_1, list_2

## Check insert method

list_1 = [2,3,5]
list_1.insert(2, 4)
print(list_1)

## Check sort method

persons = [
    {"name": 'Max', "age": 23, "iq": 140},
    {"name": 'Yulia', "age": 23, "iq": 150},
    {"name": 'Kostya', "age": 24, "iq": 167},
    {"name": 'Sasha', "age": 22, "iq": 135},
]

persons_sorted_by_name = sorted(persons, key=lambda d: d['name'])
persons_sorted_by_age = sorted(persons, key=lambda d: d['age'])
print(persons)
print(persons_sorted_by_name)
print(persons_sorted_by_age)

persons.sort(key=lambda d: d['iq']) # Mutates list
print(persons)



