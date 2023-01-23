from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
import os
import data_handler
import password_handler

app = Flask(__name__)

app.secret_key = os.environ.get('APP_SECRET_KEY')


@app.route('/')
def home():
    if 'username' not in session:
        session['username'] = None
    return render_template('index.html', user=session['username'])


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = data_handler.get_user_from_username(username)
        if not username or not password:
            flash('Error: Please, fill in both fields!')
            return redirect(url_for('register'))
        if user:
            flash('Error: Username already exists, please choose another one!')
            return redirect(url_for('register'))
        password_hash = password_handler.hash_password(password)
        data_handler.register_new_user(username, password_hash)
        flash("Successful registration. Log in to continue!")
        return redirect(url_for('login'))
    return render_template('register.html', user=session['username'])


@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = data_handler.get_user_from_username(username)
        if user:
            if password_handler.verify_password(password, user['password']):
                session['username'] = username
                return redirect(url_for('home'))
            else:
                flash("Error: Wrong username or password!")
        else:
            flash("Error: Wrong username or password!")
    return render_template('login.html', user=session['username'])


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))


@app.route('/vote', methods=["POST"])
def vote():
    request_content = request.json
    data_handler.vote_planet(request_content['planet_name'])
    return jsonify({'success': True})


if __name__ == "__main__":
    app.run(debug=True)
