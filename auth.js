const { default: axios } = require("axios");
const HTMLParser = require("node-html-parser")

/// Returns a session given a username / password
async function getSession(username, password) {
	const session = axios.create();

	const url = "https://hac.friscoisd.org/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f";
	let pageContent = await (await session.get(url)).data;
	const root = HTMLParser.parse(pageContent);

	const requestVerificationTokenElement = root.querySelector("input[name=__RequestVerificationToken]");
	const requestVerificationToken = requestVerificationTokenElement.attrs['value'];

	const requestHeaders = {
		"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "Host": "hac.friscoisd.org",
    "Origin": "hac.friscoisd.org",
    "Referer": "https://hac.friscoisd.org/HomeAccess/Account/LogOn?ReturnUrl=%2fhomeaccess%2f",
    "__RequestVerificationToken": requestVerificationToken,
  };

	const requestPayload = {
    "__RequestVerificationToken": requestVerificationToken,
    "SCKTY00328510CustomEnabled": "False",
    "SCKTY00436568CustomEnabled": "False",
    "Database": "10",
    "VerificationOption": "UsernamePassword",
    "LogOnDetails.UserName": username,
    "tempUN": "",
    "tempPW": "",
    "LogOnDetails.Password": password,
  };

	const authorizeUrl = "https://hac.friscoisd.org/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f"
	let response = await session.get(authorizeUrl, {
		method: "post",
		body: requestPayload,
		headers: requestHeaders,
  	credentials: 'include',
	})

	return session;
}

module.exports = getSession;
