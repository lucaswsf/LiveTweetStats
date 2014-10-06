var ids = 0;

var usersArray = [];

var tags = [];

var users = {
	//Ajoute un utilisateur
	addUser: function() {
		var id = ++ids;
		usersArray[id] = { socket: null, tags: [] };

		return id;
	},

	//Récupère les tags
	getTags: function(userId) {
		return usersArray[userId].tags;
	},

	//Récupère les tags
	getUsersTags: function() {
		return usersArray.tags;
	},

	//Assigne un socket à un user
	setSocket: function(userId, socket) {
		usersArray[userId].socket = socket;
	},

	//Ajoute le tag d'une tag à un user
	addTags: function(userId, tag) {
		var tagExist = false;
		usersArray[userId].tags.push(tag.toLowerCase());
		for (var i = 0; i < tags.length; i++) {
			if(tags[i].text == tag){
				tagExist = true;
			}
		};
		if(!tagExist) {
			tags.push({text: tag.toLowerCase(), userList: [userId]});
		}
		// else
		// {
		// 	tags({ tagExist, userList: [userId]});
		// } <-- regarder dans la doc pour coupler users avec tag qui exist déjà dans le tableau / array
		
	},

	//Transmettre les tweets au users selon leur tag
	broadcast: function(tweet) {
		var tag, client;
		
		//pour chaque user, comparer les hashtags du tweet avec 
		//les hashtags de l'user.
		for (var i = 0; i < usersArray.length; i++) {
			client = usersArray[i];
			if (!client) {
				continue;
			}

			for (var j = 0; j < tweet.entities.hashtags.length; j++) {
				tag = tweet.entities.hashtags[j].text;

				//Si ca correspond, envoyer/emit le tweet à l'user via websocket.
				if (client.tags.indexOf(tag.toLowerCase()) !== -1) {
					client.socket.emit('tweet', tweet);
					break;
				}
			} //end for hashtags
		} //end for userArray

	}

}

module.exports = users;