import pandas as pd
import os

# Get a list of all xlsx files in current directory
files = [f for f in os.listdir('.') if f.endswith('.xlsx')]

# Create a new DataFrame for all the data
df = pd.DataFrame()

# Read each excel file and append it to the DataFrame
df = pd.concat([pd.read_excel(f) for f in files])

# Write the DataFrame to a new excel file
df.to_excel('consolidated.xlsx', index=False)

# Create a master doc of all contacts
contacts = df['Contact'].drop_duplicates()
contacts.to_excel('master_contacts.xlsx', index=False)