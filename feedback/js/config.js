var config = {
	host: "https://pds.nasa.gov",	// Email Server Host
	feedback: {
		header: "Help Desk",
		feedbackType: "Comment,Question,Problem/Bug,Kudos,Other",
		additionalLinks: [
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
				title: "OpenPlanetary Forum",
				url: "https://forum.openplanetary.org/"
			},
			{
				title: "Site Map",
				url: "https://pds.nasa.gov/site-help.shtml"
			}
		]
	},
	tab: {
		label: "Need Help?",		// default: Need Help?
		color: "#0b3d91",			// default: #0b3d91
		fontColor: "#ffffff",		// default: #ffffff
		fontSize: "16",				// default: 16
		size: {
			width: "150",			// default: 150
			height: "60"			// default: 60
		},
		placement: {
			side: "right",			// default: right
			offset: "50"			// default: 50
		}
	}
};
