var config = {
	host: "https://pds.nasa.gov",		// Email Server Host - should be https://pds.nasa.gov
	tab: {
		label: "Need Help?",		// default: Need Help?
		color: "#0b3d91",		// default: #0b3d91
		fontColor: "#ffffff",		// default: #ffffff
		fontSize: "16px",		// default: 16px
		size: {
			width: "150px",		// default: 150px
			height: "60px"		// default: 60px
		},
		placement: {
			side: "right",		// default: right
			offset: "45"		// default: 45vh or 0vw
		}
	},
	feedback: {
		header: "Help Desk",
		feedbackType: "Comment,Question,Problem/Bug,Kudos,Other",
		followupLinks: [ 
                    { 
                        title: "Information for Data Users",
                        url: "https://pds.nasa.gov/home/users/"
                    },
                    {
                        title: "Information for Proposers",
                        url: "https://pds.nasa.gov/home/proposers/"
                    },
                    {
                        title: "Information for Providers",
                        url: "https://pds.nasa.gov/home/providers/"
                    },
                    { 
                        title: "Site Map", 
                        url: "https://pds.nasa.gov/site-help.shtml" 
                    },
		]
	}
};
