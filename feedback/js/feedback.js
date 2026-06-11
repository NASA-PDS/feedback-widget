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

	window.Feedback = function( options ) {
		options = options || {};

		var button = document.createElement("button");
		button.setAttribute("id", "feedback-tab");

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
			// default properties
			options.tab.label = options.tab.label || "Need Help?";
			options.tab.color = options.tab.color || "#0b3d91";
			options.tab.fontColor = options.tab.fontColor || "#ffffff";
			options.tab.fontSize = options.tab.fontSize || "16";
			options.tab.size.width = options.tab.size.width || "150";
			options.tab.size.height = options.tab.size.height || "60";
			options.tab.placement.side = options.tab.placement.side || "right";
			options.tab.placement.offset = options.tab.placement.offset || "50";

			var useConfig = {
				setColors: function(el, color, bgColor) {
					el.style.color = color;
					el.style.backgroundColor = bgColor;
				},

				setText: function(el, label, fontSize) {
					var p = document.createElement("p");
					p.append( document.createTextNode(label) );
					if ( fontSize !== "16" ) {
						if ( !isNaN(fontSize) ) {
							el.setAttribute("class", "noImage");
							el.style.fontSize = fontSize + "px";
						} else {
							console.log("Invalid value for font size. Please check the configuration file.");
						}
					}
					el.appendChild(p);
				},

				setDimensions: function(el, width, height) {
					if ( !isNaN(width) && !isNaN(height) ) {
						el.style.width = width + "px";
						el.style.height = height + "px";
					} else {
						if ( isNaN(width) ) {
							console.log("Invalid value for tab WIDTH. Please check the configuration file.");
						}
						if ( isNaN(height) ) {
							console.log("Invalid value for tab HEIGHT. Please check the configuration file.");
						}
					}
				},

				calculateAdjustment: function(width, height) {
					return -0.5 * ( Number(width) - Number(height) ) - 5;
				},

				calculateMaxOffset: function(width, height) {
					return [ window.innerHeight - 0.5 * ( Number(width) + Number(height) ), window.innerWidth - Number(width) ];
				},

				setPlacement: function(el, side, offset, maxOffset, adjustment) {
					if ( !isNaN(offset) ) {
						if ( side === "right" || side === "left" ) {
							var os = Number(offset) * window.innerHeight / 100,
								minOffset = -1 * ( Number(adjustment) + 5 ),
								adjust = ( adjustment !== undefined );
							if ( os < minOffset ) {
								el.style.top = minOffset + "px";
							} else if ( os > Number(maxOffset[0]) ) {
								el.style.top = maxOffset[0] + "px";
							} else {
								el.style.top = offset + "vh";
							}
							if ( side === "right" ) {
								if ( adjust ) {
									el.style.right = adjustment + "px";
								}
							} else  {
								el.setAttribute("class", "left");
								if ( adjust ) {
									el.style.left = adjustment + "px";
								}
							}
						} else if (side === "top" || side === "bottom" ) {
							if ( Number(offset) < 0 ) {
								el.style.left = "0";
							} else if ( Number(offset) * window.innerWidth / 100 > Number(maxOffset[1]) ) {
								el.style.left = maxOffset[1] + "px";
							} else {
								el.style.left = offset + "vw";
							}
							if ( side === "top" ) {
								el.setAttribute("class", "top");
							} else {
								el.setAttribute("class", "bottom");
							}
						} else {
							console.log("Invalid value for SIDE of screen to place the tab. The valid options " +
								"are LEFT, RIGHT, TOP, or BOTTOM. Please check the configuration file.");
						}
					} else {
						console.log("Invalid value for OFFSET of tab placement. Please check the configuration file.");
					}
				}
			};

			useConfig.setColors(button, options.tab.fontColor, options.tab.color);
			useConfig.setText(button, options.tab.label, options.tab.fontSize);

			var	adjustment,
				width = Math.max( Number(options.tab.size.width), Number(options.tab.size.height) ),
				height = Math.min( Number(options.tab.size.width), Number(options.tab.size.height) ),
				defaultWidth = ( width === 150 ),
				defaultHeight = ( height === 60 );
			if ( !defaultWidth || !defaultHeight ) {
				useConfig.setDimensions(button, width, height);
				adjustment = useConfig.calculateAdjustment(width, height);
			}

			var side = options.tab.placement.side.toLowerCase(),
				offset = options.tab.placement.offset,
				maxOffset = useConfig.calculateMaxOffset(width, height);
			if ( offset !== "50" || side !== "right" || adjustment !== undefined ) {
				useConfig.setPlacement(button, side, offset, maxOffset, adjustment);
			}
		}

		if ( options.appendTo !== null ) {
			((options.appendTo !== undefined) ? options.appendTo : document.body).appendChild( button );
		}

		return;
	};
})( window, document );
