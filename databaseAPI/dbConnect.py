#
# visit https://www.w3schools.com/python/python_mysql_select.asp
# https://www.freesqldatabase.com/
# Can use any lib (mysql.connector or pymysql) to connect MySQL
#
import mysql.connector as mySqlLib
from flask import jsonify

class mySqlDB:
  def __init__(self,h,u,p,d):
    self.host = h
    self.user = u
    self.password = p
    self.database = d
    self.conn=mySqlLib.connect(host=self.host,user=self.user,password=self.password,database=self.database)
    self.myCursor = self.conn.cursor()

  def printHeader(self):      
      """Select Header from Table"""
      myCursor=self.myCursor
      sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = %s and TABLE_SCHEMA= %s"
      val = ("customers", self.database)
      myCursor.execute(sql,val)
      results=myCursor.fetchall()
      return results

  def selectAllData(self):
        """Select Data from Table"""
        myCursor=self.myCursor
        myCursor.execute("select * from customers")
        results = [dict((myCursor.description[i][0], value) \
                        for i, value in enumerate(row)) for row in myCursor.fetchall()]
        return jsonify(results)
  
  
  def selectIdData(self,id):
        """Select Data from Table"""
        myCursor=self.myCursor
        sql = "select * from customers where id = ({})".format(id,)
        myCursor.execute(sql)
        results = [dict((myCursor.description[i][0], value) \
                        for i, value in enumerate(row)) for row in myCursor.fetchall()]
        return jsonify(results)
 
  def inserData(self,name,add):
        """Insert Data into table"""
        myCursor=self.myCursor
        sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
        val = (name, add)
        myCursor.execute(sql,val)
        self.conn.commit()
        result = str(myCursor.rowcount)+ " row inserted"
        return result
  
  def __del__(self):
      self.myCursor.close()
      self.conn.close()


# obj=mySqlDB("localhost","root","123","test")
# obj.selectData()
# obj.fetchDetails()
# name="Person E"
# add="Town 5"
# f = obj.inserData(name,add)
# print(f)
