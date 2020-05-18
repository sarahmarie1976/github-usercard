/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/



/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

let myGitHubAcct;
const cardList = document.querySelector('.cards');
axios.get('http://api.github.com/users/sarahmarie1976').then((response) => {
	myGitHubAcct = response.data;
	console.log(response.data);

	cardList.append(myCardMaker(myGitHubAcct));
});

const followersArray = [
	'tetondan',
	'dustinmyers',
	'justsml',
	'luishrd',
	'bigknell',
];

followersArray.forEach((user) => {
	axios.get(`http://api.github.com/users/${user}`).then((response) => {
		cardList.append(myCardMaker(response.data));
	});
});

const myCardMaker = function (user) {
	let card = document.createElement('div');
	let cardImg = document.createElement('img');
	let cardInfo = document.createElement('div');
	let cardName = document.createElement('h3');
	let cardUName = document.createElement('p');
	let cardLocation = document.createElement('p');
	let cardLink = document.createElement('p');
	let cardLink1 = document.createElement('a');
	let cardFollowers = document.createElement('p');
	let cardFollowing = document.createElement('p');
	let cardBio = document.createElement('p');

	card.classList.add('card');
	cardImg.src = user.avatar_url;
	cardInfo.classList = 'card-info';
	cardName.classList.add('name');
	cardUName.classList = 'username';
	cardLink1.href = user.html_url;

	cardName.textContent = user.name == null ? 'none' : user.name;
	cardUName.textContent = user.login;
	cardLocation.textContent = `Location: ${
		user.location == null ? 'none' : user.location
	}`;
	cardLink.textContent = 'Profile:';
	cardLink1.textContent = user.html_url;
	cardFollowers.textContent = `Followers: ${user.followers}`;
	cardFollowing.textContent = `Following: ${user.following}`;
	cardBio.textContent = `Bio: ${
		user.bio == null ? 'No Bio Written' : user.bio
	}`;

	card.append(cardImg);
	card.append(cardInfo);
	cardInfo.append(cardName);
	cardInfo.append(cardUName);
	cardInfo.append(cardLocation);
	cardInfo.append(cardLink);
	cardLink.append(cardLink1);
	cardInfo.append(cardFollowers);
	cardInfo.append(cardFollowing);
	cardInfo.append(cardBio);
	

	cardImg.addEventListener('click', (event) => {
		card.classList.toggle('card-show');
	});
	return card;
};

