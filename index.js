const HTMLParser = require('node-html-parser');

const express = require('express')
const app = express()
const port = 3000

const getRequest = require("./auth")

app.use(express.json());

/***
	@param {AxiosStatic} session
	*/
const getSchedule = (session) => {
	const coursePageContent = session.get(
        "https://hac.friscoisd.org/HomeAccess/Content/Student/Classes.aspx"
    );

	console.log(coursePageContent);
}

// Get course data 
app.get('/', async (req, res) => {
	const { username, password } = req.body;
	const session = await getRequest(username, password);
	const schedule = getSchedule(session);

	res.send("uwu");
})

// Get transcript 


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

