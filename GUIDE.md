# Next NTP

## Getting Started

Next NTP
Higly customizable New Tab Page

Let me introduce you to Next NTP
You can use Next NTP online at

## Floating Button

The floating action button (FAB) contains the most common, actions on NTP. 
It appears in bottom-right of screen content,it is a rounded shape with a caret-up icon in its center.

## Search Bar

The search bar widget offers an advanced alternative to the native address bar with customizable looks to satisfy everyone’s desires.

#### Settings
  ###### Search bar logo 
  The logo above the search bar can be changed along with the size and rounding of the
    desired custom logo.
    • The image for the custom logo can be uploaded from your device using upload from file option.
    • Or any suitable image that you found on the internet can be used. To do so use the ‘ From Link ’ option
    and paste the URL of the desired image (this can be found by opening just the image in a new tab and
    copying the contents of the address bar or copying the Image address from the image context menu.

  ###### Search bar Logo rounding
  The rounding of the logo can be increased or decreased by adjusting the
    slider. The effects can be directly viewed on the demo image of the chosen logo.

  ###### Search bar rounding
  The rounding of the search bar can be increased or decreased by adjusting the
    slider whose effects are visible on a demo search bar available just above the slider.

  ###### Colors
   This subcategory allows you to specify colors to the widget background, the background, the
    entered text in the search bar and the border colour of the search bar which can be used to adjust the
    visibility of the widget and matching the colour theme of the NTP.

  ###### Bangs 
  This is the feature aimed at improving productivity by quickly change the search provider.
    For Example to search on Youtube use the trigger(,) followed by the designated keyword(y) and then the
    search term.
    The contents of the search bar will be similar to this- “,y xyz”
    * Search Bar Config: This is the most advanced feature of the search bar which can save you a lot of time.
    Placeholder – This is the default text that is displayed on the search bar. It will be hidden once you
    start typing in the search bar.
    To change it simply replace ‘Search Using Commands’ with anything of your choice.
    Default – It can be used to change the default search provider. To do so replace the current character
    with the one designated to the website in the following list (like replace d with g to set the default
    search provider to google).
    Trigger – It is the symbol that you will need to enter followed by the designated character of a website
    to search on it. It can be changed by replacing ‘,’ with any symbol of your choice.

    You can configure your shortcuts to search on specific sites including but not limited to Duckduckgo,
    Google, Youtube, Reddit and Bing.



    To create your own shortcut do the following-
    • Use a character to act as a trigger
    For example, if you want to search on amazon you can use the letter ‘A’.
    • Get the general search address of the site
    For example, to get the address of site simply search any term on the site’s search bar. It should result
    in a page with URL similar to https://www.xyz.com/search?yourkeyword
    Simply remove the term yourkeyword so that it becomes like https://www.xyz.com/search?.
    Paste this in front of your character trigger in a syntax similar to this
    A -> https://www.xyz.com/search?.

#### How to use


#### Settings
You can customize the search bar colors and configuration.
(To access the search bar settings click on the floating button situated at the bottom of the screen.Choose settings
followed by Search Bar in the succeeding dialog box)

## Tiles
The tiles grid act as speed dials to navigate to your favourite sites quickly with a single click.

#### Settings
This settings section gives you the options to customize the look of the tiles grid by adjusting the
various colour options available for different elements.
Features/Customizations available

  * Widget Background: This option allows you to change the background of the widget to your preferential
  colour and transparency level.
  * Icon/Folder Tile Background: This is the colour that will be displayed as the base of tile and will be
  visible from the transparent parts of the icon and folder tiles.
  * Icon/Folder Tile Border: This option allows you to change the colour of the border of the icon/folder
  tile.
  * Tile Label/Folder Text Colour: This option can be used to change the Display Name of the tile.
  * Tile Label/Folder Background Colour: The tile label acts as a base for the display name and can be given
  a different colour to offer better visibility to the Display Name.
  * Folder Background in Grid View: This allows you to change the background colour of the popup that you’ll
  receive on expanding a folder.
#### More settings
 More customization option can be accessed by long-press on tiles grid.

This will allow you to add a tile to a folder, edit it and delete it.
To do any of these actions, drag and drop a tile inside the desired action.
 
If you want to add tiles to a folder , drag a tile over the folder and when you will see a red overlay , releas to move the tile into the folder

You can also adjust the number of tiles, their size and the space between tiles by adjusting the sliders
from Grid Tiles Sliders settings group which can be accessed by long clicking on any tile

## Weather

## News Section

## Tabs

## Homepage

## General

  This section gives you the options to customize the Floating Button and the general looks of the NTP.
  Features/Customizations available –
  (To access these settings click on the floating button situated at the bottom of the screen. Choose
  settings followed by General in the succeeding dialog box)

  * Background Colour: This option allow you to change the colour of the floating button’s background
  (Default is black).
  * Icon Colour: This colour option corresponds to the button’s icon ( ) (Default colour is white).
  * Meta Theme Colour: This gives you the flexibility to change the NTP’s look to a greater height. With
  this option you can change the colour of the address bar of the browser and status bar of your phone to
  match with your NTP’s looks.
  * Widgets Background Blur Effect: It is an option to toggle the backdrop (translucent) effect on the
  widget backgrounds.

## NTP Background
  This section gives you the options to customize the background of the NTP according to your desires.
  Features/Customizations available –
  (To access these settings click on the floating button situated at the bottom of the screen. Choose
  settings followed by NTP Background in the succeeding dialog box)

  ###### Upload From File
  This option lets you choose an image from your local device storage to act as the
  background wallpaper for the NTP. To set an image click the upload icon next to the option followed by
  navigating to and selecting your desired image.
  ###### From Url
  This option gives you the option to set any suitable image that you found online as the NTP
  wallpaper without downloading it first to your device storage. To set an online image as the wallpaper
  copy the address of the image and paste in the Enter URL field of the popup received on clicking the link
  icon next to the option.
  * Colour: With this option you can take a minimalist approach towards your NTP’s look by selecting either
  a plain colour or gradient as the background.

## Widgets
  This section gives you the options to customize the look of the NTP by reordering the widgets in your preferred order or toggle them on and off completely
  You can also set a margin top on each widget( not related to order )

  The following widgets can be reordered and toggled On/Off.
      • Search Bar
      • Tiles Grid
      • Weather
      • News Section
      • Tabs

## Backup&Restore

#### Code Fixer Tool
    This section is used
  //Icons from edit mode are dragged into tile grid
    
    try{
    document.querySelectorAll("#tlg>i").forEach( element => { element.parentNode.removeChild(element);});
    document.getElementById("tlg_editA").remove();
    document.getElementById("tlg_sldr").style.display ="none";
    f_cache_tl();}catch(err){alert(err.message);}
  //Widgets not on their order
  
    try{
    ntp_sett.order=[0,1,2,3,4];
    ntp_sett.status=[1,1,1,1,1];
    load_widgets();
    localStore("ntp_sett", ntp_sett);
    if (ntp_sett.status[1]) {f_setup_gtiles();}
    if (ntp_sett.status[4]) {f_setup_tabs();}
    if (ntp_sett.status[2]) {f_setup_wth();}
    }catch(err){alert(err.message);}

    //Export to clipboard
    function csc(str) {
      var el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style = {position: 'absolute', left: '-9999px'};
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    csc('data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(localStorage)));
#### Export&Import

## About NTP

## Kiwi Browser

## License

## Contributing & Support the project
