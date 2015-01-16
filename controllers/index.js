var user = {  
   headline:"Executive Person",

   id:"SomeIDThing",

   lastName:"Broman",

   pictureUrl:"https://media.licdn.com/mpr/mpr/shrink_200_200/p/8/005/07b/349/223216e.jpg",

   location:{

       name:"Awesome Land, AW",
       country:{
       	code:"us"
       }

   },

   siteStandardProfileRequest:{

      url:"http://www.linkedin.com/profile?viewProfile=&key=11554268&authToken=3KMh&authType=name&trk=api*a124520*s132954*"

   },

   apiStandardProfileRequest:{

      headers:{

         values:[
         	{

           	 name:"Some-auth-token",

           	 value:"name:a;dlkfj"
           	}

         ],
         _total:1
     },

      url:"http://api.linkedin.com/v1/people/NhZXBl_O6f"

    },

    industry:"Awesome Jobs",

    firstName:"Awesome"

};


var indexController = {
	index: function(req, res) {
//*/
		res.render('card', {user: user});
	/*/	
		res.redirect('/auth/login');
	//*/
	},
	login: function(req, res) {
		res.render('login');
	},
  sendToProfile: function(req, res) {
    console.log("INDEXCONTROLLER REQ", req);
    res.redirect('/profile/user' + req.user.customID);
  },
};

module.exports = indexController;