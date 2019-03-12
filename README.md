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
     feedback/js/feedback.js   
     ```

   * *Windows*
     TBD

## Uninstall

The following steps will help you uninstall the feedback widget:

1. Remove the following code snippet from any web pages it was added to:

```
<!-- PDS Feedback Widget -->
<!-- Only add JQuery if you do not already include a librar -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link rel="stylesheet" href="/feedback/css/feedback.css"  type="text/css" media="screen" />
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
