# Inventory ackend

1. Check If MySQL Server Is Running

```sh
sudo systemctl status mysql

```
If it's not running, start it:
```sh
sudo systemctl start mysql
```

2. Verify MySQL Port
Open /etc/mysql/my.cnf and check:
```ini
[mysqld]
port=3306
```
If it's not 3306, update your backend config to match.


If MySQL is running on 3306, update your .env or connection settings in ormconfig.json:
```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,  // Change to correct port
  "username": "root",
  "password": "yourpassword",
  "database": "yourdatabase",
  "synchronize": true,
  "logging": false
}
```

3. Check If MySQL Accepts Connections

Try connecting via MySQL CLI:
```sh
mysql -u root -p
```
If you get an error, ensure MySQL is running.

Also, ensure MySQL accepts TCP connections (not just sockets). In my.cnf:
```ini
[mysqld]
bind-address = 0.0.0.0
```
Restart MySQL after changes:
```sh
sudo systemctl restart mysql  # Linux/macOS
```
4. Grant MySQL Permissions

Sometimes, MySQL rejects external connections. Run:
```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'yourpassword' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```
Then restart MySQL.

5. Check Firewall/Antivirus
Your firewall may block MySQL. Try:
    Temporarily disable the firewall and check.
    Allow MySQL in Windows Firewall:
```sh
netsh advfirewall firewall add rule name="MySQL" dir=in action=allow protocol=TCP localport=3306
```


🛠 Final Fix (If All Else Fails)
```json
{
  "host": "127.0.0.1"
}
```
If using Docker, check if MySQL is running inside your container.


# Summary:

1. Ensure MySQL is running (sudo systemctl status mysql).

2. Check MySQL port (3306 vs 3360).

3. Enable external connections (bind-address = 0.0.0.0).

4. Grant privileges (GRANT ALL PRIVILEGES...).

5. Disable firewall temporarily.
