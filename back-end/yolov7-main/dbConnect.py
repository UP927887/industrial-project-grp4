import mysql.connector
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

# Connect to the local MySQL server
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="passwordCCTV123",
    database="cardetectiondb"
)

# Check if the connection is successful
if mydb.is_connected():
    print("Connected to MySQL server")

# Define a function to insert data into the database table
def insert_data_into_table(tableName, values):
    # Create a cursor object
    mycursor = mydb.cursor()

    # Construct the SQL query to insert data into the table
    sql = "INSERT INTO " + tableName + " (cars, trucks, buses, motorcycles, bicycles, time) VALUES (%s, %s, %s, %s, %s, %s)"

    # Execute the SQL query with the provided values
    mycursor.execute(sql, values)

    # Commit the changes to the database
    mydb.commit()

    # Print the number of rows affected by the SQL query
    # print(mycursor.rowcount, "row(s) affected")

def create_line_graph():
    # Execute a query to retrieve the necessary data
    cursor = mydb.cursor()
    cursor.execute("""SELECT TIME(time) as time_only, 
                             SUM(cars) as carSum, 
                             SUM(trucks) as truckSum,
                             SUM(buses) as busSum,
                             SUM(motorcycles) as motorcycleSum,
                             SUM(bicycles) as bicycleSum 
                      FROM vehicledetection 
                      GROUP BY TIME(time)""")

    # Fetch the data from the cursor and store it in separate lists for each column
    car = []
    trucks = []
    buses = []
    motorcycles = []
    bicycles = []
    time = []
    for row in cursor.fetchall():
        car.append(row[1])
        trucks.append(row[2])
        buses.append(row[3])
        motorcycles.append(row[4])
        bicycles.append(row[5])
        time_str = str(row[0])
        time.append(datetime.strptime(time_str, '%H:%M:%S'))

    # Create a line plot using matplotlib
    fig, ax = plt.subplots(figsize = (12, 6))
    ax.plot(time, car, label='Cars')
    ax.plot(time, trucks, label='Trucks')
    ax.plot(time, buses, label='Buses')
    ax.plot(time, motorcycles, label='Motorcycles')
    ax.plot(time, bicycles, label='Bicycles')
    ax.set_xlabel('Time')
    ax.set_ylabel('Count')
    ax.set_title('Vehicle Detection')
    ax.legend()

    plt.savefig("./back-end/run graphs/detection.png")

    plt.show()

    # Close the cursor and database connection
    cursor.close()
    mydb.close()