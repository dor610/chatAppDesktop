         const userData = [
            { id: "00-01", name: "gopal", age: 35, email: "gopal@tutorialspoint.com" },
            { id: "00-02", name: "prasad", age: 32, email: "prasad@tutorialspoint.com" }
         ];

         const mesData = [
           {mesId: "01", sender: "mot", recipient: "hai", message: "testing testing,...."},
           {mesId: "02", sender: "ba", recipient: "bon", message: "testing testing,...."}
         ]
         var db;
         var request = window.indexedDB.open("user", 1);

         request.onerror = function(event) {
            console.log("error: ");
         };

         request.onsuccess = function(event) {
            db = request.result;
            console.log("success: "+ db);
         };

         request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var userInfo = db.createObjectStore("userInfo", {keyPath: "email"});
            var message = db.createObjectStore("message", {keyPath: "mesId"});

            for (var i in userData) {
               userInfo.add(userData[i]);
            }
            for(var j in mesData){
                message.add(mesData[j]);
            }
         }

         function read() {
            var transaction = db.transaction(["userInfo"]);
            var userInfo = transaction.objectStore("userInfo");
            var request = objectStore.get("khang@planet.org");

            request.onerror = function(event) {
               alert("Unable to retrieve daa from database!");
            };

            request.onsuccess = function(event) {
               // Do something with the request.result!
               if(request.result) {
                  alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
               } else {
                  alert("Khang couldn't be found in your user infodatabase!");
               }
            };
         }
         function readMes() {
            var transaction = db.transaction(["message"]);
            var message = transaction.objectStore("message");
            var request = message.get("03");

            request.onerror = function(event) {
               alert("Unable to retrieve data from message database!");
            };

            request.onsuccess = function(event) {
               // Do something with the request.result!
               if(request.result) {
                  alert("sender: " + request.result.sender + ", recipient: " + request.result.recipient + ", message: " + request.result.message);
               } else {
                  alert("message couldn't be found in your database!");
               }
            };
         }

         function readAll() {
            var userInfo = db.transaction("userInfo").objectStore("userInfo");

            userInfo.openCursor().onsuccess = function(event) {
               var cursor = event.target.result;

               if (cursor) {
                  alert("Name for email " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Id: " + cursor.value.id);
                  cursor.continue();
               } else {
                  alert("No more entries!");
               }
            };
         }

         function readAllMes() {
            var userInfo = db.transaction("message").objectStore("message");

            userInfo.openCursor().onsuccess = function(event) {
               var cursor = event.target.result;

               if (cursor) {
                  alert("Message info for id " + cursor.key + " is, Sender: " + cursor.value.sender + ", recipient: " + cursor.value.recipient + ", message: " + cursor.value.message);
                  cursor.continue();
               } else {
                  alert("No more entries!");
               }
            };
         }

         function add() {
            var request = db.transaction(["userInfo"], "readwrite")
            .objectStore("userInfo")
            .add({ id: "00-03", name: "Khang", age: 19, email: "khang@planet.org" });

            request.onsuccess = function(event) {
               alert("Khang has been added to your database.");
            };

            request.onerror = function(event) {
               alert("Unable to add data\r\nKhang is aready exist in your database! ");
            }
         }

         function addMes() {
            var request = db.transaction(["message"], "readwrite")
            .objectStore("message")
            .add({ mesId: "03", sender: "Khang", recipient: "tester", message: "something here" });

            request.onsuccess = function(event) {
               alert("03 has been added to your database.");
            };

            request.onerror = function(event) {
               alert("Unable to add data\r\n03is aready exist in your database! ");
            }
         }

         function remove() {
            var request = db.transaction(["userInfo"], "readwrite")
            .objectStore("userInfo")
            .delete("kenny@planet.org");

            request.onsuccess = function(event) {
               alert("Khang's entry has been removed from your database.");
            };
         }

         function deletedb(){
           var request = db.transaction(["userInfo"], "readwrite")
           .objectStore("userInfo");
           request.clear();
         }

         const test = document.getElementById('test');
