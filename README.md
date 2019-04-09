# PDS Feedback Widget

PDS Feedback Widget Javascript-based overlay and modal window that provides a user with a form to provide comments or feedback on the web page they are currently accessing. When a comment is submitted, it will be sent to pds_operator@jpl.nasa.gov and forwarded to the applicable node that has the application deployed.


## Register

Before being able to use this widget, you will need to register your hostname with the Engineering Node in order to enable the Google Re-captcha that is part of the application.

Email pds_operator@jpl.nasa.gov with the hostname(s) for your website.


## Install

Here are the steps for deploying the Feedback widget to your website on an Apache Web Server:

>> NOTE: These installation instructions assume the use of an Apache Web Server. The Feedback widget can be installed on other web servers, but the exact steps may differ depending upon the software and configuration.


1. Add the following code snippet between the `<head>` tag on each page of your website. If your website uses a header file, you can place it in there:
```
<!-- PDS Feedback Widget -->
<!-- Only add JQuery if you do not already include a library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link rel="stylesheet" href="/feedback/css/feedback.css"  type="text/css" media="screen" />
<script src="/feedback/js/config.js"></script>
<script src='https://www.google.com/recaptcha/api.js?render=explicit' async defer></script>
<script src="/feedback/js/feedback.js"></script>
<!-- -->
```

3. Download the Feedback Widget tar or zip from [Github](https://github.jpl.nasa.gov/PDSEN/feedback-widget/releases/latest) to your local machine, then copy to your home directory on the machine hosting the website.

4. From your home directory on the machine hosting your website, unpack the widget:
```
tar -xvzf <.tar.gz>

#or

unzip <.zip>
```

5. Now we want to move the files needed for the widget to the home directory for your website, or *WEB_HOME_PATH*. This *WEB_HOME_PATH* is the path where your homepage resides. For example, if your homepage is `/my/website/index.html`, then your *WEB_HOME_PATH* is `/my/website/`. To move the files, from the command-line:

   * *macOS / Linux*
     ```
     # Make sure you are in the the feedback widget
     $ pwd
     /path/to/feedback-widget

     # Run deploy.sh to push the files to WEB_HOME_PATH
     $ ./deploy.sh /my/website
     sending incremental file list
     feedback/
     feedback/recaptcha-v3-verify.php
     feedback/css/
     feedback/css/feedback.css
     feedback/image/
     feedback/image/msg_icon.png
     feedback/js/
     feedback/js/config.js
     feedback/js/feedback.js   
     ```

   * *Windows*
     TBD

## [Configurable Variables](#configuring-feedback)

You **must** provide the base URL of your website in `/path/to/feedback/js/config.js` for the key 'host'. While you're there, we've also provided various options to customize your Feedback widget. Refer to the following table for a list of descriptions and acceptable values.

Variable        | Description                                        | Default Value                 | Accepted Values or Types<sup>[0](#zero)</sup>
--------------- | -------------------------------------------------- | ----------------------------- | ---------------
host*           | The base URL of your website.                      | -                             | 
captchaScore    | The minimum score required to submit Feedback.     | "70"                          | integer<sup>[5](#fifth); [0, 100)
|               |                                                    |                               |                     |
header          | The header or title in the Feedback pane.          | "Help Desk"                   | text
text            | An introductory sentence or two afer the header.   | "How can we help you? Send us your question or feedback and we will get back to you within the next 24 hours." | text
feedbackType    | Types of feedback.              | "Comment,Question,Problem/Bug,Kudos,Other" | text<sup>[2](#second)</sup>
sentStatus      | Message for user that his or her Feedback was sent.| "Thank you for your feedback."| text
sentFollowup    | Message for user regarding followup.               | "If you provided an email address, a representative will get back to you as soon as possible." | text
errorStatus     | Message for user that his or her Feedback was not sent. | "There was an error sending your feedback." | text
errorFollowup   | Message for user with alternate way to reach the PDS operator.| "If the problem persists, please email " | text<sup>[1](#first)</sup>
followupGeneral | Message that appears with both sent or error message.| ""                          | text
followupLinks   | Links that are listed at the end of followupGeneral. | ""                          | valid URLs<sup>[2](#second)</sup>
|               |                                                    |                         |											     |
label           | The text on the Feedback tab.                      | Need Help?              | text
color           | The color of the Feedback tab.                     | #0b3d91 (NASA blue)     | text<sup>[3](#third)</sup>
fontColor       | The color of the text on the Feedback tab.         | #ffffff (white)         | text<sup>[3](#third)</sup>
fontSize        | The size of the text on the Feedback tab.<sup>[4](#fourth)</sup>| 15px       | integer<sup>[5](#fifth)</sup>
placement       |                                                    | n/a                     | n/a
&emsp;side      | The side of screen to attach the Feedback tab.     | right                   | RIGHT, LEFT, TOP, BOTTOM
&emsp;offset    | The offset from top or left side of the screen.<sup>[6](#sixth)</sup>| 50vh | integer<sup>[5](#fifth)</sup>; [0, 95)
size            |                                                    |                         | n/a
&emsp;width     | The width of the Feedback tab.                     | 170px                   | integer<sup>[5](#fifth)</sup>
&emsp;height    | The height of the Feedback tab.                    |  60px                   | integer<sup>[5](#fifth)</sup>

<a name="zero"></a>0: All values must be enclosed within the existing double quotation marks.<br>
<a name="first"></a>1: Do **not** include an email address here and leave a space at the end of the incomplete phrase as shown in the default value. Note that the email address for the PDS operator will be inserted at the end, so structure the sentence accordingly.<br>
<a name="second"></a>2: If there are multiple values, separate them with a comma and **no** spaces.<br>
<a name="third"></a>3: Must be written as a hexadecimal, RGB, or HSL color, or from [this list](https://www.w3schools.com/colors/colors_names.asp) of accepted color names. If you are unfamiliar with these formats or looking for a color, [ColorHexa](https://www.colorhexa.com) is a helpful resource to find the exact color you want in all the accepted formats. Be sure to include '#', 'rgb(..., ..., ...)', or 'hsl(..., ..., ...)' as needed.<br>
<a name="fourth"></a>4: Using this option will remove the message icon.<br>
<a name="fifth"></a>5: Enter the integer value only. Do not include such characters as '%', 'vh', 'vw', or 'px'.<br>
<a name="sixth"></a>6: Depending on the side of screen specified, this places the vertical center of the tab proportional to the length of the screen or the left corner of the tab proportional to the width of the screen. For instance, if you fill in config.js as follows:
  ```
    placement: {
      side: "bottom",
      offset: "0"
    }
  ```
  the Feedback tab will be on the bottom of the screen square in the left corner.
  ```
    placement: {
      side: "left",
      offset: "25"
    }
  ```
  places the Feedback tab on the left side of the screen a quarter of the way down from the top.<br>


## Uninstall

The following steps will help you uninstall the feedback widget:

1. Remove the following code snippet from any web pages it was added to:

```
<!-- PDS Feedback Widget -->
<!-- Only add JQuery if you do not already include a librar -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link rel="stylesheet" href="/feedback/css/feedback.css"  type="text/css" media="screen" />
<script src="/feedback/js/config.js"></script>
<script src='https://www.google.com/recaptcha/api.js?render=explicit' async defer></script>
<script src="/feedback/js/feedback.js"></script>
<!-- -->
```

2. Remove the files from *WEB_HOME_PATH/feedback*:
```
# Unix example
rm -fr /my/website/feedback
```

## License
[LICENSE.txt](LICENSE.txt)
