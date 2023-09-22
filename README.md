# API Wars :rocket:

---

### API Wars is a web application that fetches and displays data on all planets from the Star Wars universe. Leveraging The Star Wars API, it provides fans and developers with a comprehensive view of the iconic planets. Registered users can cast votes on their favorite planets. With AJAX calls for efficient data retrieval and a responsive Bootstrap-driven UI, API Wars can be a treat for Star Wars fans.

---

## Features :star:

- **Dynamic Data Fetching**: Seamlessly fetch data from The Star Wars API.
- **User Voting System**: Registered users can cast votes on their favorite planets. Vote data is stored in the PostgreSQL database.
- **Responsive Design**: Built with Bootstrap for a great user experience.
- **Efficient AJAX Calls**: Retrieve data in real-time without reloading the page.
- **Intuitive UI**: Easily navigate through planets and get detailed information.
- **Database Storage**: While planet data is fetched from the API, user votes are stored in PostgreSQL for persistent tracking.

---

## Technologies Used :wrench:

![JavaScript](https://img.icons8.com/color/48/000000/javascript.png) ![HTML5](https://img.icons8.com/color/48/000000/html-5.png) ![CSS3](https://img.icons8.com/color/48/000000/css3.png) ![Bootstrap](https://img.icons8.com/color/48/000000/bootstrap.png) ![Python](https://img.icons8.com/color/48/000000/python.png) ![Flask](https://img.icons8.com/color/48/000000/flask.png) ![PostgreSQL](https://img.icons8.com/color/48/000000/postgreesql.png) ![AJAX](https://img.icons8.com/color/48/000000/ajax.png)

---

![App Screenshot](https://github.com/aneta-k/API-Wars/blob/master/static/images/READMEpage1.jpg)

![App Screenshot](https://github.com/aneta-k/API-Wars/blob/master/static/images/READMEpage2.jpg)

![App Screenshot](https://github.com/aneta-k/API-Wars/blob/master/static/images/READMEpage3.jpg)

---

## Requirements :clipboard:

- PostgreSQL version: 12.12
- Python version: 3.10.9

## Database Configuration :floppy_disk:

Before running API Wars, ensure you have PostgreSQL installed. Adjust the database connection settings in the application's configuration to match your setup. You'll need to provide:

- Database name
- Username
- Password
- Host

## Database Setup :floppy_disk:

1. **Create the API Wars database**:
```bash
createdb apiwars
```

2. **Initialize the database with sample data**:
- Navigate to the project directory.
- Use the provided SQL script to set up the database schema:
```bash
psql apiwars -f init_data.sql
```

Remember to adjust the database connection settings in the application configuration to match your setup.

## Installation and Running :gear:

1. **Clone the application**: 
    ```
    git@github.com:aneta-k/API-Wars.git
    ```
2. **Navigate to the project directory and install dependencies**:
    ```
    pip install -r requirements.txt
    ```
3. **Start the application**:
    ```
    flask run
    ```
    The application will be accessible at: [http://localhost:5000](http://localhost:5000)