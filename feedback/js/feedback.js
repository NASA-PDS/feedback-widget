/*
    Copyright (c) 2019, California Institute of Technology ("Caltech").
    U.S. Government sponsorship acknowledged.
    All rights reserved.
    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
      * Redistributions must reproduce the above copyright notice, this list of
      conditions and the following disclaimer in the documentation and/or other
      materials provided with the distribution.
      * Neither the name of Caltech nor its operating division, the Jet Propulsion
      Laboratory, nor the names of its contributors may be used to endorse or
      promote products derived from this software without specific prior written
      permission.
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
    ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
    CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
    SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
    INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
    CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
    ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
    POSSIBILITY OF SUCH DAMAGE.
*/

document.addEventListener("DOMContentLoaded", function(){
	Feedback(config);
});

(function( window, document, undefined ) {
	if ( window.Feedback !== undefined ) {
		return;
	}

	// log proxy function
	var log = function( msg ) {
		window.console.log( msg );
	},
	// function to remove elements, input as arrays
	removeElements = function( remove ) {
		for (var i = 0, len = remove.length; i < len; i++ ) {
			var item = Array.prototype.pop.call( remove );
			if ( item !== undefined ) {
				if (item.parentNode !== null ) { // check that the item was actually added to DOM
					item.parentNode.removeChild( item );
				}
			}
		}
	},
	loader = function() {
		var div = document.createElement("div"), i = 3;
		div.className = "feedback-loader";

		while (i--) { div.appendChild( document.createElement( "span" )); }
		return div;
	},
	getBounds = function( el ) {
		return el.getBoundingClientRect();
	},
	emptyElements = function( el ) {
		var item;
		while( (( item = el.firstChild ) !== null ? el.removeChild( item ) : false) ) {}
	},
	element = function( name, text ) {
		var el = document.createElement( name );
		el.appendChild( document.createTextNode( text ) );
		return el;
	},
	// script onload function to provide support for IE as well
	scriptLoader = function( script, func ){
		if (script.onload === undefined) {
			// IE lack of support for script onload

			if( script.onreadystatechange !== undefined ) {

				var intervalFunc = function() {
					if (script.readyState !== "loaded" && script.readyState !== "complete") {
						window.setTimeout( intervalFunc, 250 );
					} else {
						// it is loaded
						func();
					}
				};

				window.setTimeout( intervalFunc, 250 );

			} else {
				log("ERROR: We can't track when script is loaded");
			}

		} else {
			return func;
		}

	},
	sendButton,
	captchaUrl = "/feedback/recaptcha-v3-verify.php",
	feedbackUrl = "/email-service/SubmitFeedback",
	modal = document.createElement("div"),
	modalBody = document.createElement("div"),
	modalHeader = document.createElement("div"),
	modalFooter = document.createElement("div"),
	captchaScore = 0;

	window.captchaCallback = function( response ) {};
	
	window.Feedback = function( options ) {

		options = options || {};

		// default properties
		options.host = options.host || "";

		options.tab.label = options.tab.label || "Need Help?";
		options.tab.color = options.tab.color || "#0b3d91";
		options.tab.fontColor = options.tab.fontColor || "#ffffff";
		options.tab.fontSize = options.tab.fontSize || "16px";
		options.tab.size.width = options.tab.size.width || "150px";
		options.tab.size.height = options.tab.size.height || "60px";

		options.feedback.header = options.feedback.header || "Help Desk";

		options.page = options.page || new window.Feedback.Form();

		var button,
		glass = document.createElement("div"),
		returnMethods = {

			// open send feedback modal window
			open: function() {
				options.page.render();
				document.body.appendChild( glass );
				button.disabled = true;

				// modal close button
				var a = element("a", "x");
				a.className =  "feedback-close";
				a.onclick = returnMethods.close;
				a.href = "#";

				// build header element
				modalHeader.appendChild( a );
				modalHeader.appendChild( element("h3", options.feedback.header ) );
				modalHeader.className =  "feedback-header";

				modalBody.className = "feedback-body";

				emptyElements( modalBody );
				modalBody.appendChild( element("p", "How can we help you? Send us your question or feedback and we will get back to you within 1 business day.") );
				modalBody.appendChild( options.page.dom );
				var links = options.feedback.followupLinks;
				if ( links !== "" ) {
					var additionalHelp = element("p", "In the meantime, you may find the following links helpful:"),
						followupLinks = document.createElement("ul");
					additionalHelp.className = "additionalHelp";
					for (var i = 0; i < links.length; i++) {
						followupLinks.insertAdjacentHTML('beforeend', '<li><a href="' + links[i].url + '">' + links[i].title + '</a></li>');
					}
					additionalHelp.insertAdjacentElement("beforeend", followupLinks);
					modalBody.insertAdjacentElement("beforeend", additionalHelp);
					window.additionalHelp = additionalHelp;
				}
                                
				// Send button
				sendButton = document.createElement("input");
				sendButton.type = "submit";
				sendButton.value = "Send Feedback";
				sendButton.setAttribute("class", "feedback-btn g-recaptcha");
				sendButton.setAttribute("data-callback", "captchaCallback");
				sendButton.setAttribute("id", "recaptcha");

				// reCAPTCHA branding
				rcBrand = document.createElement("p");
				rcBrand.innerHTML = 'This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.';
				rcBrand.className = "reCaptcha-brand";

				modalFooter.className = "feedback-footer";
				modalFooter.appendChild( rcBrand );
				modalFooter.appendChild( sendButton );

				modal.setAttribute("id", "feedback-form");
				modal.className = "feedback-modal";

				modal.appendChild( modalHeader );
				modal.appendChild( modalBody );
				modal.appendChild( modalFooter );

				document.body.appendChild( modal );

				window.grecaptcha.render("recaptcha", {sitekey: "6LfLCIgUAAAAAI3xLW5PQijxDyZcaUUlTyPDfYlZ"});
			},


			// close modal window
			close: function() {

				button.disabled = false;

				window.grecaptcha.reset();

				// remove feedback elements
				emptyElements( modalHeader );
				emptyElements( modalFooter );
				removeElements( [ modal, glass ] );

				return false;
			},

			// send data
			send: function( adapter ) {

				// make sure send adapter is of right prototype
				if ( !(adapter instanceof window.Feedback.Send) ) {
					throw new Error( "Adapter is not an instance of Feedback.Send" );
				}

				data = options.page.data();
				emptyElements( modalBody );
				modalBody.appendChild( loader() );

				// send data to adapter for processing
				adapter.send( data, function( success ) {

					emptyElements( modalBody );
					sendButton.disabled = false;

					sendButton.value = "Close";

					sendButton.onclick = function() {
						returnMethods.close();
						return false;
					};

					modalBody.setAttribute("class", "feedback-body confirmation");
					var message = document.createElement("p");
					if ( success === true ) {
						message.innerHTML = 'Thank you for making the PDS a better site.<br/>If you provided an email address, a PDS representative will get back to you as soon as possible.';
					} else {
						message.innerHTML = 'There was an error sending your feedback.<br/>If the problem persists, please email <a href="mailto:pds_operator@jpl.nasa.gov">pds_operator@jpl.nasa.gov</a>.';
					}
					modalBody.appendChild( message );

					if ( window.additionalHelp ) {
						modalBody.appendChild( window.additionalHelp );    
					}
				});

			},

			captchaCallback: function( response ) {
				if ( document.getElementById("feedback-comment").reportValidity() ) {
					$.ajax({
						type: "POST",
						url: captchaUrl,
						data: {response: response},
						success: function (data) {
							//console.log(data);
							captchaScore = parseFloat(data.substring(data.indexOf("float") + 6, data.indexOf("float") + 9));
							if (captchaScore > 0.70) {
								options.url = options.url || options.host + feedbackUrl;
								options.adapter = options.adapter || new window.Feedback.XHR(options.url);
								emptyElements(modalBody);
								returnMethods.send(options.adapter);
							} else {
								modalBody.setAttribute("class", "feedback-body suspectedBot");
								document.getElementById("recaptcha").disabled = true;
								modalBody.insertAdjacentElement("afterbegin", element("p", "Are you a bot? Suspicious behavior detected."));
							}
						},
						error: function (XMLHttpRequest, textStatus, errorThrown) {
							modalBody.setAttribute("class", "feedback-body captchaError");
							var message = document.createElement("p");
							message.innerHTML = 'Status: ' + textStatus + '; Error: ' + errorThrown + '<br/>If the problem persists, please email <a href="mailto:pds_operator@jpl.nasa.gov">pds_operator@jpl.nasa.gov</a>.';
							modalBody.insertAdjacentElement("afterbegin", message);
						}
					});
				} else {
					return false;
				}
				window.grecaptcha.reset();
			}

		};

		window.captchaCallback = returnMethods.captchaCallback;

		glass.className = "feedback-glass";

		var button = document.createElement("button");

		if ( Modernizr.touchevents && window.screen.width < 1025 ) {
			var $window = $(window),
				docHeight = $(document).height(),
				rafId;
			window.requestAnimationFrame = window.requestAnimationFrame
				|| window.mozRequestAnimationFrame
				|| window.webkitRequestAnimationFrame
				|| window.msRequestAnimationFrame;
			$window.on("scroll", function() {
				if ( $window.scrollTop() + $window.height() > docHeight - 65 ) {
					rafId = window.requestAnimationFrame(function() {
						var offset = ($window.scrollTop() - 65) * ($window.scrollTop() - 65) * 0.00001;
						button.style.webkitTransform = "translateY(-" + offset + "px)";
						button.style.mozTransform = "translateY(-" + offset + "px)";
						button.style.transform = "translateY(-" + offset + "px)";
					});
				} else {
					window.cancelAnimationFrame(rafId);
					button.style.webkitTransform = "initial";
					button.style.mozTransform = "initial";
					button.style.transform = "initial";
				}
			});
		} else {
			button.style.backgroundColor = options.tab.color;
			button.style.color = options.tab.fontColor;
			var p = document.createElement("p");
			p.append(document.createTextNode(options.tab.label));
			var fontSize = options.tab.fontSize;
			if (fontSize !== "16px") {
				if (!isNan(Number(fontSize))) {
					p.setAttribute("class", "noImage");
					p.style.fontSize = fontSize + "px";
				} else {
					console.log("Invalid value for font size. Please check the configuration file.");
				}
			}
			button.appendChild(p);
			var width = options.tab.size.width;
			var height = options.tab.size.height;
			if (width !== "150px") {
				if (!isNaN(Number(width))) {
					button.style.width = width + "px";
				} else {
					console.log("Invalid value for tab width. Please check the configuration file.");
				}
			}
			if (height !== "60px") {
				if (!isNaN(Number(height))) {
					button.style.height = height + "px";
				} else {
					console.log("Invalid value for tab height. Please check the configuration file.");
				}
			}

			var side = options.tab.placement.side.toLowerCase();
			var offset = options.tab.placement.offset;
			if (!isNaN(Number(offset))) {
				if (!(side === "right" || side === "")) {
					if (side === "left") {
						button.setAttribute("class", "feedbackTab left");
						if (offset !== undefined) {
							button.style.top = offset + "vh";
						}
					} else if (side === "top" || side === "bottom") {
						if (offset !== undefined) {
							button.style.left = offset + "vw";
						}
						if (side === "bottom") {
							button.setAttribute("class", "feedbackTab bottom");
							if (height === "60px") {
								button.style.top = "calc(100vh - 50px)";
							} else {
								if (!isNan(Number(height))) {
									button.style.top = "calc(100vh - " + height + "px + 10px)";
								}
							}
						} else {
							button.setAttribute("class", "feedbackTab top");
						}
					} else {
						console.log("Invalid value for SIDE of screen to place the tab. The valid options " +
							"are LEFT, RIGHT, TOP, or BOTTOM. Please check the configuration file.");
					}
				} else {
					if (offset !== undefined) {
						button.style.top = offset + "vh";
					}
					button.setAttribute("class", "feedbackTab");
				}
			} else {
				console.log("Invalid value for OFFSET of tab placement. Please check the configuration file.");
			}
		}

		if ( !button.classList.contains("feedbackTab") ) {
			button.className = "feedbackTab";
		}
		button.onclick = returnMethods.open;

		if ( options.appendTo !== null ) {
			((options.appendTo !== undefined) ? options.appendTo : document.body).appendChild( button );
		}

		return returnMethods;
	};

	window.Feedback.Page = function() {};
	window.Feedback.Page.prototype = {

		render: function( dom ) {
			this.dom = dom;
		},
		start: function() {},
		close: function() {},
		data: function() {
			// don't collect data from page by default
			return false;
		},
		end: function() { return true; }

	};
	window.Feedback.Send = function() {};
	window.Feedback.Send.prototype = {

		send: function() {}

	};

	window.Feedback.Form = function( elements ) {

		this.elements = elements || [
			{
				type: "input",
				id: "feedback-name",
				name: "Name",
				label: "Name",
				required: false
			},
			{
				type: "input",
				id: "feedback-email",
				name: "Email",
				label: "Email",
				required: false
			},
			{
				type: "select",
				id: "feedback-type",
				name: "Type",
				label: "Type",
				values: config.feedback.feedbackType,
				required: false
			},
			{
				type: "textarea",
				id: "feedback-comment",
				name: "Comment",
				label: "Comment",
				required: true
			}
		];
		this.dom = document.createElement("div");
		this.dom.className = "feedback-form-container";

	};

	window.Feedback.Form.prototype = new window.Feedback.Page();

	window.Feedback.Form.prototype.render = function() {

		var i = 0, len = this.elements.length, item;
		emptyElements( this.dom );
		for (; i < len; i++) {
			item = this.elements[ i ];
			var div = document.createElement("div");
			div.classList.add("feedback-input");

			var formEl = document.createElement( item.type );
			formEl.name = item.name;
			formEl.id = item.id;
			
			if ( item.required ) {
				formEl.required = true;
				div.appendChild( element("label", item.label + ": *"));
			} else {
				div.appendChild( element("label", item.label + ":"));
			}

			if (item.type === "select") {
				var options = item.values.split(",");
				for (j = 0; j < options.length; j++) {
					var option = document.createElement("option");
					option.value = option.textContent = options[j];
					formEl.appendChild(option);
				}
			}

			div.appendChild( (item.element = formEl) );
			this.dom.appendChild(div);
		}

		return this;

	};

	window.Feedback.Form.prototype.end = function() {
		// form validation
		var i = 0, len = this.elements.length, item;
		for (; i < len; i++) {
			item = this.elements[ i ];

			// check that all required fields are entered
			if ( item.required === true && item.element.value.length === 0) {
				item.element.className = "feedback-error";
				return false;
			} else {
				item.element.className = "";
			}
		}

		return true;

	};

	window.Feedback.Form.prototype.data = function() {
		var i = 0, len = this.elements.length, item, data = {};

		for (; i < len; i++) {
			item = this.elements[ i ];
			data[ item.name ] = item.element.value;
		}

		// cache and return data
		return ( this._data = data );
	};

	window.Feedback.XHR = function( url ) {

		this.xhr = new XMLHttpRequest();
		this.url = url;

	};

	window.Feedback.XHR.prototype = new window.Feedback.Send();

	window.Feedback.XHR.prototype.send = function( data, callback ) {

		var xhr = this.xhr;

		xhr.onreadystatechange = function() {
			if( xhr.readyState == 4 ) {
				callback( (xhr.status === 200) );
			}
		};

		var emailData = '';
		emailData = 'subject=Feedback from ' + window.location.hostname;
		emailData += '&content=';

		for (var key in data) {
			emailData += key + ': ';
			emailData += data[key] + '\n';
		}

		emailData += '\nLocation: ' + window.location.href + '\n';

		xhr.open( "POST", this.url, true);
		xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xhr.send(emailData);
	};

})( window, document );