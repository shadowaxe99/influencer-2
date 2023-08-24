import psycopg2

class Review:
    def __init__(self, user, text):
        self.user = user
        self.text = text

    def update_text(self, new_text):
        db = psycopg2.connect(database='reviews', user='username', password='password', host='localhost')
        c = db.cursor()
        c.execute("UPDATE reviews SET text = %s WHERE user = %s", (new_text, self.user))
        db.commit()
        self.text = new_text

    def delete(self):
        db = psycopg2.connect(database='reviews', user='username', password='password', host='localhost')
        c = db.cursor()
        c.execute("DELETE FROM reviews WHERE user = %s", (self.user,))
        db.commit()
        self.user = None
        self.text = None