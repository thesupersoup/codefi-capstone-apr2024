# ENV VARIABLES

MONGO_DB_URI=

JWT_SECRET=

SERVER_URL=

CP_SECRET=

PORT=

NODEMAILER_HOST=
NODEMAILER_PORT=
NODEMAILER_USER=
NODEMAILER_PASSWORD=

# ---------------------

# TAGS ROUTES

1. GET multiple TAGS by name (AUTO COMPLETE) _/api/v1/tags?name=<name>_ (SEND NAME IN THE QUEREY PARAMS)
2. GET single tag by ID _/api/v1/tags/<id>_
3. CREATE TAG AND ASSIGN TO USER (POST) tag _/api/v1/tags_ (SEND NAME IN REQ BODY)
4. ASSIGN TAG TO USER AND USER TO TAG (PATCH) tag _/api/v1/tags/<id>_
5. DELETE REMOVE Tag from user _/api/v1/tags/<id>_
6. GET all users from tag _/api/v1/tags/users/<id>_

# ---------------------
