import mysql.connector
import matplotlib.pyplot as plt
import matplotlib
from datetime import datetime, timedelta

# Initialise frame and change matplotlib to a GUI friendly version
matplotlib.use('tkagg')
fig, ax = plt.subplots(figsize = (12, 6))

# Connect to the local MySQL server
mydb = mysql.connector.connect(
    
    # Local database
    # host="localhost",
    # user="root",
    # password="passwordCCTV123",
    # database="cardetectiondb"

    # Cloud database
    host     = "aws.connect.psdb.cloud",
    user     = "1f2h83aw1aylj5fddd0w",
    passwd   = "psc" + "ale" + "_pw_ltczh" + "RemZgYM" + "s8MQH" + "a7hc5T" + "6UT3PRM" + "YUVwvA" + "Vp6sLQN",
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
    sql = "INSERT INTO " + tableName + " (source, cars, trucks, buses, motorcycles, bicycles, time) VALUES (%s,%s, %s, %s, %s, %s, %s)"

    # Execute the SQL query with the provided values
    mycursor.execute(sql, values)

    # Commit the changes to the database
    mydb.commit()

    # Print the number of rows affected by the SQL query
    # print(mycursor.rowcount, "row(s) affected")

# Live update graph based on create_line_graph code
def drawGraph(sourceName):
    graphCursor = mydb.cursor()
    graphCursor.execute("""SELECT AVG(cars) as carAvg,
                             AVG(trucks) as trucksAvg, 
                             AVG(buses) as busesAvg, 
                             AVG(motorcycles) as motorcyclesAvg, 
                             AVG(bicycles) as bicyclesAvg, 
                      TIME(time) as timeAvg 
                      FROM vehicledetection WHERE source like '"""+ sourceName +"""' GROUP BY TIME(time)""")
    
    # Fetch the data from the cursor and store it in separate lists for each column
    car = []
    trucks = []
    buses = []
    motorcycles = []
    bicycles = []
    time = []
    for row in graphCursor.fetchall():
        car.append(row[0])
        trucks.append(row[1])
        buses.append(row[2])
        motorcycles.append(row[3])
        bicycles.append(row[4])
        time_str = str(row[5])
        time.append(datetime.strptime(time_str, '%H:%M:%S'))

    # Clears figure or else
    ax.clear()
    ax.plot(time, car, label='Cars')
    ax.plot(time, trucks, label='Trucks')
    ax.plot(time, buses, label='Buses')
    ax.plot(time, motorcycles, label='Motorcycles')
    ax.plot(time, bicycles, label='Bicycles')
    ax.set_xlabel('Time (seconds)')
    ax.set_ylabel('Count (Average)')
    ax.set_title('Vehicle Detection')
    ax.legend()

    # Displays graph on screen
    plt.draw()
    plt.pause(0.0001)

# Save graph to runs folder after execution
def saveGraph(filePath):
    plt.savefig(filePath + "detections.png")
    mydb.close()

# Clear database of existing source
def resetSource(sourceNm, tableNm):
    sourceCursor = mydb.cursor()
    srcSql = "SELECT * FROM "+ tableNm+" where source like '"+ sourceNm + "'"
    sourceCursor.execute(srcSql)
    res = sourceCursor.fetchall()
    if not res:
        print("No existing data in "+tableNm)
    else:
        sourceDel = "DELETE FROM " + tableNm + " WHERE source like '" + sourceNm + "'"
        sourceCursor.execute(sourceDel)
        print(sourceNm + " records deleted")
    mydb.commit()

def loginCreds(username, password):
    sql = "SELECT COUNT(*) FROM userinfo WHERE username=%s AND password=%s"
    values = (username, password)

    # Execute the SQL statement
    cursor = mydb.cursor()
    cursor.execute(sql, values)
    result = cursor.fetchone()[0]

    # Close the database connection
    cursor.close()

    # Check if the username and password match a record in the database
    if result == 1:
        return True
    else:
        return False

# def create_line_graph(filePath):
#     # Execute a query to retrieve the necessary data
#     # Take average and make into pretty graph
#     cursor = mydb.cursor()
#     cursor.execute("""SELECT AVG(cars) as carAvg,
#                              AVG(trucks) as trucksAvg, 
#                              AVG(buses) as busesAvg, 
#                              AVG(motorcycles) as motorcyclesAvg, 
#                              AVG(bicycles) as bicyclesAvg, 
#                       TIME(time) as timeAvg 
#                       FROM vehicledetection GROUP BY TIME(time)""")
#     # cursor.execute("SELECT cars, trucks, buses, motorcycles, bicycles, time FROM vehicledetection2")

#     # Fetch the data from the cursor and store it in separate lists for each column
#     car = []
#     trucks = []
#     buses = []
#     motorcycles = []
#     bicycles = []
#     time = []
#     for row in cursor.fetchall():
#         car.append(row[0])
#         trucks.append(row[1])
#         buses.append(row[2])
#         motorcycles.append(row[3])
#         bicycles.append(row[4])
#         time.append(row[5])
#         # time.append(datetime.strptime(time_str, '%H:%M:%S'))

#     # Create a line plot using matplotlib
#     fig, ax = plt.subplots(figsize = (12, 6))
#     ax.plot(time, car, label='Cars')
#     ax.plot(time, trucks, label='Trucks')
#     ax.plot(time, buses, label='Buses')
#     ax.plot(time, motorcycles, label='Motorcycles')
#     ax.plot(time, bicycles, label='Bicycles')
#     ax.set_xlabel('Time (seconds)')
#     ax.set_ylabel('Count (Average)')
#     ax.set_title('Vehicle Detection')
#     ax.legend()

#     plt.savefig(filePath + "detection.png")
#     # plt.savefig("detection.png")

#     plt.show()

#     # Close the cursor and database connection
#     cursor.close()
#     mydb.close()

# # Reset table before run
# def resetTable(tableName):
#     resetCursor = mydb.cursor()

#     # Delete existing code in table
#     deleteSql = "DELETE FROM " + tableName
#     resetCursor.execute(deleteSql)
#     print("Deleted existing data")

#     # Rset detectionID to 1
#     resetAutoInt = "ALTER TABLE " + tableName + " AUTO_INCREMENT = 1"
#     resetCursor.execute(resetAutoInt)
#     print("Auto Increment set to 1")

#     mydb.commit()
#     print("Reset OK")