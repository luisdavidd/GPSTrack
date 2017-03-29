from socket import *
import MySQLdb
import datetime
import socket
db = MySQLdb.connect(host="smtdb.cbfnol3hymbz.us-west-2.rds.amazonaws.com",    # your host, usually localhost
                     user="smtadmin",         # your username
                     passwd="smtpassw",  # your password
                     db="smtdb")        # name of the data base
cur = db.cursor()  #Error non-zero value, 0 success

Type = 'udp'
if(Type == 'tcp'):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM) #Configurar socket AF_INET para establecer protocolo (IP) SOCK_STREAM establece estandar (TCP)
    sock.bind(("", 10816)) #puerto a captar
    sock.listen(1)
    conn, addr = sock.accept() #-------
    print 'Connection address:', addr
    sql_consulta = "SELECT route FROM `smt`.`trucktrackingtable` ORDER BY time DESC LIMIT 1"  
    try:
        cur.execute(sql_consulta)
        results = cur.fetchall()
    except:
        db.rollback()
    while True:
        data = conn.recv(1024)
        #if not data: break
        print "received data:", data
        if data[:4] =='>REV':
            weeks = int(data[6:10])
            day = int(data[10])
            seconds = int(data[11:16])
            timestamp = weeks*604800 + day*86400 + seconds + 315964800
            ts = datetime.datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')
            print ts
            latitude = data[16:19]+'.'+data[19:24]
            longitude = data[24:28]+'.'+data[28:33]
            velocity = data[33:36]
            position = data[36:39]
            #print latitude
            #print longitude
            sql = "INSERT INTO `smtdb`.`trucktrackingtable` (`latitude`, `longitude`,`time`,`position`,`velocity`) VALUES ('"+latitude+"', '"+longitude+"', '"+ts+"','"+position+"','"+velocity+"')"
            try:
                # Execute the SQL command
                cur.execute(sql)
                # Commit your changes in the database
                db.commit()
            except:
                # Rollback in case there is any error
                db.rollback()   #por si algo sale mal
            #conn.send(data)
            #conn.close()
else:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)  #Configurar socket AF_INET para establecer protocolo (IP) SOCK_STREAM establece estandar (UDP)
    sock.bind(("", 11378))
    sql_consulta = "SELECT route FROM `smtdb`.`trucktrackingtable` ORDER BY time DESC LIMIT 1" #Check the last route in data base
    #Try this quety
    sock.settimeout(20)  #Time for recieving data
    try:
       cur.execute(sql_consulta)
       results = cur.fetchall()
       for row in results:
        trayecto = row[0]
    except:
        db.rollback()
    # print  trayecto
    flag = 0   #Flag to monitor data 
    trayecto = trayecto+1  #Increase by 1 the route consulted in db
    while True:
        try:
            data, addr = sock.recvfrom(1024)
            print "received data:", data
            if data[:4] =='>REV':
                flag=1  #If sniffer recieves data then flag turns into 1
                weeks = int(data[6:10])
                day = int(data[10])
                seconds = int(data[11:16])
                timestamp = weeks*604800 + day*86400 + seconds + 315964800 - 3600*5
                ts = datetime.datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')
                print ts
                latitude = data[16:19]+'.'+data[19:24]
                longitude = data[24:28]+'.'+data[28:33]
                velocity = data[33:36]
                position = data[36:39]
                on = 1  #This activates this route 
                sql = "INSERT INTO `smtdb`.`trucktrackingtable` (`latitude`, `longitude`,`time`,`position`,`velocity`,`route`,`on`) VALUES ('"+latitude+"', '"+longitude+"', '"+ts+"','"+position+"','"+velocity+"','"+str(trayecto)+"','"+str(on)+"')"
                try:
                    # Execute the SQL command
                    cur.execute(sql)
                    # Commit your changes in the database
                    db.commit()
                except:
                    # Rollback in case there is any error
                    db.rollback()
                #conn.send(data)
                #conn.close()
        except socket.timeout:    #If 20 seconds passed and still no data it goes right here
            if flag == 1:       #If sniffer recieved data on the last cycle then flag must be in 1 otherwise it is 0 and nothing happens
               on = 0           #Turns the route off 
               sqlmod = "UPDATE `smtdb`.`trucktrackingtable` SET `on`='0' where `route` ='"+str(trayecto)+"'"  #Query to update this
               trayecto = trayecto +1       #Increase route by 1
               #Try to commit this changes
                try:
                    cur.execute(sqlmod)
                    db.commit()
                except MySQLdb.Error, e:
                    print("Tuve error<br/>")
                    print e
                    db.rollback()
                    flag = 0
            else:
                print ("No data recieved")
            continue



