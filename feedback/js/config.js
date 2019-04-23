var config = {
	host: "https://pds.nasa.gov",		// REQUIRED. no default value.
	tab: {
		label: "",			// default: Need Help?
		color: "",			// default: #0b3d91
		fontColor: "",		// default: #ffffff
		fontSize: "",		// default: 16px
		size: {
			width: "",		// default: 150px
			height: ""		// default: 60px
		},
		placement: {
			side: "",		// default: right
			offset: ""		// default: 45vh or 0vw
		}
	},
	feedback: {
		header: "",			// default: Help Desk
		text: "",			// default: How can we help you? Send us your question or feedback and we will get back to you within the next 24 hours.
		feedbackType: "",	// default: Comment, Question, Problem/Bug, Kudos, Other
		sentStatus: "",		// default: Thank you for your feedback.
		sentFollowup: "",	// default: If you provided an email address, a representative will get back to you as soon as possible.
		errorStatus: "",	// default: There was an error sending your feedback.
		errorFollowup: "",	// default: If the problem persists, please email <pds_operator@jpl.nasa.gov - email address is non-configurable>
		followupGeneral: "",// default: In the meantime, you may find the following links helpful:,
		followupLinks: ""	// default: https://pds.nasa.gov/site-help.shtml,https://pds.nasa.gov/home/users/,https://pds.nasa.gov/home/proposers/,https://pds.nasa.gov/home/providers/
	}
};
