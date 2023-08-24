import psycopg2

class Search:
    def __init__(self, query):
        self.query = query

    def execute(self):
        db = psycopg2.connect(database='products', user='username', password='password', host='localhost')
        c = db.cursor()
        c.execute("SELECT * FROM products WHERE name LIKE %s", ('%' + self.query + '%',))
        return c.fetchall()