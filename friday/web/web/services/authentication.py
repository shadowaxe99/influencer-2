import psycopg2
from passlib.hash import sha256_crypt

class User:
    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email
        self.profile_picture = None
        self.bio = None

    def set_profile_picture(self, profile_picture):
        self.profile_picture = profile_picture

    def set_bio(self, bio):
        self.bio = bio

class Authentication:
    def register(self, username, password, email):
        db = psycopg2.connect(database='users', user='username', password='password', host='localhost')
        c = db.cursor()
        hash = sha256_crypt.encrypt(password)
        c.execute("INSERT INTO users (username, password, email) VALUES (%s, %s, %s)", (username, hash, email))
        db.commit()
        return User(username, password, email)

    def login(self, username, password):
        db = psycopg2.connect(database='users', user='username', password='password', host='localhost')
        c = db.cursor()
        c.execute("SELECT password FROM users WHERE username = %s", (username,))
        hash = c.fetchone()[0]
        return sha256_crypt.verify(password, hash)