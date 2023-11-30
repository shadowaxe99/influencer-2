import pandas as pd
import os

# Get a list of all xlsx files in current directory
files = [f for f in os.listdir('.') if f.endswith('.xlsx')]

# Create a new DataFrame for all the data
df = pd.DataFrame()

# Read each excel file and append it to the DataFrame
df = pd.concat([pd.read_excel(f) for f in files])

# Assuming 'contacts' is the column name for the contacts in the xlsx files
# Create a master doc of all contacts
pages = df['pages'].drop_duplicates()

# Write the contacts to a new excel file
pages.to_excel('master_pages.xlsx', index=False)