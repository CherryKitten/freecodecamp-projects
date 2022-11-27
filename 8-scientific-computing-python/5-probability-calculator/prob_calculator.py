import copy
import random


# Consider using the modules imported above.

class Hat:

    def __init__(self, **kwargs):
        self.contents = []
        for arg in kwargs:
            for i in range(0, kwargs[arg]):
                self.contents.append(arg)

    def draw(self, amount):
        temp = copy.copy(self.contents)
        drawn = []
        if amount >= len(temp):
            return temp
        for i in range(0, amount):
            rand = random.choice(temp)
            drawn.append(rand)
            temp.pop(temp.index(rand))
        self.contents = temp
        return drawn


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    success = 0
    for i in range(0, num_experiments):
        print("experiment:", i)
        test = copy.deepcopy(hat)
        balls = test.draw(num_balls_drawn)
        counts = {}
        match = True
        for ball in balls:
            counts[ball] = counts.get(ball, 0) + 1
        for color in expected_balls:
            if counts.get(color, 0) < expected_balls[color]:
                match = False
        if match:
            success = success + 1
    return success / num_experiments
