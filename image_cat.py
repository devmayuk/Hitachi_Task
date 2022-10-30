import mysql.connector

def convertToBinaryData(filename):
    # Convert digital data to binary format
    with open(filename, 'rb') as file:
        binaryData = file.read()
    return binaryData


def insertBLOB(emp_id, name, photo, biodataFile):
    print("Inserting BLOB into flask_app table")
    try:
        connection = mysql.connector.connect(host='localhost',
                                             database='hitachi_dt',
                                             user='mrmsj',
                                             password='M@yuk@123')

        cursor = connection.cursor()
        sql_insert_blob_query = """ INSERT INTO flask_app
                          (name, image_cat_1,image_cat_2, value) VALUES (%s,%s,%s,%s)"""

        image_cat_1 = convertToBinaryData(photo)
        file = convertToBinaryData(biodataFile)

        # Convert data into tuple format
        insert_blob_tuple = (name, image_cat_1, file)
        result = cursor.execute(sql_insert_blob_query, insert_blob_tuple)
        connection.commit()
        print("Image and file inserted successfully as a BLOB into flask_app table", result)

    except mysql.connector.Error as error:
        print("Failed inserting BLOB data into MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")