let express = require('express');
let cookieParser = require('cookie-parser');
let app = express()

app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('welcome to express app');
});

let users = {
    name: "John Doe",
    Age: "21"
}

app.get('/setuser', (req, res) => {
    res.cookie("userData", users);
    res.send('user data added to cookie');
});

app.get('/getuser', (req, res) => {
    res.send(req.cookies);
});

app.get('/logout', (req, res) => {
    res.clearCookie('userData');
    res.send('user logout successfully');
});


app.listen(3000, (err) => {
    console.log('listening on port 3000');
}); 
