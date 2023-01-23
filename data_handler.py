import database_common


@database_common.connection_handler
def get_user_from_username(cursor, username):
    query = f'''
        SELECT *
        FROM users
        WHERE username = %(username)s'''
    cursor.execute(query, {'username': username})
    return cursor.fetchone()


@database_common.connection_handler
def register_new_user(cursor, username, password):
    query = f"""
        INSERT INTO users (username, password)
        VALUES (%(username)s, %(password)s)"""
    cursor.execute(query, {'username': username, 'password': password})