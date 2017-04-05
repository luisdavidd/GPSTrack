import socket
import MySQLdb
import datetime

db = MySQLdb.connect(host="localhost",    # your host, usually localhost
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
    while True:
        data, addr = sock.recvfrom(1024)
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
            sql = "INSERT INTO `smtdb`.`trucktrackingtable` (`latitude`, `longitude`,`time`,`position`,`velocity`) VALUES ('"+latitude+"', '"+longitude+"', '"+ts+"','"+position+"','"+velocity+"')"
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







