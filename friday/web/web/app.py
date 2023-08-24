import os
import streamlit as st
from services.authentication import Authentication
from services.search import Search
from services.stripe_integration import create_charge
from services.reviews import Review
from services.social_media import share_on_facebook, share_on_twitter

st.title('My Awesome Website')

st.sidebar.title('Menu')
menu = ['Home', 'Login', 'Register', 'Search', 'Payment', 'Submit Review', 'Share on Social Media']
choice = st.sidebar.selectbox('Choose an option', menu)

if choice == 'Home':
    st.subheader('Welcome to My Awesome Website')

elif choice == 'Login':
    st.subheader('Login')
    username = st.text_input('Username')
    password = st.text_input('Password', type='password')
    if st.button('Login'):
        auth = Authentication()
        if auth.login(username, password):
            st.success('Logged in successfully')
        else:
            st.error('Invalid username or password')

elif choice == 'Register':
    st.subheader('Register')
    username = st.text_input('Username')
    password = st.text_input('Password', type='password')
    email = st.text_input('Email')
    if st.button('Register'):
        auth = Authentication()
        user = auth.register(username, password, email)
        st.success(f'Registered successfully as {user.username}')

elif choice == 'Search':
    st.subheader('Search')
    query = st.text_input('Search')
    if st.button('Search'):
        search = Search(query)
        results = search.execute()
        for result in results:
            st.write(result)

elif choice == 'Payment':
    st.subheader('Payment')
    amount = st.number_input('Amount')
    source = st.text_input('Card Number')
    if st.button('Pay'):
        charge = create_charge(amount, 'usd', source, 'Payment for products')
        st.success(f'Payment successful. Charge ID: {charge.id}')

elif choice == 'Submit Review':
    st.subheader('Submit Review')
    review_text = st.text_input('Review')
    if st.button('Submit Review'):
        review = Review(username, review_text)
        st.success('Review submitted successfully')

elif choice == 'Share on Social Media':
    st.subheader('Share on Social Media')
    content = st.text_input('Content')
    if st.button('Share on Facebook'):
        share_on_facebook(content)
        st.success('Content shared on Facebook')
    if st.button('Share on Twitter'):
        share_on_twitter(content)
        st.success('Content shared on Twitter')