import mysql.connector
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

# Connect to the local MySQL server
mydb = mysql.connector.connect(
    # host="localhost",
    # user="root",
    # password="passwordCCTV123",
    # database="cardetectiondb"
    # host="aws-eu-west-2.connect.psdb.cloud",
    # username= "l94a31kt8gs9f3lk16y1",
    # password= "pscale_pw_FALSUhwMAZ50X8qIDoZQdOXuZHtrSABu9PURVkCTFy7",
    # database= "cardetectiondb"
    host     = "aws.connect.psdb.cloud",
    user     = "9cn074hxhnuqx3whg562",
    passwd   = "pscale_pw_WqvxznwE3TftkxupaXVYMDVFlTUOtXyqYRqkX5CJn0s",
    db       = "cardetectiondb",
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

def create_line_graph(filePath):
    # Execute a query to retrieve the necessary data
    # Take average and make into pretty graph
    cursor = mydb.cursor()
    cursor.execute("""SELECT AVG(cars) as carAvg, 
                             AVG(trucks) as trucksAvg, 
                             AVG(buses) as busesAvg, 
                             AVG(motorcycles) as motorcyclesAvg, 
                             AVG(bicycles) as bicyclesAvg, 
                      TIME(time) as timeAvg 
                      FROM vehicledetection GROUP BY TIME(time)""")
    # cursor.execute("SELECT cars, trucks, buses, motorcycles, bicycles, time FROM vehicledetection2")

    # Fetch the data from the cursor and store it in separate lists for each column
    car = []
    trucks = []
    buses = []
    motorcycles = []
    bicycles = []
    time = []
    for row in cursor.fetchall():
        car.append(row[0])
        trucks.append(row[1])
        buses.append(row[2])
        motorcycles.append(row[3])
        bicycles.append(row[4])
        time_str = str(row[5])
        time.append(datetime.strptime(time_str, '%H:%M:%S'))

    # Create a line plot using matplotlib
    fig, ax = plt.subplots(figsize = (12, 6))
    ax.plot(time, car, label='Cars')
    ax.plot(time, trucks, label='Trucks')
    ax.plot(time, buses, label='Buses')
    ax.plot(time, motorcycles, label='Motorcycles')
    ax.plot(time, bicycles, label='Bicycles')
    ax.set_xlabel('Time (seconds)')
    ax.set_ylabel('Count (Average)')
    ax.set_title('Vehicle Detection')
    ax.legend()

    plt.savefig(filePath + "detection.png")
    # plt.savefig("detection.png")


    plt.show()

    # Close the cursor and database connection
    cursor.close()
    mydb.close()