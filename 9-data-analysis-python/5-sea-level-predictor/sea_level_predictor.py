import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv('epa-sea-level.csv')

    # Create scatter plot
    plt.figure(figsize=(16, 6))


    plt.scatter(df['Year'], df['CSIRO Adjusted Sea Level'])

    # Create first line of best fit
    res = linregress(df['Year'], df['CSIRO Adjusted Sea Level'])
    plt.plot(np.arange(1880, 2051), res.intercept + res.slope * np.arange(1880, 2051), 'g')

    # Create second line of best fit
    df = df.loc[df['Year'] >= 2000]

    res = linregress(df['Year'], df['CSIRO Adjusted Sea Level'])

    plt.plot(np.arange(2000, 2051), res.intercept + res.slope * np.arange(2000, 2051), 'r')

    # Add labels and title
    plt.xlabel('Year')
    plt.ylabel('Sea Level (inches)')
    plt.title('Rise in Sea Level')
    plt.xlim(1850, 2075)
    
    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()