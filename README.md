# PDS Feedback Widget

PDS Feedback Widget Javascript-based overlay and modal window that provides a user with a form to provide comments or feedback on the web page they are currently accessing. When a comment is submitted, it will be sent to pds_operator@jpl.nasa.gov and forwarded to the applicable node that has the application deployed.


## Register

Before being able to use this widget, you will need to register your hostname with the Engineering Node in order to enable the Google Re-captcha that is part of the application.

Email pds_operator@jpl.nasa.gov with the hostname(s) for your website.


## Deploy 

### Apache Web Server

Here are the steps for deploying the Feedback widget to your website on an Apache Web Server:

1. Add the following code snippet between the `<head>` tag on each page of your website (or in a website header file, if it exists):
```
<script src='https://www.google.com/recaptcha/api.js?render=explicit' async defer></script>
<link rel="stylesheet" href="/feedback/css/feedback.css"  type="text/css" media="screen" />
<script src="/feedback/js/feedback.js"></script>
<script type="text/javascript">
  document.addEventListener("DOMContentLoaded", function(){
    Feedback();
  });
</script>
```

3. Download the Feedback Widget tar or zip from [Github](https://github.jpl.nasa.gov/PDSEN/feedback-widget/releases/latest), and unpack.

4. Once you unpack the widget, you will want to move the files to the home directory for your website, or *WEB_HOME_PATH*. This *WEB_HOME_PATH* is the path where your homepage resides. For example, if your homepage is `/my/website/index.html`, then your *WEB_HOME_PATH* is `/my/website/`. To move the files, from the command-line:

   * *On Mac / Linux Machine*
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

## Contributing
TBD

## License
[LICENSE.txt](LICENSE.txt)
