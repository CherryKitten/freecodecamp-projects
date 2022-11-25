import re


def arithmetic_arranger(problems, solve=False):
    line1 = ""
    line2 = ""
    line3 = ""
    line4 = ""
    if len(problems) > 5:
        return "Error: Too many problems."

    for problem in problems:
        op = re.search('\\s[+-]\\s', problem)
        if op is None:
            return "Error: Operator must be '+' or '-'."
        op = op.group().strip()
        problem = problem.split(op)
        a, b = problem[0].strip(), problem[1].strip()
        if not a.isdigit() or not b.isdigit(): return "Error: Numbers must only contain digits."
        if len(a) > 4 or len(b) > 4: return "Error: Numbers cannot be more than four digits."
        if len(line1) > 0:
            line1 = line1 + 4 * " "
            line2 = line2 + 4 * " "
            line3 = line3 + 4 * " "
        pad = len(a) + 2 if len(a) > len(b) else len(b) + 2
        line1 = line1 + a.rjust(pad, " ")
        line2 = line2 + op + (pad - 1 - len(b)) * " " + b
        line3 = line3 + pad * "-"
        if solve is True:
            if len(line4) > 0:
                line4 = line4 + 4 * " "
            if op == "+":
                x = int(a) + int(b)
                line4 = line4 + str(x).rjust(pad, " ")
            else:
                x = int(a) - int(b)
                line4 = line4 + str(x).rjust(pad, " ")
    arranged_problems = line1 + '\n' + line2 + '\n' + line3
    if len(line4) > 0: arranged_problems = arranged_problems + '\n' + line4
    return arranged_problems
