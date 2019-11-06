# PDS Feedback Widget

PDS Feedback Widget Javascript-based overlay and modal window that provides a user with a form to provide comments or feedback on the web page they are currently accessing. When a comment is submitted, it will be sent to pds_operator@jpl.nasa.gov and forwarded to the applicable node that has the application deployed.


## Register

Before being able to use this widget, you will need to register your hostname with the Engineering Node in order to enable the Google Re-captcha that is part of the application.

Email pds_operator@jpl.nasa.gov with the following information:
* Hostname(s) for your website
* Point(s) of contact to receive the Feedback


## Install

Here are the steps for deploying the Feedback widget to your website on an Apache Web Server:

>> NOTE: These installation instructions assume the use of an Apache Web Server with PHP support. The Feedback widget can be installed on other web servers which have PHP enabled, but the exact steps may differ depending upon the software and configuration; web servers without PHP will not be able to install the Feedback widget ([#9](../../issues/9)).


1. [Register](#register) with Engineering Node if you have not already.

2. Add the following code snippet between the `<head>` tag on each page of your website. If your website uses a header file, you can place it in there:
```
<!-- PDS Feedback Widget -->
<!-- Only add JQuery if you do not already include a library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src='https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit' async defer></script>
<link rel="stylesheet" href="/feedback/css/feedback.css"  type="text/css" media="screen" />
<script src="/feedback/js/modernizr-custom.js"></script>
<script src="/feedback/js/config.js"></script>
<script src="/feedback/js/feedback.js"></script>
<!-- -->
```

3. Download the Feedback Widget tar or zip from [Github](https://github.com/NASA-PDS-Incubator/feedback-widget/releases/latest) to your local machine, then copy to your home directory on the machine hosting the website.

4. From your home directory on the machine hosting your website, unpack the widget:
```
tar -xvzf <.tar.gz>

#or

unzip <.zip>
```

5. Next, configure the Feedback Widget . From the root folder of the widget, open `feedback/js/config.js` in your text editor of choice.<br><br>
A list and explanation of optional configurable variables can be found in the [following section](#configurable-variables). *Note: It is highly recommended that you update **additionalLinks** to provide help information unique to your website.*

6. Now we want to move the files needed for the widget to the home directory for your website, or *WEB_HOME_PATH*. This *WEB_HOME_PATH* is the path where your homepage resides. For example, if your homepage is `/my/website/index.html`, then your *WEB_HOME_PATH* is `/my/website/`. To move the files, from the command-line:

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
     feedback/image/iconfinder_Help.svg
     feedback/image/msg_icon.png
     feedback/js/
     feedback/js/config.js
     feedback/js/feedback.js 
     feedback/js/modernizr-custom.js  
     ```

   * *Windows*
     TBD

## Configurable Variables

**Variable**    | **Description**                               | **Default Value**         | **Accepted Values or Types**<sup>[0](#zero)</sup>
--------------- | --------------------------------------------- | ------------------------- | --------------------
header          | The header or title in the Feedback popup.    | "Help Desk"               | text
feedbackType    | Type of feedback for the user to specify if he or she so desires.| "Comment,Question,Problem/Bug,Kudos,Other" | text<sup>[1](#first)</sup>
additionalLinks | Additional link(s) the user may find helpful. | ---                       | ---
&emsp;- title   | The text displayed for the link.              | "Information for Data Users"<br>"Information for Proposers"<br>"Information for Providers"<br>"OpenPlanetary Forum"<br>"Site Map" | text
&emsp;- url     | The URL of the link.                          | "https://pds.nasa.gov/home/users/"<br>"https://pds.nasa.gov/home/proposers/"<br>"https://pds.nasa.gov/home/providers/"<br>"https://forum.openplanetary.org"<br>"https://pds.nasa.gov/site-help.shtml" | valid URLs
|               |                                               |                           |
label           | The text on the Feedback tab.                 | "Need Help?"              | text
color           | The color of the Feedback tab.                | "#0b3d91" (NASA blue)     | text<sup>[2](#second)</sup>
fontColor       | The color of the text on the Feedback tab.    | "#ffffff" (white)         | text<sup>[2](#second)</sup>
fontSize        | The size of the text on the Feedback tab.     | "16"                      | integer<sup>[3](#third),[5](#fifth)</sup>
size            | ---                                           | ---                       | ---
&emsp;- width   | The width of the Feedback tab.                | "150"                     | integer<sup>[3](#third),[5](#fifth)</sup>
&emsp;- height  | The height of the Feedback tab.               | "60"                      | integer<sup>[3](#third),[5](#fifth)</sup>
placement       | ---                                           | ---                       | ---
&emsp;- side    | The side of screen to attach the Feedback tab.| "right"                   | "RIGHT" "LEFT" "TOP" "BOTTOM"
&emsp;- offset  | The offset from top or left side of the screen.<sup>[7](#seventh)</sup>|"50"| integer<sup>[4](#fourth),[5](#fifth)</sup> &#8712; [0,100]<sup>[6](#sixth)</sup>

<a name="zero"></a><sup>0:</sup> All values must be enclosed within double quotation marks.<br>
<a name="first"></a><sup>1:</sup> Separate multiple values with a comma.<br>
<a name="second"></a><sup>2:</sup> Must be written as a hexadecimal, RGB, or HSL color, or be from [this list](https://www.w3schools.com/colors/colors_names.asp) of accepted color names. If you are unfamiliar with these formats, sites such as [ColorHexa](https://www.colorhexa.com) can help you find an exact color in the accepted formats. Be sure to include '#', 'rgb()', or 'hsl()' within the double quotations in config.js as needed.<br>
<a name="third"></a><sup>3:</sup> Used with the unit 'px' at 1px = 1/96th of an inch. For a digital facsimile of how different px values render on your screen, there are resources such as this [w3schools widget](https://www.w3schools.com/cssref/tryit.asp?filename=trycss_unit_px). (To use, adjust the integer value for any font-size in the left pane then click the green 'Run' button near the top to refresh the results in the right pane.)<br>
<a name="fourth"></a><sup>4:</sup> Used with the unit 'vh' or 'vw' at 1vh or 1vw = 1/100th of the browser window's height or width.<br>
<a name="fifth"></a><sup>5:</sup> Enter the integer value only. Do not include such characters as '%', 'vh', 'vw', 'px', 'pt', 'em', 'rem', etc.<br>
<a name="sixth"></a><sup>6:</sup> If this value is not in the range of 0 to 100 (inclusive) or is such that a part of the tab would not be visible, the most extreme value allowed which keeps the entire tab visible will be applied.<br>
<a name="seventh"></a><sup>7:</sup> Depending on the side of screen specified, this places the vertical center of the tab proportional to the height of the screen or the left corner of the tab proportional to the width of the screen. For instance, if you fill in config.js as follows:
  ```
    placement: {
      side: "bottom",
      offset: "0"
    }
  ```
  the Feedback tab will be on the bottom of the screen squarely in the left corner.
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
<script src='https://www.google.com/recaptcha/api.js?render=explicit' async defer></script>
<link rel="stylesheet" href="/feedback/css/feedback.css"  type="text/css" media="screen" />
<script src="/feedback/js/modernizr-custom.js"><script>
<script src="/feedback/js/config.js"></script>
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
