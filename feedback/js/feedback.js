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
	Feedback();
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
HOST = "https://pds-gamma.jpl.nasa.gov",
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
    options.label = options.label || "Feedback";
    options.header = options.header || "Your Feedback";
    options.messageSuccess = options.messageSuccess || "Thank you for making the PDS a better site. If you provided an email address, a PDS representative will get back to you as soon as possible.";
    options.messageError = options.messageError || "There was an error sending your feedback. If the problem persists, please email pds_operator@jpl.nasa.gov.";
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
            modalHeader.appendChild( element("h3", options.header ) );
            modalHeader.className =  "feedback-header";

            modalBody.className = "feedback-body";

            emptyElements( modalBody );
            modalBody.appendChild( options.page.dom );

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

            // fetch data from all pages
            //for (var i = 0, len = options.pages.length, data = [], p = 0, tmp; i < len; i++) {
            //    if ( (tmp = options.pages[ i ].data()) !== false ) {
            //        data[ p++ ] = tmp;
            //    }
            //}
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

        // TODO - fails on remote nodes due to CORS
        // figure out if it can work or just default to "success"
                // if ( success === true ) {
                    modalBody.appendChild( document.createTextNode( options.messageSuccess ) );
                // }
        //} else {
                //    modalBody.appendChild( document.createTextNode( options.messageError ) );
                //}

            });

        },

        captchaCallback: function( response ) {
            $.ajax({
                type: "POST",
                url: captchaUrl,
                data: { response: response },
                success: function( data ) {
                    captchaScore = parseFloat(data.substring(data.indexOf("float") + 6, data.indexOf("float") + 9));
                    if (captchaScore > 0.70) {
                        options.url = options.url || HOST + feedbackUrl;
                        options.adapter = options.adapter || new window.Feedback.XHR( options.url );
                        emptyElements( modalBody );
                        returnMethods.send( options.adapter );
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
		    alert("Status: " + textStatus);
		    alert("Error: " + errorThrown); 
                }
            });
	    window.grecaptcha.reset();
       }
    
    };

    window.captchaCallback = returnMethods.captchaCallback;

    glass.className = "feedback-glass";

    options = options || {};

    var button = document.createElement("button");
    var img = document.createElement("img");
    img.src = '/feedback/image/msg_icon.png';
    img.height = '15';
    button.appendChild(img)
    button.appendChild(document.createTextNode('  ' + options.label));
    button.className = "feedbackTab";

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
        values: "Comment,Question,Problem/Bug,Kudos,Other",
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
        switch( item.type ) {
            case "textarea":
                div.appendChild( element("label", item.label + ":" + (( item.required === true ) ? " *" : "")) );
                var textarea = document.createElement("textarea");
                textarea.name = item.name;
                textarea.id = item.id;
                div.appendChild( ( item.element = textarea ) );
                break;
            case "input":
                div.appendChild( element("label", item.label + ": " + (( item.required === true) ? "*" : "")) );
                var input = document.createElement("input");
                input.name = item.name;
                input.id = item.id;
                div.appendChild( (item.element = input) );
                break;
            case "select":
                div.appendChild( element("label", item.label + ": " + (( item.required === true) ? "*" : "")) );
                var select = document.createElement("select");
                select.name = item.name;
                select.id = item.id;
                var options = item.values.split(",");
                var option;
                for (j = 0; j < options.length; j++) {
                    option = document.createElement("option");
                    option.value = option.textContent = options[j];
                    select.appendChild(option);
                }
                div.appendChild( (item.element = select) );
                break;
        }
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
