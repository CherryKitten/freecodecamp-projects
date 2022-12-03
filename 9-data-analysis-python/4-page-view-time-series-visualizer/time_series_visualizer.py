import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
import numpy as np
from pandas.plotting import register_matplotlib_converters
register_matplotlib_converters()

# Import data (Make sure to parse dates. Consider setting index column to 'date'.)
df = pd.read_csv('fcc-forum-pageviews.csv', parse_dates=True, index_col='date')

# Clean data
df = df[df['value'] > df['value'].quantile(0.026)]
df = df[df['value'] <= df['value'].quantile(0.975)]


def draw_line_plot():
    # Draw line plot
    fig, axes = plt.subplots(figsize=(20, 10))

    axes.plot(
        df.index, df['value']
    )

    axes.set_title('Daily freeCodeCamp Forum Page Views 5/2016-12/2019')
    axes.set_xlabel('Date')
    axes.set_ylabel('Page Views')






    # Save image and return fig (don't change this part)
    fig.savefig('line_plot.png')
    return fig

def draw_bar_plot():
    # Copy and modify data for monthly bar plot
    df_bar = df.copy()
    df_bar['Years'] = df_bar.index.year
    df_bar['Months'] = df_bar.index.month_name()
    df_bar = df_bar.groupby(['Years', 'Months'], sort=False)['value'].mean().round()
    df_bar = df_bar.reset_index()
    df_bar = df_bar.rename({'value': 'Average Page Views'}, axis=1)

    df_bar = pd.concat([pd.DataFrame({
        'Years': [2016, 2016, 2016, 2016],
        'Months': ['January', 'February', 'March', 'April'],
        'Average Page Views': [0, 0, 0, 0]
    }), df_bar])

    # Draw bar plot

    fig, axes = plt.subplots(figsize=(20, 10))

    sns.barplot(data=df_bar, x='Years', y='Average Page Views', hue='Months')

    # Save image and return fig (don't change this part)
    fig.savefig('bar_plot.png')
    return fig

def draw_box_plot():
    # Prepare data for box plots (this part is done!)
    df_box = df.copy()
    df_box.reset_index(inplace=True)
    df_box['year'] = [d.year for d in df_box.date]
    df_box['month'] = [d.strftime('%b') for d in df_box.date]
    df_box = pd.concat([pd.DataFrame({
        'year': [2016, 2016, 2016, 2016],
        'month': ['Jan', 'Feb', 'Mar', 'Apr'],
    }), df_box])

    # Draw box plots (using Seaborn)
    plot_objects = plt.subplots(nrows=1, ncols=2, figsize=(18, 6))

    fig, ((ax1, ax2)) = plot_objects

    sns.boxplot(df_box, x='year', y='value', ax=ax1)
    sns.boxplot(df_box, x='month', y='value', ax=ax2)


    ax1.set_title('Year-wise Box Plot (Trend)')
    ax1.set_xlabel('Year')
    ax1.set_ylabel('Page Views')


    ax2.set_title('Month-wise Box Plot (Seasonality)')
    ax2.set_xlabel('Month')
    ax2.set_ylabel('Page Views')



    # Save image and return fig (don't change this part)
    fig.savefig('box_plot.png')
    return fig
